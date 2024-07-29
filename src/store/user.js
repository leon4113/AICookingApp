import { reactive } from 'vue';
import api from 'src/api';
import { LocalStorage } from 'quasar';

const state = reactive({
  user: null,
  token: null,
});

const actions = {
  async login(username, password) {
    try {
      const response = await api.post('/login', { username, password });
      state.user = response.data.user;
      state.token = response.data.token;
      LocalStorage.set('user', state.user);
      LocalStorage.set('token', state.token);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  async register(username, password) {
    try {
      const response = await api.post('/register', { username, password });
      state.user = response.data.user;
      state.token = response.data.token;
      LocalStorage.set('user', state.user);
      LocalStorage.set('token', state.token);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },
  loadUserFromLocalStorage() {
    state.user = LocalStorage.getItem('user');
    state.token = LocalStorage.getItem('token');
  },
  logout() {
    state.user = null;
    state.token = null;
    LocalStorage.remove('user');
    LocalStorage.remove('token');
  },
};

export default {
  state,
  actions,
};
