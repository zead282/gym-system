import { DB_connection } from "../db/db.conection.js"
import { globalresponse } from "./middlewares/error-handler.js"
import * as routes from './modules/index.routes.js'
import cors from 'cors'

export const intiateapp=(app,express)=>{

    app.use(express.json())

    app.use(cors())
    DB_connection()
    
    app.use('/admin',routes.adminrouter)

    app.use('/trainer',routes.trainerrouter)
    
    app.use(globalresponse)
    app.listen(process.env.PORT,()=>console.log("server is running"))
}