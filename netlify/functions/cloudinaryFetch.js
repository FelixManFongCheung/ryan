const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.REACT_APP_CLOUDINARY_NAME,
  api_key: process.env.REACT_APP_CLOUDINARY_KEY,
  api_secret: process.env.REACT_APP_CLOUDINARY_SECRET,
});

exports.handler = async function(event, context) {
  return new Response("Hello, world!");
}
// export default async (req, context) => {
//     return new Response("Hello, world!");
//     // try {
//     //     const result = await cloudinary.search
//     //       .expression('tags=ryan')
//     //       .execute();
    
//     //     return {
//     //       statusCode: 200,
//     //       body: JSON.stringify(result.resources),
//     //     };
//     //   } catch (error) {
//     //     return {
//     //       statusCode: 500,
//     //       body: JSON.stringify({ error: 'Failed to fetch images' }),
//     //     };
//     //   }  
// }