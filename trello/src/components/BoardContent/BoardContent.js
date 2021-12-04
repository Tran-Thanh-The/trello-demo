import React from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { useState, useEffect, useRef } from 'react'
import './BoardContent.scss'
import { initialData } from 'actions/initialData'
import { Container as BtContainer, Row, Col, Form, Button } from 'react-bootstrap'

import Column from 'components/Column/Column'
import { mapOrder } from 'utilities/sorts'
import { applyDrag } from 'utilities/dragDrop'
import { isEmpty } from 'lodash'

export default function BoardContent() {
  const [board, setBoard] = useState([])
  const [columns, setColumns] = useState([])
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const [newColumnTitle, setNewColumnTitle] = useState('')

  const inputNewColumnRef = useRef(null)

  useEffect(() => {
    const boardFromDb = initialData.boards.find(board => board.id === 'board-1')
    if (boardFromDb) {
      setBoard(boardFromDb)

      setColumns(mapOrder(boardFromDb.columns, boardFromDb.columnOrder, 'id'))
    }
  }, [])

  useEffect(() => {
    if (inputNewColumnRef && inputNewColumnRef.current) {
      inputNewColumnRef.current.focus()
    }
  }, [openNewColumnForm])

  if (isEmpty(board))
    return <h1>Board not found!</h1>

  const onColumnDrop = (dropResult) => {
    setColumns(applyDrag(columns, dropResult))
    let newBoard = board
    newBoard.columnOrder = columns.map(column => column.id)
    setBoard(newBoard)
  }
  const onCardDrop = (id, dropResult) => {
    if (dropResult.addedIndex !== null || dropResult.removedIndex !== null) {
      let newColumns = [...columns];
      let currentColumn = newColumns.find(c => c.id === id)
      currentColumn.cards = applyDrag(currentColumn.cards, dropResult)
      // if (currentColumn.cards)  
        currentColumn.cardOrder = currentColumn.cards.map(i => i.id)

      setColumns(newColumns)
    }
  }
  const toggleNewColumnForm = () => {
    setOpenNewColumnForm(true)
  }

  const addNewColumn = () => {
    if (newColumnTitle !== '') {
      const newColumn = {
        id: Math.random().toString(36).substr(2, 5),
        boardId: board.id,
        title: newColumnTitle.trim(),
        cardOrder: [],
        cards: []
      }

      let newColumns = [...columns]
      newColumns.push(newColumn)

      let newBoard = board
      newBoard.columnOrder = newColumns.map(column => column.id)

      setBoard(newBoard)
      setColumns(newColumns)

      setOpenNewColumnForm(false)
      setNewColumnTitle('')
    }
    else {
      inputNewColumnRef.current.focus();
    }
  }
  const onNewColumnTitleChange = (e) => {
    setNewColumnTitle(e.target.value)
  }
  const removeNewColumn = () => {
    setNewColumnTitle('')
    setOpenNewColumnForm(false)
  }

  const updateColumn = (newColumn) => {
    const newColumnId = newColumn.id

    let newColumns = [...columns]
    const IndexColumnUpdate = newColumns.findIndex((c) => c.id === newColumnId)

    if (newColumn._destroy) {
      newColumns.splice(IndexColumnUpdate, 1)
    } else {
      newColumns.splice(IndexColumnUpdate, 1, newColumn)
    }

    let newBoard = board
    newBoard.columnOrder = newColumns.map(column => column.id)
    newBoard.columns = newColumns

    setBoard(newBoard)
    setColumns(newColumns)
  }

  return (
    <div className="board-container">
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
            <Column column={column} onCardDrop={onCardDrop} updateColumn={updateColumn}/>
          </Draggable>
        ))}
      </Container>
      <BtContainer className="card-bootstrap">
        { !openNewColumnForm && 
          <Row>
            <Col className="add-new-column" onClick={toggleNewColumnForm}>
              <i className="fa fa-plus icon" />
              add new column
            </Col>
          </Row>
        }
        { openNewColumnForm && 
          <Row>
            <Col className="enter-new-column card-bootstrap">
              <Form.Control 
                size="sm" type="text" 
                placeholder="enter column title"
                className="input-enter-new-column"
                ref={inputNewColumnRef}
                value={newColumnTitle}
                onChange={onNewColumnTitleChange}
              />
              <Button 
                size="sm"
                variant="success"
                className="button-add-new-column"
                onClick={addNewColumn}
              >
                Add column
              </Button>
              <span className="cancel-new-column" onClick={removeNewColumn}> <i className="fa fa-trash icon" /> </span>
            </Col>
          </Row>
        }
      </BtContainer>
    </div>
  )
}
