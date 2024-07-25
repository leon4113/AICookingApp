<template>
  <q-page>
    <div class="q-pa-md">
      <h1>Login</h1>
      <q-form @submit.prevent="login">
        <q-input v-model="username" label="Username" />
        <q-input v-model="password" type="password" label="Password" />
        <q-btn type="submit" label="Login" color="primary" />
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

    const login = async () => {
      console.log('Login method called'); // Debug log
      console.log('Username:', username.value, 'Password:', password.value); // Debug log
      try {
        await userStore.actions.login(username.value, password.value);
        console.log('User logged in successfully'); // Debug log
        router.push('/home');
      } catch (error) {
        console.error('Login error:', error);
      }
    };

    return {
      username,
      password,
      login
    };
  }
};
</script>
