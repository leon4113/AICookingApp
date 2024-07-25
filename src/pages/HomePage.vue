<template>
  <q-page>
    <div class="q-pa-md">
      <h1>Welcome to the AI Culinary Assistant</h1>
      <div class="q-mt-md">
        <q-btn to="/vision" label="Scan Ingredients" icon="camera" color="primary" push />
      </div>
      <div class="q-mt-md">
        <q-btn to="/recipes" label="View Recipes" icon="restaurant_menu" color="secondary" push />
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'HomePage'
}
</script>
