import React from 'react';

export default function Results(props) {
  return(
    <div>
      <pre>{props.headers}</pre>
      <pre>{props.results}</pre>
    </div>
  )
}