import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchExchangeRatesThunk } from '../actions';

class Form extends React.Component {
  state = {
    inputValue: 0,
    description: '',
    selectCurrencie: 'ARS',
    method: 'Cartão de crédito',
    tag: 'Lazer',
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  submitExpense = (e) => {
    e.preventDefault();
    const { currentId, func } = this.props;
    const { inputValue, description, selectCurrencie, method, tag } = this.state;
    const savedExpense = {
      id: currentId,
      value: inputValue,
      description,
      currency: selectCurrencie,
      method,
      tag,
    };
    func(savedExpense);
    this.setState({ inputValue: 0 });
  }

  render() {
    const { currencies } = this.props;
    const { inputValue, description, selectCurrencie, method, tag } = this.state;
    return (
      <form onSubmit={ this.submitExpense }>
        <label htmlFor="input-expense">
          Valor:
          <input
            type="number"
            value={ inputValue }
            name="inputValue"
            id="input-expense"
            data-testid="value-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="input-description">
          Descrição:
          <input
            type="text"
            id="input-description"
            name="description"
            value={ description }
            data-testid="description-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="input-currencie">
          Moeda:
          <select
            id="input-currencie"
            name="selectCurrencie"
            value={ selectCurrencie }
            onChange={ this.handleChange }
          >
            {
              currencies.map((currencie) => (
                <option key={ currencie } value={ currencie }>{currencie}</option>
              ))
            }
          </select>
        </label>
        <label htmlFor="input-method">
          Método de pagamento:
          <select
            data-testid="method-input"
            id="input-method"
            value={ method }
            name="method"
            onChange={ this.handleChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="input-tag">
          Categoria:
          <select
            data-testid="tag-input"
            value={ tag }
            id="input-tag"
            name="tag"
            onChange={ this.handleChange }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button type="submit">Adicionar despesa</button>
      </form>
    );
  }
}
const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  currentId: state.wallet.expenses.length,
});

const mapDispatchToProps = (dispatch) => ({
  func: (objectExpense) => dispatch(fetchExchangeRatesThunk(objectExpense)),
});

Form.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentId: PropTypes.number.isRequired,
  func: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
