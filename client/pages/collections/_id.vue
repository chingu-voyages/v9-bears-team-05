<template>
  <v-container fluid grid-list-lg>
    <v-layout wrap>
      <v-dialog v-model="deleteDialog" max-width="600px">
        <v-card>
          <v-card-title class="headline" primary-title
            >Remove Look</v-card-title
          >
          <v-card-text>
            Are you sure you want to remove this look from the collection?
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="danger" flat @click="deleteDialog = false">No</v-btn>
            <v-btn color="primary" flat @click="removeLook">Yes</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="addDialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Add Look</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout column>
                <v-select
                  v-model="selectedLooks"
                  clearable
                  multiple
                  chips
                  :items="looks"
                  item-text="style_name"
                  item-value="style_id"
                  label="Select Looks"
                ></v-select>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="danger" flat @click="addDialog = false">Cancel</v-btn>
            <v-btn color="primary" flat @click="addLook">Add</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-flex v-for="look in relationalLooks" :key="look.style_id" sm6 xs12 md4>
        <v-card>
          <v-card-title class="headline">{{ look.style_name }}</v-card-title>
          <v-img
            :src="look.image_url | formatImageUrl"
            contain
            aspect-ratio="1.5"
          ></v-img>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon ripple @click.stop="setDeleteDialog(look.style_id)">
              <v-icon>delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-btn
        color="pink"
        dark
        fixed
        bottom
        right
        fab
        @click.stop="setAddDialog"
      >
        <v-icon>add</v-icon>
      </v-btn>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  filters: {
    formatImageUrl(url) {
      if (url.startsWith('https://')) {
        return url
      }
      return 'https://aphrodite-bucket.s3.ap-south-1.amazonaws.com/' + url
    }
  },
  data() {
    return {
      selectedLooks: [],
      deleteDialog: false,
      addDialog: false,
      selectedLookDelete: undefined
    }
  },
  computed: {
    relationalLooks() {
      return [...this.$store.getters.getRelationalLooks(this.$route.params.id)]
    },
    looks() {
      return [...this.$store.getters.getLooks]
    }
  },
  mounted() {
    this.$store.dispatch('fetchRelationalLooks', this.$route.params.id)
    this.$store.dispatch('fetchLooks')
  },
  methods: {
    setAddDialog() {
      this.addDialog = true
      this.selectedLooks = []
    },
    setDeleteDialog(id) {
      this.deleteDialog = true
      this.selectedLookDelete = id
    },
    removeLook() {
      this.deleteDialog = false
      this.$store.dispatch('removeRelationalLook', {
        collectionId: this.$route.params.id,
        lookId: this.selectedLookDelete
      })
    },
    addLook() {
      this.addDialog = false
      this.$store.dispatch('addRelationalLook', {
        collectionId: this.$route.params.id,
        lookIds: this.selectedLooks
      })
    }
  }
}
</script>

<style lang="stylus">
.canvas-card {
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
