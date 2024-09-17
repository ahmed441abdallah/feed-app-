'use server'
import { uploadImage } from '@/lib/cloudinary';
import { storePost } from '@/lib/posts';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
export async function createPost(prevState, formData) {
    const title = formData.get('title');
    const image = formData.get('image');
    const content = formData.get('content');
    // validate the form
    let errors = [];
    if (!title || title.trim().length === 0) {
        errors.push('Title is required');
    }
    if (!content || content.trim().length === 0) {
        errors.push('Content is required');
    }
    if (!image || image.size === 0) {
        errors.push('Image is required');
    }
    if (errors.length > 0) {
        return { errors };   // return errors 
    }
    let imageUrl;
    try {
        imageUrl = await uploadImage(image);
    }
    catch (error) {
        throw new Error('Error creating post image');
    }
    // create the post in database
    await storePost({ title, imageUrl: imageUrl, content, userId: 1 });
    revalidatePath('/', 'layout')
    redirect('/feed')
}