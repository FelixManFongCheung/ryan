import React from 'react'

export default function Contact() {
  const ryanInsta = process.env.REACT_APP_RYAN_INSTAGRAM;
  const ryanEmail = process.env.REACT_APP_RYAN_EMAIL;

  return (
    <div className='content'>
      <div className="instagram">{ryanInsta}</div>
      <div className="email">{ryanEmail}</div>
    </div>
  )
}
