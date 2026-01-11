import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directoryPath = path.join(__dirname, '../src/assets/img');

fs.readdir(directoryPath, (err, files) => {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }

    files.forEach((file) => {
        const filePath = path.join(directoryPath, file);
        const ext = path.extname(file).toLowerCase();

        if (['.jpg', '.jpeg', '.png'].includes(ext)) {
            const outputPath = path.join(directoryPath, path.basename(file, ext) + '.webp');

            sharp(filePath)
                .webp({ quality: 80 })
                .toFile(outputPath)
                .then(() => {
                    console.log(`Converted ${file} to WebP`);
                })
                .catch(err => {
                    console.error(`Error converting ${file}:`, err);
                });
        }
    });
});
