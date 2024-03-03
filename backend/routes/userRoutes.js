import express from 'express';
import { User } from '../models/userModel.js';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'

const router = express.Router();

router.post('/signup', async (request, response) => {
    try {
        if (!request.body.username ||
            !request.body.firstname ||
            !request.body.lastname ||
            !request.body.password) {
            return response.status(400).send({
                message: '',
            });
        }

        const existingUser = await User.findOne({ user: request.body.username });
        if (existingUser) {
            return response.status(400).send({
                message: 'Username already exists',
            });
        }

        const hashedPassword = await bcrypt.hash(request.body.password, 10);
        const user = await User.create({
            firstname: request.body.firstname, lastname: request.body.lastname, username: request.body.username, password: hashedPassword
        });

        return response.status(201).send(
            {
                "username": user.username,
                "message": "User created successfully"
            });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.post('/login', async (request, response) => {
    try {
        if (
            !request.body.username || !request.body.password
        ) {
            return response.status(400).send({
                message: 'Username and Password are required',
            });
        }

        const existingUser = await User.findOne({ username: request.body.username });

        if (!existingUser) {
            return response.status(400).send({
                message: 'Invalid UserName or Password',
            });
        }

        const isMatch = await bcrypt.compare(request.body.password, existingUser.password);
        if (!isMatch) {
            return response.status(400).send({
                message: 'Invalid Username or Password',
            });
        } else {
            const token = jwt.sign({ username: request.body.username }, 'secret_key', { expiresIn: '1h' });

            return response.status(200).send({
                token,
                message: "User logged in successfully"
            });
        }

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;
