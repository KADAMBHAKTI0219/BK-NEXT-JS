// config/plugins.js

module.exports = ({ env }) => ({
    'users-permissions': {
      config: {
        providers: {
          github: {
            uid: 'github',
            displayName: 'GitHub',
            icon: 'github',
            createUserIfNotExists: true,
            redirectUri: env('GITHUB_CALLBACK_URL'),
            auth: {
              scope: ['user:email'],
            },
            clientId: env('GITHUB_CLIENT_ID'),
            clientSecret: env('GITHUB_CLIENT_SECRET'),
            frontendRedirectUri: 'http://localhost:3000/connect/github/redirect',
          },
          google: {
            uid: 'google',
            displayName: 'Google',
            icon: 'google',
            createUserIfNotExists: true,
            redirectUri: env('GOOGLE_CALLBACK_URL'),
            clientId: env('GOOGLE_CLIENT_ID'),
            clientSecret: env('GOOGLE_CLIENT_SECRET'),
            frontendRedirectUri: 'http://localhost:3000/connect/google/redirect',
            auth: {
              scope: ['email', 'profile'],
            },
          },
        },
      },
    },
  });
  