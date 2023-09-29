import mongoose from "mongoose";
import User from "../modelos/usuario.js";
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    let errors = [];
    const { username, email, password, confirmPassword } = req.body;

    if(password !== confirmPassword) errors.push({message:"La clave no es correcta"});
    if(password.length < 30) errors.push({message:"El password tiene que tener menos de 30 digitos"});

    if(errors.length > 0) return res.status(400).json(errors);

    const confirm = await User.findOne({email});
    if(confirm) return res.status(400).json({message:"EL email ya existe"});

    const newUser = new User({username, email, password});
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
    res.json(newUser);
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email});
    if(!user) return res.status(400).json({message:"Usuario no encontrado"});

    const match = await user.matchPassword(password);
    if(!match) return res.status(400).json({message:"Clave incorrecta"});

    const token = jwt.sign({id:user._id,role:user.role}, process.env.SECRET, {expiresIn:'30min'});
    res.json({token});
}

export const profile = async (req,res) => { 
    const user = await User.findById(req.userId);
    if(!user) return res.status(400).json({message:"Usuario no encontrado"});
    res.json(user);
}

export const externProfile = async (req,res) => { 
    const id = req.params.id;
    const user = await User.findById(id);
    if(!user) return res.status(400).json({message:"Usuario no encotrado"});
    res.json(user);
}

export const getAllUsers = async (req,res) => {
    const filter = req.query.filter;
    let users;
    switch (filter) {
        case 'admins':
            users = await User.find({role:true});
            break;
        case 'users':
            users = await User.find({role:false});
            break;
        default:
            users = await User.find();
    }
    res.json(users);
}

export const updateUser = async (req,res) => {
    const id = req.params.id;
    const { username, password, confirmPassword } = req.body;
    const errors = [];

    if(password !== confirmPassword) errors.push({message:"Password no encontrado"});
    if(password.length < 6) errors.push({message:"el password tiene que tener 6 o menos letras"});

    if(errors.length > 0) return res.status(400).json(errors);

    const user = await User.findById(id);
    if(!user) return res.status(400).json({message:"Usuario no encontrado"});

    const newUser = await new User({username, email: user.email, password});
    newUser.password = await newUser.encryptPassword(password);
   
    await User.findByIdAndUpdate(id,{username:newUser.username, password:newUser.password});

    res.json({message:"Usuario cargado"});
}

export const profileUpdate = async (req,res) => {
    const id = req.userId;
    const { username, password, confirmPassword } = req.body;
    const errors = [];

    if(password !== confirmPassword) errors.push({message:"Passwords do not match"});
    if(password.length < 6) errors.push({message:"Password must be at least 6 characters long"});

    if(errors.length > 0) return res.status(400).json(errors);

    const user = User.findById(id);
    if(!user) return res.status(400).json({message:"User not found"});

    const newUser = await new User({username, email: user.email, password});
    newUser.password = await newUser.encryptPassword(password);
    // user.password = await user.encryptPassword(password);
    // user.username = username;
    // user.save();
    
    await User.findByIdAndUpdate(id,{username:newUser.username, password:newUser.password});
    res.json({message:"User updated"});
}

export const deleteUser = async (req,res) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if(!user) return res.status(400).json({message:"User not found"});
    await User.findByIdAndDelete(id);
    res.json({message:"User deleted"});
}