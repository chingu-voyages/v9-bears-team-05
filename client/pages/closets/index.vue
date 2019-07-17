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
              <span class="headline">New Closet</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout column>
                  <v-text-field
                    v-model="closetName"
                    label="Closet Name"
                    required
                  ></v-text-field>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="danger" flat @click="dialog = false">Cancel</v-btn>
              <v-btn color="primary" flat @click="createCloset">Add</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-card>
          <v-container>
            <v-card-title class="headline">Closets</v-card-title>
            <v-card-text>
              <v-list two-line>
                <v-dialog v-model="editDialog" max-width="600px">
                  <v-card>
                    <v-card-title class="headline" primary-title
                      >Edit Closet</v-card-title
                    >
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout column>
                          <v-text-field
                            v-model="closetName"
                            label="Closet Name"
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
                      <v-btn color="primary" flat @click="editCloset"
                        >Save</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="deleteDialog" max-width="600px">
                  <v-card>
                    <v-card-title class="headline" primary-title
                      >Delete Closet</v-card-title
                    >

                    <v-card-text>Are you sure you want to delete?</v-card-text>

                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="danger" flat @click="deleteDialog = false"
                        >No</v-btn
                      >
                      <v-btn color="primary" flat @click="deleteCloset"
                        >Yes</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <template v-for="closet in closets">
                  <v-list-tile
                    :key="`avatar_${closet.closet_id}`"
                    avatar
                    @click.stop="toCloset(closet.closet_id)"
                  >
                    <v-list-tile-avatar color="red">
                      <span class="white--text headline">
                        {{ closet.closet_name[0] }}
                      </span>
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                      <v-list-tile-title>{{
                        closet.closet_name
                      }}</v-list-tile-title>
                      <v-list-tile-sub-title>
                        {{
                          `
                        ${closet.clothes_count} ${
                            closet.clothes_count === '1' ? 'cloth' : 'clothes'
                          }
                        `
                        }}
                      </v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-btn
                        icon
                        ripple
                        @click.stop="setEditDialog(closet.closet_id)"
                      >
                        <v-icon color="grey lighten-1">edit</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                    <v-list-tile-action>
                      <v-btn
                        icon
                        ripple
                        @click.stop="setDeleteDialog(closet.closet_id)"
                      >
                        <v-icon color="grey lighten-1">delete</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                  </v-list-tile>

                  <v-divider
                    :key="`divider_${closet.closet_id}`"
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
    formatCategories(value) {
      return value === 1 ? '1 category,' : `${value} categories,`
    }
  },
  data() {
    return {
      dialog: false,
      deleteDialog: false,
      editDialog: false,
      closetName: '',
      selectedClosetDelete: undefined,
      selectedClosetEdit: undefined
    }
  },
  computed: {
    closets: {
      get() {
        return [...this.$store.getters.getClosets]
      },
      set(value) {
        alert(value)
      }
    },
    closetList() {
      return this.closets.filter(closet => !closet.parent_closet)
    },
    newClosetPayload() {
      const payload = {}
      payload.name = this.closetName
      payload.parentId = undefined
      return payload
    }
  },
  mounted() {
    this.$store.dispatch('fetchClosets')
  },
  methods: {
    createCloset() {
      this.dialog = false
      this.$store.dispatch('createCloset', this.newClosetPayload)
      this.closetName = ''
    },
    setEditDialog(id) {
      this.editDialog = true
      this.selectedClosetEdit = id
      const selectedCloset = this.closets.find(
        closet => closet.closet_id === Number.parseInt(this.selectedClosetEdit)
      )
      this.closetName = selectedCloset.closet_name
    },
    setDeleteDialog(id) {
      this.deleteDialog = true
      this.selectedClosetDelete = id
    },
    editCloset() {
      this.editDialog = false
      this.$store.dispatch('editCloset', {
        id: this.selectedClosetEdit,
        name: this.closetName
      })
    },
    deleteCloset() {
      this.deleteDialog = false
      this.$store.dispatch('deleteCloset', this.selectedClosetDelete)
    },
    toCloset(id) {
      this.$router.push(`/closets/${id}`)
    }
  }
}
</script>
