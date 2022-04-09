import React from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { useState, useEffect, useRef } from 'react'
import './BoardContent.scss'
import { Container as BtContainer, Row, Col, Form, Button, Spinner } from 'react-bootstrap'

import Column from 'components/Column/Column'
import { mapOrder } from 'utilities/sorts'
import { applyDrag } from 'utilities/dragDrop'
import { isEmpty, cloneDeep } from 'lodash'

import { 
  fetchBoardDetail, 
  createNewColumn,
  updateBoard,
  updateColumn,
  updateCard
} from 'actions/ApiCall'

export default function BoardContent() {
  const [board, setBoard] = useState([])
  const [columns, setColumns] = useState([])
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const toggleNewColumnForm = () => setOpenNewColumnForm(true)

  const [newColumnTitle, setNewColumnTitle] = useState('')
  const onNewColumnTitleChange = (e) => setNewColumnTitle(e.target.value)

  const inputNewColumnRef = useRef(null)

  useEffect(() => {
    const Id = '61ae2e439fc5d7b301b33585'
    fetchBoardDetail(Id).then(board => {

      setBoard(board)
      setColumns(mapOrder(board.columns, board.columnOrder, '_id'))
    })
  }, [])

  useEffect(() => {
    if (inputNewColumnRef && inputNewColumnRef.current) {
      inputNewColumnRef.current.focus()
    }
  }, [openNewColumnForm])

  if (isEmpty(board))
    return <Spinner animation="border" />

  const onColumnDrop = (dropResult) => {
    let newColumns = cloneDeep(columns)
    newColumns = applyDrag(newColumns, dropResult)
    let newBoard = cloneDeep(board)
    newBoard.columnOrder = newColumns.map(column => column._id)
    
    // Call api
    setColumns(newColumns)
    setBoard(newBoard)
    updateBoard(newBoard._id, newBoard).catch(error => {
      console.error(error)
      setColumns(columns)
      setBoard(board)
    })
  }
  const onCardDrop = (id, dropResult) => {
    if (dropResult.addedIndex !== null || dropResult.removedIndex !== null) {
      let newColumns = cloneDeep(columns)
      let currentColumn = newColumns.find(c => c._id === id)
      currentColumn.cards = applyDrag(currentColumn.cards, dropResult)
      // if (currentColumn.cards)  
      currentColumn.cardOrder = currentColumn.cards.map(i => i._id)
      
      setColumns(newColumns)
      // Call api
      if (dropResult.addedIndex !== null && dropResult.removedIndex !== null) {
        // Move card in a column
        updateColumn(currentColumn._id, currentColumn).catch(() => setColumns(columns))
      } else {
        // Move card in twos columns
        updateColumn(currentColumn._id, currentColumn).catch(() => setColumns(columns))
        if (dropResult.addedIndex !== null) {
          let currentCard = cloneDeep(dropResult.payload)
          currentCard.columnId = currentColumn._id
          updateCard(currentCard._id, currentCard)
        }
      }
    }
  }

  const addNewColumn = () => {
    if (newColumnTitle !== '') {
      const newColumn = {
        boardId: board._id,
        title: newColumnTitle.trim()
      }

      createNewColumn(newColumn).then(column => {
        let newColumns = [...columns]
        newColumns.push(column)
  
        let newBoard = {...board}
        newBoard.columnOrder = newColumns.map(column => column._id)
  
        setBoard(newBoard)
        setColumns(newColumns)
  
        setOpenNewColumnForm(false)
        setNewColumnTitle('')
      })

    }
    else {
      inputNewColumnRef.current.focus();
    }
  }
  
  const removeNewColumn = () => {
    setNewColumnTitle('')
    setOpenNewColumnForm(false)
  }

  const onUpdateColumnState = (newColumn) => {
    const newColumnId = newColumn._id

    let newColumns = [...columns]
    const IndexColumnUpdate = newColumns.findIndex((c) => c._id === newColumnId)

    if (newColumn._destroy) {
      newColumns.splice(IndexColumnUpdate, 1)
    } else {
      newColumns.splice(IndexColumnUpdate, 1, newColumn)
    }

    let newBoard = board
    newBoard.columnOrder = newColumns.map(column => column._id)
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
            <Column column={column} onCardDrop={onCardDrop} onUpdateColumnState={onUpdateColumnState} />
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
              <span className="cancel-new-column cancel-icon" onClick={removeNewColumn}> <i className="fa fa-trash icon" /> </span>
            </Col>
          </Row>
        }
      </BtContainer>
    </div>
  )
}
