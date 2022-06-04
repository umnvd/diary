import { Buffer } from 'buffer';

export function dataUrlToFile(dataUrl: string, filename: string): File {
    const [mime, data] = dataUrl.split(',');
    const mimeType = mime.split(':')[1].split(';')[0];
    const buff = Buffer.from(data, 'base64');
    return new File([buff], filename, { type: mimeType });
}