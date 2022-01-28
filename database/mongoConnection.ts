import mongoose from 'mongoose';
import { config } from '../config/constants';

export class MongoConnection {
    public async connect(): Promise<void> {
        try {
            await mongoose.connect(config.MONGO_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });
            console.log('Database Connected');
        }catch (err) {
            console.error(err);
            process.exit(1);
        }
    }
}