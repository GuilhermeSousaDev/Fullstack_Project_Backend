import fs from 'fs';
import { promisify } from 'util';
import * as filestack from 'filestack-js';

export default class FilestackStorageProvider {
    private client: filestack.Client;

    constructor() {
        this.client = filestack.init(process.env.APP_FILESTACK_API_KEY);
    }

    public async save(filePath: string, filename: string): Promise<any> {
        const readFileAsync = promisify(fs.readFile);
        const unlinkAsync = promisify(fs.unlink);

        const fileContent = await readFileAsync(filePath);

        if (fileContent) {
            const picker = await this.client.upload(fileContent, {}, { filename });

            await unlinkAsync(filePath);

            return picker;
        }
    }

    public async delete(fileUrl: string): Promise<any> {
        return await this.client.removeMetadata(fileUrl, { 
            policy: '',
            signature: '',
        });
    }
}