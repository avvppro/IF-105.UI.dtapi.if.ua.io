#!/bin/sh
#sed Backend credentials for Frontend
cd /var/www/localhost/htdocs/
find . -type f -exec sed -i "s|https://dtapi.if.ua/api/|http://$BALANCER_IP/dtapi/|g" {} +
# This will exec the CMD (apache2 start) from Dockerfile.
exec "$@"