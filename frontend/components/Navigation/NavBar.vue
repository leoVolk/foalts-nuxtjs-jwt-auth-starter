<template>
  <div>
    <b-navbar class="shadow" toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand to="/"><b>NavBar</b></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav> </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <div v-if="$auth.loggedIn">
            <b-nav-item-dropdown class="text-light" right>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <b class="text-light">{{ $auth.user.username }}</b>
              </template>
              <b-dropdown-item to="/me">Profile</b-dropdown-item>
              <b-dropdown-item @click="userLogout">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </div>
          <b-nav-item
            v-if="!$auth.loggedIn && $route.path !== '/login'"
            to="/login"
            ><b class="text-light">Login</b></b-nav-item
          >
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  methods: {
    async userLogout() {
      try {
        const response = await this.$auth.logout('local');
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
