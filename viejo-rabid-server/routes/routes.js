import { Router } from "express";
import { findProducts, findProduct } from "../service/product.service";

const router = Router();



router.get("/login")

// Product.service
// Manejo de los productos

router.get("/products", findProducts)

router.get("/products/:id", findProduct)

export default router;









/*
https://expressjs.com/en/5x/guide/using-middleware/

import express from 'express';

const app = express();
const router = express.Router();

// a middleware function with no mount path. This code is executed for every request to the router
router.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

// a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
router.use(
  '/user/:id',
  (req, res, next) => {
    console.log('Request URL:', req.originalUrl);
    next();
  },
  (req, res, next) => {
    console.log('Request Type:', req.method);
    next();
  }
);

// a middleware sub-stack that handles GET requests to the /user/:id path
router.get(
  '/user/:id',
  (req, res, next) => {
    // if the user ID is 0, skip to the next route
    if (req.params.id === '0') next('route');
    // otherwise pass control to the next middleware function in this stack
    else next();
  },
  (req, res) => {
    // render a regular page
    res.render('regular');
  }
);

// handler for the /user/:id path, which renders a special page
router.get('/user/:id', (req, res) => {
  console.log(req.params.id);
  res.render('special');
});

// mount the router on the app
app.use('/', router);
*/