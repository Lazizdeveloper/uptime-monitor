# Contributing to Uptime Monitor

To add a new endpoint to monitor:
1. Edit `sites.json` and add an object:
   ```json
   {
     "name": "Service Name",
     "url": "https://api.example.com/health"
   }
   ```
2. Commit your changes and submit a Pull Request.
