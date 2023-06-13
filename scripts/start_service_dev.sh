#!/bin/bash

if [[ ${DEBUG_SERVICE} == ${SERVICE_NAME} ]]
then
  echo "Starting ${SERVICE_NAME}@${ENVIRONMENT} with debugging"
  npx nodemon --exitcrash --nolazy --inspect=0.0.0.0:9229 --watch libraries/ --watch ${SERVICE_NAME}/ ${SERVICE_NAME}/index.ts
else
  echo "Starting ${SERVICE_NAME}@${ENVIRONMENT}"
  npx nodemon --exitcrash --nolazy --watch libraries/ --watch ${SERVICE_NAME}/ ${SERVICE_NAME}/index.ts
fi
