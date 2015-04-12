#!/bin/bash
curl -H "Content-Type: application/json" -X POST \
--data @evaluateScore-input.json \
http://localhost:3000/evaluate-score
