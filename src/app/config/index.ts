import * as dotenv from 'dotenv'
dotenv.config()

export default{
    DATABASE_URL:process.env.DATABASE_URL,
    PORT:process.env.PORT,
    ACCESS_TOKEN:process.env.ACCESS_TOKEN,
    ACCESS_TOKEN_EXPIRE:process.env.ACCESS_TOKEN_EXPIRE,
    REFRESH_TOKEN:process.env.REFRESH_TOKEN,
    REFRESH_TOKEN_EXPIRE:process.env.REFRESH_TOKEN_EXPIRE,
    JWT_TOKEN:process.env.JWT_TOKEN,
    NODE_ENV:process.env.NODE_ENV,
    SALT:process.env.SALT,
    CLOUADNAME:process.env.CLOUDNAME,
    CLOUADAPI:process.env.CLOUADAPI,
    CLOUADSECRET:process.env.CLOUADSECRET,
    EXCHANGEAPI:process.env.EXCHANGEAPI,
    SECRETKEY:process.env.SECRETKEY
}