import fs from 'fs';
import path from 'path';

const loadImageAsBase64 = async (imagePath: string): Promise<string> => {
    try {
        // Remove leading slash if present
        const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
        
        // Construct the absolute path to the image in the public directory
        const absolutePath = path.join(process.cwd(), 'public', cleanPath);
        
        // Read the file
        const imageBuffer = await fs.promises.readFile(absolutePath);
        
        // Convert to base64
        const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`;
        
        return base64Image;
    } catch (error) {
        console.error('Error loading image:', error);
        throw error;
    }
};

export default loadImageAsBase64;
