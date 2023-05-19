import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
  handleExpenses = () => {
    const { expenses } = this.props;
    if (expenses.length === 0) {
      return 0;
    }
    let sum = 0;
    expenses.map((expense) => {
      const valor = Number(expense.value);
      const entries = Object.values(expense.exchangeRates);
      const filter = entries.filter((entry) => entry.code === expense.currency);
      const currentCurrency = Number(filter[0].ask);
      const convertido = Number((valor * currentCurrency));
      sum += convertido;
      return sum;
    });
    return Number(sum.toFixed(2));
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <div>TrybeWallet</div>
        <div data-testid="email-field">
          Email:
          { email }
        </div>
        <div data-testid="total-field">{ this.handleExpenses() }</div>
        <div data-testid="header-currency-field">BRL</div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Header);
