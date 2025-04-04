pipeline {
    agent {
        docker {
            image 'claudiojones/node-docker:latest'
            args '-v /var/run/docker.sock:/var/run/docker.sock'
	    alwaysPull true
        }
    }
    environment {
        DOCKER_HUB_CREDENTIALS = credentials('docker-hub-id')
    }
    stages {
	stage('Debug Environment') {
    		steps {
        		sh 'echo "PATH = $PATH"'
        		sh 'which docker || echo "docker not found"'
        		sh 'docker --version || echo "docker --version failed"'
    		}
	}
        stage('Checkout') {
            steps {
                git 'https://github.com/claudiojccoimbra/Angular19-Project'
            }
        }
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        stage('Docker Build & Push') {
            steps {
                script {
                    sh 'docker build -t claudiojones/angular19-project:latest .'
                    sh 'docker login -u $DOCKER_HUB_CREDENTIALS_USR -p $DOCKER_HUB_CREDENTIALS_PSW'
                    sh 'docker push seuusuario/angular19-project:latest'
                }
            }
        }
        stage('Deploy no Kubernetes') {
            steps {
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
