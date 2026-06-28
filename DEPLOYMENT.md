# Deployment Instructions for Vercel

This portfolio project is configured and ready to be deployed to Vercel. 

## Prerequisites
1. Ensure your code is pushed to a GitHub repository.
2. Sign up or log in to [Vercel](https://vercel.com).

## Deployment Steps
1. In your Vercel Dashboard, click **Add New...** and select **Project**.
2. Connect your GitHub account and import the repository containing this project.
3. Vercel will automatically detect that this is a **Vite** project. 
4. The Build and Output Settings should be automatically configured as:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. (Optional) If you have environment variables (like `VITE_WHATSAPP_NUMBER`), add them in the **Environment Variables** section.
6. Click **Deploy**.

## Post-Deployment
- Vercel will build the project and provide you with a live URL.
- The `vercel.json` file handles Single Page Application (SPA) routing, so refreshing on sub-paths will route correctly back to `index.html`.

Your portfolio is now live!
