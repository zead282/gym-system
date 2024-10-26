import express from 'express'
import { config } from "dotenv";
import { intiateapp } from './src/initiate.app.js';

config({path:'./config/config.env'})
const app=express()



intiateapp(app,express)
