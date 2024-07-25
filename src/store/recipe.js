import { reactive } from 'vue';
import api from 'src/api';

const state = reactive({
  recipes: [],
  generatedRecipe: null,
});

const actions = {
  async generateRecipe(userId, ingredients) {
    try {
      const response = await api.post('/generate-recipe', { userId, ingredients });
      state.generatedRecipe = response.data.recipe;
      state.recipes = [response.data.recipe]; 
      return response.data.recipe;
    } catch (error) {
      console.error('Generate recipe error:', error);
      throw error;
    }
  },
  async fetchUserRecipes(userId) {
    try {
      const response = await api.get(`/user/${userId}/recipes`);
      state.recipes = response.data.recipes;
      return response.data.recipes;
    } catch (error) {
      console.error('Fetch user recipes error:', error);
      throw error;
    }
  },
  async deleteRecipe(userId, recipeId) {
    try {
      const response = await api.delete(`/user/${userId}/recipes/${recipeId}`);
      state.recipes = state.recipes.filter(recipe => recipe.id !== recipeId);
      return response.data;
    } catch (error) {
      console.error('Delete recipe error:', error);
      throw error;
    }
  },
};

export default {
  state,
  actions,
};
