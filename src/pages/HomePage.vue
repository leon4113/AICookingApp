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
      <div class="q-mt-md">
        <q-btn @click="logout" label="Logout" icon="exit_to_app" color="negative" push />
      </div>
    </div>
  </q-page>
</template>

<script>
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

export default {
  name: 'HomePage',
  setup() {
    const $q = useQuasar();
    const router = useRouter();

    const logout = () => {
      $q.localStorage.clear();
      $q.notify({ type: 'positive', message: 'Logged out successfully' });
      router.push('/loginpage');
    };

    return {
      logout
    };
  }
}
</script>
