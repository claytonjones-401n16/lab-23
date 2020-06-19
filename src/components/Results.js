import React from 'react';

export default function Results(props) {

  async function onClose() {
    await props.updateState('', 'resBody');
    await props.updateState('', 'resHeaders');
    await props.updateState('GET', 'reqType');
    await props.updateState('', 'reqURL');
    await props.updateState('', 'reqBody');
    await props.updateState('', 'reqHeaders');
    await props.updateState(false, 'loading');
    await props.updateState(true, 'showBodyHeader');

  }
  
  if(props.results) {
    return(
      <div className='results'>
        <div id="close" onClick={onClose}>X</div>
        <pre>{props.headers}</pre>
        <pre>{props.results}</pre>
      </div>
    )
  } else if (props.invalid) {
    return (
      <div className="invalid">
        <h1>Invalid URL</h1>
      </div>
    )
  } else if (props.loading) {
    return (
      <div className='loading'>
        <div className='img'>
          <img src="./assets/loader.svg" alt="loading" />
        </div>
      </div>
    )
  }  else {
    return (
      <></>
    )
  }
}