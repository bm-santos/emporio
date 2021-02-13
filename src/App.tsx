/*
Descrição do projeto:
https://gist.github.com/jenicarvalho/274b60a7c7b4266bbaffc77971fdcb4b
*/

import React from 'react';
import './App.css';
import { store } from './store/ducks/carrinho';
import { Provider } from 'react-redux'
import Routes from './routes';
import Footer from './components/Footer';


function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
