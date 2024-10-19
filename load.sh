#!/bin/bash

# Verificar si git está inicializado
if [ ! -d ".git" ]; then
  echo "El repositorio no está inicializado. Ejecuta 'git init' primero."
  exit 1
fi

# Archivo que se va a subir
file="bot.qr.png"

# Verificar si el archivo existe
if [ ! -f "$file" ]; then
  echo "El archivo $file no existe. Asegúrate de que esté en el directorio."
  exit 1
fi

# Agregar el archivo al staging area
git add "$file"

# Crear un commit con mensaje
git commit -m "Añadiendo el archivo bot.qr.png"

# Asegurarse de que estemos en la rama main
git branch --show-current | grep -q "main" || git checkout main

# Subir el archivo al repositorio remoto
git push -u origin main

# Confirmación
echo "Archivo $file subido exitosamente a la rama main."
