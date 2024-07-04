#!/bin/sh

BRANCH="$(git branch --show-current)"

INTERNALS="micro-ui-internals"

cd $INTERNALS && echo "installing packages" && yarn add "@egovernments/digit-ui-react-components@1.7.0-beta.2" && yarn install && rm -rf node_modules/@egovernments && cp -rpf @egovernments-updated-ui node_modules/ && mv node_modules/@egovernments-updated-ui node_modules/@egovernments && echo "starting build" && yarn build && echo "building finished" && find . -name "node_modules" -type d -prune -print -exec rm -rf '{}' \; 
cd ..

rm -rf node_modules
rm -f yarn.lock

# yarn install
