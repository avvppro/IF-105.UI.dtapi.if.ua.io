#!/bin/sh
#sed Backend credentials for Frontend
cd /var/www/localhost/htdocs/
find . -type f -exec sed -i "s http://192.0.0.0/dtapi/ http://$BALANCER_IP/dtapi/ g" {} +
# This will exec the CMD (apache2 start) from Dockerfile.
exec "$@"