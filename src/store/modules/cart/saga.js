import { call, put, all, takeLatest, select } from 'redux-saga/effects'; // Uma maneira alternativa de se chamar a API pelo Redux Saga, ao inves de api.get
// call eh a chamada da api
// put eh como o saga chama uma action
// all eh um metodo utilizado para exportar como padrao, para cadastrar varios listeners
// takeLatest e takeEvery sao metodos para escutar actions no saga
// takeLatest vai pegar a ultima response, se uma request foi chamada enquanto a anterior nao foi finalizada
// o takeEvery vai pegar e cadastrar todas as vezes que o user clicar no botao, repetidamente em pouco tempo
// select eh usado para acessar o state pelo saga
import { toast } from 'react-toastify'; // importacao da library de apresentacao de mensagens
import api from '../../../services/api';
import { formatPrice } from '../../../util/format';

import { addToCartSucess, updateAmountSucess } from './actions';

import history from '../../../services/history';

// o asterisco eh grudado na function
// isso caracteriza um generator
// generators sao mais potentes que async e await
// essa funcao abaixo sera responsavel por acessar a api, buscar informacoes sobre produtos e cadastrar dentro do carrinho
// ela vai escutar a action e entregar as informacoes para o reducer, fazendo o meio de campo
function* addToCart({ id }) {
  const productExists = yield select(state =>
    state.cart.find(p => p.id === id)
  );

  const stock = yield call(api.get, `stock/${id}`);

  const stockAmount = stock.data.amount;
  const currentAmount = productExists ? productExists.amount : 0;

  const amount = currentAmount + 1;

  if (amount > stockAmount) {
    toast.error('Quantidade solicitada fora de estoque');
    return;
  }

  if (productExists) {
    yield put(updateAmountSucess(id, amount));
  } else {
    const response = yield call(api.get, `/products/${id}`); // yield eh o await do generator
    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price),
    };
    yield put(addToCartSucess(data));
    history.push('/cart'); // vai aguardar o yield finalizar antes de chamar a nova rota
  }
}

function* updateAmount({ id, amount }) {
  if (amount <= 0) {
    toast.error('Quantidade zero nao e permitida');
    return;
  }

  const stock = yield call(api.get, `/stock/${id}`);
  const stockAmount = stock.data.amount;

  if (amount > stockAmount) {
    toast.error('Quantidade solicitada fora de estoque');
    return;
  }

  yield put(updateAmountSucess(id, amount));
}

// listeners
export default all([
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
  // primeira acao eh o type da action que queremos ouvir
  // o segundo parametro eh a funcao aqui dentro do saga que sera executada
]);
