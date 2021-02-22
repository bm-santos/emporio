/* eslint-disable @typescript-eslint/no-unused-vars */
/*
Descrição do projeto:
https://gist.github.com/jenicarvalho/274b60a7c7b4266bbaffc77971fdcb4b

json-server db.json -m ./node_modules/json-server-auth -r routes.json --port 4000

*/
import React from 'react';
import ReactDOM from 'react-dom';
import './Styles/style.css';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import { store } from './store';
import { Provider } from 'react-redux'


ReactDOM.render(
  <React.StrictMode>
    <div className="fundo-de-tela">
      <Provider store={store}>
        <BrowserRouter>

          <Routes />
        </BrowserRouter>
      </Provider>
    </div>
  </React.StrictMode >,
  document.getElementById('root')
);
