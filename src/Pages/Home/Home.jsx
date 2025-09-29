import React, { createContext, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import Cards from '../Dashboard/Cards'
import UserWiseOrderChart from '../Dashboard/UserWiseOrderChart'
import TopOrderChart from '../Dashboard/TopOrderChart'
import DailyOrderSummary from '../Dashboard/DailyOrderSummary'
import DashboardDate from '../Dashboard/DashboardDate'
import DuePayment from '../Dashboard/DuePayment'
import { getAuthLoginUser } from '../../Services/AuthService/AuthService'

function Home() {
  const [Dates, setDates] = useState()
  const [loginUser, setloginUser] = useState(getAuthLoginUser())

  const getFromAndToDate = (dateObj) => {
    setDates(dateObj)
  }
  return (
    <>
      <div className='dashboard_bg ps-1'>
        <Row>
          <Col sm={12} md={12} lg={12}>
            <DashboardDate getFromAndToDate={getFromAndToDate} />
          </Col>
          <Col sm={12} md={12} lg={12} className='p-3 '>
            <div className='dashboard_card py-3 p-tb '>
              <Cards Dates={Dates} />
            </div>
          </Col>

          {/* <Col sm={12} md={12} lg={4} className=' p-3'>
            {
              loginUser.usercategoryId == 3 ?
                <div className='dashboard_card shadow-lg bg-light'>
                  <DuePayment />
                </div> :
                <div className='dashboard_card shadow-lg bg-light p-3'>
                  <UserWiseOrderChart />
                </div>
            }

          </Col> */}

          <Col sm={12} md={12} lg={6} className='p-3'>
            <div className='dashboard_card shadow-lg d-flex flex-column justify-content-between bg-white'>
              <DailyOrderSummary />
            </div>
          </Col>

          <Col sm={12} md={12} lg={6} className='small-window p-3'>
            <div className='dashboard_card shadow-lg p-3 d-flex justify-content-center bg-light'>
              <TopOrderChart />
            </div>
          </Col>
        </Row>

      </div >
      <Outlet />
    </>
  )
}

export default Home