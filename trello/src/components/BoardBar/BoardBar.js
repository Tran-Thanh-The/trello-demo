import React from 'react'

import "./BoardBar.scss"

export default function BoardBar() {
  return (
    <div className="board-bar">
      <div className='options'>
        <button>
          <i className="fa fa-star"></i>
        </button>
        <button>
          <span>Dự án</span>
        </button>
        <button>  
          <span>Tran Thanh The</span>
        </button>
      </div>
      <div className='options'>
        <button>
          <i className="fa fa-bolt"></i>
          <span>Tự động hóa</span>
        </button>
        <button>  
          <i className="fa fa-ellipsis-h"></i>
          <span>Hiện menu</span>
        </button>
      </div>
    </div>
  )
}
