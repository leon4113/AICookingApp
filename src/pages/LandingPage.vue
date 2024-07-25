<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md">
      <h1>Welcome to the AI Culinary Assistant</h1>
      <div class="q-mt-md">
        <q-btn to="/login" label="Login" color="primary" push />
      </div>
      <div class="q-mt-md">
        <q-btn to="/signup" label="Sign Up" color="secondary" push />
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'LandingPage',
}
</script>
