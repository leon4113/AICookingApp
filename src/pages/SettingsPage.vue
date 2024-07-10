<template>
  <q-page>
    <div class="q-pa-md">
      <h1>Settings</h1>
      <q-card>
        <q-card-section>
          <q-item>
            <q-item-section>
              <q-item-label>Dark Mode</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-toggle v-model="darkMode" />
            </q-item-section>
          </q-item>
        </q-card-section>
        <q-card-section>
          <q-btn @click="logout">Logout</q-btn>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      darkMode: false
    };
  },
  methods: {
    logout() {
      // Implement logout logic
      console.log('User logged out');
    }
  }
}
</script>
