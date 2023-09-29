import mongoose from "mongoose";

try {
    const db = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log('Conectando a ' + db.connection.name);
} catch (error) {
    console.log(error);
}

mongoose.connection.on('conectado', () => {
    console.log('Mongoose esta corriendo');
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose desconectado');
})