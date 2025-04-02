pipeline {
  agent any
  environment {
    DOCKER_HUB_CREDENTIALS = credentials('docker-hub-id')
    KUBE_CONFIG = credentials('kubeconfig-id')
  }
  stages {
    stage('Checkout') {
      steps {
        git 'https://seu-repositorio.git'
      }
    }
    stage('Build') {
      steps {
        // Executar os comandos de build da aplicação Angular
        sh 'npm install'
        sh 'npm run build'
      }
    }
    stage('Test') {
      steps {
        // Executar os testes
        sh 'npm test'
      }
    }
    stage('Docker Build & Push') {
      steps {
        script {
          sh 'docker build -t seuusuario/angular19-project:latest .'
          sh 'docker login -u $DOCKER_HUB_CREDENTIALS_USR -p $DOCKER_HUB_CREDENTIALS_PSW'
          sh 'docker push seuusuario/angular19-project:latest'
        }
      }
    }
    stage('Deploy no Kubernetes') {
      steps {
        // Aplicar os manifests do Kubernetes
        withCredentials([file(credentialsId: 'kubeconfig-id', variable: 'KUBECONFIG')]) {
          sh 'kubectl apply -f deployment.yaml'
          sh 'kubectl apply -f service.yaml'
        }
      }
    }
  }
  post {
    success {
      echo 'Pipeline executado com sucesso!'
    }
    failure {
      echo 'Falha na execução do pipeline.'
    }
  }
}
