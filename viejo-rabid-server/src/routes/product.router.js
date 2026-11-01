import { Router } from "express";

import { addProduct, getAllProducts, updateProduct, deleteProduct } from '../service/product.service.js';

const productsRouter = Router();

// GET: obtener productos
productsRouter.get('/product', getAllProducts);

// POST: crear producto
productsRouter.post('/product', addProduct);

// PUT: editar producto
productsRouter.put('/product/:id', updateProduct);

// DELETE: eliminar producto
productsRouter.delete('/product/:id', deleteProduct);



export default productsRouter;