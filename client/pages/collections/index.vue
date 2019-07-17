<template>
  <v-container>
    <v-layout column justify-center>
      <v-flex xs12 sm8 md6>
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on }">
            <v-btn color="pink" dark fixed bottom right fab v-on="on">
              <v-icon>add</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">New Collection</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout column>
                  <v-text-field
                    v-model="collectionName"
                    label="Collection Name"
                    required
                  ></v-text-field>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="danger" flat @click="dialog = false">Cancel</v-btn>
              <v-btn color="primary" flat @click="createCollection">Add</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-card>
          <v-container>
            <v-card-title class="headline">Collections</v-card-title>
            <v-card-text>
              <v-list two-line>
                <v-dialog v-model="editDialog" max-width="600px">
                  <v-card>
                    <v-card-title class="headline" primary-title
                      >Edit Collection</v-card-title
                    >
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout column>
                          <v-text-field
                            v-model="collectionName"
                            label="Collection Name"
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
                      <v-btn color="primary" flat @click="editCollection"
                        >Save</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="deleteDialog" max-width="600px">
                  <v-card>
                    <v-card-title class="headline" primary-title
                      >Delete Collection</v-card-title
                    >

                    <v-card-text>Are you sure you want to delete?</v-card-text>

                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="danger" flat @click="deleteDialog = false"
                        >No</v-btn
                      >
                      <v-btn color="primary" flat @click="deleteCollection"
                        >Yes</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <template v-for="collection in collections">
                  <v-list-tile
                    :key="`avatar_${collection.collection_id}`"
                    avatar
                    @click.stop="toCollection(collection.collection_id)"
                  >
                    <v-list-tile-avatar color="red">
                      <span class="white--text headline">
                        {{ collection.collection_name[0] }}
                      </span>
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                      <v-list-tile-title>{{
                        collection.collection_name
                      }}</v-list-tile-title>
                      <v-list-tile-sub-title>{{
                        collection.looks_count | formatLooks
                      }}</v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-btn
                        icon
                        ripple
                        @click.stop="setEditDialog(collection.collection_id)"
                      >
                        <v-icon color="grey lighten-1">edit</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                    <v-list-tile-action>
                      <v-btn
                        icon
                        ripple
                        @click.stop="setDeleteDialog(collection.collection_id)"
                      >
                        <v-icon color="grey lighten-1">delete</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                  </v-list-tile>

                  <v-divider
                    :key="`divider_${collection.collection_id}`"
                    inset
                  ></v-divider>
                </template>
              </v-list>
            </v-card-text>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  filters: {
    formatLooks(value) {
      return value === '1' ? '1 look' : `${value} looks`
    }
  },
  data() {
    return {
      dialog: false,
      deleteDialog: false,
      editDialog: false,
      collectionName: '',
      selectedCollectionDelete: undefined,
      selectedCollectionEdit: undefined
    }
  },
  computed: {
    collections() {
      return [...this.$store.getters.getCollections]
    }
  },
  mounted() {
    this.$store.dispatch('fetchCollections')
  },
  methods: {
    createCollection() {
      this.dialog = false
      this.$store.dispatch('createCollection', this.collectionName)
      this.collectionName = ''
    },
    setEditDialog(id) {
      this.editDialog = true
      this.selectedCollectionEdit = id
      const selectedCollection = this.collections.find(
        collection =>
          collection.collection_id ===
          Number.parseInt(this.selectedCollectionEdit)
      )
      this.collectionName = selectedCollection.collection_name
    },
    setDeleteDialog(id) {
      this.deleteDialog = true
      this.selectedCollectionDelete = id
    },
    editCollection() {
      this.editDialog = false
      this.$store.dispatch('editCollection', {
        id: this.selectedCollectionEdit,
        name: this.collectionName
      })
    },
    deleteCollection() {
      this.deleteDialog = false
      this.$store.dispatch('deleteCollection', this.selectedCollectionDelete)
    },
    toCollection(id) {
      this.$router.push(`/collections/${id}`)
    }
  }
}
</script>
