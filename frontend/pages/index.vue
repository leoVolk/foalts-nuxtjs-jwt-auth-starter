<template>
  <div class="container">
    <h1>
      Hello From Frontend
      <span v-if="$auth.user">{{ $auth.user.username }}</span>
    </h1>
  </div>
</template>

<script>
export default {
  auth: false,
  mounted() {},
}
</script>

<style></style>
