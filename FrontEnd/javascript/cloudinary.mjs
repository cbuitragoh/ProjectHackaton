import {postFile} from './CRUD.mjs';
import config from '../resources/config.json';

export async function sendImage(folder, file) {


    const url = `https://api.cloudinary.com/v1_1/${config.cloudinary.cloud}/image/upload`;
    const formData = new FormData();
    formData.set('file', file.file);
    formData.set('name', file.fileName);
    formData.set('folder', folder);
    formData.set('upload_preset', config.cloudinary.upload);

    return postFile(url, formData);
}