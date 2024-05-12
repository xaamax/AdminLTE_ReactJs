import React from 'react'

function TabContent({ id, active, children }) {
  return (
    <div className='tab-content' id={id}>
    <div className={`tab-pane fade ${active ? 'active show' : ''} `}>
      {children}
    </div>
    </div>
  )
}

export default TabContent
