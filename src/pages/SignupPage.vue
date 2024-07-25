<template>
  <q-page>
    <div class="q-pa-md">
      <h1>Sign Up</h1>
      <q-form @submit.prevent="signup">
        <q-input v-model="username" label="Username" />
        <q-input v-model="password" type="password" />
        <q-btn type="submit" label="Sign Up" color="primary" />
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue';
import userStore from 'src/store/user';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const username = ref('');
    const password = ref('');
    const router = useRouter();

    const signup = async () => {
      console.log('Signup method called'); // Debug log
      console.log('Username:', username.value, 'Password:', password.value); // Debug log
      try {
        await userStore.actions.register(username.value, password.value);
        console.log('User registered successfully'); // Debug log
        router.push('/login');
      } catch (error) {
        console.error('Signup error:', error);
      }
    };

    return {
      username,
      password,
      signup
    };
  }
};
</script>
