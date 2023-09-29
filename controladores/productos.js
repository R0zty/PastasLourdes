import Product from '../modelos/productos.js'

export const createProduct = async (req, res) => {
    const { name, price, description, image } = req.body;
    const validateProduct = await Product.findOne({ name });
    if (validateProduct) return res.status(400).json({ msg: "ya existe el producto" });

    const newProduct = new Product({ name, price, description, image});
    await newProduct.save();
    res.json(newProduct);
}

export const getProduct = async (req,res) => { 
    const id = req.params.id;
    const product = await Product.findById(id);
    if(!product) return res.status(400).json({message:"Producto no encontrado"});
    res.json(product);
}

export const getAllProducts = async (req,res) => {

    const products = await Product.find();
    res.json(products);
}

export const updateProduct = async (req,res) => {
    const id = req.params.id;
    const { price, description, image, name } = req.body;
    const errors = [];

    const product = await Product.findOne({name});
    if(product) return res.status(400).json({message:"ya existe el producto"});
    
    await Product.findByIdAndUpdate(id,{ name, price, description, image});

    res.json({message:"Producto cargado"});
}

export const deleteProduct = async (req,res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    if(!product) return res.status(400).json({message:""});
    await Product.findByIdAndDelete(id);
    res.json({message:"Producto eliminado"});
}