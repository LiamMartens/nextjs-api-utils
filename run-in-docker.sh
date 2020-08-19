#!/bin/bash
docker run -w /app -itv $(pwd):/app --user=$(id -u):$(id -u) node:stretch $@
