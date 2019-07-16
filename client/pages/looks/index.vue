<template>
  <v-container fluid grid-list-lg>
    <v-layout wrap>
      <v-dialog v-model="deleteDialog" max-width="600px">
        <v-card>
          <v-card-title class="headline" primary-title
            >Delete Look</v-card-title
          >
          <v-card-text>Are you sure you want to delete?</v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="danger" flat @click="deleteDialog = false">No</v-btn>
            <v-btn color="primary" flat @click="deleteLook">Yes</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="dialog = false">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title
              >{{ isCreateMode ? 'New' : 'Edit' }} Look</v-toolbar-title
            >
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark flat @click="modalAction">
                {{ isCreateMode ? 'Add' : 'Save' }}
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-container fluid grid-list-lg>
            <v-layout wrap>
              <v-flex xs12 md6>
                <v-card>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout column>
                        <v-text-field
                          v-model="lookName"
                          label="Look Name"
                          required
                        ></v-text-field>
                        <v-select
                          v-model="inputClothes"
                          :items="clothes"
                          item-text="cloth_name"
                          item-value="cloth_id"
                          label="Select Clothes"
                          multiple
                          chips
                        ></v-select>
                      </v-layout>
                    </v-container>
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md6>
                <v-card class="canvas-card">
                  <v-stage
                    ref="stage"
                    :config="stageSize"
                    @mousedown="handleStageMouseDown"
                  >
                    <v-layer ref="layer">
                      <v-image
                        v-for="image in canvasImages"
                        :key="image.name"
                        :config="image"
                      />
                      <v-transformer ref="transformer" />
                    </v-layer>
                  </v-stage>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-dialog>
      <v-flex v-for="look in looks" :key="look.style_id" sm6 xs12 md4>
        <v-card>
          <v-card-title class="headline">{{ look.style_name }}</v-card-title>
          <v-img
            :src="look.image_url | formatImageUrl"
            contain
            aspect-ratio="1.5"
          ></v-img>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon ripple @click.stop="setEditDialog(look.style_id)">
              <v-icon>edit</v-icon>
            </v-btn>
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
        @click.stop="setCreateDialog"
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
      inputClothes: [],
      states: ['1', '2', '3'],
      mode: 'create',
      dialog: false,
      deleteDialog: false,
      lookName: '',
      imageFile: undefined,
      selectedLookDelete: undefined,
      selectedLookEdit: undefined,
      stageSize: {
        width: 400,
        height: 600
      },
      selectedShapeName: ''
    }
  },
  computed: {
    looks() {
      return [...this.$store.getters.getLooks]
    },
    clothes() {
      return [...this.$store.getters.getClothes]
    },
    isCreateMode() {
      return this.mode === 'create'
    },
    selectedClothes() {
      return this.clothes.filter(cloth =>
        this.inputClothes.includes(cloth.cloth_id)
      )
    },
    canvasImages() {
      return this.selectedClothes.map(cloth => {
        const image = new window.Image()
        image.crossOrigin = 'Anonymous'
        // image.setAttribute('crossOrigin', 'anonymous')
        image.src = this.$options.filters.formatImageUrl(cloth.image_url)
        return {
          image: image,
          name: `cloth_${cloth.cloth_id}`,
          draggable: true
        }
      })
    }
  },
  mounted() {
    this.$store.dispatch('fetchLooks')
    this.$store.dispatch('fetchClothes')
  },
  methods: {
    modalAction() {
      this.$refs.stage.getStage().toDataURL({
        callback: this.imageCallback,
        pixelRatio: 2
      })
    },
    imageCallback(image) {
      this.imageFile = image
      if (this.isCreateMode) {
        this.createLook()
      } else {
        this.editLook()
      }
    },
    createLook() {
      this.dialog = false
      this.$store.dispatch('createLook', {
        name: this.lookName,
        imageFile: this.imageFile
      })
      this.lookName = ''
    },
    setCreateDialog() {
      this.mode = 'create'
      this.lookName = ''
      this.dialog = true
    },
    setEditDialog(id) {
      this.mode = 'edit'
      this.dialog = true
      this.selectedLookEdit = id
      const selectedLook = this.looks.find(
        look => look.style_id === Number.parseInt(this.selectedLookEdit)
      )
      this.lookName = selectedLook.style_name
    },
    setDeleteDialog(id) {
      this.deleteDialog = true
      this.selectedLookDelete = id
    },
    editLook() {
      this.dialog = false
      this.$store.dispatch('editLook', {
        id: this.selectedLookEdit,
        name: this.lookName,
        imageFile: this.imageFile
      })
    },
    deleteLook() {
      this.deleteDialog = false
      this.$store.dispatch('deleteLook', this.selectedLookDelete)
    },
    handleStageMouseDown(e) {
      // clicked on stage - cler selection
      if (e.target === e.target.getStage()) {
        this.selectedShapeName = ''
        this.updateTransformer()
        return
      }

      // clicked on transformer - do nothing
      const clickedOnTransformer =
        e.target.getParent().className === 'Transformer'
      if (clickedOnTransformer) {
        return
      }

      // find clicked rect by its name
      const name = e.target.name()
      const image = this.canvasImages.find(r => r.name === name)
      if (image) {
        this.selectedShapeName = name
      } else {
        this.selectedShapeName = ''
      }
      this.updateTransformer()
    },
    updateTransformer() {
      // here we need to manually attach or detach Transformer node
      const transformerNode = this.$refs.transformer.getStage()
      const stage = transformerNode.getStage()
      const { selectedShapeName } = this

      const selectedNode = stage.findOne('.' + selectedShapeName)
      // do nothing if selected node is already attached
      if (selectedNode === transformerNode.node()) {
        return
      }

      if (selectedNode) {
        // attach to another node
        transformerNode.attachTo(selectedNode)
      } else {
        // remove transformer
        transformerNode.detach()
      }
      transformerNode.getLayer().batchDraw()
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
