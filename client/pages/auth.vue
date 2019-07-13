<template>
  <v-layout columnm justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-container>
          <v-card-title v-if="isLogin" class="headline">Login</v-card-title>
          <v-card-title v-else class="headline">Register</v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-if="!isLogin"
                v-model="firstName"
                :rules="[rules.required]"
                label="First Name"
              ></v-text-field>
              <v-text-field
                v-if="!isLogin"
                v-model="lastName"
                :rules="[rules.required]"
                label="Last Name"
              ></v-text-field>
              <v-text-field
                v-model="email"
                :rules="[rules.required, rules.emailValidation]"
                label="Email"
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                :rules="[rules.required, rules.passwordValidation]"
                @click:append="showPassword = !showPassword"
              ></v-text-field>
              <p v-if="isLogin">
                New user? Click
                <span class="link primary--text" @click="isLogin = false"
                  >here</span
                >
                to register
              </p>
              <p v-else>
                Already have an account? Click
                <span class="link primary--text" @click="isLogin = true"
                  >here</span
                >
                to login
              </p>
              <v-btn :disabled="!valid" color="success" @click="validate"
                >Submit</v-btn
              >
              <v-btn color="error" @click="reset">Reset</v-btn>
            </v-form>
          </v-card-text>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  layout: 'auth',
  data() {
    return {
      isLogin: true,
      valid: true,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      showPassword: false,
      rules: {
        required: v => !!v || 'This field is required',
        emailValidation: v =>
          /^[\w.+]+@\w+\.\w+$/.test(v) || 'Please enter a valid email',
        passwordValidation: v =>
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(v) ||
          'Please enter a valid password'
      }
    }
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        if (this.isLogin) {
          this.login()
        } else {
          this.register()
        }
      }
    },
    login() {
      this.$axios
        .$post(
          '/auth/login',
          {
            email: this.email,
            password: this.password
          },
          { withCredentials: true }
        )
        .then(res => this.$router.push('/'))
        .catch(() => {})
    },
    register() {
      this.$axios
        .$post('/users', {
          email: this.email,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName
        })
        .then(res => {
          if (!res.error) {
            this.login()
          }
        })
        .catch(() => {})
    },
    reset() {
      this.$refs.form.reset()
    }
  }
}
</script>

<style lang="stylus" scoped>
span.link {
  color: blue;
  cursor: pointer;
}
</style>
