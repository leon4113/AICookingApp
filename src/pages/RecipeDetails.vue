<template>
  <q-page>
    <div class="q-pa-md">
      <h1>{{ recipe.title }}</h1>
      <p>{{ recipe.description }}</p>
      <div v-for="(step, index) in recipe.steps" :key="index">
        <q-card>
          <q-card-section>
            <q-item>
              <q-item-section>
                <q-item-label>{{ step }}</q-item-label>
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
      recipe: {
        title: 'Tomato Soup',
        description: 'A delicious tomato soup.',
        steps: [
          'Step 1: Gather ingredients.',
          'Step 2: Blend tomatoes.',
          'Step 3: Simmer soup.'
        ]
      }
    };
  }
}
</script>
