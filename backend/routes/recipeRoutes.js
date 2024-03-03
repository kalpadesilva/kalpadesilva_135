import express from 'express';
import { Recipe } from '../models/recipeModel.js';

import jwt from 'jsonwebtoken';

const router = express.Router();

function verifyToken(req, res, next) {

    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1];
        jwt.verify(bearerToken, 'secret_key', (error, authData) => {
            if (error) {
                response.status(500).send({ message: error.message });
            } else {
                next();
            }
        });
    } else {
        res.status(403).send({ message: "Invalid token" });
    }
}

// Route to save a new Recipe
router.post('/', verifyToken, async (request, response) => {
    try {
        if (!request.body.name ||
            !request.body.owner ||
            !request.body.ingredients ||
            !request.body.instructions ||
            !request.body.duration) {
            return response.status(400).send({
                message: 'Please fill all the required fields',
            });
        }
        const newRecipe = {
            name: request.body.name,
            owner: request.body.owner,
            ingredients: request.body.ingredients,
            instructions: request.body.instructions,
            duration: request.body.duration,
        };

        const recipe = await Recipe.create(newRecipe);

        return response.status(200).send(recipe);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to get all recipes from database
router.get('/', verifyToken, async (request, response) => {
    try {
        const recipes = await Recipe.find({});

        return response.status(200).json({
            count: recipes.length,
            recipes: recipes,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


export default router;
