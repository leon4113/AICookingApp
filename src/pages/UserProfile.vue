<template>
  <q-page>
    <div class="q-pa-md">
      <h1>User Profile</h1>
      <q-card>
        <q-card-section>
          <q-item>
            <q-item-section avatar>
              <q-avatar icon="person" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ user.name }}</q-item-label>
              <q-item-label caption>{{ user.email }}</q-item-label>
            </q-item-section>
          </q-item>
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
        name: 'John Doe',
        email: 'john.doe@example.com'
      }
    };
  }
}
</script>
