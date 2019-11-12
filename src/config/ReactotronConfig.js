import Reactotron from 'reactotron-react-js';
import { reactotronRedux } from 'reactotron-redux';
import reactotronSaga from 'reactotron-redux-saga'; // importando reactotron para Redux Saga

if (process.env.NODE_ENV === 'development') {
  // quando for rodada a build nao vai ter essa variavel entao nao caira nesse if
  const tron = Reactotron.configure()
    .use(reactotronRedux()) // usar o reactotron para debuggar redux
    .use(reactotronSaga()) // usar o reactotron para debugar redux saga

    .connect();

  tron.clear();

  console.tron = tron;
}
