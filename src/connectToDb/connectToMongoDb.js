import mongoose from 'mongoose';
import { databaseLink } from '../constant.js';

let connectToMongoDb = async () => {
    try {
        await mongoose.connect(databaseLink)//await mongoose.connect("mongodb://0.0.0.0:27017/learnExpress")
        console.log("Application succesfully connected to database.")
    } catch (error) {
        console.log(error.message);
    }
};
export default connectToMongoDb;
