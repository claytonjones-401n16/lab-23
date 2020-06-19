import React from 'react';



export default function Form(props) {

  function handleInputChange(e) {
    props.onChange(e.target.value, 'reqURL');
  }

  return(
    <div className='form'>
      <div className='user-input'>
        <label htmlFor='url'>URL:</label>
        <input id='url' type='text' value={props.url} autoComplete='off' onChange={handleInputChange}></input>
        <Button text='GO!' type='submit' onSubmit={props.onSubmit}/>
      </div>
      <div className='buttons'>
        <Button text='GET' onClick={props.onChange} selected={props.reqType} />
        <Button text='POST' onClick={props.onChange} selected={props.reqType} />
        <Button text='PUT' onClick={props.onChange} selected={props.reqType} />
        <Button text='PATCH' onClick={props.onChange} selected={props.reqType} />
        <Button text='DELETE' onClick={props.onChange} selected={props.reqType} />
      </div>
    </div>
  )
}

function Button(props) {

  function handleClick(e) {
    props.onClick(props.text, 'reqType');
  }

  function handleSubmit(e) {
    props.onSubmit();
  }

  return(
    <button className={`${props.type ? props.type : props.text === props.selected ? 'selected' : 'not-selected'}`} onClick={props.type ? handleSubmit : handleClick}>{props.text}</button>
  )
}


