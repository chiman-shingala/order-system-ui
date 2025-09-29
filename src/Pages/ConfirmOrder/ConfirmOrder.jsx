import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { dispatchConfirmOrder, getConfirmOrder, receivedConfirmOrder, returnedConfirmOrder, updateConfirmOrder } from '../../Redux/Actions/ConfirmOrdersAction';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import CustomDataTable from '../../Components/CustomDataTable/CustomDataTable';
import { getAuthLoginUser } from '../../Services/AuthService/AuthService';
import { confirmOrderByTrnNo, dispatchOrderByTrnNo, getOrderByTrno, getPartypermission, receivedOrderByTrnNo, returnedOrderByTrnNo } from '../../Redux/Actions/orderMasterAction';
import { confirmationPopup, errorPopup, successPopup } from '../../Shared/Constants/PopupConstant/PopupContant';
import { useParams } from 'react-router-dom';
import { addPayment, getPaymentDetail } from '../../Redux/Actions/PaymentAction';
import Select from "react-select";
import { roundValue } from '../../Shared/Constants/Constant';

function ConfirmOrder() {
  const [show, setshow] = useState(false)
  const [showPaymentDetail, setshowPaymentDetail] = useState(false)
  const [showPayment, setshowPayment] = useState(false)
  const AllConfirmOrders = useSelector(state => state.confirmOrders.confirmOrders);
  const [loginUser, setloginUser] = useState(getAuthLoginUser())
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
  const { register: register2, handleSubmit: handleSubmit2, formState: { errors: errors2 }, reset: reset2, setValue: setPaymentValue } = useForm();
  const AllItems = useSelector(state => state.items.items);
  const AllCompanies = useSelector(state => state.company.company);
  const [AllData, setAllData] = useState([])
  const [mastercolumn, setmastercolumn] = useState([])
  const paymentDetail = useSelector(state => state.paymentDetail.paymentDetail)
  const [AllParty, setAllParty] = useState([])
  const [loginCompanyDetail, setloginCompanyDetail] = useState({})

  let [filterData, setFilterData] = useState({})

  const getOrder = useSelector(state => state.orders.orders)
  const dispatch = useDispatch();
  const params = useParams()
  useEffect(() => {
    getParamsData()
    getOrdersByParameters()
    GetPartyPermission()
  }, [])

  useEffect(() => {
    if (loginUser && AllCompanies) {
      let existCompanyData = AllCompanies.find(x => x.CompanyId == loginUser.companyId)
      if (existCompanyData) {
        setloginCompanyDetail(existCompanyData)
      }
    }
  }, [AllCompanies, loginUser])


  const GetPartyPermission = async () => {
    setAllParty([...await getPartypermission()])
  }

  const getParamsData = () => {
    if (params.FromDate && params.ToDate) {
      let dates = { FromOrderDate: params.FromDate, ToOrderDate: params.ToDate, key: params.key }
      setValue('FromOrderDate', params.FromDate)
      setValue('ToOrderDate', params.ToDate)
      if (!params?.key) {
        delete dates.key;
      }
      filterData = { ...dates }
      setFilterData({ ...filterData })
      return dates
    } else {
      let payload = {
        FromOrderDate: moment().format('YYYY-MM-DD'),
        ToOrderDate: moment().format('YYYY-MM-DD')
      }
      setValue('FromOrderDate', moment().format('YYYY-MM-DD'))
      setValue('ToOrderDate', moment().format('YYYY-MM-DD'))
      filterData = { ...payload }
      setFilterData({ ...filterData })
      return payload
    }
  }

  const getOrdersByParameters = () => {
    if (params.FromDate && params.ToDate) {
      setValue('FromOrderDate', params.FromDate)
      setValue('ToOrderDate', params.ToDate)
      dispatch(getConfirmOrder(filterData))
    } else {
      let payload = {
        FromOrderDate: moment().format('YYYY-MM-DD'),
        ToOrderDate: moment().format('YYYY-MM-DD')
      }
      dispatch(getConfirmOrder(filterData))
    }
  }

  useEffect(() => {
    setAllData([...AllConfirmOrders])
  }, [AllConfirmOrders])
  useEffect(() => {
    setAllData([])
  }, [])

  const getItems = (e, TrnNo) => {
    let index = AllConfirmOrders.findIndex(x => x.TrnNo == TrnNo)
    if (AllData[index].IsOrderDispatched) {
      let error = 'Cannot unconfirm order that is dispatched.'
      errorPopup(error);
    } else {
      if (e.target.name == 'IsOrderConfirmed') {
        if (e.target.checked) {
          let error = 'Do you want to confirm this Order?';
          confirmationPopup(error).then((result) => {
            if (result.isConfirmed) {
              AllData[index].IsOrderConfirmed = true;
              dispatch(updateConfirmOrder(AllData[index], filterData))
              setAllData([...AllData])
              return true
            }
          })
        } else {
          let error = 'Are you sure to unconfirm this Order?';
          confirmationPopup(error).then((result) => {
            if (result.isConfirmed) {
              AllData[index].IsOrderConfirmed = false;
              dispatch(updateConfirmOrder(AllData[index], filterData))
              setAllData([...AllData])
              return true
            }
          })
        }
      }
    }
  }
  const dispatchOrder = (e, TrnNo) => {
    let index = AllConfirmOrders?.findIndex(x => x.TrnNo == TrnNo)
    if (AllData[index].IsOrderReceived) {
      let error = "Order is already dispatched and received.";
      errorPopup(error);
    } else {
      if (e.target.name == 'IsOrderDispatched') {
        if (e.target.checked) {
          let error = 'do you want to dispatch this order?'
          confirmationPopup(error).then((result) => {
            if (result.isConfirmed) {
              AllData[index].IsOrderDispatched = true;
              dispatch(dispatchConfirmOrder(AllData[index], filterData))
              setAllData([...AllData])
              return true
            }
          })
        } else {
          let error = 'Are you sure to cancel dispatch?'
          confirmationPopup(error).then((result) => {
            if (result.isConfirmed) {
              AllData[index].IsOrderDispatched = false;
              dispatch(dispatchConfirmOrder(AllData[index], filterData))
              setAllData([...AllData])
              return true
            }
          })
        }
      }
    }
  }

  const GetOrderDeatailOrder = (e, SeqNo) => {
    let order = getOrder.find(x => x.SeqNo == SeqNo);
    if (order.IsOrderDispatched == true) {
      let error = 'Order is already dispatched and received.';
      errorPopup(error);
    } else {
      if (e.target.name == 'IsOrderConfirmed') {
        if (e.target.checked) {
          let error = 'Do you want to confirm this Order?';
          confirmationPopup(error).then((result) => {
            if (result.isConfirmed) {
              order.IsOrderConfirmed = true
              dispatch(confirmOrderByTrnNo(order, filterData))
              return true
            }
          })
        } else {
          let error = 'Are you sure to unconfirm this Order?';
          confirmationPopup(error).then((result) => {
            if (result.isConfirmed) {
              order.IsOrderConfirmed = false
              dispatch(confirmOrderByTrnNo(order, filterData))
              return true
            }
          })
        }
      }
    }
  }
  const dispatchOrderDetailOrder = (e, SeqNo) => {
    let order = getOrder.find(x => x.SeqNo == SeqNo);
    if (e.target.name == 'IsOrderDispatched') {
      if (e.target.checked) {
        let error = 'do you want to dispatch this order?'
        confirmationPopup(error).then((result) => {
          if (result.isConfirmed) {
            order.IsOrderDispatched = true
            dispatch(dispatchOrderByTrnNo(order, filterData))
            // getOrdersByParameters()
            return true
          }
        })
      } else {
        if (order.IsOrderReceived == true) {
          let error = 'Order is already dispatched and received.';
          errorPopup(error);
        }
        else {
          let error = 'Are you sure to cancel dispatch?'
          confirmationPopup(error).then((result) => {
            if (result.isConfirmed) {
              order.IsOrderDispatched = false
              dispatch(dispatchOrderByTrnNo(order, filterData))
              getOrdersByParameters()
              return true
            }
          })
        }
      }
    }
  }

  const ReceivedOrder = (e, TrnNo) => {
    let index = AllConfirmOrders?.findIndex(x => x.TrnNo == TrnNo)
    if (AllData[index].IsOrderReturned) {
      let message = 'Order is already returned, cannot unreceive!';
      errorPopup(message)
    } else {
      if (e.target.name == 'IsOrderReceived') {
        if (e.target.checked) {
          let message = 'Do you receive this order?';
          confirmationPopup(message).then((result) => {
            if (result.isConfirmed) {
              AllData[index].IsOrderReceived = true;
              dispatch(receivedConfirmOrder(AllData[index], filterData))
              setAllData([...AllData])
              return true
            }
          })
        } else {
          let message = 'Are you sure this order is not received?';
          confirmationPopup(message).then((result) => {
            if (result.isConfirmed) {
              AllData[index].IsOrderReceived = false;
              dispatch(receivedConfirmOrder(AllData[index], filterData))
              setAllData([...AllData])
              return true
            }
          })
        }
      }
    }
  }

  const receivedOrderDetailOrder = (e, SeqNo) => {
    let order = getOrder.find(x => x.SeqNo == SeqNo);
    if (order.IsOrderReturned) {
      let error = 'Order is already dispatched and received.';
      errorPopup(error);
    } else {
      if (e.target.name == 'IsOrderReceived') {
        if (e.target.checked) {
          let message = 'Do you receive this order?';
          confirmationPopup(message).then((result) => {
            if (result.isConfirmed) {
              order.IsOrderReceived = true
              dispatch(receivedOrderByTrnNo(order, filterData))
              // getOrdersByParameters()
              return true
            }
          })
        } else {
          let message = 'Are you sure this order is not received?';
          confirmationPopup(message).then((result) => {
            if (result.isConfirmed) {
              order.IsOrderReceived = false
              dispatch(receivedOrderByTrnNo(order, filterData))
              getOrdersByParameters()
              return true
            }
          })
        }
      }
    }
  }

  const ReturnedOrder = (e, TrnNo) => {
    let index = AllConfirmOrders?.findIndex(x => x.TrnNo == TrnNo)
    if (e.target.name == 'IsOrderReturned') {
      if (e.target.checked) {
        let message = 'Do you return this order?';
        confirmationPopup(message).then((result) => {
          if (result.isConfirmed) {
            AllData[index].IsOrderReturned = true;
            dispatch(returnedConfirmOrder(AllData[index], filterData))
            setAllData([...AllData])
            return true
          }
        })
      } else {
        let message = 'Are you sure this order is not returned?';
        confirmationPopup(message).then((result) => {
          if (result.isConfirmed) {
            AllData[index].IsOrderReturned = false;
            dispatch(returnedConfirmOrder(AllData[index], filterData))
            setAllData([...AllData])
            return true
          }
        })
      }
    }
  }

  const returnedOrderDetailOrder = (e, SeqNo) => {
    let order = getOrder.find(x => x.SeqNo == SeqNo);
    if (e.target.name == 'IsOrderReturned') {
      if (e.target.checked) {
        let message = 'Do you want to return this order?';
        confirmationPopup(message).then((result) => {
          if (result.isConfirmed) {
            order.IsOrderReturned = true
            dispatch(returnedOrderByTrnNo(order, filterData))
            // getOrdersByParameters()
            return true
          }
        })
      } else {
        let message = 'Are you sure this order is not returned?';
        confirmationPopup(message).then((result) => {
          if (result.isConfirmed) {
            order.IsOrderReturned = false
            dispatch(returnedOrderByTrnNo(order, filterData))
            getOrdersByParameters()
            return true
          }
        })
      }
    }
  }

  const checkOrder = (id) => {
    dispatch(getOrderByTrno(id))
    setshow(true)
  }
  const handleClose = () => {
    setshow(false)
  }
  const handlePaymentClose = () => {
    reset2()
    setshowPayment(false)
  }

  const checkPayment = (TrnNo) => {
    let order = AllConfirmOrders?.find(x => x.TrnNo == TrnNo)
    setPaymentValue("PaymentDate", moment().format('YYYY-MM-DD'))
    setPaymentValue("TrnNo", order.TrnNo)
    setPaymentValue("InvoiceNo", order.InvoiceNo)
    setPaymentValue("RemaningAmount", order.RemaningAmount)
    setPaymentValue("PaymentAmount", order.RemaningAmount)
    setPaymentValue("AdjustAmount", 0)
    setshowPayment(true)
  }
  const checkPaymentDetail = (TrnNo) => {
    let order = AllConfirmOrders?.find(x => x.TrnNo == TrnNo)
    dispatch(getPaymentDetail(order))
    setshowPaymentDetail(true)
  }
  const paymentDetailClose = () => {
    setshowPaymentDetail(false)
  }
  let columns = [
    {
      name: 'Company Name',
      selector: row => row?.CompanyName,
      sortable: true,
      wrap: true,
      maxWidth: '250px',
      minWidth: '270px',
    },
    {
      name: 'Party Name',
      selector: row => row?.PartyName,
      sortable: true,
      wrap: true,
      maxWidth: '250px',
      minWidth: '270px',
    },
    {
      name: 'Trn Date',
      selector: row => moment(row?.TrnDate).format('DD-MM-YYYY'),
      sortable: true,
      maxWidth: '120px',
      minWidth: '120px',
    },
    {
      name: 'Invoice No.',
      selector: row => row?.InvoiceNo,
      sortable: true,
      maxWidth: '200px',
      minWidth: '145px',
    },
    {
      name: 'TrnNo',
      selector: (row, i) => <div className='white_space_nowrap text-end'>
        <span className='btn ms-2 border shadow' onClick={() => checkOrder(row?.TrnNo)} >{row?.TrnNo}</span>
      </div>,
      maxWidth: '100px',
      minWidth: '95px',
    },
    {
      name: 'Pcs',
      selector: row => row?.TotalPcs.toLocaleString('en-IN'),
      sortable: true,
      right: true,
      maxWidth: '90px',
      minWidth: '90px',
    },
    {
      name: 'Rate',
      selector: row => (row?.Rate).toLocaleString('en-IN'),
      sortable: true,
      right: true,
      maxWidth: '130px',
      minWidth: '130px',
    },
    {
      name: 'Amount',
      selector: row => (row?.Amount).toLocaleString('en-IN'),
      sortable: true,
      right: true,
      maxWidth: '150px',
      minWidth: '150px',
    },
    {
      name: 'Payment',
      selector: (row, i) => <div className='white_space_nowrap text-end'>
        {
          <span className='btn ms-2 border shadow' onClick={() => checkPaymentDetail(row?.TrnNo)} > {(row?.PaymentAmount).toLocaleString('en-IN')}</span>
        }
      </div>,
      right: true,
      sortable: true,
      maxWidth: '150px',
      minWidth: '150px',
      omit: !loginCompanyDetail.IsPayment
    },
    {
      name: 'Adjust',
      selector: (row) => <div className='white_space_nowrap text-end'>
        {
          (row?.AdjustAmount).toLocaleString('en-IN')
        }
      </div>,
      sortable: true,
      right: true,
      maxWidth: '120px',
      minWidth: '120px',
      omit: !loginCompanyDetail.IsPayment
    },
    {
      name: 'Remaining',
      selector: (row) => <div className='white_space_nowrap text-end'>
        {
          (row?.RemaningAmount).toLocaleString('en-IN')
        }
      </div>,
      sortable: true,
      right: true,
      maxWidth: '150px',
      minWidth: '150px',
      omit: !loginCompanyDetail.IsPayment
    },
    {
      name: 'AccYear',
      selector: row => row?.AcYear,
      sortable: true,
      maxWidth: '120px',
      minWidth: '115px',
    },
    {
      name: 'Confirmed',
      selector: (row, i) => <div className='white_space_nowrap' style={{ maxWidth: '450px' }}>
        {
          loginUser.usercategoryId < 3 ?
            <input type='checkbox' className='checkbox-20' checked={row.IsOrderConfirmed} id={`checkButton${i}`} name='IsOrderConfirmed' onChange={(e) => getItems(e, row.TrnNo)} />
            :
            <input type='checkbox' className='checkbox-20' checked={row.IsOrderConfirmed} id={`checkButton${i}`} name='IsOrderConfirmed' readOnly />
        }
      </div>,
      maxWidth: '120px',
      minWidth: '120px',
    },
    {
      name: 'Dispatched',
      selector: (row, i) => <div className='white_space_nowrap' >
        {
          loginUser.usercategoryId < 3 ?
            <input type='checkbox' className='checkbox-20' checked={row.IsOrderDispatched} id={`dispatchcheck${i}`} name='IsOrderDispatched' onChange={(e) => dispatchOrder(e, row.TrnNo)} />
            :
            <input type='checkbox' className='checkbox-20' checked={row.IsOrderDispatched} id={`dispatchcheck${i}`} name='IsOrderDispatched' readOnly />

        }
      </div>,
      maxWidth: '130px',
      minWidth: '125px',
    },
    {
      name: 'Received',
      selector: (row, i) => <div className='white_space_nowrap' >
        {
          loginUser.usercategoryId < 3 ?
            <>
              <input type='checkbox' className='checkbox-20' checked={row.IsOrderReceived} id={`receivecheck${i}`} name='IsOrderReceived' onChange={(e) => ReceivedOrder(e, row.TrnNo)} />
            </>
            :
            <input type='checkbox' className='checkbox-20' checked={row.IsOrderReceived} id={`receivecheck${i}`} name='IsOrderReceived' readOnly />
        }
      </div>,
      maxWidth: '120px',
      minWidth: '120px',
    },
    {
      name: 'Returned',
      selector: (row, i) => <div className='white_space_nowrap' >
        {
          loginUser.usercategoryId < 3 ?
            <>
              <input type='checkbox' className='checkbox-20' checked={row.IsOrderReturned} id={`returncheck${i}`} name='IsOrderReturned' onChange={(e) => ReturnedOrder(e, row.TrnNo)} />
            </>
            :
            <input type='checkbox' className='checkbox-20' checked={row.IsOrderReturned} id={`returncheck${i}`} name='IsOrderReturned' readOnly />
        }
      </div>,
      maxWidth: '130px',
      minWidth: '125px',
    },
    {
      name: 'AddPayment',
      selector: (row, i) => <div className='white_space_nowrap'>
        {row.RemaningAmount == 0 ?
          <Button variant="outline-success px-3" className='fs-14px' >Done</Button>
          :
          <Button className='btn btn-info fs-12px' onClick={() => checkPayment(row?.TrnNo)} >Payment</Button>
        }
      </div>,
      maxWidth: '145px',
      minWidth: '140px',
      omit: !loginCompanyDetail.IsPayment
    }

  ];
  if (loginUser.usercategoryId > 1) {
    columns.splice(0, 1)
  }

  let paymentDetailColumn = [
    {
      name: 'Seq No',
      selector: row => row.SeqNo,
      width: '90px',
    },
    {
      name: 'AcYear',
      selector: row => row.AcYear,
      minWidth: '90px',
    },
    {
      name: 'PaymentDate',
      selector: row => moment(row.PaymentDate).format("DD-MM-YYYY"),
      minWidth: '130px',
    },
    {
      name: 'Payment',
      right: true,
      selector: row => (row?.PaymentAmount).toLocaleString('en-IN'),
      minWidth: '100px',
    },
    {
      name: 'Adjust',
      right: true,
      selector: row => (row?.AdjustAmount).toLocaleString('en-IN'),
      minWidth: '100px',
    },
    {
      name: 'Remark',
      selector: row => row.Remark,
      minWidth: '150px',
    },
  ]

  const checkOrderColumn = [
    {
      name: 'Seq No',
      selector: row => row.SeqNo,
      minWidth: '100px',
    },
    {
      name: 'Item',
      selector: row => AllItems.find(x => x.ItemId == row.ItemId)?.ItemName,
      minWidth: '250px',
    },
    {
      name: 'pieces',
      right: true,
      selector: row => row.Pcs.toLocaleString('en-IN'),
      minWidth: '125px',
    },
    {
      name: 'Rate',
      right: true,
      selector: row => (row?.Rate).toLocaleString('en-IN'),
      minWidth: '125px',
    },
    {
      name: 'Amount',
      right: true,
      selector: row => (row?.Amount).toLocaleString('en-IN'),
      minWidth: '125px',
    },
    {
      name: 'Confirmed',
      selector: (row, i) => <div className='white_space_nowrap' >
        {
          loginUser.usercategoryId < 3 ?
            <input type='checkbox' className='checkbox-20' checked={row.IsOrderConfirmed} name='IsOrderConfirmed' onChange={(e) => GetOrderDeatailOrder(e, row.SeqNo)} />
            :
            <input type='checkbox' className='checkbox-20' checked={row.IsOrderConfirmed} name='IsOrderConfirmed' readOnly />
        }
      </div>,
      width: '120px',
    },
    {
      name: 'Dispatched',
      selector: (row, i) => <div className='white_space_nowrap' >
        {
          loginUser.usercategoryId < 3 ?
            <input type='checkbox' className='checkbox-20' checked={row.IsOrderDispatched} name='IsOrderDispatched' onChange={(e) => dispatchOrderDetailOrder(e, row.SeqNo)} />
            :
            <input type='checkbox' className='checkbox-20' checked={row.IsOrderDispatched} name='IsOrderDispatched' readOnly />
        }
      </div>,
      width: '130px',
    },
    {
      name: 'Received',
      selector: (row, i) => <div className='white_space_nowrap' >
        {
          loginUser.usercategoryId < 3 ?
            <input type='checkbox' className='checkbox-20' checked={row.IsOrderReceived} name='IsOrderReceived' onChange={(e) => receivedOrderDetailOrder(e, row.SeqNo)} />
            :
            <input type='checkbox' className='checkbox-20' checked={row.IsOrderReceived} name='IsOrderReceived' readOnly />
        }
      </div>,
      minWidth: '120px',
    },
    {
      name: 'Returned',
      selector: (row, i) => <div className='white_space_nowrap' >
        {
          loginUser.usercategoryId < 3 ?
            <input type='checkbox' className='checkbox-20' checked={row.IsOrderReturned} name='IsOrderReturned' onChange={(e) => returnedOrderDetailOrder(e, row.SeqNo)} />
            :
            <input type='checkbox' className='checkbox-20' checked={row.IsOrderReturned} name='IsOrderReturned' readOnly />
        }
      </div>,
      width: '130px',
    },
  ]


  const paymentSumbit = async (data) => {
    let index = AllConfirmOrders?.find(x => x.TrnNo == data.TrnNo)
    data.PaymentAmount = Number(data.PaymentAmount)
    data.AdjustAmount = Number(data.AdjustAmount);

    if (((data.PaymentAmount > 0) && !(data.PaymentAmount > index.RemaningAmount)) && (!(data.AdjustAmount < 0) || !(data.AdjustAmount > index.RemaningAmount)) && ((data.PaymentAmount + data.AdjustAmount) <= index.RemaningAmount)) {
      let message = 'Are you to confirm payment?';
      confirmationPopup(message).then((result) => {
        if (result.isConfirmed) {
          dispatch(addPayment(data, filterData))
          successPopup("Payment is successfully added.")
          for (let key in data) {
            setPaymentValue(key, '')
          }
          handlePaymentClose();
          return true
        }
      })


    }
    else {
      let error = "Please check your payment or adjust amount.";
      errorPopup(error)
      for (let key in data) {
        setPaymentValue(key, '')
      }
      handlePaymentClose();
    }
  }

  const [selectedOptions, setSelectedOptions] = useState();

  // Array of all options
  const optionList = AllParty.map((x, i) => {
    return { value: x.PartyCode, label: x.PartyName };
  });

  // Function triggered on selection
  function handleSelect(data) {
    setSelectedOptions(data);
  }

  const onSubmit = (data) => {
    filterData = { ...data }
    setFilterData({ ...filterData })
    if (selectedOptions) {
      data.PartyCode = selectedOptions?.map(x => x.value)
    }
    dispatch(getConfirmOrder(data))
  }

  return (
    <>
      <div className='dashboard_bg'>
        <div className='header_sticky'>
          <Row className='m-0 w-100'>
            <Col xs={6} className='p-0'>
              <h2>Confirm Order</h2>
            </Col>
          </Row>
        </div>

        <div className='padding_section'>
          <Row className='table_section  py-4'>
            {
              loginUser.usercategoryId == 1 ?
                <Col lg={2}>
                  <label className='form_label'>Company:</label>
                  <select name="ItemId" className='form_input' defaultValue={''} {...register("CompanyId")}>
                    <option value='' disabled>--Select Company--</option>
                    {
                      AllCompanies?.map((x, i) => {
                        return <option key={i} value={x.CompanyId}>{x.CompanyName}</option>
                      })
                    }
                  </select>
                </Col> : <></>}
            <Col xxl={4} xl={3} >
              <label className='form_label'>Party:</label>
              {
                optionList.length === 1 ? (
                  <select disabled className='form_input min_width_200'>
                    <option selected value={optionList[0].value}>{optionList[0].label}</option>
                  </select>
                ) :
                  <Select
                    options={optionList}
                    placeholder="Select Party"
                    value={selectedOptions}
                    onChange={handleSelect}
                    isSearchable={true}
                    isMulti
                    name="ItemId"
                    menuPosition="fixed"
                  />

              }

            </Col>
            <Col xxl={2} xl={3} lg={4} md={6} >
              <label className='form_label'>From Date:</label>
              <input type="date" className='form_input' {...register("FromOrderDate")} />
            </Col>
            <Col xxl={2} xl={3} lg={4} md={6}>
              <label className='form_label'>To Date:</label>
              <input type="date" className='form_input' {...register("ToOrderDate")} />
            </Col>

            <Col xxl={2} xl={3} lg={4} md={6}>
              <label className='form_label'>Invoice No:</label>
              <input type="text" className='form_input' {...register("InvoiceNo")} />
            </Col>
            <Col xxl={2} xl={3} lg={4} md={6}>
              <label className='form_label'>From Rate:</label>
              <input type="number" min={0} className='form_input' {...register("FromRate")} />
            </Col>
            <Col xxl={2} xl={3} lg={4} md={6}>
              <label className='form_label'>To Rate:</label>
              <input type="number" min={0} className='form_input' {...register("ToRate")} />
            </Col>
            <Col xxl={2} xl={3} lg={4} md={6}>
              <label className='form_label'>From Amount:</label>
              <input type="number" min={0} className='form_input' {...register("FromAmount")} />
            </Col>
            <Col xxl={2} xl={3} lg={4} md={6}>
              <label className='form_label'>To Amount:</label>
              <input type="number" min={0} className='form_input' {...register("ToAmount")} />
            </Col>
            <Col xxl={2} xl={3} lg={4} md={6}>
              <label className='form_label'>From Transaction No.:</label>
              <input type="number" min={0} className='form_input' {...register("FromTrnNo")} />
            </Col>
            <Col xxl={2} xl={3} lg={4} md={6}>
              <label className='form_label'>To Transaction No.:</label>
              <input type="number" min={0} className='form_input' {...register("ToTrnNo")} />
            </Col>
            <Col xxl={2} xl={3} lg={4} md={6}>
              <label className='form_label'>From Seq No.:</label>
              <input type="number" min={0} className='form_input' {...register("FromSeqNo")} />
            </Col>
            <Col xxl={2} xl={3} lg={4} md={6}>
              <label className='form_label'>To Seq No.:</label>
              <input type="number" min={0} className='form_input' {...register("ToSeqNo")} />
            </Col>
            <Col xxl={2} xl={3} lg={4} md={6}>
              <label className='form_label'>From Piece:</label>
              <input type="number" min={0} className='form_input' {...register("FromPcs")} />
            </Col>
            <Col xxl={2} xl={3} lg={4} md={6}>
              <label className='form_label'>To Piece:</label>
              <input type="number" min={0} className='form_input' {...register("ToPcs")} />
            </Col>
            <Col xxl={2} xl={3} lg={4} md={6}>
              <div className='row'>
                <label className='form_label w-auto invisible'>'</label>
              </div>
              <button className='form_input button_dark w-auto align-self-end mt-1 py-2 px-3' onClick={handleSubmit(onSubmit)}>
                Submit
              </button>
            </Col>

          </Row>
          {
            loginUser.usercategoryId == 3 ?
              <CustomDataTable className='mt-3' columns={columns.filter(column => column.name !== 'AddPayment' && column.name !== 'Company Name')} data={AllData} />
              :
              <CustomDataTable columns={columns} data={AllData} />

          }
        </div>
      </div>

      <Modal size='xl' className='modelRadiusNone' show={show} fullscreen='md-down' onHide={handleClose} backdrop="static" >
        <Modal.Header className='border-0 p-0'>
        </Modal.Header>
        <Modal.Body className='py-0 p-0'>
          <CustomDataTable columns={checkOrderColumn} data={getOrder} />
        </Modal.Body>
        <Modal.Footer className='py-1'>
          <Button variant="outline-danger" className="fs-14px" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal size='xl' className='modal' show={showPaymentDetail} fullscreen='md-down' onHide={paymentDetailClose} backdrop="static" >
        <Modal.Header className='border-0 p-0'>
        </Modal.Header>
        <Modal.Body className='p-0 mb-0'>
          <CustomDataTable columns={paymentDetailColumn} data={paymentDetail} />
        </Modal.Body>
        <Modal.Footer className='py-1'>
          <Button variant="outline-danger" className="fs-14px" onClick={paymentDetailClose}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal size='lg' show={showPayment} fullscreen='md-down' onHide={handlePaymentClose} backdrop="static" >
        <Modal.Header closeVariant='white' closeButton className='border-0 black_Background text-white'>
          <Modal.Title>Payment Entry</Modal.Title>
        </Modal.Header>
        <Modal.Body className='py-0'>
          <Row>
            <Col lg={4}>
              <label className='form_label'>TrnNo</label>
              <input type="text" className='form_input' autoComplete="on" {...register2("TrnNo")} readOnly />
            </Col>

            <Col lg={4}>
              <label className='form_label'>Invoice No</label>
              <input type="text" className='form_input' autoComplete="on" {...register2("InvoiceNo")} readOnly />
            </Col>
            <Col lg={4}>
              <label className='form_label'>Date</label>
              <input type="date" className='form_input' autoComplete="on" defaultValue={moment().format('YYYY-MM-DD')} {...register2("PaymentDate", { required: true })} />
              {errors2.PaymentDate && <span className='error_message'>PaymentDate is required</span>}
            </Col>
            <Col lg={6}>
              <label className='form_label'>Remaining Amount</label>
              <input type="number" min={0} className='form_input' autoComplete="on" {...register2("RemaningAmount")} readOnly />
            </Col>
            <Col lg={6}>
              <label className='form_label'>Payment Amount</label>
              <input type="number" min={0} className='form_input' autoComplete="on" {...register2("PaymentAmount", { required: true })} />
              {errors2.PaymentAmount && <span className='error_message'>PaymentAmount is required</span>}
            </Col>
            <Col lg={6}>
              <label className='form_label'>Adjust Amount</label>
              <input type="number" min={0} className='form_input' autoComplete="on" {...register2("AdjustAmount")} />
            </Col>
            <Col lg={12}>
              <label className='form_label'>Remark</label>
              <input type="text" className='form_input' autoComplete="on" {...register2("Remark")} />
            </Col>
            <Col lg={12}>
              <button className='button_dark py-2 px-3 my-3' onClick={handleSubmit2(paymentSumbit)}>Save</button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ConfirmOrder