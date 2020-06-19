import React from 'react';

import { Link } from 'react-router-dom'

export default function Nav(props) {
  return (
    <nav>
      <ul>
        <NavLink path='/' text='Home'/>
        <NavLink path='/history' text='History'/>
      </ul>
    </nav>
  )
}

function NavLink(props) {
  return (
    <Link to={props.path}>
      <li>{props.text}</li>
    </Link>
  )
}