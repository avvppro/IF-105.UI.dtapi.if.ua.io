#!groovy
properties([disableConcurrentBuilds()])

pipeline {
    environment { 
        registry = "avvppro/dtester" 
        registryCredential = 'dockerhub_id' 
        dockerImage = '' 
    }
    agent any
    stages {
        stage("Prepare files") {
            steps {
                sh 'rm -rf ./dist'
                sh "sed -i 's https://dtapi.if.ua/api http://192.0.0.0/dtapi g' ./src/environments/environment.prod.ts"
                sh 'npm install'
            }
        }
        stage("Run tests") {
            steps {
                sh "export CHROME_BIN='/usr/bin/chromium'"
                sh 'ng test  --browsers ChromeHeadless --watch=false --code-coverage=true'
            }
        }
        stage("Run build") {
            steps {
                sh 'ng build --prod'
            }
        }
        stage("Build Docker image") {
            steps {
                script { 
                    dockerImage = docker.build registry + ":dtester_frontend" 
                }
            }
        }
        stage('Deploy our image') { 
            steps { 
                script { 
                    docker.withRegistry( '', registryCredential ) { 
                        dockerImage.push() 
                    }
                } 
            }
        } 
        stage('Cleaning up') { 
            steps { 
                sh "docker rmi $registry:dtester_frontend"
            }
        } 
    }

}