import { Col, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import { getOrderCount } from '../../Redux/Actions/GetTotalOrderCountAction';
import { useDispatch } from 'react-redux';
import { getTopUserDateWise } from '../../Redux/Actions/GetTopUserAction';
import { getTopItemDateWise } from '../../Redux/Actions/GetTopItemAction';
import { getDailyOrderDatewise } from '../../Redux/Actions/dailyOrderSummaryAction';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import { orderDetailGlobalData } from '../../Redux/Actions/OrderDetailsByUserAction';
import { roundValue } from '../../Shared/Constants/Constant';

// import { getConfirmOrderDatewise } from '../../Redux/Actions/ConfirmOrdersAction';

function DashboardDate(props) {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const { register: register2, handleSubmit: handleSubmit2, formState: { errors: errors2 }, reset: reset2, setValue: setPaymentValue } = useForm();

  const onSubmit = (data) => {
    props.getFromAndToDate(data)
    dispatch(getOrderCount(data))
    dispatch(getTopUserDateWise(data))
    dispatch(getTopItemDateWise(data))
    dispatch(getDailyOrderDatewise(data))

  }
  useEffect(() => {
    setValue("FromDate", moment().format('YYYY-MM-DD'))
    setValue("ToDate", moment().format('YYYY-MM-DD'))
  }, [])

  const setGlobal = (e) => {
    localStorage.setItem('global', e);
  }

  const onSearch = () => {
    
  }

  return (
    <>
      <Row className=' justify-content-start align-items-center p-2'>
        <Col xxl={2} xl={4}>
          <label className='form_label text-muted'>From Date:</label>
          <input type="date" className='form_input dash_date'  {...register("FromDate", { required: true })} />
          {errors.FromDate && <span className='error_message'>Start Date Required.</span>}

        </Col>
        <Col xxl={2} xl={4}>
          <label className='form_label text-muted'>To Date:</label>
          <input type="date" className='form_input dash_date'  {...register("ToDate", { required: true })} />
          {errors.ToDate && <span className='error_message'>End Date Required.</span>}
        </Col>
        <Col xxl={2} xl={4}>
          <label className='form_label text-muted invisible'>'</label>
          <button className='form_input w-auto py-2 px-3 button_dark' onClick={handleSubmit(onSubmit)}>
            Submit
          </button>
        </Col>

        <Col xxl={1} >
        </Col>

        <Col xxl={3} xl={6}>
          <label className='form_label text-muted'>Search:</label>
          <input type="text" className='form_input dash_date'  {...register2("Search", { required: true })} placeholder='Global order search' onChange={(e) => setGlobal(e.target.value)} />
        </Col>
        <Col xxl={1} xl={6}>
        <label className='form_label text-muted invisible'>:</label>
          <NavLink to='/orderDetails' id='navlink' >
            <span className='form_input button_dark py-2 px-3'>
              Go
            </span>
          </NavLink>
        </Col>
      </Row>
    </>
  )
}

export default DashboardDate