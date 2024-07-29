<template>
  <q-page class="q-pa-md">
    <q-card class="q-mb-md">
      <q-card-section>
        <q-form @submit.prevent="register">
          <q-input v-model="username" label="Username" required />
          <q-input v-model="password" label="Password" type="password" required />
          <q-btn type="submit" label="Sign Up" color="primary" class="q-mt-md" />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { ref } from 'vue';
import { useUserStore } from '../store/user';

export default {
  setup() {
    const username = ref('');
    const password = ref('');
    const userStore = useUserStore();

    const register = async () => {
      try {
        await userStore.register(username.value, password.value);
        this.$router.push('/home'); // Redirect to home page after successful registration
      } catch (error) {
        console.error('Registration error:', error);
      }
    };

    return {
      username,
      password,
      register,
    };
  },
};
</script>
