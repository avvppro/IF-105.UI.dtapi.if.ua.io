#!groovy
properties([disableConcurrentBuilds()])

pipeline {
    environment { 
        registry = "YourDockerhubAccount/YourRepository" 
        registryCredential = 'dockerhub_id' 
        dockerImage = '' 
    }
    agent any
    stages {
        stage("Make Frontend Files") {
            steps {
                sh 'rm -rf ./frontend ./dist'
                sh 'ls -la'
                sh "sed -i 's https://dtapi.if.ua/api http://balancer/dtapi g' ./src/environments/environment.prod.ts"
                sh "sed -i 's https://dtapi.if.ua/api http://balancer/dtapi g' ./src/environments/environment.ts"
                sh 'npm install'
                sh 'ng build --prod'
            }
        }
        stage("Build Docker Image") {
            steps {
                echo "============image build=============="
                    sh 'pwd'
                    sh 'docker build -t frontend:$BUILD_NUMBER . '
                
            }
        }
    }

}