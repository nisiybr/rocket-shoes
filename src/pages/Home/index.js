import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; //
import { connect } from 'react-redux'; // Conecta o componente com o estado do redux
import { MdAddShoppingCart } from 'react-icons/md';
import { ProductList } from './styles';
import api from '../../services/api';
import { formatPrice } from '../../util/format';

import * as CartActions from '../../store/modules/cart/actions'; /** o asterisco importa todas as functions */

class Home extends Component {
  state = {
    products: [],
  };

  async componentDidMount() {
    const response = await api.get('/products');

    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));

    this.setState({
      products: data,
    });
  }

  handleAddProduct = id => {
    // dispatch serve para disparar uma acao para o redux
    // as actions alteram os states dos reducers dentro do redux
    const { addToCartRequest } = this.props; // this.props so vai ter acesso ao dispatch quando utilizado o export defaul connect

    addToCartRequest(id);
  };

  render() {
    const { products } = this.state;
    const { amount } = this.props; // no mapStateToProps, amout eh jogado em props
    return (
      <ProductList>
        {products.map(product => (
          <li key={String(product.id)}>
            <img src={product.image} alt={product.title} />
            <strong>{product.title}</strong>
            <span>{product.priceFormatted}</span>
            <button
              type="button"
              onClick={() => this.handleAddProduct(product.id)}
            >
              <div>
                <MdAddShoppingCart size={16} color="#FFF" />
                {amount[product.id] || 0}
              </div>
              <span>ADICIONAR AO CARRINHO</span>
            </button>
          </li>
        ))}
      </ProductList>
    );
  }
}
const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product) => {
    // amount recebe a qtd no carrinho e product recebe o produto
    amount[product.id] = product.amount;
    return amount;
  }, {}), // amount comeca como um obj vazio
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);
// converte actions em propriedades do nosso componente

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home); // O export defaul eh jogado aqui para baixo com uma funcao connect
