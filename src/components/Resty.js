import React from 'react';

import Form from './Form';

export default class RESTy extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reqURL: '',
      reqType: 'GET',
      resHeaders: '',
      resBody: '',
    }
  }

  async updateParams(val, key) {
    console.log(`${key}: ${val}`);
    await this.setState({...this.state, [key]: val});
  }

  async handleSubmit() {
    await this.fetchAPI();
  }

  async fetchAPI() {
    let response = await fetch(this.state.reqURL, {
      method: this.state.reqType,
    });
    console.log('response:', response);
    let headers = response.headers;
    // console.log('headers:', JSON.stringify(headers, null, 2));
    // console.log('headers:', headers);
    // console.log('type of headers:', typeof headers);
    let data = await response.json();
    // console.log('data:', JSON.stringify(data, null, 2));
    data = JSON.stringify(data, null, 2);

    await this.setState({...this.state, resBody: data});

    console.log('state:', this.state.resBody);
    // data = data.results;
    // console.log('data results:', data);
    
  }

  render() {
    return (
        <div>
          <h1>RESTy</h1>
          <Form onChange={this.updateParams.bind(this)} onSubmit={this.handleSubmit.bind(this)} reqType={this.state.reqType} url={this.state.reqURL}/>
        </div>
      )
    }
}