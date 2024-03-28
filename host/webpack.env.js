const dotenv = require('dotenv');
dotenv.config();

console.log("APP_LOCAL",process.env.APP_LOCAL);

export const env = {
    isLocal: process.env.APP_ENV === 'local',
    isProd: process.env.APP_ENV === 'prod'
}