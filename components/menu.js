var menuActive = '';
Vue.component('menu-options', {
  template: `
<v-navigation-drawer v-model="drawer" app>
      <v-list dense>

        <v-list-item v-on:click="goTo('dashboard')">
          <v-list-item-action>
            <v-icon>fa-tachometer-alt</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-on:click="goTo('products')">
          <v-list-item-action>
            <v-icon>fa-clipboard-list</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Produtos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-on:click="goTo('logout')">
          <v-list-item-action>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Sair</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>
    `,
    props: ['drawer'],
  methods: {
    goTo(screen) {
      if(screen === 'logout'){
        api.logout().then((result)=>{
          if(result.success){
            return;
          }
        });
        router.push('/');
      } else{
        if(menuActive != screen){
          router.push(screen)
        }
        menuActive = screen
      }
    }
  }
});
