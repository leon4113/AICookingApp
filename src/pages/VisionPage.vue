<template>
  <q-page>
    <div class="q-pa-md">
      <h1>Scan Ingredients</h1>
      <q-uploader
        label="Upload or capture an image"
        accept="image/*"
        @added="onFileChange"
        auto-upload
      />
      <q-img v-if="image" :src="image" class="full-width" />
      <div v-if="ingredients.length" class="q-mt-md">
        <h3>Detected Ingredients:</h3>
        <q-list bordered>
          <q-item v-for="(ingredient, index) in ingredients" :key="index">
            <q-item-section>{{ ingredient.class }}</q-item-section>
          </q-item>
        </q-list>
        <q-btn @click="navigateToRecipes" label="View Recipes" color="primary" class="q-mt-md" />
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      image: null,
      ingredients: []
    };
  },
  methods: {
    onFileChange(files) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.image = e.target.result;
        // TODO: Send image to backend for recognition
        this.ingredients = [
          { class: 'Tomato', score: 0.98 },
          { class: 'Cucumber', score: 0.95 }
        ]; // Mocked data
      };
      reader.readAsDataURL(file);
    },
    navigateToRecipes() {
      this.$router.push({ path: '/recipes', query: { ingredients: this.ingredients.map(i => i.class).join(',') } });
    }
  }
}
</script>
