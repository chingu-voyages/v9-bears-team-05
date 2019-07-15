<template>
  <v-container fluid grid-list-lg>
    <v-layout wrap>
      <v-dialog v-model="editDialog" max-width="600px">
        <v-card>
          <v-card-title class="headline" primary-title>Edit Cloth</v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout column>
                <v-text-field
                  v-model="clothName"
                  label="Cloth Name"
                  required
                ></v-text-field>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="danger" flat @click="editDialog = false"
              >Cancel</v-btn
            >
            <v-btn color="primary" flat @click="editCloth">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="deleteDialog" max-width="600px">
        <v-card>
          <v-card-title class="headline" primary-title
            >Delete Cloth</v-card-title
          >

          <v-card-text>Are you sure you want to delete?</v-card-text>

          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="danger" flat @click="deleteDialog = false">No</v-btn>
            <v-btn color="primary" flat @click="deleteCloth">Yes</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">New Cloth</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout column>
                <v-text-field
                  v-model="clothName"
                  label="Cloth Name"
                  required
                ></v-text-field>
                <input
                  required
                  type="file"
                  accept="image/*"
                  @change="onImageChange"
                />
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="danger" flat @click="dialog = false">Cancel</v-btn>
            <v-btn color="primary" flat @click="createCloth">Add</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-flex v-for="cloth in clothes" :key="cloth.cloth_id" sm6 xs12 md4>
        <v-card>
          <v-card-title class="headline">{{ cloth.cloth_name }}</v-card-title>
          <v-img :src="cloth.image_url | formatImageUrl" height="200px">
          </v-img>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon ripple @click.stop="setEditDialog(cloth.cloth_id)">
              <v-icon>edit</v-icon>
            </v-btn>
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
        @click.stop="dialog = true"
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
      dialog: false,
      deleteDialog: false,
      editDialog: false,
      clothName: '',
      clothImage: null,
      selectedClothDelete: undefined,
      selectedClothEdit: undefined
    }
  },
  computed: {
    clothes() {
      return [...this.$store.getters.getClothes]
    }
  },
  mounted() {
    this.$store.dispatch('fetchClothes')
  },
  methods: {
    createCloth() {
      this.dialog = false
      this.$store.dispatch('createCloth', {
        name: this.clothName,
        imageFile: this.clothImage
      })
      this.clothName = ''
    },
    setEditDialog(id) {
      this.editDialog = true
      this.selectedClothEdit = id
      const selectedCloth = this.clothes.find(
        cloth => cloth.cloth_id === Number.parseInt(this.selectedClothEdit)
      )
      this.clothName = selectedCloth.cloth_name
    },
    setDeleteDialog(id) {
      this.deleteDialog = true
      this.selectedClothDelete = id
    },
    editCloth() {
      this.editDialog = false
      this.$store.dispatch('editCloth', {
        id: this.selectedClothEdit,
        name: this.clothName
      })
    },
    deleteCloth() {
      this.deleteDialog = false
      this.$store.dispatch('deleteCloth', this.selectedClothDelete)
    },
    onImageChange(event) {
      this.clothImage = event.target.files[0]
    }
  }
}
</script>
