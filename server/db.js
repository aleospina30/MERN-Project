import mongoose from 'mongoose';

export const connectDB = async () => {
   try{
    const conn = await mongoose.connect(process.env.MONGODB);
   console.log(`Mongo connected: ${conn.connection.name} `);
   } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
   }
}