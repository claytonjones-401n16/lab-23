import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Form from './Form';
import Results from './Results';
import Header from './Header';
import Footer from './Footer';
import History from './History';
import Sidebar from './Sidebar';

export default class RESTy extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reqURL: '',
      reqType: 'GET',
      resHeaders: '',
      resBody: '',
      history: [],
      loading: false,
      invalid: false,
      reqBody: '',
      reqHeaders: '',
      showBodyHeader: true,
    }
  }

  async updateState(val, key) {
    await this.setState({...this.state, [key]: val});
  }

  async handleSubmit() {
    await this.updateState('', 'resBody');
    await this.updateState('', 'resHeaders');
    await this.updateState(false, 'invalid');
    await this.updateState(false, 'showBodyHeader');
    if (this.state.reqURL) {
      await this.updateState(true, 'loading');
      await this.fetchAPI();
    } else {
      await this.updateState(true, 'invalid');
    }
  }

  isValidJSON(str) {
    try {
      JSON.parse(str);
      return true;
    } catch(e) {
      return false;
    }
  }

  async fetchAPI() {
    try {
      let reqBody = this.isValidJSON(this.state.reqBody) ? JSON.parse(this.state.reqBody) : {};
      let reqHeaders = this.isValidJSON(this.state.reqHeaders) ? JSON.parse(this.state.reqHeaders) : {};

      let response;
      
      if (this.state.reqType === 'GET') {
        response = await fetch(this.state.reqURL, {
          method: 'GET'
        });
      } else {
        response = await fetch(this.state.reqURL, {
          method: this.state.reqType,
          body: reqBody,
          headers: reqHeaders
        });
      }
  
      // found solution to fetch headers object issue here: https://stackoverflow.com/questions/48413050/missing-headers-in-fetch-response/48432628
      let headers = {};

      for(let entry of response.headers.entries()) {
        headers[entry[0]] = entry[1];
      }
  
      headers = JSON.stringify(headers, null, 2);
  
      let data = await response.json();
      let isNotError = true;

      if (data['error']) isNotError = false

      data = JSON.stringify(data, null, 2);
  
      await this.setState({...this.state, resBody: "Response : " + data, resHeaders: "Headers : " + headers });  
      
      let reqToSave = {
        url: this.state.reqURL,
        method: this.state.reqType,
        body: reqBody,
        headers: reqHeaders
      }
  
      const exists = (element) => element.url === reqToSave.url && element.method === reqToSave.method;
      
      if (!this.state.history.some(exists) && isNotError) {
        await this.setState({...this.state, history: [...this.state.history, reqToSave]});
      }

    } catch(e) {
      console.log(e);
      await this.setState({...this.state, invalid: true});
    }

  }

  render() {
    return (
        <Router>
          <div className='resty'>
            <Header updateState={this.updateState.bind(this)}/>
            <main>
              <Route path='/' exact>
              <Sidebar history={this.state.history} updateState={this.updateState.bind(this)}/>
                <Form onChange={this.updateState.bind(this)} onSubmit={this.handleSubmit.bind(this)} reqType={this.state.reqType} url={this.state.reqURL} reqBody={this.state.reqBody} reqHeaders={this.state.reqHeaders} showBodyHeader={this.state.showBodyHeader}/>
                
                <Results results={this.state.resBody} headers={this.state.resHeaders} loading={this.state.loading} invalid={this.state.invalid} updateState={this.updateState.bind(this)}/>
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