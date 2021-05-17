<template>
  <div class="container-fluid bg-light mt-5 h-100">
    <div class="row justify-content-center h-100">
      <div class="col-12 card col-lg-3 shadow align-self-center">
        <form @submit.prevent="userLogin" class="form-signin py-4">
          <img class="mb-4" alt="" width="72" height="72" />
          <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
          <label for="inputEmail" class="sr-only">Email address</label>
          <input
            v-model="login.email"
            type="email"
            id="inputEmail"
            class="form-control"
            placeholder="Email address"
            required=""
            autofocus=""
          />
          <label for="inputPassword" class="sr-only">Password</label>
          <input
            v-model="login.password"
            type="password"
            id="inputPassword"
            class="form-control"
            placeholder="Password"
            required=""
          />
          <!--           <div class="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div> -->
          <button class="btn btn-lg btn-primary btn-block" type="submit">
            Sign in
          </button>
          <div class="mt-3">
            <span>No account yet? </span>
            <router-link to="/register">Register now</router-link>
          </div>
          <p class="mt-3 text-muted">© 2021</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: {
        email: '',
        password: '',
      },
    }
  },
  created() {
    if (this.$auth.user) {
      this.$router.push({
        path: '/',
      })
    }
  },
  methods: {
    async userLogin() {
      try {
        let response = await this.$auth.loginWith('local', { data: this.login })
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>

<style>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
  text-align: center;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type='email'] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type='password'] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
