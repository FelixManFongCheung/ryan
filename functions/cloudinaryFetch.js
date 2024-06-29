const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const about = process.env.ABOUT;
const instagram = process.env.INSTAGRAM;
const email = process.env.EMAIL;

exports.handler = async function(event, context) {
  const url = new URL(event.headers.referer);
  const segments = url.pathname.split('/');
  const urlSegment = segments.pop().toLowerCase();

  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'ryan',
      context: true,
      metadata: true
    });

    let data;

    if (urlSegment == 'works') {
      data = result.resources.map(resource => ({
        public_id: resource.public_id,
        title: resource.context && resource.context.custom && resource.context.custom.alt,
        description: resource.context && resource.context.custom && resource.context.custom.caption,
      }));
    } else if (urlSegment == 'about') {
      data = await cloudinary.api.metadata_field_by_field_id(about);
    } else if (urlSegment == 'contact') {
      const [insta, mail] = await Promise.all([
        cloudinary.api.metadata_field_by_field_id(instagram),
        cloudinary.api.metadata_field_by_field_id(email),
      ]);
      data = {
        instagram: insta,
        email: mail
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch images' }),
    };
  }  
}

