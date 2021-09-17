<template>
  <div>
    <UserPage />
    <AdminPage />
  </div>
</template>

<script>
import UserPage from './pages/UserPage.vue'
import AdminPage from './pages/AdminPage.vue'

export default {
  components: {
    UserPage,
    AdminPage,
  },
}
</script>

