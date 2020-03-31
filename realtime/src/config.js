export default {
    client_host: process.env.CLIENT_HOST,
    client_port: process.env.CLIENT_PORT,
    realtime_host: process.env.REALTIME_HOST,
    realtime_port: process.env.REALTIME_PORT,
    server_port: process.env.SERVER_PORT || 8080,
    server_host: process.env.SERVER_HOST || '127.0.0.1',
    mongoUri: process.env.MONGO_URI || '',
    redisHost: process.env.REDIS_HOST || '0.0.0.0',
    redisPort: process.env.REDIS_PORT || '6379',
    jwtSecret: process.env.JWT_SECRET,
    rouletteGameTime: Number(process.env.ROULETTE_GAME_TIME)
};
