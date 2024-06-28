const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

exports.handler = async function(event, context) {
  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'ryan',
      context: true,
      metadata: true
    });

    const images = result.resources.map(resource => ({
      public_id: resource.public_id,
      title: resource.context && resource.context.custom && resource.context.custom.alt,
      description: resource.context && resource.context.custom && resource.context.custom.caption,
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(images),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch images' }),
    };
  }  
}

