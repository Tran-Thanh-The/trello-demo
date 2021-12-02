import React from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { mapOrder } from 'utilities/sorts'
import './Column.scss'

import Card from 'components/Card/Card'

export default function Column(props) {
  const { column } = props
  const cards = mapOrder(column.cards, column.cardOrder, 'id')

  const onCardDrop = (dropResult) => {
    console.log()
  }

  return (
    <div className="broad">
      <div className="title-broad column-drag-handle">
        <h3>{column.title}</h3>
      </div>
      <ul className="card-list">
        <Container
          // onDragStart={e => console.log("drag started", e)}
          // onDragEnd={e => console.log("drag end", e)}
          // onDragEnter={() => {
          //   console.log("drag enter:", column.id);
          // }}
          // onDragLeave={() => {
          //   console.log("drag leave:", column.id);
          // }}
          // onDropReady={p => console.log('Drop ready: ', p)}
          groupName="col"
          onDrop={onCardDrop()}
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
      <div className="footer-broad">
        <button>thêm công việc</button>
      </div>
    </div>
  )
}
