#!/bin/bash

# Script para build do app Telegram
set -e

echo "🔨 Building Telegram App..."

# Limpar build anterior
echo "🧹 Cleaning previous build..."
rm -rf dist/

# Instalar dependências se necessário
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Compilar TypeScript
echo "⚙️ Compiling TypeScript..."
npx tsc

echo "✅ Build completed successfully!"
echo "📁 Output: dist/"
