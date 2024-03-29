#!/bin/bash

set -e

MODULE=$1
MODULE_CAP=${MODULE^}

SCRIPT_DIR=$(dirname "$0")
ROOT_DIR=$SCRIPT_DIR/..
MODULE_DIR=$ROOT_DIR/src/data/$MODULE

mkdir -p "$MODULE_DIR"

STORE_FILE=$STORE_DIR/index.ts

bash "$SCRIPT_DIR"/storeTemplate.sh "$MODULE" >"$MODULE_DIR"/index.ts


SEC_COMMAND="sed"

if [[ $OSTYPE == 'darwin'* ]]; then
  SEC_COMMAND="gsed"
fi

$SEC_COMMAND -i "/^\/\/ import-reducer-above/i import {"$MODULE_CAP"Reducer} from '~/data/$MODULE'" src/data/reducer.ts
$SEC_COMMAND -i "/^\/\/ add-reducer-above/i  \ \ \ \ $MODULE: "$MODULE_CAP"Reducer," src/data/reducer.ts

bash "$SCRIPT_DIR"/sagaTemplate.sh "$MODULE" >"$MODULE_DIR"/saga.ts
bash "$SCRIPT_DIR"/rtkqTemplate.sh "$MODULE" >"$MODULE_DIR"/query.ts

$SEC_COMMAND -i "/^\/\/ import-saga-above/i import {"$MODULE_CAP"Acts} from '~/data/$MODULE'" src/data/saga.ts
$SEC_COMMAND -i "/^\/\/ import-saga-above/i import {"$MODULE_CAP"Saga} from '~/data/$MODULE/saga'" src/data/saga.ts
$SEC_COMMAND -i "/^\/\/ add-saga-above/i  \ \ \ \ yield takeLatest("$MODULE_CAP"Acts.getValue, "$MODULE_CAP"Saga)" src/data/saga.ts
