import React from 'react';

export default function Sidebar(props) {

  async function onClick(method, url, body, headers) {
    await props.updateState('', 'resBody');
    await props.updateState('', 'resHeaders');
    await props.updateState(method, 'reqType');
    await props.updateState(url, 'reqURL');
    await props.updateState(body, 'reqBody');
    await props.updateState(headers, 'reqHeaders');
    await props.updateState(false, 'loading');
  }

  let prevReq = [];

  props.history.forEach((req, i) => {
    prevReq.push(
      <li key={i} className="sidebar-item">
        <p>{`${req.method}: ${req.url}`}</p>
        <button onClick={() => {onClick(req.method, req.url, req.reqBody, req.reqHeaders)}}>Populate</button>
      </li>
    )
  })

  return (
    <div id="sidebar-container">
      <div id="sidebar-content">
        <h1>Previous Requests:</h1>
        <ul id="sidebar-list">
          {prevReq}
        </ul>
      </div>
      <div id="toggle" onClick={toggleList}></div>
    </div>
  )
}

function toggleList(e) {
  e.target.parentNode.classList.toggle('show');
}