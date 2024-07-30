<template>
  <q-page>
    <div class="q-pa-md">
      <!-- Profile Information Section -->
      <q-card class="q-mb-md">
        <q-card-section>
          <div class="text-h6">Profile Information</div>
          <q-input v-model="user.username" label="Username" />
          <q-btn @click="updateProfile" label="Update Username" color="primary" class="q-mt-md" />
        </q-card-section>
      </q-card>

      <!-- Change Password Section -->
      <q-card class="q-mb-md">
        <q-card-section>
          <div class="text-h6">Change Password</div>
          <q-input v-model="passwords.oldPassword" label="Old Password" type="password" />
          <q-input v-model="passwords.newPassword" label="New Password" type="password" />
          <q-btn @click="changePassword" label="Change Password" color="primary" class="q-mt-md" />
        </q-card-section>
      </q-card>

      <!-- Past Recipes Section -->
      <q-card>
        <q-card-section>
          <div class="text-h6">Past Recipes</div>
          <q-list bordered>
            <q-item v-for="(recipe, index) in pastRecipes" :key="index" clickable>
              <q-item-section>{{ recipe.title }}</q-item-section>
              <q-item-section side>
                <q-btn icon="delete" @click="deleteRecipe(recipe.id)" color="negative" flat round />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import api from 'src/api';

export default {
  data() {
    return {
      user: {
        id: null,
        username: '',
        email: '', // Keeping email if it's part of your schema, otherwise, remove it.
        password: ''
      },
      passwords: {
        oldPassword: '',
        newPassword: ''
      },
      pastRecipes: []
    };
  },
  methods: {
    async fetchUserData() {
      try {
        const userId = this.$q.localStorage.getItem('userId');
        const response = await api.get(`/user/${userId}`);
        this.user = response.data;
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    },

    async updateProfile() {
      try {
        const response = await api.put(`/user/${this.user.id}`, {
          username: this.user.username,
        });
        this.user = response.data;
        this.$q.notify({ type: 'positive', message: 'Profile updated successfully!' });
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    },

    async changePassword() {
      try {
        const response = await api.put(`/user/${this.user.id}/change-password`, {
          oldPassword: this.passwords.oldPassword,
          newPassword: this.passwords.newPassword
        });
        this.$q.notify({ type: 'positive', message: response.data.message });
        this.passwords.oldPassword = '';
        this.passwords.newPassword = '';
      } catch (error) {
        console.error('Error changing password:', error);
        this.$q.notify({ type: 'negative', message: 'Error changing password' });
      }
    },

    async fetchPastRecipes() {
      try {
        const userId = this.$q.localStorage.getItem('userId');
        const response = await api.get(`/user/${userId}/recipes`);
        this.pastRecipes = response.data.recipes;
      } catch (error) {
        console.error('Error fetching past recipes:', error);
      }
    },

    async deleteRecipe(recipeId) {
      try {
        const userId = this.$q.localStorage.getItem('userId');
        await api.delete(`/user/${userId}/recipes/${recipeId}`);
        this.pastRecipes = this.pastRecipes.filter(recipe => recipe.id !== recipeId);
        this.$q.notify({ type: 'positive', message: 'Recipe deleted successfully!' });
      } catch (error) {
        console.error('Error deleting recipe:', error);
        this.$q.notify({ type: 'negative', message: 'Error deleting recipe' });
      }
    }
  },
  created() {
    this.fetchUserData();
    this.fetchPastRecipes();
  }
}
</script>
