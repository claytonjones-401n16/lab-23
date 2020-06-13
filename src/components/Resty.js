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

  render() {
    return (
        <div>
          <h1>RESTy</h1>
          <Form onChange={this.updateParams.bind(this)} reqType={this.state.reqType} url={this.state.reqURL}/>
        </div>
      )
    }
}