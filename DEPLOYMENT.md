# Deployment Guide: BAIC Website to Google Cloud Run

This guide explains how to deploy the BAIC website to Google Cloud Run using GitHub and Google Cloud Build for continuous integration and deployment.

## Prerequisites

1. A GitHub account
2. A Google Cloud Platform account
3. Google Cloud SDK installed locally (optional, but helpful for testing)
4. Git installed locally

## Files Created for Deployment

The following files have been created to facilitate the deployment:

1. `cloudbuild.yaml` - Configuration for Google Cloud Build with Cloud Logging enabled
2. `Dockerfile` - Instructions for containerizing the application
3. `nginx/nginx.conf` - Nginx configuration for serving the React app
4. `.gcloudignore` - Specifies which files to exclude when uploading to Google Cloud

## Deployment Steps

### 1. GitHub Repository Setup

1. Create a new GitHub repository
2. Push your code to the repository:
   ```
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/baic-website.git
   git push -u origin main
   ```

### 2. Google Cloud Project Setup

1. Create a new Google Cloud Project or select an existing one
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Click on the project dropdown at the top of the page
   - Click "New Project" or select an existing project

2. Enable required APIs:
   - Go to "APIs & Services" > "Library"
   - Search for and enable the following APIs:
     - Cloud Build API
     - Cloud Run API
     - Container Registry API
     - Resource Manager API

3. Set up authentication (if connecting from CI/CD outside Google Cloud):
   - Go to "IAM & Admin" > "Service Accounts"
   - Create a new service account with appropriate roles:
     - Cloud Build Service Account
     - Cloud Run Admin
     - Storage Admin (for Container Registry)
   - Create and download a key for this service account

### 3. Set Up GitHub to Cloud Build Integration

1. In Google Cloud Console, go to "Cloud Build" > "Triggers"
2. Click "Connect Repository"
3. Select GitHub as the source and authenticate
4. Select your repository
5. Create a new trigger:
   - Name: "Deploy to Cloud Run"
   - Event: Push to branch
   - Source: Your repository and branch (e.g., main)
   - Configuration: Cloud Build configuration file (cloudbuild.yaml)
   - Location: Repository

### 3.1 Cloud Logging Configuration

The `cloudbuild.yaml` file includes Cloud Logging configuration, which is a requirement for Google Cloud Build triggers:

```yaml
options:
  logging: CLOUD_LOGGING_ONLY
```

This configuration ensures that:
- Build logs are properly captured and stored in Google Cloud Logging
- You can access detailed logs for each build in the Google Cloud Console
- The trigger can properly report build status and errors

### 4. Initial Deployment

1. Push your changes to GitHub:
   ```
   git add cloudbuild.yaml Dockerfile nginx/
   git commit -m "Add deployment configuration"
   git push
   ```

2. This will trigger the Cloud Build pipeline, which will:
   - Build your React application
   - Create a Docker container
   - Push the container to Container Registry
   - Deploy the container to Cloud Run

3. Monitor the build in Google Cloud Console:
   - Go to "Cloud Build" > "History"
   - Click on the running build to see logs and status

### 5. Access Your Deployed Application

1. Once deployment is complete, go to "Cloud Run" in the Google Cloud Console
2. Click on your service (baic-website)
3. You'll see a URL that you can use to access your deployed application

### 6. Custom Domain Setup (Optional)

1. In Google Cloud Console, go to "Cloud Run" > Select your service
2. Go to the "Domain Mappings" tab
3. Click "Add Mapping"
4. Enter your custom domain
5. Follow the instructions to verify domain ownership and update DNS records

## Continuous Deployment

With this setup, any changes pushed to your main branch will automatically trigger a new build and deployment. The process will:

1. Pull the latest code from GitHub
2. Build the React application
3. Create a new Docker container
4. Deploy the container to Cloud Run

## Troubleshooting

If you encounter issues with the deployment:

1. Check the Cloud Build logs for errors
2. Verify that all required APIs are enabled
3. Ensure your service account has the necessary permissions
4. Check that your Dockerfile and nginx configuration are correct

### Common Build Issues

#### Missing Dependencies

If you encounter build errors related to missing dependencies, such as:

```
Module not found: Error: Can't resolve 'react-slick' in '/workspace/src/components/sections'
```

Make sure all required dependencies are listed in your package.json file. For this project, we've added:

```json
"react-slick": "^0.30.2",
"slick-carousel": "^1.8.1",
```

Also ensure that any required CSS files are imported in your application. For react-slick, we've added these imports to src/index.js:

```javascript
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
```

#### Port Configuration for Google Cloud Run

Google Cloud Run expects your container to listen on the port specified by the `PORT` environment variable, which is typically set to `8080`. If your container is not configured to listen on this port, you'll encounter an error like:

```
ERROR: Revision is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable.
```

To fix this issue:

1. Configure your Nginx server to listen on port 8080 in `nginx/nginx.conf`:
   ```nginx
   server {
       listen 8080;
       # rest of your configuration
   }
   ```

2. Update your Dockerfile to expose port 8080:
   ```dockerfile
   EXPOSE 8080
   ```

This ensures that your container will properly listen on the port expected by Google Cloud Run.

## Cost Considerations

- Cloud Run charges based on usage (requests and memory)
- Container Registry storage costs
- Cloud Build minutes (first 2,500 minutes per month are free)

Consider setting up budget alerts to monitor costs.
