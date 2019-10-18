var logged_user = null;

function mockasync (data, error) {
   const time = 1000
  return new Promise((resolve, reject) => {
      if(data){
          setTimeout(() => resolve({success: true, data: data}), time)
      } else {
          setTimeout(() => resolve({success: false, message: error}), time)
      }
  })
}

const api = {
    postLogin(username, password){
        if(username && password){
            logged_user = {
                id: 1,
                username: username,
                name: 'Maik Vinícius',
                email: 'maikmv.mv@gmail.com'
            };
            return mockasync(logged_user);
        }
        logged_user = null;
        return mockasync(null, error_login);
    },
    logout(){
        logged_user = null;
        return mockasync({});
    },
    getProducts(){
        const products = [
            { id: 1, name: 'Costela de porco', quantity: 10, price: 'R$ 50,00' },
            { id: 2, name: 'Costela de frango', quantity: 5, price: 'R$ 50,00' },
            { id: 3, name: 'Patinho', quantity: 5, price: 'R$ 25,00' },
        ]
        return mockasync(products);
    },
    postProduct(product){
        return mockasync(product);
    },
    putProduct(product){
        return mockasync(product);
    },
    deleteProduct(id){
        return mockasync(id);
    },
};
