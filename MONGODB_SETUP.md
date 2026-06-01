# MongoDB Integration Setup Guide

## Prerequisites

1. MongoDB Account (https://www.mongodb.com/)
2. Node.js and npm installed
3. Access to project environment variables

## Local dev: blogs not loading (`ReplicaSetNoPrimary` / IP whitelist)

If `/api/blog` returns **500** and the terminal shows `Could not connect to any servers` or `ReplicaSetNoPrimary`:

1. Open [MongoDB Atlas → Network Access](https://cloud.mongodb.com/v2#/security/network/accessList)
2. Click **Add IP Address** → **Add Current IP Address** (or `0.0.0.0/0` **only** for temporary local testing)
3. Wait 1–2 minutes for Atlas to apply the rule
4. Restart `npm run dev`

Your home IP changes when you switch networks (Wi‑Fi, mobile hotspot) — add the new IP again if blogs stop loading.

Optional in `.env` (Windows SSL issues only, same as Brevo):

```env
MONGODB_TLS_SKIP_VERIFY=true
```

## Setup Steps

### 1. Create MongoDB Database

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up or log in
3. Create a new cluster (free tier available)
4. Set up a database user with username and password
5. Get your connection string

### 2. Configure Environment Variables

Create or update `.env.local` file in your project root:

```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sprecycling?retryWrites=true&w=majority

# Brevo Email Configuration
BREVO_API_KEY=your_brevo_api_key
OWNER_EMAIL=siliconplanetrecycling@gmail.com
FROM_EMAIL=noreply@sprecycling.com
FROM_NAME=S P Recycling

# Admin Configuration
ADMIN_EMAILS=admin@sprecycling.com,owner@sprecycling.com

# Google Tag Manager
GTM_ID=GTM-WHV8BTC3

# Google Ads
GOOGLE_ADS_ID=AW-17277789168
```

**Important**: Replace the values with your actual credentials:
- `MONGODB_URI`: Your MongoDB connection string
- `BREVO_API_KEY`: Your Brevo API key
- `ADMIN_EMAILS`: Comma-separated admin emails

### 3. Database Schema

The Blog model includes:
- **title**: Blog post title (required, max 200 chars)
- **content**: HTML content (required)
- **excerpt**: Short description (auto-generated from content, max 500 chars)
- **tags**: Array of tags
- **status**: 'published' or 'draft'
- **featuredImage**: Base64 or URL
- **slug**: Auto-generated from title (unique)
- **createdAt**: Timestamp
- **updatedAt**: Timestamp

### 4. API Endpoints

**List all blogs:**
- `GET /api/blog?status=published`
- `GET /api/blog?status=draft`
- `GET /api/blog?search=keyword`

**Create blog:**
- `POST /api/blog`
- Body: `{ title, content, tags, featuredImage, status }`

**Get by ID:**
- `GET /api/blog/[id]`

**Get by slug:**
- `GET /api/blog/slug/[slug]`

**Update blog:**
- `PUT /api/blog/[id]`
- Body: `{ title, content, tags, featuredImage, status }`

**Delete blog:**
- `DELETE /api/blog/[id]`

### 5. How to Use

1. **Create Blog:**
   - Go to `/admin/blog/create`
   - Fill in title, content, tags, and featured image
   - Toggle between Draft and Published
   - Click "Publish Post" or "Save as Draft"

2. **View Blogs:**
   - Public: `/blog` (shows only published posts)
   - Admin: `/admin/blog` (shows all posts with controls)

3. **Edit Blog:**
   - Go to `/admin/blog`
   - Click "Edit" on any post
   - Or direct link: `/admin/blog/create?id={blogId}`

4. **View Full Post:**
   - `/blog/{slug}`

### 6. Testing

To test the setup:

```bash
# Create a blog
curl -X POST http://localhost:3000/api/blog \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Post",
    "content": "<p>Test content</p>",
    "tags": ["test"],
    "status": "published"
  }'

# List all blogs
curl http://localhost:3000/api/blog?status=published

# Get by slug
curl http://localhost:3000/api/blog/slug/test-post
```

### 7. Important Notes

- **Auto-generated fields**: slug and excerpt are automatically generated
- **Image storage**: Images are stored as base64 in MongoDB (for production, use cloud storage)
- **Published posts**: Only 'published' status posts appear on public blog page
- **Draft posts**: Only visible in admin panel

## Troubleshooting

**MongoDB connection error:**
- Check MONGODB_URI is correct
- Ensure IP address is whitelisted in MongoDB Atlas
- Verify username and password

**Slug conflicts:**
- Slug is unique - duplicates will cause save errors
- Slug is auto-generated from title, ensure titles are unique

**Missing environment variables:**
- Check .env.local file exists
- Verify all required variables are set
- Restart the development server after changes

## Database Backup

Regular backups recommended:
1. MongoDB Atlas has automatic daily backups (paid plans)
2. Use MongoDB command line tools for manual backups
3. Export data regularly for safety

