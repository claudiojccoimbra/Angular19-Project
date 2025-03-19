# Etapa 1: Construção da aplicação Angular
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Etapa 2: Servir os arquivos com Nginx
FROM nginx:alpine

COPY --from=build /app/dist/angular19-project/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]