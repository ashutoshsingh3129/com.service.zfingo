export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
      uri:
        process.env.DB_URI ||
          'mongodb://127.0.0.1:27017/zfingo'
      },
    auth: {
      tokenExpiry: process.env.TOKEN_EXPIRY || '18h',
    },
    piiVault: process.env.PII_VAULT || "http://10.10.2.97:3200",
    notificationExpiryInDays:3,
    frontendUrl:"http"
  });
  