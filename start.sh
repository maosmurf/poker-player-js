#!/bin/bash

npm install httpsync

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR
nodejs player_service.js &

echo $! > express.pid
