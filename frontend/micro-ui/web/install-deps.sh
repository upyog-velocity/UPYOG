#!/bin/sh

BRANCH="$(git branch --show-current)"

INTERNALS="micro-ui-internals"

cd $INTERNALS && echo "installing packages" && yarn install && echo "Move evog module file" && rm -rf node_modules/@egovernments && cp -rpf @egovernments-updated-ui node_modules/ && mv node_modules/@egovernments-updated-ui node_modules/@egovernments && echo "starting build" && yarn build && echo "building finished" && find . -name "node_modules" -type d -prune -print -exec rm -rf '{}' \; 
cd ..
echo "Delete web Node Module folder"
rm -rf node_modules
rm -f yarn.lock

# yarn install
