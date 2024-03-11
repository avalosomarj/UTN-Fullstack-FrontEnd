import React from 'react'

const Error = ({value, message}) => {
  return (
    <div>
        <h2>Error {value} <span style={{color: 'blue'}}>|</span> {message}</h2>
    </div>
  )
}

export default Error