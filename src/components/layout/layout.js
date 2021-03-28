import React from 'react'
import { useHistory } from 'react-router-dom'
import Toolbar from '../toolbar/toolbar'
import './layout.css'

const Layout = ({ children, className }) => {
  const history = useHistory()
  const currentPath = history.location.pathname
  const isVisibleToolbar = currentPath !== '/cards' && true


  return (
    <div className="layout">
      { isVisibleToolbar ? <Toolbar history={history} /> : null }
      <div className={`layout-content ${className || ''}`}>
        {children}
      </div>
    </div>
  );
}
 
export default Layout;