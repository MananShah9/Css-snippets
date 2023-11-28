To achieve this, you can use Qlik Sense Proxy Service (QPS) to configure virtual proxies for the additional domain (pqr.com) and redirect traffic to the service running on port 9000. Follow these general steps:

1. **Open Qlik Management Console (QMC):** Access the QMC interface.

2. **Navigate to Proxies:**
   - Go to "Proxies" in the QMC.
   - Click on "Advanced" to access more settings.

3. **Create a Virtual Proxy:**
   - Create a new virtual proxy for the additional domain (pqr.com).
   - Set the "Prefix" to the appropriate path you want for your service.

4. **Configure Load Balancing:**
   - Under the virtual proxy settings, configure load balancing rules to redirect traffic.
   - Set the "Internal Virtual Proxy" to the virtual proxy created for abc.com.
   - Set the "Internal Path" to the service running on port 9000.

5. **Update DNS and Network Settings:**
   - Make sure that the DNS for pqr.com is configured to point to the Qlik Sense server.
   - Adjust network settings to allow traffic on the desired port (9000).

6. **Test:**
   - Test accessing the service via pqr.com to ensure that traffic is redirected to the service running on port 9000.

Remember, this is a high-level overview, and you may need to refer to Qlik Sense documentation for more specific details based on your version and configuration.
