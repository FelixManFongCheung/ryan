const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});

const about = process.env.ABOUT;
const instagram = process.env.INSTAGRAM;
const email = process.env.EMAIL;

exports.handler = async function(event, context) {
  const url = new URL(event.headers.referer);
  const segments = url.pathname.split('/');
  const urlSegment = segments.pop().toLowerCase();

  try {
    let data;

    if (urlSegment == 'works' || urlSegment == 'curatorialprojects') {
      const { folders: subfolders } = await cloudinary.api.sub_folders(`${urlSegment}`);

      data = {};

      await Promise.all(
        subfolders.map(async (folder) => {

          console.log('testingggggg');

          const { resources: images } = await cloudinary.search
            .expression(`folder=${folder.path}`)
            .execute();

          const description = await cloudinary.api.resource(images[0].public_id);

          let folderName = folder.name.replace(/_/g, ' ');
          data[folderName] = {
            description: description?.context?.custom,
            images: images.map((image) => ({
              public_id: image.public_id,
            })),
          };
        })
      );
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

