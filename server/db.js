import mongoose from 'mongoose';
import {MONGODB} from './config.js';


export const connectDB = async () => {
   try{
    const conn = await mongoose.connect(MONGODB);
   console.log(`Mongo connected: ${conn.connection.name} `);
   } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
   }
}