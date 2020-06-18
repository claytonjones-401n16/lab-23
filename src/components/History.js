import React from 'react';

import { Link } from 'react-router-dom';

export default function History(props) {

  async function onClick(method, url) {
    await props.updateState('', 'resBody');
    await props.updateState('', 'resHeaders');
    await props.updateState(method, 'reqType');
    await props.updateState(url, 'reqURL');
    await props.submit();
  }

  let prevReq = [];
  
  props.history.forEach((req, i) => {
    prevReq.push(
      <Link to='/' key={i} >
        <li key={i} onClick={ async () => { await onClick(req.method, req.url) } }>
          {`${req.method}: ${req.url}`}
        </li>
      </Link>
    );
  })

  return (
    <div className="history">
      <h1>History</h1>
      <ul id='history-list'>
        {prevReq}
      </ul>
    </div>
  )
}