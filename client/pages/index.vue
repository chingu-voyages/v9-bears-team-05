<template>
  <v-container fluid grid-list-lg>
    <v-layout column>
      <v-flex xs12>
        <v-card>
          <v-container fuild>
            <v-layout align-center justify-space-between>
              <v-avatar size="80">
                <img
                  v-if="user.avatar_url"
                  :src="user.avatar_url"
                  :alt="`${user.first_name} ${user.last_name}`"
                />
                <v-icon v-else size="80" color="red">account_circle</v-icon>
              </v-avatar>
              <div class="headline">
                Welcome,
                <br />
                {{ user.first_name }}
                {{ user.last_name }}
              </div>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card>
          <v-container fluid grid-list-lg>
            <v-layout row wrap justify-center>
              <v-flex xs12 sm8 md6>
                <v-card color="cyan darken-1" class="white--text">
                  <v-card-title primary-title>
                    <div>
                      <div class="headline">{{ closetsCount }} Closets</div>
                      <span>
                        Always know what's in your closet with a searchable
                        catalog of your real clothes
                      </span>
                    </div>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn flat dark to="/closets">Go</v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
              <v-flex xs12 sm8 md6>
                <v-card color="purple darken-1" class="white--text">
                  <v-card-title primary-title>
                    <div>
                      <div class="headline">
                        {{ collectionsCount }} Collections
                      </div>
                      <span
                        >Create a visual list for upcoming trips by organizing
                        outfits and clothing items into collections</span
                      >
                    </div>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn flat dark to="/collections">Go</v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
              <v-flex xs12 sm8 md6>
                <v-card color="green darken-1" class="white--text">
                  <v-card-title primary-title>
                    <div>
                      <div class="headline">{{ looksCount }} Looks</div>
                      <span>
                        Make outfit collages with your own clothes - just like
                        in your favorite magazines - anywhere, anytime!
                      </span>
                    </div>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn flat dark to="/looks">Go</v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
              <v-flex xs12 sm8 md6>
                <v-card color="orange darken-1" class="white--text">
                  <v-card-title primary-title>
                    <div>
                      <div class="headline">{{ clothesCount }} Clothes</div>
                      <span>
                        Add photos of your own clothes from the built-in camera,
                        your photo library, or using copy-and-paste
                      </span>
                    </div>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn flat dark to="/clothes">Go</v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState([
      'user',
      'closetsCount',
      'collectionsCount',
      'looksCount',
      'clothesCount'
    ])
  },
  mounted() {
    this.$store.dispatch('fetchUserData')
  }
}
</script>
