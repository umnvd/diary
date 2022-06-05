import { Buffer } from 'buffer';

export function dataUrlToFile(
    dataUrl: string,
    filename: string
): File {
    const [mime, data] = dataUrl.split(',');
    const mimeType = mime.split(':')[1].split(';')[0];
    const buff = Buffer.from(data, 'base64');
    return new File([buff], filename, { type: mimeType });
}

export function readFileDataUrl(
    file: File | null | undefined,
    onResult: (url: string) => void
) {
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            if (typeof (reader.result) === 'string')
                onResult(reader.result);
        }
        reader.readAsDataURL(file);
    }
}

export type FileSchema = {file: File, type: string, name: string}
export function fileSchema(file: File): FileSchema {
    return {
        file: file,
        type: file.type,
        name: file.name
    }
}

export function getUrl(image: string) {
    return 'http://localhost:3010/images/' + image;
}