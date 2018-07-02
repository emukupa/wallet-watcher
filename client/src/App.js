import React, { Component } from 'react';
import { Wrapper, Form, Chart, Intro, FormGroup, Button, Err } from './AppCss';

class App extends Component {
  state = {
    address: '',
    phone: '',
    incoming: '',
    outgoing: '',
    validInputs: {
      address: false,
      phone: false,
      incoming: false,
      outgoing: false,
    },
    foundErrors: false,
  };

  validateAddress = () => {
    return this.state.address.substring(0, 2) !== '0x';
  };

  validatePhone = () => {
    // check if there 10 digits, numbers
    let phoneNumber = Number(this.state.phone.split('-').join(''));
    if (isNaN(phoneNumber) || phoneNumber.toString().length !== 10) {
      return true;
    }
    return false;
  };

  validateIncoming = () => {
    let bool = false;
    // check if its a number
    if (isNaN(this.state.incoming) || !this.state.incoming) {
      return true;
    }

    // check if number is less than 0.001

    if (Number(this.state.incoming) < 0.001) {
      return true;
    }

    return bool;
  };

  validateOutgoing = () => {
    let bool = false;
    // check if its a number
    if (isNaN(this.state.outgoing) || !this.state.incoming) {
      return true;
    }

    // check if number is less than 0.001

    if (Number(this.state.outgoing) < 0.001) {
      return true;
    }

    return bool;
  };
  validate = () => {
    const inputErrors = Object.assign({}, this.state.validInputs);

    // get the keys
    const keys = Object.keys(inputErrors);

    // loop through the keys to validate each input
    keys.forEach(key => {
      switch (key) {
        case 'address':
          inputErrors[key] = this.validateAddress();
          break;
        case 'phone':
          inputErrors[key] = this.validatePhone();
          break;
        case 'incoming':
          inputErrors[key] = this.validateIncoming();
          break;
        case 'outgoing':
          inputErrors[key] = this.validateOutgoing();
          break;
        default:
          return;
      }
    });

    // now loop through the inputs and if any of them has an error, setState
    for (let i = 0; i < keys.length; i++) {
      if (inputErrors[keys[i]]) {
        // found an error so break
        this.setState({ foundErrors: true, validInputs: inputErrors });
        break;
      }
    }
  };
  inputChangeHandler = ({ target }) => {
    this.setState({
      ...this.state,
      [target.name]: target.value,
    });
  };

  submitHandler = e => {
    e.preventDefault();
    this.validate(); // validate the inputs
  };
  render() {
    return (
      <Wrapper>
        <Intro>
          <h2>Wallet Watcher</h2>
          <p>
            This is a web app that allows a user to monitor any ETH address
            depending on the transaction criteria set:
          </p>
          <ul>
            <li>the system will send an SMS message to the user.</li>
            <li>
              Wallet Watcher provides a way to monitor activity without being
              tied to a computer.
            </li>
          </ul>
        </Intro>
        <Chart
          id="widget-ticker-preview"
          src="//www.coingecko.com/en/widget_component/ticker/ethereum/usd?id=ethereum"
          scrolling="no"
          frameborder="0"
        />
        <Form onSubmit={this.submitHandler}>
          <FormGroup>
            <label htmlFor="address">Enter your ETH. Address:</label>
            <input
              className={this.state.validInputs.address ? 'HasError' : null}
              id="address"
              name="address"
              value={this.state.address}
              onChange={this.inputChangeHandler}
              placeholder="0x..."
              autoComplete="false"
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="phone">Enter your phone #:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={this.state.phone}
              onChange={this.inputChangeHandler}
              className={this.state.validInputs.phone ? 'HasError' : null}
              placeholder="(xxx)-xxx-xxxx"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              autoComplete="false"
              required
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="incoming">Incoming amount to receive text: </label>
            <input
              id="incoming"
              name="incoming"
              value={this.state.incoming}
              onChange={this.inputChangeHandler}
              className={this.state.validInputs.incoming ? 'HasError' : null}
              placeholder="0.000 ETH"
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="outgoing">Outgoing amount to receive text:</label>
            <input
              id="outgoing"
              name="outgoing"
              value={this.state.outgoing}
              onChange={this.inputChangeHandler}
              className={this.state.validInputs.outgoing ? 'HasError' : null}
              placeholder="0.000 ETH"
            />
          </FormGroup>
          <FormGroup>
            <Button>Submit</Button>
            <Err errors={this.state.foundErrors}>Fix the errors!</Err>
          </FormGroup>
        </Form>
      </Wrapper>
    );
  }
}

export default App;
