import { DB_connection } from "../db/db.conection.js"


export const intiateapp=(app,express)=>{

    app.use(express.json())
    DB_connection()

    app.listen(process.env.PORT,()=>console.log("server is running"))
}