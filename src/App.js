import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux'; // Deixa disponivel o store da aplicacao para todos os componentes, jogar por volta de todos os componentes da aplicacao
import { ToastContainer } from 'react-toastify'; // Mensagens com boa aparencia
import './config/ReactotronConfig';

import GlobalStyle from './styles/global';
import Header from './components/Header';
import Routes from './routes';
import history from './services/history';
import store from './store';

function App() {
  return (
    /** Router foi chamado aqui, porque futuramente o header vai
      precisar ter acesso as rotas tambem */
    <Provider store={store}>
      {/** passar o store criado na pasta store como parametro para provider */}
      <Router history={history}>
        {/** vai auxiliar a navegacao */}
        <Header />
        <Routes />
        <GlobalStyle />
        <ToastContainer autoClose={3000} />
        {/** autoclose determina o tempo em milisegundos que a mensagem ficara visivel */}
      </Router>
    </Provider>
  );
}

export default App;
