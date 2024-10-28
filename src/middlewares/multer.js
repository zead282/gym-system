

import multer from "multer";
import { extentions } from "../utils/allowextentions.js";
import generateUniqueString from "../utils/generate-unique-str.js";


export const multermiddlehost=({extention=extentions.image})=>{

    const storage=multer.diskStorage({
        filename:(req,file,cb)=>{
            const uniquename=generateUniqueString(5) + '_' + file.originalname
            cb(null,uniquename)
        }
    })

    const fileFilter=(req,file,cb)=>{

        if(extention.includes(file.mimetype.split('/')[1]))
        {
            return cb(null,true)
        }
        cb(new Error('Image format is not allowed!'), false)
    }

    const file=multer({fileFilter,storage})

    return file

}

