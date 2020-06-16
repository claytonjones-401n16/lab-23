import React from 'react';

export default function Results(props) {
  return(
    <div className='results'>
      <pre>{props.headers}</pre>
      <pre>{props.results}</pre>
    </div>
  )
}