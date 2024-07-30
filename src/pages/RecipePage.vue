<template>
  <q-page>
    <div class="q-pa-md">
      <h1>Recipes</h1>
      <div v-for="(recipe, index) in recipes" :key="index" class="q-mt-md">
        <q-card @click="viewRecipe(recipe)" class="q-mb-md">
          <q-card-section>
            <q-item>
              <q-item-section>
                <q-item-label>{{ recipe.title }}</q-item-label>
                <q-item-label caption>{{ recipe.description }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import api from 'src/api';
export default {
  data() {
    return {
      recipes: JSON.parse(sessionStorage.getItem('recipes')) || []
    };
  },
  methods: {
    async viewRecipe(recipes) {
      try {
        const response = await api.post('/generate-recipe-details', {
          userId: this.$q.localStorage.getItem('userId'),
          title: recipes.title,
          ingredients: JSON.parse(recipes.ingredients)
        });
        console.log('success');
        sessionStorage.setItem('recipeDetails', JSON.stringify(response.data.recipe));

        this.$router.push({ name: 'recipeDetails' });
      } catch (error) {
        console.error('Error fetching recipe details:', error);
      }
    }
  }
}
</script>
