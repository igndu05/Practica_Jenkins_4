pipeline {
    agent any

    environment {
        PATH = "/home/usuario/.nvm/versions/node/v25.2.1/bin:$PATH"
    }

    stages {

        stage('Verify npm and node') {
            steps {
                echo 'Verifying tools...'
                sh 'node -v'
                sh 'npm -v'
            }
        }

        stage('Install') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'npm test'
            }
        }

        stage('Build') {
            steps {
                echo 'Building the project...'
                sh 'npm run build'
            }
        }

        stage('Archive') {
            steps {
                archiveArtifacts artifacts: 'dist/**', fingerprint: true
            }
        }

        stage('Docker Build & Deploy') {
            steps {
                // Construimos la imagen Docker
                echo 'Building Docker image...'
                sh 'docker build -t mi-app-hito .'

                // Detenemos el contenedor previo si existe
                echo 'Stopping existing Docker container if it exists...'
                sh '''
                    if [ $(docker ps -q -f name=mi-app-hito-cont) ]; then
                        docker stop mi-app-hito-cont
                    fi
                '''

                // Ejecutamos el contenedor en segundo plano y con --rm
                echo 'Running Docker container...'
                sh 'docker run -d --name mi-app-hito-cont -p 3000:80 --rm mi-app-hito'

                // Verificamos que la aplicación esté disponible
                echo 'Verifying deployment...'
                sh 'curl -f http://localhost:3000 || echo "Deployment failed"'
            }
        }
    }
}
