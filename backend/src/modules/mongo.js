import mongoose from 'mongoose';
import config from 'src/config';

export const connectMongo = () => {
    mongoose.Promise = Promise;

    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    mongoose.connect(config.mongoUri, options)
        .then(() => console.log('MongoDB has been connected'))
        .catch((err) => console.log('Error on MongoDB', err));
};
