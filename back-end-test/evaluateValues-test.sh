#!/bin/bash
curl -H "Content-Type: application/json" -X POST \
--data @evaluateValues-input.json \
http://localhost:3000/evaluate-values
