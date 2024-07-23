import { reactive } from 'vue';
import api from 'src/api';

const state = reactive({
  user: null,
  token: null,
});

const actions = {
  async register(username, password) {
    try {
      const response = await api.post('/register', { username, password });
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },
  async login(username, password) {
    try {
      const response = await api.post('/login', { username, password });
      state.user = response.data.user;
      state.token = response.data.token;
      api.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  logout() {
    state.user = null;
    state.token = null;
    delete api.defaults.headers.common['Authorization'];
  },
  async fetchUserProfile() {
    try {
      const response = await api.get(`/user/${state.user.id}`);
      state.user = response.data;
      return response.data;
    } catch (error) {
      console.error('Fetch user profile error:', error);
      throw error;
    }
  },
};

export default {
  state,
  actions,
};
