import { Plans } from "../../../db/models/plans.model.js";


 



/**
 @api {POST} /plans/create  create plans
 */
export const createPlan   = async (req, res, next) => {
    //get data
    const {name , price , description} = req.body;
    //check if this plane name is already exist
    const isNameExist = await Plans.findOne({ name });
    if (isNameExist){
        return next( Error('name already exist',{cause: 400}));
    } 
    //prepare plans object 
    const plan= {
        name,
        price,
        description
    }
    //create plans
    const newPlan = await Plans.create(plan);
    
    //send response
    res.status(200).json({ message: 'plans created' ,newPlan });

}


/**
 @api {Get} /plans/getALLPlans  get all plans
 */
export const getALLPlans   = async (req, res, next) => {
    //get all data from database
    const allPlans = await Plans.find()

    //send response
    res.status(200).json({ message: 'all plans' ,allPlans });

}


/**
 @api {Put} /plans/updatePlans    update plans
 */

export const updatePlans   = async (req, res, next) => {
    const {_id} = req.params
    const {name ,price,description } = req.body

    //check if this plane name is already exist
    const plan = await Plans.findById( _id );
    if (!plan){
        return next(Error('name is not exist', {cause:400}));
    }

    //update plan
    if(name)plan.name = name
    if(price)plan.price = price
    if(description)plan.description = description


    //save el update
    await plan.save()

    //send response
    res.status(200).json({ message: 'plan updated' ,plan });


    

}



/**
 @api {delete} /plans/deleteplan    delete plans
 */

export const deletePlan   = async (req, res, next) => {
    const {_id} = req.params

    //check if paln exist and delete
    const deletedPlan = await Plans.findByIdAndDelete( _id );
    if(!deletedPlan){
        return next(Error('plan is not exist to delete', {cause:400}));
    }

    //send response
    res.status(200).json({ message: 'plan deleted' ,deletedPlan });
}

