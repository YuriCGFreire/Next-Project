import React from 'react'

function Titulo(props) {
  return (
    <div>
        <h1>{props.children}</h1>
        <hr />
    </div>
  )
}

export default Titulo