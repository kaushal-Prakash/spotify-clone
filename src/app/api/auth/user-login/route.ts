// src/app/api/upload/song/route.ts

import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';

// Disable the default body parser to handle multipart form data
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    return;
  }

  try {
    // Parse the incoming form data
    const data = await new Promise<{ fields: formidable.Fields; files: formidable.Files }>(
      (resolve, reject) => {
        const form = formidable({ multiples: true, uploadDir: './public/uploads', keepExtensions: true });

        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          else resolve({ fields, files });
        });
      }
    );

    // Log the received fields and files
    console.log('Fields:', data.fields);
    console.log('Files:', data.files);

    // TODO: Process the fields and files (e.g., save to database, move files, etc.)

    res.status(200).json({ message: 'Upload successful!' });
  } catch (error) {
    console.error('Error processing upload:', error);
    res.status(500).json({ message: 'Error processing upload' });
  }
}
