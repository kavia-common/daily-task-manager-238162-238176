#!/bin/bash
cd /home/kavia/workspace/code-generation/daily-task-manager-238162-238176/todo_app_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

