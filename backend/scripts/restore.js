import 'dotenv/config';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const restoreData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { family: 4 });
        const collections = ['products', 'users', 'orders'];
        const backupDir = path.join(__dirname, 'backup');

        for (const colName of collections) {
            const filePath = path.join(backupDir, `${colName}.json`);
            if (fs.existsSync(filePath)) {
                const raw = fs.readFileSync(filePath, 'utf-8');
                const data = JSON.parse(raw);
                if (data.length > 0) {
                    // Optional: remove existing data or upsert
                    for (const doc of data) {
                        const { _id, ...rest } = doc;
                        await mongoose.connection.db.collection(colName).updateOne(
                            { _id: new mongoose.Types.ObjectId(_id) },
                            { $set: rest },
                            { upsert: true }
                        );
                    }
                    console.log(`Restored ${data.length} documents into "${colName}"`);
                }
            }
        }
        console.log('Restore complete!');
    } catch (error) {
        console.error('Restore failed:', error.message);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
};

restoreData();
