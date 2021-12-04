import React from 'react'
import { useState, useEffect } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { mapOrder } from 'utilities/sorts'
import { Dropdown, Form } from 'react-bootstrap'
import './Column.scss'

import ConfirmModal from 'components/common/confirmModal'
import { MODAL_ACTION_CONFIRM } from 'utilities/constants'
import Card from 'components/Card/Card'

export default function Column(props) {
  const { column, onCardDrop, updateColumn } = props
  const cards = mapOrder(column.cards, column.cardOrder, 'id')
  const [showConfirmRemove, setShowConfirmRemove] = useState(false)
  const [columnTitle, setColumnTitle] = useState('')
  const toggleShowConfirmRemove = () => setShowConfirmRemove(!showConfirmRemove)

  useEffect(() => {
    setColumnTitle(column.title)
  }, [column.title])
  const onConfirmAction = (type) => {
    if (MODAL_ACTION_CONFIRM) {
      const newColumn = {
        ...column,
        _destroy: true
      }
      updateColumn(newColumn)
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
  const handleColumnTitleBlur = (e) => {
    e.target.blur()
    const newColumn = {
      ...column,
      title: columnTitle
    }
    updateColumn(newColumn)
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
          {
            column.cards.map((card, index) => (
              <Draggable key={index}>
                <Card card={card} />
              </Draggable>
            ))
          }
        </Container>
      </ul>
      <footer className="footer-board">
        <div className="container">
          <i className="fa fa-plus icon" />
          <button>thêm công việc</button>
        </div>
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
