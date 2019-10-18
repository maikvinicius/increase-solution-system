const login = Vue.component('login', {
  template: `
      <v-app id="inspire">
        <v-content>
          <v-container class="fill-height" fluid>
            <v-row justify="center">
              <v-col cols="12" sm="8" md="4">
                <v-card class="elevation-12">
                  <v-toolbar color="primary" dark flat>
                    <v-toolbar-title>Açougue</v-toolbar-title>
                    <div class="flex-grow-1"></div>
                  </v-toolbar>
                  <v-card-text>
                    <v-form>
                      <v-text-field label="Digite seu login" name="login" type="text" v-model="login"></v-text-field>
                      <v-text-field label="Digite sua senha" name="password" type="password" v-model="password"></v-text-field>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn block color="primary" v-on:click="postLogin" :loading="loading">Login</v-btn>
                  </v-card-actions>
                </v-card>
                <div style="margin-top:30px;text-align:center;opacity:0.5;">Increase Solution &copy; 2019</div>
                <v-snackbar v-model="error" color="error" top>
                  {{ errorMessage }}
                  <v-btn color="white" text @click="error = false">
                    X
                  </v-btn>
                </v-snackbar>
              </v-col>
            </v-row>
          </v-container>
        </v-content>
      </v-app>
  `,
  data: function () {
    return {
      login: '',
      password: '',
      loading: false,
      error: false,
      errorMessage: ''
    }
  },
  methods: {
    postLogin() {
      this.loading = true;
      api.postLogin(this.login, this.password).then((result)=>{
        if(result.success){
          router.push('dashboard') 
        } else {
          this.errorMessage = result.message;
          this.error = true;
        }
        this.loading = false;
      });
    }
  }
});
