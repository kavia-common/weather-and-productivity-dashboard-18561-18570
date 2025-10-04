#!/bin/bash
cd /home/kavia/workspace/code-generation/weather-and-productivity-dashboard-18561-18570/weather_dashboard_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

