import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Form from './Form';
import Results from './Results';
import Header from './Header';
import Footer from './Footer';
import History from './History';

export default class RESTy extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reqURL: '',
      reqType: 'GET',
      resHeaders: '',
      resBody: '',
      history: [],
    }
  }

  async updateState(val, key) {
    await this.setState({...this.state, [key]: val});
  }

  async handleSubmit() {
    await this.fetchAPI();
  }

  async fetchAPI() {
    let response = await fetch(this.state.reqURL, {
      method: this.state.reqType,
    });

    // found solution to fetch headers object issue here: https://stackoverflow.com/questions/48413050/missing-headers-in-fetch-response/48432628
    let headers = {};
    for(let entry of response.headers.entries()) {
      headers[entry[0]] = entry[1];
    }

    headers = JSON.stringify(headers, null, 2);

    let data = await response.json();
    data = JSON.stringify(data, null, 2);

    await this.setState({...this.state, resBody: "Response : " + data, resHeaders: "Headers : " + headers });  
    
    let reqToSave = {
      url: this.state.reqURL,
      method: this.state.reqType,
      body: this.state.resBody
    }

    const exists = (element) => element.url === reqToSave.url && element.method === reqToSave.method;
    
    if (!this.state.history.some(exists)) {
      await this.setState({...this.state, history: [...this.state.history, reqToSave]});
    }

  }

  render() {
    return (
        <Router>
          <div className='resty'>
            <Header updateState={this.updateState.bind(this)}/>
            <main>
              <Route path='/' exact>
                <Form onChange={this.updateState.bind(this)} onSubmit={this.handleSubmit.bind(this)} reqType={this.state.reqType} url={this.state.reqURL}/>
                
                <Results results={this.state.resBody} headers={this.state.resHeaders}/>
              </Route>
              <Route path='/history'>
                <History history={this.state.history} updateState={this.updateState.bind(this)} submit={this.fetchAPI.bind(this)}/>
              </Route>
            </main>
            <Footer />
          </div>
        </Router>
      )
    }
}