# n8n Automation Platform - Setup Guide

## 🎉 n8n is now running on your Hetzner server!

### Access Details

- **URL**: http://65.108.50.43:5678
- **Status**: ✅ Running

### First Time Setup

When you visit the URL for the first time, n8n will ask you to create an **owner account**. This is your admin account.

1. Open your browser and go to: http://65.108.50.43:5678
2. You'll see a setup screen asking for:
   - **Email** (your email address)
   - **Password** (choose a strong password)
   - **First Name** and **Last Name**
3. Click "Get Started" to create your account

> [!IMPORTANT]
> **Save these credentials immediately!** There is no default username/password - you create them on first access.

### What is n8n?

n8n is a powerful workflow automation tool that lets you connect different services and automate tasks. Perfect for:
- pSEO automation
- Webhook handling
- API integrations
- Data transformation
- Scheduled tasks

### Container Details

- **Docker Image**: `n8nio/n8n:latest`
- **Container Name**: `n8n`
- **Port**: 5678
- **Data Volume**: `n8n_data` (persistent storage)
- **Timezone**: Asia/Kolkata
- **Restart Policy**: unless-stopped
- **Secure Cookie**: Disabled (N8N_SECURE_COOKIE=false) to allow HTTP access

### Managing the Container

Check if n8n is running:
```bash
ssh -i "C:\Users\suhas\.ssh\hetzner_key" root@65.108.50.43 "docker ps | grep n8n"
```

View logs:
```bash
ssh -i "C:\Users\suhas\.ssh\hetzner_key" root@65.108.50.43 "docker logs n8n"
```

Restart n8n:
```bash
ssh -i "C:\Users\suhas\.ssh\hetzner_key" root@65.108.50.43 "docker restart n8n"
```

Stop n8n:
```bash
ssh -i "C:\Users\suhas\.ssh\hetzner_key" root@65.108.50.43 "docker stop n8n"
```

Start n8n:
```bash
ssh -i "C:\Users\suhas\.ssh\hetzner_key" root@65.108.50.43 "docker start n8n"
```

### Next Steps

1. **Create your account** at http://65.108.50.43:5678
2. **Save your credentials** securely
3. **Explore the interface** - n8n has a visual workflow builder
4. **Create your first workflow** for Courier-AI pSEO automation

### Security Recommendations

> [!WARNING]
> The current setup uses HTTP without SSL. For production use, consider:
> - Setting up a reverse proxy (nginx) with SSL/TLS
> - Using Coolify to manage n8n with automatic HTTPS
> - Restricting access via firewall rules

### Troubleshooting

If you can't access n8n:
1. Check if the container is running (see commands above)
2. Verify port 5678 is not blocked by firewall
3. Check container logs for errors

### Data Persistence

Your n8n workflows and credentials are stored in the `n8n_data` Docker volume, which persists even if you restart or remove the container.

To backup your data:
```bash
ssh -i "C:\Users\suhas\.ssh\hetzner_key" root@65.108.50.43 "docker run --rm -v n8n_data:/data -v /root/backups:/backup alpine tar czf /backup/n8n_backup_$(date +%Y%m%d).tar.gz -C /data ."
```
