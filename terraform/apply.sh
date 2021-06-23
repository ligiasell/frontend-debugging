#!/usr/bin/env bash

set -eo pipefail

CURRENT_WORKSPACE="$(./terraform.sh workspace list | grep '*' | sed 's/\* //g')"

if [[ "$CURRENT_WORKSPACE" == "default" ]]
then
  echo "You are currently on '${CURRENT_WORKSPACE}' workspace. Don't be."
  exit 1
else
  echo "You are currently on '${CURRENT_WORKSPACE}' workspace."
fi

read -p "Do you want to continue? (only 'yes' will approve) " PROCEED

if [[ "$PROCEED" == "yes" ]]
then
  ./terraform.sh apply
fi
