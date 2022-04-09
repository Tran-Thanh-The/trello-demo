import React from 'react';
import "./AppBar.scss";

export default function AppBar() {
  return (
    <div className="app-bar">
      <div className='options'>
        <button>
          <i className="fa fa-navicon"></i>
        </button>
        <button>
          <i className="fa fa-home"></i>
        </button>
        <button>  
          <i className="fa fa-columns"></i>
        </button>
        <button>
          <span>Tìm kiếm ... </span>
          <i className="fa fa-search"></i>
        </button>
      </div>
      <span>
        <img src='https://www.seekpng.com/png/full/213-2134127_trello-logo-blue-trello-logo-white-png.png' alt='bg'/>
      </span>
      <div className='options'>
        <button>
          <span>Tạo mới</span>
        </button>
        <button>
          <i className="fa fa-info-circle"></i>
        </button>
        <button>  
          <i className="fa fa-bell"></i>
        </button>
      </div>
    </div>
  ) 
}
