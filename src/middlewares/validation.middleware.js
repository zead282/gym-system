
const keys=["body","headers","params","query"]

export const validation=(schema)=>{
    return (req,res,next)=>{
         
        let validationerrors=[]

        for(const key in keys){
            console.log("key:",key);
            console.log("schema[key]:",schema[key]);
            
           const result=schema[key]?.validate(req[key],{abortEarly:false})
           if(result?.error){
            validationerrors.push(...result.error.details)
           }
        }
        if(validationerrors?.length){
            return res.status(400).json({
                err_mesg:'validation error',
                error:validationerrors.map(er=>er.message)
            })
        }
        next()
    }
}