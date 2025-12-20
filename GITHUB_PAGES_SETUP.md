# GitHub Pages Deployment Guide

## Setup Steps

### 1. Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/jaltech21/Auxla_Project`
2. Click on **Settings** → **Pages** (in the left sidebar)
3. Under **Build and deployment**:
   - Source: Select **GitHub Actions**
4. Save the changes

### 2. Add Repository Secrets

You need to add your environment variables as GitHub secrets:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret** and add each of these:

   - `VITE_API_URL`: Your production API URL (e.g., `https://your-backend.railway.app`)
   - `VITE_SUPABASE_URL`: `https://mvjkhdavxurimtismbwt.supabase.co`
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key
   - `VITE_STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key (use live key for production)

### 3. Deploy

Once you push to the `main` branch, GitHub Actions will automatically:
1. Install dependencies
2. Build the project with Vite
3. Deploy to GitHub Pages

Your site will be available at: `https://jaltech21.github.io/Auxla_Project/`

### 4. Verify Deployment

After the workflow completes:
1. Go to **Actions** tab to see the deployment status
2. Visit your GitHub Pages URL
3. Test all routes (navigation should work properly now)

## What We Fixed

1. **404.html**: Added a redirect script for SPA routing on GitHub Pages
2. **index.html**: Added SPA redirect handler to process deep links
3. **vite.config.ts**: Base path already set to `/Auxla_Project/`
4. **GitHub Actions**: Created automated deployment workflow

## Troubleshooting

### If you still see a blank page:

1. Check the browser console for errors
2. Verify the base path in `vite.config.ts` matches your repo name
3. Make sure all environment secrets are added correctly
4. Check the Actions tab for deployment errors

### If assets (CSS/JS) don't load:

- The base path must match your repository name exactly: `/Auxla_Project/`
- Check that files are in the `dist` folder after build

### CORS Issues:

- Make sure your backend API allows requests from `https://jaltech21.github.io`
- Update CORS settings in your backend Express server

## Backend Deployment Note

For the donation and newsletter features to work, you'll need to deploy your backend to a production server (Railway, Render, Vercel, etc.) and update the `VITE_API_URL` secret to point to your production backend URL.

## Local Testing

To test the production build locally:

```bash
npm run build
npm run preview
```

This will serve the built files at `http://localhost:4173` with the correct base path.
