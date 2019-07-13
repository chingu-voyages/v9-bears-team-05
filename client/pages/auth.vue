<template>
  <v-layout columnm justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-container>
          <v-card-title class="headline">Login</v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
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
      valid: true,
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
      }
    },
    reset() {
      this.$refs.form.reset()
    }
  }
}
</script>
