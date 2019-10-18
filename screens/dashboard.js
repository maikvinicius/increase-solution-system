const dashboard = Vue.component('dashboard', {
  template: `
<v-app id="inspire">

    <v-app-bar app clipped-right color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Dashboard</v-toolbar-title>
    </v-app-bar>

    <menu-options :drawer="drawer"></menu-options>

    <v-content>
      <v-container class="fill-height" fluid>
        <v-row justify="center" align="center">
        Dashboard
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
    }
  },
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
        router.push(screen)
      }
    }
  }
});
