import React from 'react';

import Form from './Form';
import Results from './Results';
import Header from './Header';
import Footer from './Footer';

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
    await this.setState({...this.state, [key]: val});
  }

  async handleSubmit() {
    await this.fetchAPI();
  }

  async fetchAPI() {
    let response = await fetch(this.state.reqURL, {
      method: this.state.reqType,
    });

    // console.log('response:', response);


    // found solution to fetch headers object issue here: https://stackoverflow.com/questions/48413050/missing-headers-in-fetch-response/48432628
    let headers = {};
    for(let entry of response.headers.entries()) {
      headers[entry[0]] = entry[1];
    }

    headers = JSON.stringify(headers, null, 2);

    let data = await response.json();
    data = JSON.stringify(data, null, 2);

    await this.setState({...this.state, resBody: "Response : " + data, resHeaders: "Headers : " + headers });    
  }

  render() {
    return (
        <div className='resty'>
          <Header />
          <main>
            <Form onChange={this.updateParams.bind(this)} onSubmit={this.handleSubmit.bind(this)} reqType={this.state.reqType} url={this.state.reqURL}/>
            <Results results={this.state.resBody} headers={this.state.resHeaders}/>
          </main>
          <Footer />
        </div>
      )
    }
}