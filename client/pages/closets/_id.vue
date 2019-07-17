<template>
  <v-container fluid grid-list-lg>
    <v-layout wrap>
      <v-dialog v-model="deleteDialog" max-width="600px">
        <v-card>
          <v-card-title class="headline" primary-title
            >Remove Cloth</v-card-title
          >
          <v-card-text
            >Are you sure you want to remove this cloth from the
            closet?</v-card-text
          >
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="danger" flat @click="deleteDialog = false">No</v-btn>
            <v-btn color="primary" flat @click="removeCloth">Yes</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="addDialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Add Cloth</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout column>
                <v-select
                  v-model="selectedClothes"
                  clearable
                  multiple
                  chips
                  :items="clothes"
                  item-text="cloth_name"
                  item-value="cloth_id"
                  label="Select Clothes"
                ></v-select>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="danger" flat @click="addDialog = false">Cancel</v-btn>
            <v-btn color="primary" flat @click="addCloth">Add</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-flex
        v-for="cloth in relationalClothes"
        :key="cloth.cloth_id"
        sm6
        xs12
        md4
      >
        <v-card>
          <v-card-title class="headline">{{ cloth.cloth_name }}</v-card-title>
          <v-img
            :src="cloth.image_url | formatImageUrl"
            contain
            aspect-ratio="1.5"
          ></v-img>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon ripple @click.stop="setDeleteDialog(cloth.cloth_id)">
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
      selectedClothes: [],
      deleteDialog: false,
      addDialog: false,
      selectedClothDelete: undefined
    }
  },
  computed: {
    relationalClothes() {
      return [
        ...this.$store.getters.getRelationalClothes(this.$route.params.id)
      ]
    },
    clothes() {
      return [...this.$store.getters.getClothes]
    }
  },
  mounted() {
    this.$store.dispatch('fetchRelationalClothes', this.$route.params.id)
    this.$store.dispatch('fetchClothes')
  },
  methods: {
    setAddDialog() {
      this.addDialog = true
      this.selectedClothes = []
    },
    setDeleteDialog(id) {
      this.deleteDialog = true
      this.selectedClothDelete = id
    },
    removeCloth() {
      this.deleteDialog = false
      this.$store.dispatch('removeRelationalCloth', {
        closetId: this.$route.params.id,
        clothId: this.selectedClothDelete
      })
    },
    addCloth() {
      this.addDialog = false
      this.$store.dispatch('addRelationalCloth', {
        closetId: this.$route.params.id,
        clothIds: this.selectedClothes
      })
    }
  }
}
</script>
