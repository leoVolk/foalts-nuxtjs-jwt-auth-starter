<template>
  <div class="container-fluid mt-5 h-100">
    <div class="row justify-content-center h-100">
      <div class="col-12 card col-lg-3 shadow align-self-center">
        <form @submit.prevent="userRegister" class="form-register py-4">
          <img class="mb-4" alt="" width="72" height="72" />
          <h1 class="h3 mb-3 font-weight-normal">Welcome!</h1>
          <label for="inputUsername" class="sr-only">Username</label>
          <input
            v-model="login.username"
            type="text"
            id="inputUsername"
            class="form-control"
            placeholder="Username"
            required=""
            autofocus=""
          />
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
            Register now
          </button>
          <div class="mt-3">
            <span>Already registered? </span>
            <router-link to="/login">Login here</router-link>
          </div>
          <p class="mt-3 text-muted">© 2021</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      login: {
        email: '',
        password: '',
        username: '',
      },
    };
  },
  methods: {
    async userRegister() {
      try {
        let response = await this.$axios.post('/auth/signup', {
          email: this.login.email,
          password: this.login.password,
          username: this.login.username,
        });
        if (response.status === 200) {
          this.$auth
            .setUserToken(response.data.token)
            .then(() => this.$router.push('/'));
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style>
.form-register {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
  text-align: center;
}
.form-register .checkbox {
  font-weight: 400;
}
.form-register .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-register .form-control:focus {
  z-index: 2;
}
.form-register input[type='text'] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-register input[type='email'] {
  margin-bottom: -1px;
  border-radius: 0px;
}
.form-register input[type='password'] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
