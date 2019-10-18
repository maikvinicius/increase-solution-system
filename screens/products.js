const products = Vue.component('products', {
  template: `
<v-app id="inspire">

    <v-app-bar app clipped-right color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Produtos</v-toolbar-title>
    </v-app-bar>

    <menu-options :drawer="drawer"></menu-options>

    <v-content>
      <v-container class="fill-height" fluid>
        <v-row justify="center" align="center">
          
          <v-card style="width: 80vw; height: 80vh; overflow: auto;">
            <v-card-title>
              Produtos
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="fa-search" label="Pesquisa" single-line hide-details></v-text-field>
            </v-card-title>
            <v-data-table :headers="headers" :items="products" :search="search" :loading="loading">
              <template v-slot:top>
        <v-toolbar flat color="white">
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">Novo</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
  
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field v-model="editedItem.name" label="Nome"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="editedItem.quantity" label="Quantidade"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="editedItem.price" label="Preço"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
  
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                <v-btn color="blue darken-1" text @click="save" :loading="saveLoading">Salvar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon @click="editItem(item)">mdi-pen</v-icon>
        <v-icon class="mr-2" small @click="deleteItem(item)">fa-trash</v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
            </v-data-table>
          </v-card>

        </v-row>
      </v-container>
    </v-content>

    <v-footer app color="primary" class="white--text">
      <span>Increase Solution</span>
      <v-spacer></v-spacer>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
`,
  data: function () {
    return {
      drawer: false,
      dialog: false,
      products: [],
      search: '',
      headers: [
        { text: 'Nome', align: 'left', sortable: false, value: 'name' },
        { text: 'Quantidade', value: 'quantity' },
        { text: 'Preço / kg', value: 'price' },
        { text: 'Actions', value: 'action', sortable: false },
      ],
      loading: false,
      editedIndex: -1,
      editedItem: {
        id: 0,
        name: '',
        quantity: 0,
        price: '',
      },
      defaultItem: {
        id: 0,
        name: '',
        quantity: 0,
        price: '',
      },
      saveLoading: false,
    }
  },
  mounted: function () {
    this.getProducts();
  },
  methods: {

    getProducts() {
      this.loading = true;
      api.getProducts().then((result)=>{
        if(result.success){
          this.products = result.data
          this.loading = false;
        }
      });
    },

    editItem (item) {
        this.editedIndex = this.products.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.loading = true;
        const index = this.products.indexOf(item)
        const id = item.id
        const deletar = confirm('Você tem certeza que deseja deletar este item?')
        if(deletar){
          api.deleteProduct(id).then((result)=>{
            if(result.success){
              this.products.splice(index, 1) 
            }
            this.loading = false;
          });
        } else {
          this.loading = false;
        }
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        this.saveLoading = true;
        if (this.editedIndex > -1) {
          api.putProduct(this.editedItem).then((result)=>{
            if(result.success){
              Object.assign(this.products[this.editedIndex], this.editedItem)
              this.saveLoading = false;
              this.close()
            }
          });
        } else {
          api.postProduct(this.editedItem).then((result)=>{
            if(result.success){
              this.products.push(this.editedItem)
              this.saveLoading = false;
              this.close()
            }
          });
        }
      },

  }
});

// console.log(router);
