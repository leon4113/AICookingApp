<template>
  <q-page>
    <div class="q-pa-md">
      <h1>{{ recipe.title }}</h1>
      <div>
        <h2>Ingredients</h2>
        <ul>
          <li v-for="ingredient in parsedIngredients" :key="ingredient">{{ ingredient }}</li>
        </ul>
      </div>
      <div>
        <h2>Steps</h2>
        <p v-for="step in formattedSteps" :key="step">{{ step }}</p>
      </div>
    </div>
  </q-page>
</template>

<script>
import { format } from 'quasar';

export default {
  data() {
    return {
      recipe: {}
    };
  },
  computed: {
    parsedIngredients() {
      return JSON.parse(this.recipe.ingredients || '[]');
    },
    formattedSteps() {
      return format.capitalize(this.recipe.steps || '').split('\n');
    }
  },
  mounted() {
    const recipeDetails = JSON.parse(sessionStorage.getItem('recipeDetails'));
    if (recipeDetails) {
      this.recipe = recipeDetails;
    } else {
      console.error('No recipe details found in sessionStorage.');
    }
  }
};
</script>
