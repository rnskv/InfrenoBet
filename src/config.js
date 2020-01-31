export default {
    port: process.env.SERVER_PORT || 8080,
    host: process.env.SERVER_HOST || '127.0.0.1',
    mongoUri: process.env.MONGO_URI || '',
    jwtSecret: process.env.JWT_SECRET,
}