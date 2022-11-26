#!/bin/bash
echo ""
echo "Stopping servers..."
pm2 kill > /dev/null

cd /var/www/html/cse30246/studybuddy
npm run build

echo "Changing permissions..."
chmod 755 ./build -R
chmod 755 ./public -R

echo "Starting servers..."
pm2 start ecosystem.config.js > /dev/null

echo "Deployment Successful!"
