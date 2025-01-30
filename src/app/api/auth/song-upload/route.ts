import type { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm } from 'formidable';

export const config = {
  api: {
    bodyParser: false, // Disabling Next.js default body parser
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const form = new IncomingForm({
    maxFileSize: Infinity, // Removes the 1MB limit
    keepExtensions: true, // Keeps file extensions
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    console.log('Fields:', fields);
    console.log('Files:', files);

    res.status(200).json({ message: 'Upload successful!', files });
  });
};

export default handler;
