#!/bin/sh
#sed Backend credentials for Frontend
cd /var/www/localhost/htdocs/
find . -type f -exec sed -i "s https://dtapi.if.ua/api/ http://$BACKEND_ENDPOINT/dtapi/ g" {} +
# This will exec the CMD (apache2 start) from Dockerfile.
exec "$@"