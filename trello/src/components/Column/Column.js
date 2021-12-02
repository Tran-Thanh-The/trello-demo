import React from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { mapOrder } from 'utilities/sorts'
import './Column.scss'

import Card from 'components/Card/Card'

export default function Column(props) {
  const { column, onCardDrop } = props
  const cards = mapOrder(column.cards, column.cardOrder, 'id')

  return (
    <div className="broad">
      <div className="title-broad column-drag-handle">
        <h3>{column.title}</h3>
      </div>
      <ul className="card-list">
        <Container
          groupName="col"
          onDrop={dropResult => onCardDrop(column.id, dropResult)}
          getChildPayload={index => cards[index]}
          dragClass="card-ghost"
          dropClass="card-ghost-drop"
          dropPlaceholder={{                      
            animationDuration: 150,
            showOnTop: true,
            className: 'card-drop-preview' 
          }}
          dropPlaceholderAnimationDuration={200}
        >
          {column.cards.map((card, index) => (
            <Draggable key={index}>
              <Card card={card} />
            </Draggable>
          ))}
              
        </Container>
      </ul>
      <footer className="footer-broad">
        <div className="container">
          <i className="fa fa-plus icon" />
          <button>thêm công việc</button>
        </div>
      </footer>
    </div>
  )
}
