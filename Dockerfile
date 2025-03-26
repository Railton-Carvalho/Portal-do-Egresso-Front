FROM node:22.7.0 AS build

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar apenas os arquivos de dependências para instalar pacotes
COPY . .

# Instalar as dependências do projeto
RUN npm install

# Gerar o build otimizado de produção
RUN npm run build --prod

# Etapa 2: Servir a aplicação com Nginx
FROM nginx:alpine
    
# Copiar o build gerado na etapa anterior para a pasta padrão do Nginx
COPY --from=build /app/dist/portal-egresso/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY mime.types /etc/nginx/mime.conf
# Expor a porta 80 para servir a aplicação
EXPOSE 80

# Comando para rodar o Nginx
CMD ["nginx", "-g", "daemon off;"]
