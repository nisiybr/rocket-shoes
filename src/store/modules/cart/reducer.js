import produce from 'immer'; // importar o produce do immer que ajuda a tratar objetos e arrays imutaveis
import { toast } from 'react-toastify';

// declaracao do primeiro reducer
// todos os reducers escutam todas as actions, por isso devemos tratar somente das actions de cada reducer especifico
export default function cart(state = [], action) {
  // todo reducer recebe uma variavel state e uma variavel action
  // state eh o estado anterior, ou seja, eh onde iremos armazenar ou retirar informacoes contidas na action
  switch (action.type) {
    case '@cart/ADD_SUCCESS':
      // retorna o estado modificado da maneira que quiser
      return produce(state, draft => {
        const { product } = action;
        draft.push(product);
      });
    case '@cart/REMOVE':
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.id);
        console.tron.log(draft);
        console.tron.log(action.id);

        if (productIndex >= 0) {
          draft.splice(productIndex, 1);
        }
      });
    case '@cart/UPDATE_AMOUNT_SUCCESS': {
      toast.warn('Tentou atualizar');
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.id);

        if (productIndex >= 0) {
          draft[productIndex].amount = Number(action.amount);
        }
      });
    }
    default:
      return state; // devolve o state sem modificar nada
  }
}
