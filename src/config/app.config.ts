import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  // API PORT
  port: parseInt(process.env.PORT, 10) || 3000,

  // API URL
  url: process.env.APP_URL || 'localhost',

  // API Environment: local | production | staging
  env: process.env.APP_ENV || 'local',

  // API debug mode is enable or not: true | false
  debugMode: process.env.APP_DEBUG === 'false' ? false : true,

  // API support email address
  supportEmail: process.env.SUPPORT_EMAIL || 'support@localhost',

  // Server file upload destination
  fileDestination: process.env.UPLOADED_FILES_DESTINATION || './uploadedFiles',
}));
