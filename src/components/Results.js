import React from 'react';

export default function Results(props) {
  if(props.results) {
    return(
      <div className='results'>
        <pre>{props.headers}</pre>
        <pre>{props.results}</pre>
      </div>
    )
  } else if (props.loading) {
    return (
      <div className='loading'>
        <h1>Loading...</h1>
      </div>
    )
  } else {
    return (
      <></>
    )
  }
}