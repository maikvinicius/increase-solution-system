// const teste = {
    //   props: ['todos'],
    //   template: `<teste :todos="todos"></teste>`
    // }

    // const todos = [
    //   {text: 'teste'},
    //   {text: 'teste'},
    // ]

    const routes = [
      {path: '/', component: login},
      {path: '/dashboard', component: dashboard},
      {path: '/products', component: products},
      // {path: '/dashboard', component: teste, props: {todos: todos}}
    ]

    const router = new VueRouter({
      routes
    })
