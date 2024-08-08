#!/bin/bash
# Скрипт для сборки задач

# Останавливаем скрипт при ошибке
set -e

node ../utils/setup-welcome-favicon.js
node ../utils/setup-welcome-screenshots.js $1
node ../utils/setup-welcome-index.js
node ../utils/create-archive.js

echo "✅Сборка завершена."
