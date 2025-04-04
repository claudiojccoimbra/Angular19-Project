# Dockerfile.agent
FROM node:18-buster

# Instala o Docker CLI
RUN apt-get update && apt-get install -y docker.io

WORKDIR /app

CMD ["sh"]
