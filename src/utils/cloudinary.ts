import { v2 as cloudinary } from "cloudinary";

export default cloudinary.config({
    secure:true,
});

console.log(cloudinary.config);