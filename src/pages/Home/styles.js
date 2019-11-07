import styled from 'styled-components';
import { darken } from 'polished';

export const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(
    3,
    1fr
  ); /** Para 3  espacamentos com uma largura igual */
  grid-gap: 20px; /** distancia entre os produtos */
  list-style: none; /** retira as bolinhas */

  li {
    /** lis dentro da ul */
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 4px;
    padding: 20px;

    img {
      /** imagem dentro da li */
      align-self: center;
      max-width: 250px;
    }

    > strong {
      /** O sinal > define que so vai funcionar em strong dentro da li */
      font-size: 16 px;
      line-height: 20px;
      color: #333;
      margin-top: 5px;
    }

    > span {
      font-size: 21px;
      font-weight: bold;
      margin: 5px 0 20px;
    }

    button {
      background: #7159c1;
      color: #fff;
      border: 0;
      border-radius: 4px;
      overflow: hidden;
      margin-top: auto; /** alinha o botao o mais embaixo possivel */

      display: flex;
      align-items: center;
      transition: background 0.2s;

      &:hover {
        background: ${darken(
          0.03,
          '#7159c1'
        )}; /** da biblioteca polished, escurece 3% da cor */
      }

      div {
        display: flex;
        align-items: center;
        padding: 12px;
        background: rgba(0, 0, 0, 0.1);

        svg {
          margin-right: 5px;
        }
      }
      span {
        flex: 1;
        text-align: center;
        font-weight: bold;
      }
    }
  }
`;
