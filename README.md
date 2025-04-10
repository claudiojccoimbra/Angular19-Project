
# Angular19-Project

O **Angular19-Project** é uma aplicação Angular preparada para entrega contínua (CI/CD), executada em ambiente conteinerizado com **Docker** e orquestrada por **Kubernetes**. O projeto também conta com um pipeline automatizado via **Jenkins**, além de recursos de **monitoramento com Prometheus e Grafana**.

---

## 🧭 Sumário

- [📌 Visão Geral](https://github.com/claudiojccoimbra/Angular19-Project/tree/master?tab=readme-ov-file#-vis%C3%A3o-geral)
- [🧰 Tecnologias Utilizadas](https://github.com/claudiojccoimbra/Angular19-Project/tree/master?tab=readme-ov-file#-tecnologias-utilizadas)
- [✅ Pré-requisitos](https://github.com/claudiojccoimbra/Angular19-Project/tree/master?tab=readme-ov-file#-pr%C3%A9-requisitos)
- [📁 Estrutura do Projeto](https://github.com/claudiojccoimbra/Angular19-Project/tree/master?tab=readme-ov-file#-estrutura-do-projeto)
- [☸️ Configuração do Ambiente](https://github.com/claudiojccoimbra/Angular19-Project/tree/master?tab=readme-ov-file#-configura%C3%A7%C3%A3o-do-ambiente)
- [🐳 Docker e Imagens](https://github.com/claudiojccoimbra/Angular19-Project/tree/master?tab=readme-ov-file#-docker-e-imagens)
- [☸️ Kubernetes](https://github.com/claudiojccoimbra/Angular19-Project/tree/master?tab=readme-ov-file#-kubernetes)
- [⚙️ Jenkins e Pipeline](https://github.com/claudiojccoimbra/Angular19-Project/tree/master?tab=readme-ov-file#-jenkins-e-pipeline)
- [✅ Testes Automatizados](https://github.com/claudiojccoimbra/Angular19-Project/tree/master?tab=readme-ov-file#-testes-automatizados)
- [📊 Monitoramento com Prometheus e Grafana](https://github.com/claudiojccoimbra/Angular19-Project/tree/master?tab=readme-ov-file#-monitoramento-com-prometheus-e-grafana)
- [🚀 Como Executar](https://github.com/claudiojccoimbra/Angular19-Project/tree/master?tab=readme-ov-file#-como-executar)
- [🔄 Atividades Adicionais Realizadas](https://github.com/claudiojccoimbra/Angular19-Project/tree/master?tab=readme-ov-file#-atividades-adicionais-realizadas)
- [📸 Visuais do Projeto](https://github.com/claudiojccoimbra/Angular19-Project/tree/master?tab=readme-ov-file#-visuais-do-projeto)



---

## 📌 Visão Geral

Este projeto demonstra um fluxo de trabalho DevOps moderno, desde o desenvolvimento front-end com Angular até a implantação automatizada em um cluster Kubernetes, com observabilidade via Prometheus e Grafana. 

---

## 🧰 Tecnologias Utilizadas

- **Angular** 19+
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
#Dockerfile
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

configuração no `karma.conf.js`:

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

## 🔄 Atividades Adicionais Realizadas

### Docker e Imagem da Aplicação Angular

- Criamos uma imagem Docker para a aplicação Angular utilizando NGINX para servir os arquivos.
- Re-taggeamos a imagem e alteramos o nome do container via Docker Compose.
- Utilizamos **bind mounts** para mapear o diretório de logs do host no container.

### Containers Ativos

```bash
docker ps
```

- Jenkins Master: `claudiojones/jenkins-custom:lts` em `localhost:8081`
- Angular App via Compose: `angular19-project-volume:latest` em `localhost:8080`
- Angular App via Kubernetes: 4 réplicas ativas
- Prometheus: rodando como pod Kubernetes
- Grafana: rodando como pod Kubernetes em `localhost:30003`
- InfluxDB: container local `influxdb:1.8` em `localhost:8086`

### Deploy no Kubernetes

- Deployment com 4 réplicas da aplicação Angular para garantir alta disponibilidade.
- Services criados para expor a aplicação (NodePort), Prometheus e Grafana.
- Readiness e Liveness Probes configurados nos pods Angular.
- PVC configurado para Prometheus (armazenamento persistente de métricas).

### Testes de Stress com k6

- Script de teste criado com **stages** ajustando número de usuários e tempo de execução.
- Utilização do Docker para executar o **k6** montando diretório local com script de teste.
- Problemas de conexão resolvidos usando `host.docker.internal`.

### Integração com InfluxDB e Grafana

- InfluxDB 1.8 instalado via Docker (necessário para o output do k6).
- k6 configurado para enviar métricas para o InfluxDB.
- Grafana conectado ao InfluxDB com sucesso:
  - Mensagem “datasource is working. 16 measurements found”
  - Criação de dashboards sugerida com uso de InfluxQL.

### Testes e Monitoramento

- Todas as requisições do teste de carga foram concluídas com sucesso.
- Métricas armazenadas corretamente no InfluxDB.
- Utilização do **Query Inspector** do Grafana para debug e verificação de consultas.

---

---

## 📸 Visuais do Projeto

### Aplicação Angular em Execução
![Aplicação Angular](https://github.com/claudiojccoimbra/Angular19-Project/blob/master/docs/images/App.png?raw=true)

### Containers Ativos no Docker
![Containers Docker](https://github.com/claudiojccoimbra/Angular19-Project/blob/master/docs/images/Docker_containers.png?raw=true)

### Imagens Docker Local
![Imagens Docker](https://github.com/claudiojccoimbra/Angular19-Project/blob/master/docs/images/Docker_images.png?raw=true)

### Volumes Docker
![Volumes Docker](https://github.com/claudiojccoimbra/Angular19-Project/blob/master/docs/images/Docker_volumes.png?raw=true)

### Jenkins Pipeline em Execução
![Jenkins Pipeline](https://github.com/claudiojccoimbra/Angular19-Project/blob/master/docs/images/Jenkins.png?raw=true)

### Stress Test em Tempo Real - k6 + InfluxDB + Grafana
![Stress Test Live](https://github.com/claudiojccoimbra/Angular19-Project/blob/master/docs/images/Stress_test_k6_influxDb_grafana.png?raw=true)

### Stress Test Finalizado - k6 + InfluxDB + Grafana
![Resultado Final Stress Test](https://github.com/claudiojccoimbra/Angular19-Project/blob/master/docs/images/Stress_test_finish_k6_influxDb_grafana_dockerImages.png?raw=true)

### Visualização do docker ps com Containers Ativos
![docker ps](https://github.com/claudiojccoimbra/Angular19-Project/blob/master/docs/images/Powershell_docker_ps.png?raw=true)
