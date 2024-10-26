


export const globalresponse=(err,req,res,next)=>{

    if(err){
        res.status(err.status || 500).json({
            message:'server error',
            err_msg:err.message,
            error:err?.error,
            error_stack:err?.stack
        })
    }
}