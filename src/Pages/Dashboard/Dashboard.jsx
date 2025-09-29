import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { dashboardWidth } from '../../Shared/Constants/Constant'
import Cards from './Cards'

function Dashboard() {
  const [isExpand, setisExpand] = useState(true)
  const expand = () => {
    setisExpand(!isExpand)
  }
  
  return (
    <>
      <div className='d-flex justify-content-between' style={{height:'100vh'}}>
        <Sidebar expand={expand} />
        <Outlet />
      </div>
    </>
  )
}

export default Dashboard