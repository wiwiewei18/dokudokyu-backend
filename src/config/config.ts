// NOTE: make the secret required
export default () => ({
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
  postgres: {
    url: process.env.POSTGRES_URL,
  },
  cors: {
    origins: process.env.CORS_ORIGINS?.split(',') || [],
    credentials: process.env.CORS_CREDENTIALS,
  },
});
