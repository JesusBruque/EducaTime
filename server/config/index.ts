import dotenv from 'dotenv';

const envFound = dotenv.config();
if (!envFound) {
    // This error should crash whole process
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
    //URL DE ACCESSO A MONGODB
    ATLAS_URI: process.env.ATLAS_URI,
    //
    secret: process.env.secret,

    //
    password_secret: process.env.password_secret,
    //
    SESS_NAME: process.env.SESS_NAME,
    //
    SESS_SECRET: process.env.SESS_SECRET,
    //
    SESS_LIFETIME: process.env.SESS_LIFETIME,
    //
    CLIENT_URL: process.env.CLIENT_URL,
    URL: process.env.URL,

    port: 3000,
    api: {
        prefix: '/api'
    },
    upload_dir: process.env.upload_dir,
    mode: process.env.mode,
    email_user:process.env.EMAIL_USER,
    email_pass:process.env.EMAIL_PASSWORD,
    email_host:process.env.EMAIL_HOST,

    iam_id_key:process.env.AMAZON_KEY_ID,
    iam_secret_key:process.env.AMAZON_SECRET_ID,
    cdn_url:process.env.AMAZON_CLOUDFRONT_URL,

    amazon_pair_id:process.env.AMAZON_KEY_PAR_ID,
    amazon_private_key:process.env.AMAZON_PRIVATE_KEY,
    amazon_public_key:process.env.AMAZON_PUBLIC_KEY
}
