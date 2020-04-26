import mongoose from 'mongoose';
import usuarioSeed from './usuario.seeds'
require('dotenv').config();
seeds();
async function seeds() {
    console.log('seeds');
    const uri = process.env.ATLAS_URI;
    await mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

    await usuarioSeed();

    mongoose.disconnect()
}
