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

    if (urlSegment == 'works' || urlSegment == 'curatorialprojects' || urlSegment == 'editions') {
      const { folders: subfolders } = await cloudinary.api.sub_folders(`${urlSegment}`);

      data = {};

      await Promise.all(
        subfolders.map(async (folder) => {

          const { resources: images } = await cloudinary.search
            .expression(`folder=${folder.path}`)
            .execute();

          const description = await cloudinary.api.resource(images[0].public_id);

          function quickSort(arr, direction = 'ascending') {
            if (arr.length <= 1) {
                return arr;
            }
        
            function getNumber(item) {
                const parts = item.public_id.split('/');
                const imageID = Number(parts[parts.length - 1]);
                return imageID;
            }
            
            const pivotIndex = Math.floor(arr.length / 2);
            const pivotID = getNumber(arr[pivotIndex]);
            const left = [];
            const right = [];
            
            for (let i = 0; i < arr.length; i++) {
                if (i === pivotIndex) continue; // Skip the pivot element
                const iterationID = getNumber(arr[i]);
                if ((direction === 'ascending' && iterationID < pivotID) || 
                    (direction === 'descending' && iterationID > pivotID)) {
                    left.push(arr[i]);
                } else {
                    right.push(arr[i]);
                }
            }
            
            return [
                ...quickSort(left, direction), 
                arr[pivotIndex], 
                ...quickSort(right, direction)
            ];
          }
        

          const orderedImages = quickSort(images);

          let folderName = folder.name.replace(/_/g, ' ');
          data[folderName] = {
            description: description?.context?.custom,
            images: orderedImages.map((image) => ({
              url: image.secure_url
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

