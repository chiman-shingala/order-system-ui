import React, { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from '../../Pages/Login/Login'
import { getAuthLoginUser, getAuthToken } from '../../Services/AuthService/AuthService'
import Dashboard from '../../Pages/Dashboard/Dashboard'
import Home from '../../Pages/Home/Home'
import Page404 from '../../Pages/Page404/Page404'
import ItemMaster from '../../Pages/ItemMaster/ItemMaster'
import CompanyMaster from '../../Pages/CompanyMaster/CompanyMaster'
import OrderMaster from '../../Pages/OrderMaster/OrderMaster'
import UserMaster from '../../Pages/User Master/UserMaster'
import ItemPermission from '../../Pages/ItemPermission/ItemPermission'
import OrderDetails from '../../Pages/OrderDetails/OrderDetails'
import ConfirmOrder from '../../Pages/ConfirmOrder/ConfirmOrder'
import PartyMaster from '../../Pages/PartyMaster/PartyMaster'
import PartyPermission from '../../Pages/PartyPermission/PartyPermission'
import ItemCatlog from '../../Pages/ItemCatlog/ItemCatlog'
import ItemView from '../../Pages/ItemView/ItemView'

function Routing() {
  const [loginUser, setloginUser] = useState(getAuthLoginUser())
  const RouteData = () => {
    if (getAuthToken()) {
      if (loginUser.usercategoryId == 1) {
        return <>
          <Route path='/' element={<Navigate to='/dashboard' />} />
          <Route path='/' element={<Dashboard />} >
            <Route path='dashboard' element={<Home />} />
            <Route path='/items' element={<ItemMaster />} />
            <Route path='/companies' element={<CompanyMaster />} />
            <Route path='/orders' element={<OrderMaster />} />
            <Route path='/users' element={<UserMaster />} />
            <Route path='/chart/Charts1' element={<ItemMaster />} />
            <Route path='/orderDetails' element={<OrderDetails />} />
            <Route path='/partyPermission' element={<PartyPermission />} />
            <Route path='/itemView' element={<ItemView />} />
            <Route path='/confirmOrder' element={<ConfirmOrder />} >
              <Route path=':FromDate/:ToDate' />
              <Route path=':FromDate/:ToDate/:key' />
            </Route>
            <Route path='/partyMaster' element={<PartyMaster />} />
          </Route>
          <Route path='*' element={<Page404 />} />
        </>
      } else if (loginUser.usercategoryId == 2) {
        return <>
          <Route path='/' element={<Navigate to='/dashboard' />} />
          <Route path='/' element={<Dashboard />} >
            <Route path='dashboard' element={<Home />} />
            <Route path='/orders' element={<OrderMaster />} />
            <Route path='/items' element={<ItemMaster />} />
            <Route path='/users' element={<UserMaster />} />
            <Route path='/itemPermission' element={<ItemPermission />} />
            <Route path='/orderDetails' element={<OrderDetails />} />
            <Route path='/itemView' element={<ItemView />} />
            <Route path='/confirmOrder' element={<ConfirmOrder />} >
              <Route path=':FromDate/:ToDate' />
              <Route path=':FromDate/:ToDate/:key' />
            </Route>
            <Route path='/partyMaster' element={<PartyMaster />} />
            <Route path='/partyPermission' element={<PartyPermission />} />

          </Route>
          <Route path='*' element={<Page404 />} />
        </>
      } else if (loginUser.usercategoryId == 3) {
        return <>
          <Route path='/' element={<Navigate to='/dashboard' />} />
          <Route path='/' element={<Dashboard />} >
            <Route path='dashboard' element={<Home />} />
            <Route path='/orders' element={<OrderMaster />} />
            <Route path='/orderDetails' element={<OrderDetails />} />
            <Route path='/itemView' element={<ItemView />} />
            <Route path='/confirmOrder' element={<ConfirmOrder />} >
              <Route path=':FromDate/:ToDate' />
              <Route path=':FromDate/:ToDate/:key' />
            </Route>
          </Route>
          <Route path='*' element={<Page404 />} />
        </>
      }

    }
    else {
      return <>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<Login />} ></Route>
        <Route path='*' element={<Page404 />} />
      </>
    }
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/ItemCatalog' element={<ItemCatlog />}>
            <Route path=':id' />
          </Route>
          {
            // getAuthToken() ?

            RouteData()

            // <>
            //   <Route path='/' element={<Navigate to='/login' />} />
            //   <Route path='/login' element={<Login />} ></Route>
            //   <Route path='*' element={<Page404 />} />
            // </>
          }
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Routing