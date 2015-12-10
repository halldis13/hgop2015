#!/bin/bash
docker push halldis13/tictactoe
ssh vagrant@192.168.50.4 <<-'ENDSSH'
docker pull halldis13/tictactoe
docker kill testcontainer
docker rm testcontainer
docker run --name testcontainer -p 8080:8080 -d -e "NODE_ENV=production" halldis13/tictactoe
ENDSSH
