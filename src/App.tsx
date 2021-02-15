/*
Descrição do projeto:
https://gist.github.com/jenicarvalho/274b60a7c7b4266bbaffc77971fdcb4b

json-server db.json -m ./node_modules/json-server-auth -r routes.json --port 4000

*/

import React from 'react';
import { store } from './store/ducks/carrinho';
import { Provider } from 'react-redux'
import Routes from './routes';


function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
