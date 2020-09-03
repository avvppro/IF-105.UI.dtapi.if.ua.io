FROM alpine:3.12.0
# Upgrade existing packages in the base image
RUN apk update && apk --no-cache upgrade
RUN apk add --no-cache apache2
# Apache2 config file (Allow ovverride + mod_rewrite enable)
RUN sed -i '265s/AllowOverride None/AllowOverride All/g' /etc/apache2/httpd.conf 
RUN sed -i "s%#LoadModule rewrite_module%LoadModule rewrite_module%g" /etc/apache2/httpd.conf
# Copy frontend files
COPY ./dist/IF105/* /var/www/localhost/htdocs/
COPY ./.htaccess /var/www/localhost/htdocs/
# Acess for web users
RUN chown apache. -R /var/www/localhost/htdocs/
# Run httpd in foreground so that the container does not quit
CMD ["-D","FOREGROUND"]
# Start httpd when container runs
ENTRYPOINT ["/usr/sbin/httpd"]