import React from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { useState, useEffect } from 'react'
import './BroadContent.scss'
import { initialData } from 'actions/initialData'

import Column from 'components/Column/Column'
import { mapOrder } from 'utilities/sorts'
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
  }

  return (
    <div className="broad-container">
      <Container
        orientation="horizontal"
        onDrop={onColumnDrop}
        dragHandleSelector=".column-drag-handle"
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: 'column-drop-preview'
        }}
      >
        {columns.map((column, index) => (
          <Draggable key={index}>
            <Column column={column} />
          </Draggable>
        ))}
      </Container>
    </div>
  )
}
