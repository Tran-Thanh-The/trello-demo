import React from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { useState, useEffect } from 'react'
import './BroadContent.scss'
import { initialData } from 'actions/initialData'

import Column from 'components/Column/Column'
import { mapOrder } from 'utilities/sorts'
import { applyDrag } from 'utilities/dragDrop'
import { isEmpty } from 'lodash'

export default function BroadContent() {
  const [broad, setBroad] = useState([])
  const [columns, setColumns] = useState([])

  useEffect(() => {
    const broadFromDb = initialData.broads.find(broad => broad.id === 'broad-1')
    if (broadFromDb) {
      setBroad(broadFromDb)

      setColumns(mapOrder(broadFromDb.columns, broadFromDb.columnOrder, 'id'))
    }
  }, [])

  if (isEmpty(broad))
    return <h1>Broad not found!</h1>

  const onColumnDrop = (dropResult) => {
    setColumns(applyDrag(columns, dropResult))
    let newBroad = broad
    newBroad.columnOrder = columns.map(column => column.id)
    setBroad(newBroad)
  }

  const onCardDrop = (id, dropResult) => {
    if (dropResult.addedIndex !== null || dropResult.removedIndex !== null) {
      let newColumns = [...columns];
      let currentColumn = newColumns.find(c => c.id === id)
      currentColumn.cards = applyDrag(currentColumn.cards, dropResult)
      currentColumn.cardOrder = currentColumn.cards.map(i => i.id)

      setColumns(newColumns)
    }
  }

  return (
    <div className="broad-container">
      <Container
        orientation="horizontal"
        onDrop={onColumnDrop}
        getChildPayload={index => columns[index]}
        dragHandleSelector=".column-drag-handle"
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: 'column-drop-preview'
        }}
      >
        {columns.map((column, index) => (
          <Draggable key={index}>
            <Column column={column} onCardDrop={onCardDrop}/>
          </Draggable>
        ))}
      </Container>
      <div className="add-new-column">
          <i className="fa fa-plus icon" />
          add new column
      </div>
    </div>
  )
}
