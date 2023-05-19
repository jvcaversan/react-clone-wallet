import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends React.Component {
    handleCurrencyName = (currency, id) => {
      const { expenses } = this.props;
      const entries = Object.values(expenses[id].exchangeRates);
      const currencyName = entries.filter((item) => item.code === currency);
      return currencyName[0].name;
    }

      handleValue = (currency, value, currencies, sendCambio) => {
        const entries = Object.values(currencies);
        const currencyValue = (entries.filter((curr) => curr.code === currency))[0].ask;
        const converting = Number(currencyValue) * Number(value);
        if (sendCambio) {
          return Number(currencyValue).toFixed(2);
        }
        return converting.toFixed(2);
      }

      render() {
        const { expenses } = this.props;
        return (
          <section className="table-container">
            <table>
              <thead>
                <tr>
                  <th>
                    Descrição
                  </th>
                  <th>
                    Tag
                  </th>
                  <th>
                    Método de pagamento
                  </th>
                  <th>
                    Valor
                  </th>
                  <th>
                    Moeda
                  </th>
                  <th>
                    Câmbio utilizado
                  </th>
                  <th>
                    Valor convertido
                  </th>
                  <th>
                    Moeda de conversão
                  </th>
                  <th>
                    Editar/Excluir
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  expenses.map((expense) => (
                    <tr key={ expense.id }>
                      <td>
                        { expense.description }
                      </td>
                      <td>
                        { expense.tag }
                      </td>
                      <td>
                        { expense.method }
                      </td>
                      <td>
                        { Number(expense.value).toFixed(2) }
                      </td>
                      <td>
                        { this.handleCurrencyName(expense.currency, expense.id) }
                      </td>
                      <td>
                        { this.handleValue(expense.currency,
                          expense.value, expense.exchangeRates, 'SendCambio') }
                      </td>
                      <td>
                        { this.handleValue(expense.currency,
                          expense.value, expense.exchangeRates) }
                      </td>
                      <td>
                        Real
                      </td>
                      <td>
                        Editar/Excluir
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>

          </section>
        );
      }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, null)(Table);
