# Usa la imagen oficial de Node.js
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias y instala paquetes
COPY package*.json ./
RUN npm install

# Copia el resto del código fuente al contenedor
COPY . .

# Expone el puerto en el que corre la app Express
EXPOSE 3000

# Comando para iniciar la app: ejecuta index.js
CMD ["node", "index.js"]
