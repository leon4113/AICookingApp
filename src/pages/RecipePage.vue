<template>
  <q-page>
    <div class="q-pa-md">
      <h1>Recipes</h1>
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
export default {
  data() {
    return {
      recipes: [
        { id: 1, title: 'Tomato Soup', description: 'A delicious tomato soup.' },
        { id: 2, title: 'Cucumber Salad', description: 'A refreshing cucumber salad.' }
      ]
    };
  },
  methods: {
    viewRecipe(id) {
      this.$router.push({ path: `/recipe/${id}` });
    }
  }
}
</script>
