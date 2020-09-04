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
        stage("Make Frontend Files") {
            steps {
                sh 'rm -rf ./dist'
                sh 'ls -la'
                sh "sed -i 's https://dtapi.if.ua/api http://172.33.0.5/dtapi g' ./src/environments/environment.prod.ts"
                sh "sed -i 's https://dtapi.if.ua/api http://172.33.0.5/dtapi g' ./src/environments/environment.ts"
                sh 'npm install'
                sh 'ng build --prod'
            }
        }
        stage("Build Docker Image") {
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