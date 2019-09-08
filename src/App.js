import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: 'https://api.skypicker.com/flights?flyFrom=PRG&to=LGW&dateFrom=18/09/2019&dateTo=12/12/2019&partner=picky',
      response: ''
    };
  }

  onChange = (event) => {
    this.setState({ url: event.target.value });
  }

  onClick = () => {
    console.log('make request to KIWI API')
    this.setState({
      response: 'request pending...'
    });
    axios.get(this.state.url).then((response) => {
      console.log('success')
      console.log(typeof response)
      this.setState({
        response: JSON.stringify(response.data, null, 4)
      });
    }).catch( (errors) => {
      console.log('error')
      console.log(errors)
      this.setState({
        response: 'invalid request'
      });
      
    })
  }

  render() {
    return (
      <div>
          <h1>Request to Kiwi API</h1>
          <p>Change the url and click on the "Send request" button</p>

          <input value={this.state.url} onChange={this.onChange} size="200" />
          <button onClick={this.onClick}>Send request</button>

          <pre>
            <code>
              {this.state.response}
            </code>
          </pre>
      </div>
    );
  }
}

export default App;
