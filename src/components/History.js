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

  function toggleArrow(e) {
    e.target.classList.toggle('flip');
    e.target.parentNode.parentNode.classList.toggle('show');
  }

  // let arrowImg = arrow ? <img src="./assets/down-arrow.svg" alt="down arrow" className='down-arrow' onClick={toggleArrow}/> : <img src="./assets/up-arrow.svg" alt="down arrow" className='down-arrow' onClick={toggleArrow}/>;


  let prevReq = [];

  props.history.forEach((req, i) => {
    prevReq.push(
      <li key={i} >
        <div className='items'>
          <img src="./assets/down-arrow.svg" alt="down arrow" className='down-arrow' onClick={toggleArrow}/>
          <p>{`${req.method}: ${req.url}`}</p>
          <Link to='/' key={(i + 1000)} >
            <button key={(i + 2000)} onClick={ async () => { await onClick(req.method, req.url) } }>Re-Run!</button>
          </Link>
        </div>
        <div className={`req-body`}>
          {
            !req.reqHeaders && !req.reqBody 
              ? <pre>Body and Headers N/A</pre> 
              : <>
                  <pre>{req.reqHeaders}</pre>
                  <pre>{req.reqBody}</pre>
                </>
          }
        </div>
      </li>
    );
  })

  return (
    <div id="history">
      <h1>History</h1>
      <ul id='history-list'>
        {prevReq}
      </ul>
    </div>
  )
}