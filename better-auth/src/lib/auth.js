import { betterAuth} from 'better-auth';
import dotenv from 'dotenv';
dotenv.config();

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true
    },
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        }
    },
    debug:true,
});