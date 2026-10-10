import 'dotenv/config';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const backupData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { family: 4 });
        const collections = ['products', 'users', 'orders'];
        const backupDir = path.join(__dirname, 'backup');

        if (!fs.existsSync(backupDir)) {
            fs.mkdirSync(backupDir);
        }

        for (const colName of collections) {
            const data = await mongoose.connection.db.collection(colName).find({}).toArray();
            const filePath = path.join(backupDir, `${colName}.json`);
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
            console.log(`Backed up ${data.length} documents from "${colName}" to backup/${colName}.json`);
        }
        console.log('Backup complete!');
    } catch (error) {
        console.error('Backup failed:', error.message);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
};

backupData();
