#!/bin/bash

export ACCEPTANCE_URL=http://192.168.33.10:9000
grunt mochaTest:acceptance
