import React, { useEffect } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import './Dashboard.css';
import { useDispatch, useSelector } from 'react-redux';
import { getCountDetail } from '../../Redux/Actions/GetTotalOrderCountAction';
import { Link, NavLink } from 'react-router-dom';
import moment from 'moment';
import { BiCartAdd, BiListCheck, BiSolidCheckCircle, BiSolidTruck } from 'react-icons/bi';

function Cards(props) {
    const orderCount = useSelector(state => state.orderCount.orderCount)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCountDetail())
    }, [])

    const NavLinkData = (dataName , parameter) => {
        if(orderCount && orderCount[dataName] && orderCount[dataName] != 0){
            return <NavLink to={`/confirmOrder/${props.Dates?.FromDate ?? moment().format('YYYY-MM-DD')}/${props.Dates?.ToDate ?? moment().format('YYYY-MM-DD')}/${parameter ?? ''}`}>
                        {orderCount[dataName]}
                    </NavLink>
        }else{
            return <Link>0</Link>
        }
    }

    return (
        <>
            <Row className='g-4 h-100'>
                <Col sm={12} md={6} lg={3}>
                    <Card className='dash_card h-100'>
                        <Card.Body>
                            <Card.Text className='h-100 d-flex flex-column'>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <span>Total Orders</span>
                                    <BiCartAdd size={40} />
                                </div>
                                <span className='fs-50 Nav'>
                                    {NavLinkData('TotalOrders')}
                                </span>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={12} md={6} lg={3}>
                    <Card className='dash_card h-100'>
                        <Card.Body>
                            <Card.Text className='h-100 d-flex flex-column'>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <span>Confirmed Orders</span>
                                    <BiListCheck size={40} />
                                </div>
                                <span className='fs-50 Nav'>
                                    {NavLinkData('ConfirmedOrders' ,'IsOrderConfirmed' )}
                                </span>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={12} md={6} lg={3}>
                    <Card className='dash_card h-100'>
                        <Card.Body>
                            <Card.Text className='h-100 d-flex flex-column'>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <span>Dispatched Orders</span>
                                    <BiSolidTruck  size={40} />
                                </div>
                                <span className='fs-50 Nav'>
                                    {NavLinkData('OrderDispatched' ,'IsOrderDispatched' )}
                                </span>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={12} md={6} lg={3}>
                    <Card className='dash_card h-100'>
                        <Card.Body>
                            <Card.Text className='h-100 d-flex flex-column'>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <span>Received Orders</span>
                                    <BiSolidCheckCircle  size={40} />
                                </div>
                                <span className='fs-50 Nav'>
                                    {NavLinkData('OrderReceived' ,'IsOrderReceived' )}
                                </span>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                {/* <Col sm={12} md={6} lg={3}>
                    <Card className='dash_card h-100'>
                        <Card.Body>
                            <Card.Text className='h-100 d-flex flex-column'>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <span>Pending Orders</span>
                                    <BiCartAdd size={40} />
                                </div>
                                <span className='fs-50 Nav'>
                                    {NavLinkData('PendingOrders')}
                                </span>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col> */}
            </Row>
        </>
    )
}

export default Cards