# Vercel Deployment Checklist

## ✅ Pre-Deployment Checklist

### 1. **Environment Variables Setup in Vercel**

Before deploying, you need to configure these environment variables in your Vercel project:

#### Required Environment Variables:

```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sprecycling?retryWrites=true&w=majority

# Brevo Email Configuration
BREVO_API_KEY=your_brevo_api_key_here
OWNER_EMAIL=siliconplanetrecycling@gmail.com
FROM_EMAIL=noreply@sprecycling.com
FROM_NAME=S P Recycling

# Optional: Site URL (if you want to use environment variable instead of hardcoded)
NEXT_PUBLIC_SITE_URL=https://www.sprecycling.in
```

### 2. **How to Add Environment Variables in Vercel**

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your project (or create a new one)
3. Go to **Settings** → **Environment Variables**
4. Add each variable:
   - Click **Add New**
   - Enter the **Name** (e.g., `MONGODB_URI`)
   - Enter the **Value** (your actual value)
   - Select **Environment(s)**: 
     - ✅ Production
     - ✅ Preview
     - ✅ Development (optional)
   - Click **Save**
5. Repeat for all environment variables

### 3. **MongoDB Atlas Configuration**

Make sure your MongoDB Atlas cluster allows connections from Vercel:

1. Go to MongoDB Atlas Dashboard
2. Click **Network Access** in the left sidebar
3. Click **Add IP Address**
4. Click **Allow Access from Anywhere** (or add Vercel's IP ranges)
   - For production, you can use `0.0.0.0/0` to allow all IPs
5. Save the changes

### 4. **Brevo Email Configuration**

Ensure your Brevo sender email is verified:
1. Log in to Brevo dashboard
2. Go to **Senders** → Verify your sender email
3. Make sure `FROM_EMAIL` matches a verified sender in Brevo

### 5. **Domain Configuration (Optional)**

If you have a custom domain:
1. In Vercel, go to **Settings** → **Domains**
2. Add your domain: `www.sprecycling.in`
3. Follow Vercel's DNS configuration instructions
4. Update the baseUrl in `sitemap.ts` and `robots.ts` if needed

## 🚀 Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended for first time)

1. **Push your code to GitHub/GitLab/Bitbucket**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel:**
   - Go to https://vercel.com/new
   - Import your Git repository
   - Vercel will auto-detect Next.js

3. **Configure Project:**
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `next build` (default)
   - Output Directory: `.next` (default)

4. **Add Environment Variables:**
   - Add all the environment variables listed above
   - Make sure to add them for **Production**, **Preview**, and **Development**

5. **Deploy:**
   - Click **Deploy**
   - Wait for the build to complete
   - Your site will be live at `your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```
   - Follow the prompts
   - When asked about environment variables, you can add them via CLI or add them later in the dashboard

4. **Deploy to Production:**
   ```bash
   vercel --prod
   ```

## ✅ Post-Deployment Verification

### 1. **Test Your Site:**
   - Visit your deployed URL
   - Check all pages load correctly
   - Test form submissions
   - Verify email functionality

### 2. **Test Sitemap and Robots.txt:**
   - Visit: `https://your-domain.com/sitemap.xml`
   - Visit: `https://your-domain.com/robots.txt`
   - Verify they load correctly

### 3. **Test MongoDB Connection:**
   - Try creating a blog post via admin panel
   - Verify blog posts appear on the blog page
   - Check MongoDB Atlas logs for connection issues

### 4. **Test Email Functionality:**
   - Submit a contact form
   - Submit a pickup request form
   - Verify emails are received

### 5. **Submit Sitemap to Search Engines:**
   - **Google Search Console:**
     1. Go to https://search.google.com/search-console
     2. Add your property
     3. Go to **Sitemaps**
     4. Submit: `https://www.sprecycling.in/sitemap.xml`
   
   - **Bing Webmaster Tools:**
     1. Go to https://www.bing.com/webmasters
     2. Add your site
     3. Go to **Sitemaps**
     4. Submit: `https://www.sprecycling.in/sitemap.xml`

## 🔧 Troubleshooting

### Build Fails:
- Check build logs in Vercel dashboard
- Verify all environment variables are set
- Check for TypeScript errors: `npm run build` locally

### MongoDB Connection Issues:
- Verify `MONGODB_URI` is correct in Vercel
- Check MongoDB Atlas Network Access settings
- Verify database user has correct permissions

### Email Not Sending:
- Verify `BREVO_API_KEY` is set correctly
- Check Brevo dashboard for API usage limits
- Verify sender email is verified in Brevo
- Check Vercel function logs for errors

### Sitemap Not Loading:
- Verify `sitemap.ts` is in the `app` directory
- Check build logs for sitemap generation errors
- Verify MongoDB connection for blog posts

## 📝 Important Notes

1. **Environment Variables**: Never commit `.env.local` to Git. Always add environment variables through Vercel dashboard.

2. **MongoDB**: Make sure your MongoDB Atlas cluster is running and accessible from the internet.

3. **Build Time**: The sitemap is generated at build time. If you add new blog posts, you may need to trigger a new deployment or wait for the next build.

4. **API Routes**: All API routes are serverless functions in Vercel. Make sure they have proper error handling.

5. **Static Generation**: Some pages use static generation. If you need dynamic content, ensure proper ISR (Incremental Static Regeneration) configuration.

## 🎉 You're Ready!

Once you've completed all the steps above, your site should be live and fully functional on Vercel!





