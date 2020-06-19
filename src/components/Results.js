import React from 'react';

export default function Results(props) {
  if(props.results) {
    return(
      <div className='results'>
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