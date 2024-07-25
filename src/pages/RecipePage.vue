<template>
  <q-page>
    <div class="q-pa-md">
      <h1>Recipes</h1>
      <div v-if="recipes.length === 0">
        <p>No recipes available. Please generate some recipes first.</p>
      </div>
      <div v-for="(recipe, index) in recipes" :key="index" class="q-mt-md">
        <q-card @click="viewRecipe(recipe.id)" class="q-mb-md">
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
import { computed } from 'vue';
import recipeStore from 'src/store/recipe';

export default {
  setup() {
    const recipes = computed(() => recipeStore.state.recipes);

    const viewRecipe = (id) => {
      this.$router.push({ path: `/recipe/${id}` });
    };

    return {
      recipes,
      viewRecipe
    };
  }
};
</script>
