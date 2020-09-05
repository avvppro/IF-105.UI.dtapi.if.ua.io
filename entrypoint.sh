#!/bin/sh
#sed Backend credentials for Frontend
sh "sed -i 's https://dtapi.if.ua/api http://$BALANCER_IP/dtapi g' ./src/environments/environment.prod.ts"
# This will exec the CMD (apache2 start) from Dockerfile.
exec "$@"