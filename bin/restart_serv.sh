#!/bin/bash

echo ""
echo "Restarting servers..."
pm2 kill > /dev/null
pm2 start ecosystem.config.js > /dev/null

echo "Restart Successful!"
