<template>
  <q-page>
    <div class="q-pa-md">

      <!-- Profile Information Section -->
      <q-card class="q-mb-md">
        <q-card-section>
          <div class="text-h6">Profile Information</div>
          <q-input v-model="user.name" label="Name" />
          <q-input v-model="user.email" label="Email" type="email" />
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

      <!-- Preferences Section -->
      <q-card class="q-mb-md">
        <q-card-section>
          <div class="text-h6">Preferences</div>
          <q-input v-model="user.preferences" label="Preferences" type="textarea" />
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
export default {
  data() {
    return {
      user: {
        name: '',
        email: '',
        preferences: ''
      },
      passwords: {
        oldPassword: '',
        newPassword: ''
      },
      pastRecipes: []
    };
  },
  methods: {
    fetchUserData() {
      // TODO: Fetch user data from the backend
    },
    changePassword() {
      // TODO: Implement change password logic
    },
    deleteRecipe(recipeId) {
      // TODO: Implement delete recipe logic
      this.pastRecipes = this.pastRecipes.filter(recipe => recipe.id !== recipeId);
    }
  },
  created() {
    this.fetchUserData();
    // TODO: Fetch past recipes from the backend
    this.pastRecipes = [
      { id: 1, title: 'Tomato Soup' },
      { id: 2, title: 'Cucumber Salad' }
    ]; // Mocked data
  }
}
</script>
