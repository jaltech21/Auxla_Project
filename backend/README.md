# OCSLAA Email Backend

Simple Express.js backend for sending emails via Resend API.

## Setup

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Configure environment:**
   - Copy `.env` file
   - Update `RESEND_API_KEY` if needed
   - Update `FRONTEND_URL` to your frontend URL

3. **Start server:**
   ```bash
   npm start
   ```

   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

## API Endpoints

### Health Check
```
GET /health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2025-12-12T10:30:00.000Z",
  "service": "OCSLAA Email API"
}
```

### Send Email
```
POST /api/send-email
```

Request body:
```json
{
  "to": "user@example.com",
  "from": "OCSLAA <onboarding@resend.dev>",
  "subject": "Test Email",
  "html": "<h1>Hello!</h1>",
  "replyTo": "info@ocslaa.org",
  "tags": [
    { "name": "type", "value": "user-confirmation" }
  ]
}
```

Response:
```json
{
  "success": true,
  "messageId": "abc123-def456-ghi789"
}
```

## Testing

Test the API with curl:

```bash
curl -X POST http://localhost:3000/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "to": "your-email@example.com",
    "from": "OCSLAA <onboarding@resend.dev>",
    "subject": "Test Email from Backend",
    "html": "<h1>It works!</h1><p>Backend is sending emails!</p>"
  }'
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `RESEND_API_KEY` | Your Resend API key | Required |
| `FRONTEND_URL` | Frontend URL for CORS | `*` |
| `PORT` | Server port | `3000` |

## Deployment

### Option 1: Railway (Recommended)

1. Go to https://railway.app
2. Create new project → Deploy from GitHub
3. Select backend folder
4. Add environment variables
5. Deploy!

### Option 2: Render

1. Go to https://render.com
2. New Web Service
3. Connect repository
4. Root directory: `backend`
5. Build command: `npm install`
6. Start command: `npm start`
7. Add environment variables
8. Deploy!

### Option 3: Fly.io

```bash
fly launch
fly secrets set RESEND_API_KEY=your_key
fly deploy
```

## Security

- ✅ API key stored in environment variables (not in code)
- ✅ CORS configured for your frontend only
- ✅ Input validation on all requests
- ✅ Error handling without exposing sensitive data

## Logs

The server logs all email sending attempts:

```
📧 Sending email to: user@example.com
   Subject: Thank You for Contacting OCSLAA
✅ Email sent successfully. ID: abc123
```

## Troubleshooting

**Port already in use:**
```bash
# Change PORT in .env to different number (e.g., 3001)
PORT=3001
```

**CORS errors:**
- Update `FRONTEND_URL` in `.env` to match your frontend URL
- Restart the server after changes

**Emails not sending:**
- Check `RESEND_API_KEY` is correct
- Check Resend dashboard for API status
- Check server logs for error messages
