#!/bin/bash
# A script to set the right permissions
echo "writing permissions..."
chmod 755 ./img
chmod 755 ./css
chmod 755 ./js
chmod 755 composer.phar
chmod 644 *.php
chmod 644 ./js/*.js
chmod 644 ./img/*
chmod 644 ./css/*.css
