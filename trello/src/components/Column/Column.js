import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { mapOrder } from 'utilities/sorts'
import { Dropdown, Form, Button } from 'react-bootstrap'
import { cloneDeep } from 'lodash'
import './Column.scss'

import ConfirmModal from 'components/common/confirmModal'
import { MODAL_ACTION_CONFIRM } from 'utilities/constants'
import Card from 'components/Card/Card'

import { createNewCard, updateColumn } from 'actions/ApiCall'

export default function Column(props) {
  const { column, onCardDrop, onUpdateColumnState } = props
  const cards = mapOrder(column.cards, column.cardOrder, '_id')
  const [showConfirmRemove, setShowConfirmRemove] = useState(false)
  const [columnTitle, setColumnTitle] = useState('')
  const toggleShowConfirmRemove = () => setShowConfirmRemove(!showConfirmRemove)

  const [newCardTitle, setNewCardTitle] = useState('')
  const onNewCardTitleChange = (e) => setNewCardTitle(e.target.value)

  const [openNewCardForm, setOpenNewCardForm] = useState(false)
  const toggleNewCardForm = () => setOpenNewCardForm(!openNewCardForm)
  const removeNewCard = () => setOpenNewCardForm(false)

  const inputNewCardRef = useRef(null)
  useEffect(() => {
    if (inputNewCardRef && inputNewCardRef.current) {
      inputNewCardRef.current.focus()
    }
  }, [openNewCardForm])

  // const addNewCard = () => toggleNewCardForm()

  useEffect(() => {
    setColumnTitle(column.title)
  }, [column.title])

  // remove column
  const onConfirmAction = (type) => {
    if (type === MODAL_ACTION_CONFIRM) {
      const newColumn = {
        ...column,
        _destroy: true
      }
      // Call api
      updateColumn(newColumn._id, newColumn).then((updatedColumn) => {
        onUpdateColumnState(updatedColumn)
      })
    }
    toggleShowConfirmRemove()
  }

  const selectAllInlineText = (e) => {
    e.target.focus()
    e.target.select()
  }

  const handleColumnTitleChange = (e) => {
    setColumnTitle(e.target.value)
  }

  // update column title
  const handleColumnTitleBlur = (e) => {
    e.target.blur()
    if (column.title !== columnTitle) {
      const newColumn = {
        ...column,
        title: columnTitle
      }
      updateColumn(newColumn._id, newColumn).then((updatedColumn) => {
        updatedColumn.cards = newColumn.cards
        onUpdateColumnState(updatedColumn)
      })
    }
  }

  const addNewCard = () => {
    if (newCardTitle !== '') {
      const newCard = {
        boardId: column.boardId,
        columnId: column._id,
        title: newCardTitle.trim()
      }
      // Call api
      createNewCard(newCard).then(card => {
        let newColumn = cloneDeep(column)
        newColumn.cards.push(card)
        newColumn.cardOrder.push(card._id)
  
        onUpdateColumnState(newColumn)
        setNewCardTitle('')
        toggleNewCardForm()
      })

    }
    else {
      inputNewCardRef.current.focus();
    }
  }

  return (
    <div className="board">
      <div className="title-board column-drag-handle">
        <div className="column-title">
          <Form.Control 
            size="sm" type="text" 
            className="tranthe-input-editable"
            value={columnTitle}
            spellCheck="false"
            onClick={selectAllInlineText}
            onChange={handleColumnTitleChange}
            onBlur={handleColumnTitleBlur}
            onKeyDown={(event) => (event.key === 'Enter') && handleColumnTitleBlur(event)}
            onMouseDown={(e) => e.preventDefault()}
          />
        </div>
        <div className="column-dropdown-actions">
        <Dropdown>
          <Dropdown.Toggle id="dropdown-basic" className="dropdown-btn" size="sm" />

          <Dropdown.Menu>
            <Dropdown.Item>add new card</Dropdown.Item>
            <Dropdown.Item onClick={toggleShowConfirmRemove}>remove column</Dropdown.Item>
            <Dropdown.Item>archives</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        </div>
      </div>
      <ul className="card-list">
        { column.cards &&
          <Container
            groupName="col"
            onDrop={dropResult => onCardDrop(column._id, dropResult)}
            getChildPayload={index => cards[index]}
            dragclassName="card-ghost"
            dropclassName="card-ghost-drop"
            dropPlaceholder={{                      
              animationDuration: 150,
              showOnTop: true,
              className: 'card-drop-preview' 
            }}
            dropPlaceholderAnimationDuration={200}
          >
            {
              column.cards.map((card, index) => (
                <Draggable key={index}>
                  <Card card={card} />
                </Draggable>
              ))
            }
          </Container>
        }
        
        { openNewCardForm && 
          <div className="add-new-card-area">
            <Form.Control 
              size="sm" type="text" 
              as="textarea"
              rows="3"
              placeholder="enter card content..."
              className="textarea-enter-new-card"
              ref={inputNewCardRef}
              value={newCardTitle}
              onChange={onNewCardTitleChange}
              onKeyDown={(e) => (e.key === 'Enter') && addNewCard()}
            />
          </div>
        }
      </ul>
      <footer className="footer-board">
        { openNewCardForm && 
          <div className="button-add-new-card">
            <Button 
              size="sm"
              variant="success"
              className="button-add-new-column"
              onClick={addNewCard}
            >
              Add Card
            </Button>
            <span 
              className="cancel-new-column cancel-icon" 
              onClick={removeNewCard}
            > 
              <i className="fa fa-trash icon" /> 
            </span>
          </div>
        }
        { !openNewCardForm &&
          <div className="container" onClick={toggleNewCardForm}>
            <i className="fa fa-plus icon" />
            <button>thêm công việc</button>
          </div>
        }
      </footer>
    
      <ConfirmModal 
        show={showConfirmRemove}
        onAction={onConfirmAction}
        title="Remove column"
        content={`Are you sure you want to remove <strong>${column.title}</strong>`}
      />
    </div>
  )
}
