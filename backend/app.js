const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
// const { OpenAIApi, Configuration } = require('openai');
require('dotenv').config();

import OpenAI from "openai";

const openai = new OpenAI();


const app = express();
const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET_KEY;

// const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());

// Register endpoint
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: {
            username,
            password: hashedPassword
        }
    });
    res.status(201).json({ message: 'User registered successfully', user });
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({ where: { username } });
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ userId: user.id }, SECRET_KEY);
        res.json({ message: 'Login successful', token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Generate recipe endpoint
app.post('/generate-recipe', async (req, res) => {
    const { userId, ingredients } = req.body;
    try {
        const openaiResponse = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Generate a recipe using these ingredients: ${ingredients.join(', ')}`,
            max_tokens: 150
        });
        const recipeText = openaiResponse.data.choices[0].text.trim();
        const recipe = await prisma.recipe.create({
            data: {
                user_id: userId,
                ingredients: JSON.stringify(ingredients),
                steps: recipeText
            }
        });
        res.json({ recipe });
    } catch (error) {
        console.error('Error generating recipe:', error.message);
        res.status(500).json({ message: 'Error generating recipe', error: error.message });
    }
});

// Get user recipes endpoint
app.get('/user/:userId/recipes', async (req, res) => {
    const { userId } = req.params;
    const recipes = await prisma.recipe.findMany({ where: { user_id: userId } });
    res.json({ recipes });
});

// Start server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
