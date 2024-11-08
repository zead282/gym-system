import { connect } from "mongoose";


 export const DB_connection = async () => {
  //mongodb+srv://ahmed:123@cluster1.z8nl0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1/Gym-System
    await connect("mongodb+srv://ahmed:123@cluster0.pbntz.mongodb.net//gym")
  .then(() => {
    console.log('Successfully connected to the MongoDB database');
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });
}
