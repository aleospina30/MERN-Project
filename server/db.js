import mongoose from 'mongoose';

export const connectDB = async () => {
   try{
    const conn = await mongoose.connect("mongodb+srv://Sejotaz:prueba123@mongodb1.ndvxls9.mongodb.net/");
   console.log(`Mongo connected: ${conn.connection.name} `);
   } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
   }
}