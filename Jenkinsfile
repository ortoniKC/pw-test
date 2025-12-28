pipeline {
    agent any
    
    tools {
        nodejs 'node' // Ensure Node.js is installed
    }

    environment {
        CI = 'true'
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

       stage('Run Playwright Tests') {
            parallel {
                stage('Shard 1') {
                    steps { sh 'npx playwright test --shard=1/2 || true' }
                }
                stage('Shard 2') {
                    steps { sh 'npx playwright test --shard=2/2 || true' }
                }
            }
        }

        stage('Merge Ortoni Reports') {
            steps {
                // This command will now exit with code 1 if any merged tests failed
                sh 'npx ortoni-report merge-report'
            }
        }
    }

    post {
        always {
            publishHTML(target: [
                    allowMissing: false,
                    alwaysLinkName: true,
                    keepAll: true,
                    // vital: point to the folder where you just unzipped the file
                    reportDir: 'ortoni-report', 
                    // vital: this filename must match what was inside the zip
                    reportFiles: 'ortoni-report.html', 
                    reportName: 'Ortoni-Test-Report'
                ])
            
            // Optional: Archive the zip file itself if you want to download it later
            archiveArtifacts artifacts: '*.zip', allowEmptyArchive: true
        }
    }
}
