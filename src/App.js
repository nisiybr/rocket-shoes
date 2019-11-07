import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'; // Deixa disponivel o store da aplicacao para todos os componentes, jogar por volta de todos os componentes da aplicacao
import GlobalStyle from './styles/global';
import Header from './components/Header';
import Routes from './routes';

import store from './store';

function App() {
  return (
    /** BrowserRouter foi chamado aqui, porque futuramente o header vai
      precisar ter acesso as rotas tambem */
    <Provider store={store}>
      {/** passar o store criado na pasta store como parametro para provider */}
      <BrowserRouter>
        <Header />
        <Routes />
        <GlobalStyle />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
