import React from 'react';
import { Link } from 'react-router-dom';
import { MdShoppingBasket } from 'react-icons/md';
import { connect } from 'react-redux';
import logo from '../../assets/images/logo.svg';
import { Container, Cart } from './styles';

function Header({ cart, cartSize }) {
  // recebe o reducer como parametro
  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="RocketShoes" />
      </Link>

      <Cart to="/cart">
        <div>
          <strong>Meu carrinho</strong>
          <span>{cartSize} itens</span>
        </div>
        <MdShoppingBasket size={36} color="#FFF" />
      </Cart>
    </Container>
  );
}

export default connect(state => ({
  cart: state.cart, // state.cart eh o nome do reducer que se quer acessar, dentro de rootReducer
  cartSize: state.cart.length,
}))(Header);
// connect pode receber um parametro
// parenteses e chaves sao utilidos para o retorno de um objeto
// toda vez que usar o connect e o state mudar ele refaz a renderizacao do componente do zero
