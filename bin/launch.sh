#!/bin/sh

# Move to the directory this node file is in
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR

# Start up the server
node node.js 
