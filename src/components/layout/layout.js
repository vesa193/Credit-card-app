import React from 'react'
import './layout.css'

const Layout = ({ children, className }) => {
  return (
    <div className="layout">
      <div className={`layout-content ${className || ''}`}>
        {children}
      </div>
    </div>
  );
}
 
export default Layout;