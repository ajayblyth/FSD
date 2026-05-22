const cloudinary = require("cloudinary").v2;

const { CloudinaryStorage } = require("multer-storage-cloudinary");


const missingCloudinaryVars = [

    "CLOUD_NAME",
    "CLOUD_API_KEY",
    "CLOUD_API_SECRET"

].filter((key) => !process.env[key]);


if (missingCloudinaryVars.length) {

    throw new Error(
        `Missing Cloudinary environment variables: ${missingCloudinaryVars.join(", ")}`
    );

}


cloudinary.config({

    cloud_name: process.env.CLOUD_NAME,

    api_key: process.env.CLOUD_API_KEY,

    api_secret: process.env.CLOUD_API_SECRET,

});


const storage = new CloudinaryStorage({

    cloudinary: cloudinary,

    params: {

        folder: "airbnbclone",

        allowed_formats: ["png", "jpg", "jpeg"],

    },

});


module.exports = {

    cloudinary,

    storage,

};