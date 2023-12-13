Yes, you can achieve this without changing the port number visible in the URL by using a reverse proxy. Here's a simplified guide:

1. **Install a Reverse Proxy:**
   Install a reverse proxy server on your Windows server. A popular choice is Nginx, but you can also use tools like Apache or even built-in solutions like IIS (Internet Information Services) with URL Rewrite.

2. **Configure Reverse Proxy:**
   Set up the reverse proxy to forward requests from port 80 to your Node.js application running on port 3456. Here's an example Nginx configuration:

   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://127.0.0.1:3456;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   Update the `server_name` directive with your actual domain.

3. **Update DNS Records:**
   Ensure that your domain's 'A' record still points to the public IP address of your Windows server.

4. **Restart Reverse Proxy:**
   Restart your reverse proxy server to apply the configuration changes.

5. **Test:**
   Verify that you can access your Node.js website using your domain name without specifying the port (e.g., http://yourdomain.com).

By using a reverse proxy, you can keep your Node.js application running on port 3456 internally while allowing external users to access it on the standard HTTP port 80.
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:3456;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

Certainly! To add a Year-to-Date (YTD) column to your CSV file based on the existing columns of company name, month, and value, you can use the pandas library. Here's a simple Python code snippet to accomplish this:

```python
import pandas as pd

# Read the CSV file into a pandas DataFrame
df = pd.read_csv('your_file.csv')

# Convert the 'month' column to datetime format
df['month'] = pd.to_datetime(df['month'], format='%b-%y')

# Sort the DataFrame by 'company name' and 'month'
df.sort_values(by=['company name', 'month'], inplace=True)

# Add a new column 'YTD' with the Year-to-Date values
df['YTD'] = df.groupby('company name')['value'].cumsum()

# Save the updated DataFrame back to a CSV file
df.to_csv('your_updated_file.csv', index=False)
```

Make sure to replace `'your_file.csv'` with the actual filename you have, and this code will create a new CSV file (`'your_updated_file.csv'`) with an additional 'YTD' column containing the Year-to-Date values.
