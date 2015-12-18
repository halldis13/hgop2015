#!/bin/bash

docker push halldis13/tictactoe

docker pull halldis13/tictactoe

docker kill devcontainer

docker rm devcontainer

docker run --name devcontainer -p 9000:8080 -d -e "NODE_ENV=production" halldis13/tictactoe
