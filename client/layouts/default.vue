<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      clipped
      fixed
      app
    >
      <v-list>
        <v-list-tile
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title" />
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-btn icon @click.stop="miniVariant = !miniVariant">
              <v-icon>{{ `chevron_${miniVariant ? 'right' : 'left'}` }}</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar clipped-left fixed app>
      <v-toolbar-side-icon @click="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>person</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-tile @click="logout">
            <v-list-tile-action>
              <v-icon>exit_to_app</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="'Logout'" />
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer fixed app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      items: [
        {
          icon: 'apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'collections',
          title: 'Closets',
          to: '/closets'
        }
      ],
      miniVariant: false,
      title: 'Aphrodite'
    }
  },
  mounted() {
    this.$store
      .dispatch('initAuth')
      .then(res => {
        if (res.error === false) this.$store.commit('SET_AUTHENTICATED', true)
      })
      .catch(() => {
        this.$store.commit('SET_AUTHENTICATED', false)
        this.$router.push('/auth')
      })
  },
  methods: {
    logout() {
      this.$store
        .dispatch('logout')
        .then(res => {
          this.$store.commit('SET_AUTHENTICATED', false)
          this.$router.push('/auth')
        })
        .catch(() => {
          this.$store.commit('SET_AUTHENTICATED', false)
          this.$router.push('/auth')
        })
    }
  }
}
</script>
