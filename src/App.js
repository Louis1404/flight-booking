import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url1: 'https://api.skypicker.com/flights?fly_type=round&fly_from=city:PAR&to=&dateFrom=18/09/2019&dateTo=22/09/2019&return_from=24/09/2019&return_to=28/09/2019&sort=price&partner=picky',
      url2: 'https://api.skypicker.com/flights?fly_type=round&fly_from=city:MAD&to=&dateFrom=18/09/2019&dateTo=22/09/2019&return_from=24/09/2019&return_to=28/09/2019&sort=price&partner=picky',
      response1: '',
      response2: '',
      response: '',
      intersections: ''
    };
  }

  onChange1 = (event) => {
    this.setState({ url1: event.target.value });
  }

  onChange2 = (event) => {
    this.setState({ url2: event.target.value });
  }

  onClick = () => {
    console.log('make request to KIWI API')
    this.setState({
      response: 'request pending...'
    })
    const promise1 = axios.get(this.state.url1);
    const promise2 = axios.get(this.state.url2);
    const comp = this
    Promise.all([promise1, promise2]).then(function(values) {

      const response1 = values[0].data.data.map((item) => {
          return {
            "price": item.price,
            "departure": item.cityFrom,
            "destination": item.cityTo
          };
      })
      response1.sort(function(a, b){return a.price - b.price});

      const response2 = values[1].data.data.map((item) => {
        return {
          "price": item.price,
          "departure": item.cityFrom,
          "destination": item.cityTo
        }
      })
      response2.sort(function(a, b){return a.price - b.price});

      console.log(response1);
      console.log(values[1].data);

      const intersection = _.intersectionBy(response1, response2, 'destination');
      const commonDest = intersection.map((item) => {
        return {
          "destination": item.destination
        };
      })

      console.log(commonDest);

      comp.setState({
        response1: JSON.stringify(response1, null, 4)
      });
      comp.setState({
        response2: JSON.stringify(response2, null, 4)
      });
      comp.setState({
        intersections: JSON.stringify(commonDest, null, 4)
      });
    });
  }

  render() {
    return (
      <div>
          <h1>Request to Kiwi API</h1>
          <p>Change the url and click on the "Send request" button</p>

          <input value={this.state.url1} onChange={this.onChange1} size="200" />
          <input value={this.state.url2 } onChange={this.onChange2} size="200" />
          <button onClick={this.onClick}>Send request</button>
          <table>
            <tbody>
            <tr>
              <th>From Paris</th>
              <th>From Madrid</th>
              <th>Intersections</th>
            </tr>
            <tr>
              <td>
                <pre>
                  <code>{this.state.response1}</code>
                </pre>
              </td>
              <td>
                <pre>
                  <code>{this.state.response2}</code>
                </pre>
              </td>
              <td>
                <pre>
                  <code>{this.state.intersections}</code>
                </pre>
              </td>
            </tr>
            </tbody>
          </table>

      </div>
    );
  }
}

export default App;
