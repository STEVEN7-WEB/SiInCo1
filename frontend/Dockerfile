# Etapa 1: Node para build
FROM node:20

WORKDIR /app

# Copia package.json y package-lock.json
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia todo el proyecto
COPY . .

# Build para producción
RUN npm run build

# Etapa 2: Nginx para servir Angular
FROM nginx:alpine

# Copia los archivos del build al directorio de Nginx
COPY --from=0 /app/dist/frontend /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
