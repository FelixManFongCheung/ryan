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
    });

    console.log(result);

    return {
      statusCode: 200,
      body: JSON.stringify(result.resources),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch images' }),
    };
  }  
}

