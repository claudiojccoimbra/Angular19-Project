
# Angular19-Project

O **Angular19-Project** é uma aplicação Angular preparada para entrega contínua (CI/CD), executada em ambiente conteinerizado com **Docker** e orquestrada por **Kubernetes**. O projeto também conta com um pipeline automatizado via **Jenkins**, além de recursos de **monitoramento com Prometheus e Grafana**.

---

## 🧭 Sumário

- [Visão Geral](#visão-geral)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Docker e Imagens](#docker-e-imagens)
- [Kubernetes](#kubernetes)
- [Jenkins e Pipeline](#jenkins-e-pipeline)
- [Testes Automatizados](#testes-automatizados)
- [Monitoramento com Prometheus e Grafana](#monitoramento-com-prometheus-e-grafana)
- [Como Executar](#como-executar)
- [Resolução de Problemas](#resolução-de-problemas)
- [Licença](#licença)

---

## 📌 Visão Geral

Este projeto demonstra um fluxo de trabalho DevOps moderno, desde o desenvolvimento front-end com Angular até a implantação automatizada em um cluster Kubernetes, com observabilidade via Prometheus e Grafana. 

---

## 🧰 Tecnologias Utilizadas

- **Angular** 14+
- **Docker** e **Docker Compose**
- **Kubernetes** (via Docker Desktop)
- **Jenkins** (com imagens customizadas de agentes e master)
- **Karma** + **Puppeteer** para testes automatizados
- **Prometheus** + **Grafana** para monitoramento

---

## ✅ Pré-requisitos

- Docker Desktop com Kubernetes habilitado
- Conta no Docker Hub
- Jenkins instalado (local ou via container)
- Acesso ao repositório Git do projeto

---

## 📁 Estrutura do Projeto

```
angular19-project/
│
├── src/                        # Código-fonte Angular
├── Dockerfile                  # Empacota a aplicação Angular com NGINX
├── Dockerfile.agent            # Agente Jenkins com Docker CLI e kubectl
├── docker-compose.yml          # Execução local com volume de logs
├── Jenkinsfile                 # Pipeline CI/CD
├── k8s/
│   ├── deployment.yaml         # Deploy da aplicação Angular
│   ├── service.yaml            # Service Kubernetes (NodePort)
│   ├── grafana.yaml            # Deploy e service do Grafana
│   ├── prometheus.yaml         # Deploy e service do Prometheus
│   ├── prometheus-config.yaml  # ConfigMap Prometheus
│   └── prometheus-pvc.yaml     # Volume persistente para Prometheus
```

---

## 🐳 Docker e Imagens

### Aplicação Angular

- Servida por **NGINX**
- Build é realizado via `ng build`, empacotado via `Dockerfile`.

```dockerfile
# Exemplo do Dockerfile
FROM nginx:alpine
COPY dist/angular19-project /usr/share/nginx/html
```

### Docker Compose

```yaml
services:
  angular-app:
    container_name: angular-app-volume
    image: angular19-project-volume:latest
    ports:
      - "8080:80"
    volumes:
      - "C:/Users/Jones/Desktop/Angular19-Project/logs:/var/log/nginx"
```

---

## ☸️ Kubernetes

### Deploy da Aplicação

```yaml
replicas: 4
image: angular19-project:latest
livenessProbe & readinessProbe configurados
```

### Service (NodePort)

```yaml
type: NodePort
port: 80
nodePort: 30001
```

---

## ⚙️ Jenkins e Pipeline

### Jenkins Master

Imagem baseada em `jenkins/jenkins:lts` com `docker.io` instalado.

### Jenkins Agent

Imagem baseada em `node:18-buster` com Docker CLI e `kubectl` instalados.

```dockerfile
FROM node:18-buster
RUN apt-get update && apt-get install -y docker.io curl ...
```

### Jenkinsfile

Pipeline automatizado com as seguintes etapas:

- Debug do ambiente
- Checkout do repositório
- Build Angular (`npm install` + `ng build`)
- Docker Build e Push
- Deploy no Kubernetes com `kubectl apply`

---

## ✅ Testes Automatizados

O projeto utiliza **Karma** com **Chrome Headless via Puppeteer**.

Exemplo de configuração no `karma.conf.js`:

```js
process.env.CHROME_BIN = require('puppeteer').executablePath();
browsers: ['ChromeHeadless']
```

---

## 📊 Monitoramento com Prometheus e Grafana

### Prometheus

- Configurado com PVC de 2Gi
- Scrape automático de pods Kubernetes

### Grafana

- Porta 3000 mapeada como NodePort (30003)
- Interface acessível via `http://localhost:30003`

---

## 🚀 Como Executar

### 1. Preparar o Ambiente

- Docker Desktop com Kubernetes ativado
- Jenkins configurado com credenciais:
  - `docker-hub-id`
  - `kubeconfig-id`

### 2. Build da Imagem

```bash
docker build -t angular19-project:latest .
```

### 3. Executar com Docker Compose (opcional)

```bash
docker-compose up -d
```

### 4. Pipeline com Jenkins

- Utilize o `Jenkinsfile` versionado
- Pipeline realiza todo o ciclo de CI/CD automaticamente

### 5. Verificar Aplicação

```bash
kubectl get deployments
kubectl get services
```

Acesse via: [http://localhost:30001](http://localhost:30001)

---

## 🧯 Resolução de Problemas

- Verifique os logs do Jenkins se o pipeline falhar
- Use `kubectl describe pod <nome>` para diagnosticar falhas
- Acesse os logs do NGINX via volume mapeado em `docker-compose`

---

## 📄 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.
