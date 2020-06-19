import React from 'react';



export default function Form(props) {

  function handleInputChange(e) {
    props.onChange(e.target.value, 'reqURL');
  }

  function handleBodyChange(e) {
    props.onChange(e.target.value, 'reqBody');
  }

  function handleHeadersChange(e) {
    props.onChange(e.target.value, 'reqHeaders');
  }

  function bodyHeader() {
    if (props.showBodyHeader) {
      return (
        <div id="body-headers">
          <div id="req-body-container">
            <label htmlFor="req-body">Body:</label>
            <textarea type="text" value={props.reqBody} id="req-body" autoComplete='off' onChange={handleBodyChange}></textarea>
          </div>
          <div id="req-headers-container">
          <label htmlFor="req-headers">Headers:</label>
            <textarea type="text" value={props.reqHeaders} id="req-headers" autoComplete='off' onChange={handleHeadersChange}></textarea>
          </div>
        </div>
      )
    } else {
      return (<></>)
    }
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
      {bodyHeader()}
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


