import {postFile} from './CRUD.mjs';

export async function sendImage(folder, file) {


    const url = 'https://api.cloudinary.com/v1_1/dtyyuvvll/image/upload';
    const formData = new FormData();
    formData.set('file', file.file);
    formData.set('name', file.fileName);
    formData.set('folder', folder);
    formData.set('upload_preset', 'xn8teimk');

    return postFile(url, formData);
}