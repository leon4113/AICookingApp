const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.use(bodyParser.json());

// Register endpoint
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword
            }
        });
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { username } });
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ userId: user.id }, SECRET_KEY);
            res.json({ message: 'Login successful', token });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
});

// Fetch user profile
app.get('/user/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: { id: Number(id) }
        });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user data', error: error.message });
    }
});

// Update user profile
app.put('/user/:id', async (req, res) => {
    const { id } = req.params;
    const { username, preferences } = req.body;
    try {
        const updatedUser = await prisma.user.update({
            where: { id: Number(id) },
            data: { username, preferences }
        });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user profile', error: error.message });
    }
});

// Change user password
app.put('/user/:id/change-password', async (req, res) => {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { id: Number(id) } });
        if (user && await bcrypt.compare(oldPassword, user.password)) {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await prisma.user.update({
                where: { id: Number(id) },
                data: { password: hashedPassword }
            });
            res.json({ message: 'Password changed successfully' });
        } else {
            res.status(400).json({ message: 'Incorrect old password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error changing password', error: error.message });
    }
});

// Generate recipe endpoint
app.post('/generate-recipe', async (req, res) => {
    const { userId, ingredients } = req.body;
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/completions',
            {
                prompt: `Generate a recipe using these ingredients: ${ingredients.join(', ')}`,
                max_tokens: 150,
                n: 1,
                stop: null,
                temperature: 0.7
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const recipeText = response.data.choices[0].text.trim();
        const recipe = await prisma.recipe.create({
            data: {
                userId: userId,
                ingredients: JSON.stringify(ingredients),
                steps: recipeText
            }
        });
        res.json({ recipe });
    } catch (error) {
        res.status(500).json({ message: 'Error generating recipe', error: error.message });
    }
});

// Get user recipes endpoint
app.get('/user/:userId/recipes', async (req, res) => {
    const { userId } = req.params;
    try {
        const recipes = await prisma.recipe.findMany({ where: { userId: Number(userId) } });
        res.json({ recipes });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching recipes', error: error.message });
    }
});

// Delete user recipe
app.delete('/user/:id/recipes/:recipeId', async (req, res) => {
    const { id, recipeId } = req.params;
    try {
        await prisma.recipe.deleteMany({
            where: {
                id: Number(recipeId),
                userId: Number(id)
            }
        });
        res.json({ message: 'Recipe deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting recipe', error: error.message });
    }
});

// Start server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
