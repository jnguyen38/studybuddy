#!/bin/bash
pm2 kill
cd /var/www/html/cse30246/studybuddy
rm ./public/locations -r
cp ./src/media/locations ./public -r
npm run build
chmod 755 ./build -R
chmod 755 ./public -R
pm2 start ecosystem.config.js
