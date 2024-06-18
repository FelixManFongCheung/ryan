const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.REACT_APP_CLOUDINARY_NAME,
  api_key: process.env.REACT_APP_CLOUDINARY_KEY,
  api_secret: process.env.REACT_APP_CLOUDINARY_SECRET,
});

console.log('local');

exports.handler = async function(event, context) {
  try {
    const result = await cloudinary.search
      .expression('tags=ryan')
      .execute();

    const optimizedImages = result.resources.map(image => ({
      ...image,
      secure_url: cloudinary.url(image.public_id, {
        transformation: [
          // { fetch_format: 'auto' }, // Automatically selects the best format
          { quality: 'auto:best' }, // Automatically adjusts quality
          { width: 300, crop: 'scale' }, // Example resizing
          { dpr: 'auto' }
        ]
      })
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(optimizedImages),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch images' }),
    };
  }  
}
// export default async (req, context) => {
//     return new Response("Hello, world!");
// }