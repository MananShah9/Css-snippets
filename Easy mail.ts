import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';

interface EmailData {
  to: string;
  subject: string;
  body: string;
}

interface ServiceConfig {
  serviceName: string;
  users: string[];
}

interface AppConfig {
  services: ServiceConfig[];
}

const app = express();
const PORT = 3000;

app.set('view engine', 'pug');
app.set('views', './src/views');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  const appConfig: AppConfig = require('./config.json');
  res.render('index', { services: appConfig.services });
});

app.post('/save-config', (req, res) => {
  const { serviceName, users } = req.body;

  const appConfig: AppConfig = require('./config.json');
  const newService: ServiceConfig = {
    serviceName,
    users: users.split(',').map((user: string) => user.trim()),
  };

  appConfig.services.push(newService);

  fs.writeFileSync('./src/config.json', JSON.stringify(appConfig, null, 2));

  res.redirect('/');
});

async function sendEmail(serviceName: string, subject: string, body: string): Promise<void> {
  try {
    // Fetch service configuration from a JSON file
    const appConfig: AppConfig = require('./config.json');

    // Find the service configuration by name
    const serviceConfig = appConfig.services.find((service) => service.serviceName === serviceName);

    if (!serviceConfig) {
      throw new Error(`Service with name '${serviceName}' not found.`);
    }

    // Iterate over users and send emails
    for (const user of serviceConfig.users) {
      const emailData: EmailData = {
        to: user,
        subject,
        body,
      };

      // Make a request to API 'A' to send the email
      await sendEmailToApiA(emailData);
    }

    console.log(`Emails sent to users of service '${serviceName}'.`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
