# Sanity CMS Setup for OCSLAA Blog

This guide will help you set up Sanity CMS for managing blog posts.

## Step 1: Create Sanity Project

1. **Sign up for Sanity.io**
   - Go to https://sanity.io
   - Sign up with your email or GitHub account
   - The free plan includes:
     - Unlimited documents
     - 3 users
     - 10GB bandwidth/month
     - 5GB assets

2. **Create a New Project**
   ```bash
   npm install -g @sanity/cli
   cd /home/osmanjalloh/workspace/auxla/auxla
   npm create sanity@latest -- --project-plan free
   ```

   When prompted:
   - Project name: `OCSLAA Blog`
   - Dataset: `production`
   - Template: `Clean project with no predefined schemas`
   - Output path: `./studio`

3. **Note Your Project Details**
   After creation, you'll see:
   - Project ID: `abc12345` (example)
   - Dataset: `production`

## Step 2: Configure Environment Variables

1. Create `.env` file in project root:
   ```bash
   cd /home/osmanjalloh/workspace/auxla/auxla
   touch .env
   ```

2. Add your Sanity credentials to `.env`:
   ```env
   VITE_SANITY_PROJECT_ID=your-project-id-here
   VITE_SANITY_DATASET=production
   ```

3. Add `.env` to `.gitignore` (if not already):
   ```bash
   echo ".env" >> .gitignore
   ```

## Step 3: Set Up Sanity Studio

1. **Navigate to studio directory**:
   ```bash
   cd studio
   ```

2. **Copy the schema files**:
   Copy these schema files to `studio/schemas/`:
   - `blogPost.ts` (blog post schema)
   - `author.ts` (author schema)
   - `category.ts` (category schema)
   - `tag.ts` (tag schema)
   - `index.ts` (schema index)

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start Sanity Studio**:
   ```bash
   npm run dev
   ```
   
   Studio will open at: `http://localhost:3333`

## Step 4: Configure CORS

1. Go to https://sanity.io/manage
2. Select your project
3. Go to **API** → **CORS Origins**
4. Add these origins:
   - `http://localhost:8080` (development)
   - `http://localhost:3333` (Sanity Studio)
   - Your production domain (when deployed)
5. Allow credentials: **Yes**

## Step 5: Import Existing Blog Data

1. In Sanity Studio, create:
   - **Authors** (4 authors from mockBlogPosts.ts)
   - **Categories** (7 categories)
   - **Tags** (all unique tags)

2. Then create **Blog Posts** (10 existing posts)

Or use the migration script:
```bash
cd /home/osmanjalloh/workspace/auxla/auxla
node scripts/migrate-to-sanity.js
```

## Step 6: Deploy Sanity Studio

1. **Deploy to Sanity's hosting** (free):
   ```bash
   cd studio
   npm run deploy
   ```
   
   Your studio will be available at:
   `https://your-project.sanity.studio`

2. **Or self-host**: Build and deploy with your app:
   ```bash
   npm run build
   # Deploy the /dist folder to Vercel/Netlify
   ```

## Step 7: Update React App

The blog service is already configured to work with both mock data and Sanity!

To switch to Sanity:
1. Make sure `.env` has your Sanity credentials
2. The app will automatically use Sanity when credentials are present
3. Falls back to mock data if Sanity is not configured

## Using Sanity Studio

### Creating a Blog Post

1. Open Sanity Studio
2. Click **"Blog Post"** in sidebar
3. Click **"Create new Blog Post"**
4. Fill in:
   - **Title**: Post title (slug auto-generates)
   - **Excerpt**: Short summary (160 chars recommended)
   - **Content**: Full article (supports rich text)
   - **Cover Image**: Upload or select from library
   - **Author**: Select from dropdown
   - **Category**: Choose one category
   - **Tags**: Add relevant tags
   - **Featured**: Toggle for homepage feature
   - **Published**: Toggle to publish/unpublish
   - **Published At**: Publication date/time
5. Click **"Publish"** when ready

### Managing Authors

1. Go to **"Author"** section
2. Add author details:
   - Name, title, bio
   - Avatar image
   - Credentials (e.g., "PhD", "Licensed Therapist")
   - Social links (Twitter, LinkedIn, Email)

### Managing Categories & Tags

- **Categories**: Broad topics (Wellness Tips, Mental Health, etc.)
- **Tags**: Specific keywords for filtering and SEO

## Schema Structure

### Blog Post Fields
- Title (required)
- Slug (auto-generated from title)
- Excerpt (required, max 200 chars)
- Content (rich text with markdown support)
- Cover Image (required)
- Author (reference to Author)
- Category (reference to Category)
- Tags (array of Tag references)
- Reading Time (calculated automatically)
- View Count, Like Count (tracked by app)
- Featured (boolean)
- Published (boolean)
- Published At (datetime)

## Troubleshooting

### "Project ID not found"
- Check `.env` file has correct `VITE_SANITY_PROJECT_ID`
- Restart dev server after changing `.env`

### "CORS not allowed"
- Add your domain to CORS origins in Sanity manage
- Enable credentials

### "Cannot connect to studio"
- Make sure studio is running: `cd studio && npm run dev`
- Check port 3333 is not in use

### Images not loading
- Check image asset permissions in Sanity
- Verify image URLs in queries

## Security Notes

1. **Never commit `.env` file** to Git
2. **Create separate datasets** for development and production
3. **Use API tokens** for server-side operations
4. **Set up roles and permissions** in Sanity manage
5. **Regular backups**: Sanity provides automatic backups

## Support Resources

- Sanity Documentation: https://www.sanity.io/docs
- Sanity Slack Community: https://slack.sanity.io
- GROQ Cheat Sheet: https://www.sanity.io/docs/query-cheat-sheet

## Next Steps

After setup:
1. Train authors on using Studio
2. Establish content workflow (draft → review → publish)
3. Set up webhooks for automatic rebuilds
4. Configure preview mode for draft content
5. Add analytics tracking
