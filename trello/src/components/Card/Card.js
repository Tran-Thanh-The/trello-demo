import React from 'react'
import './Card.scss'

export default function Card(props) {
  const { card } = props
  return (
    <li className="card-item">
      {
        card.cover && 
        <img 
          src={card.cover}
          alt=""
          onMouseDown={e => e.preventDefault()}
        />
      }
      <p>{card.title}</p>
    </li>
  )
}
