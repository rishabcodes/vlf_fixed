#!/bin/bash

# Monitor AWS Amplify Build Progress
APP_ID="d29047gj000ove"
REGION="us-east-2"
JOB_ID="2"

echo "========================================"
echo "AWS Amplify Build Monitor"
echo "========================================"
echo "App ID: $APP_ID"
echo "Region: $REGION"
echo "Job ID: $JOB_ID"
echo ""
echo "Build URL: https://${REGION}.console.aws.amazon.com/amplify/home?region=${REGION}#/${APP_ID}/builds/${JOB_ID}"
echo ""
echo "Starting monitoring (updates every 30 seconds)..."
echo "========================================"

while true; do
    # Get job status
    JOB_DATA=$(aws amplify get-job --app-id $APP_ID --branch-name main --job-id $JOB_ID --region $REGION 2>/dev/null)
    
    if [ $? -ne 0 ]; then
        echo "Error fetching job data"
        sleep 30
        continue
    fi
    
    # Parse status
    STATUS=$(echo "$JOB_DATA" | jq -r '.job.summary.status')
    CURRENT_STEP=$(echo "$JOB_DATA" | jq -r '.job.steps[0].stepName // "INITIALIZING"')
    START_TIME=$(echo "$JOB_DATA" | jq -r '.job.summary.startTime')
    
    # Calculate duration if started
    if [ "$START_TIME" != "null" ]; then
        START_EPOCH=$(date -j -f "%Y-%m-%dT%H:%M:%S" "${START_TIME%%.*}" +%s 2>/dev/null || date -d "${START_TIME%%.*}" +%s 2>/dev/null)
        CURRENT_EPOCH=$(date +%s)
        DURATION=$((CURRENT_EPOCH - START_EPOCH))
        DURATION_MIN=$((DURATION / 60))
        DURATION_SEC=$((DURATION % 60))
        DURATION_STR="${DURATION_MIN}m ${DURATION_SEC}s"
    else
        DURATION_STR="Not started"
    fi
    
    # Clear previous line and print status
    echo -ne "\r\033[K"
    echo -n "[$(date '+%H:%M:%S')] Status: $STATUS | Step: $CURRENT_STEP | Duration: $DURATION_STR"
    
    # Check if build is complete
    if [ "$STATUS" == "SUCCEEDED" ]; then
        echo ""
        echo ""
        echo "========================================"
        echo "✅ BUILD SUCCEEDED!"
        echo "========================================"
        echo "App URL: https://${APP_ID}.amplifyapp.com"
        echo "Duration: $DURATION_STR"
        echo ""
        break
    elif [ "$STATUS" == "FAILED" ]; then
        echo ""
        echo ""
        echo "========================================"
        echo "❌ BUILD FAILED!"
        echo "========================================"
        FAILED_STEP=$(echo "$JOB_DATA" | jq -r '.job.steps[] | select(.status == "FAILED") | .stepName')
        echo "Failed at step: $FAILED_STEP"
        echo "Check logs at: https://${REGION}.console.aws.amazon.com/amplify/home?region=${REGION}#/${APP_ID}/builds/${JOB_ID}"
        echo ""
        break
    fi
    
    sleep 30
done