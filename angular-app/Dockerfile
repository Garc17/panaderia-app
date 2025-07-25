# Etapa 1: Build de Angular
FROM node:20-alpine as build

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build -- --configuration production

# Etapa 2: Servir con Nginx
FROM nginx:alpine

# Elimina los archivos por defecto de nginx
RUN rm -rf /usr/share/nginx/html/*

# COPIA el contenido del build Angular (SSR)
COPY --from=build /app/dist/panaderia/browser/ /usr/share/nginx/html

# COPIA la configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
