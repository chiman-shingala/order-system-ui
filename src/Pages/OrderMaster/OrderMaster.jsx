import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Alert, Col, Modal, Row } from 'react-bootstrap'
import './OrderMaster.css'
import { useDispatch, useSelector } from 'react-redux';
import { DateSplit, calculateSum } from '../../Shared/Constants/Constant';
import { RiBarChartGroupedFill, RiDeleteBin6Line, RiDeleteBinLine } from 'react-icons/ri'
import { getAuthLoginUser } from '../../Services/AuthService/AuthService';
import { addOrderByTrno, deleteOrderByTrno, getItemPermission, getOrderByTrno, getPartypermission, setBlankOrder } from '../../Redux/Actions/orderMasterAction';
import { confirmationDeletePopup, successPopup } from '../../Shared/Constants/PopupConstant/PopupContant';
import moment from 'moment';
import CustomDataTable from '../../Components/CustomDataTable/CustomDataTable';
import { getConfirmOrder } from '../../Redux/Actions/ConfirmOrdersAction';
import { roundValue } from '../../Shared/Constants/Constant';
import Select from "react-select";
import { addNewParty } from '../../Redux/Actions/PartyMasterAction';
import { BiPlusCircle } from "react-icons/bi";
/* eslint eqeqeq: 0 */
function OrderMaster() {
    const [show, setshow] = useState(false)
    const AllConfirmOrders = useSelector(state => state.confirmOrders.confirmOrders);
    const formBlankData = { TrnNo: 0, SeqNo: 0, TrnDate: "", ItemId: "", Pcs: "", Rate: "", Amount: "", CompanyId: "", AcYear: "", UserId: "", selectedItem: null }
    const OrderByTrn = useSelector(state => state.orders.orders)
    const dispatch = useDispatch()
    let [formRowsData, setformRowsData] = useState([{ ...formBlankData }])
    const [tableError, settableError] = useState([[]])
    const [isTrnDate, setisTrnDate] = useState(false)
    const [isTrnNo, setisTrnNo] = useState(0)
    const [invoice, setinvoice] = useState('')
    const [isSelected, setisSelected] = useState()
    const [totalOrderData, settotalOrderData] = useState({ Pcs: 0, Rate: 0, Amount: 0 })
    const [loginUser, setloginUser] = useState(getAuthLoginUser())
    let itemforAdmin = useSelector(state => state.items.items)
    let userwiseitem = useSelector(state => state.userWiseItems.userWiseItems)
    let allPartyDetail = useSelector(state => state.allParty.allParty)
    const AllCompanies = useSelector(state => state.company.company);
    const partydetails = useSelector(state => state.partyDetail.partyDetail)
    const [AllItems, setAllItems] = useState([])
    const [AllParty, setAllParty] = useState([])
    const [PartyCode, setPartyCode] = useState(false)
    const [DueDays, setDueDays] = useState(0)
    const [PaymentDate, setPaymentDate] = useState(false)
    let [oldAddedData, setoldAddedData] = useState([])
    const [loginCompanyDetail, setloginCompanyDetail] = useState({})

    useEffect(() => {
        getItemData()

    }, [itemforAdmin, allPartyDetail])

   
    useEffect(() => {
        if (loginUser && AllCompanies) {
            let existCompanyData = AllCompanies.find(x => x.CompanyId == loginUser.companyId)
            if (existCompanyData) {
                setloginCompanyDetail(existCompanyData)
            }
        }
    }, [AllCompanies, loginUser])


    const getItemData = async () => {
        if (loginUser.usercategoryId == 3) {
            setAllItems([...await getItemPermission()])
            setAllParty([...await getPartypermission()])
        } else {
            setAllItems([...itemforAdmin])
            setAllParty([...allPartyDetail])
        }
    }
    useEffect(() => {
        dispatch(getConfirmOrder(loginUser))
        dispatch(setBlankOrder())
    }, [])
    useEffect(() => {
        if (OrderByTrn?.length > 0) {
            formRowsData = [...OrderByTrn, ...oldAddedData];
            setformRowsData([...formRowsData])
            setisTrnDate(DateSplit(OrderByTrn[0]?.TrnDate))
            setinvoice(OrderByTrn[0]?.InvoiceNo)
            setPartyCode(OrderByTrn[0]?.PartyCode)
            setDueDays(OrderByTrn[0]?.DueDays)
            setPaymentDate(DateSplit(OrderByTrn[0]?.PaymentDate))
            setTotalData()
            oldAddedData = [];
            setoldAddedData([...oldAddedData])
            existAlertValidate()
            formRowsData.forEach((x) => {
                let item = AllItems.find(a => a.ItemId == x.ItemId)
                if(item){
                    x.selectedItem = { value: item.ItemId, label: item.ItemName }
                }
            })
        }
        else if (isTrnNo == 0) {
            formRowsData = [formBlankData];
            setformRowsData([...formRowsData])
            resetTotalData()
            setisTrnDate(moment().format('YYYY-MM-DD'))
            setinvoice('')
            setPartyCode('')
            setPaymentDate(moment().format('YYYY-MM-DD'))
            setDueDays(0)
        }
        else {
            formRowsData = [formBlankData];
            setformRowsData([...formRowsData])
            resetTotalData()
            setisTrnDate(moment().format('YYYY-MM-DD'))
            setinvoice('')
            setPartyCode('')
            setPaymentDate(moment().format('YYYY-MM-DD'))
            setDueDays(0)
        }
    }, [OrderByTrn])

    useEffect(() => {
        if (AllParty.length == 1) {
            setPartyCode(AllParty[0]?.PartyCode)
        }
    }, [AllParty])




    let validateItem = ['ItemId', 'Pcs'];
    const onSubmit = (data) => {
        formRowsData.forEach((x) => x.CompanyId = getAuthLoginUser().companyId);
        formRowsData.forEach((x) => x.UserId = getAuthLoginUser().userId);
        formRowsData.forEach((x) => x.AcYear = getAuthLoginUser().acYear);
        formRowsData.forEach((x) => x.InvoiceNo = invoice);
        formRowsData.forEach((x) => x.PartyCode = PartyCode);
        formRowsData.forEach((x) => x.PaymentDate = PaymentDate);

        setformRowsData([...formRowsData])
        if (isTrnDate && isTrnDate != '') {
            formRowsData.forEach((x) => x.TrnDate = isTrnDate);
        } else {
            setisTrnDate()
        }
        if (!PartyCode) {
            setPartyCode()
        }
        validate()
        settableError([...tableError])
        let isValid = tableError.filter(x => x.length)
        if (isValid.length == 0 && isTrnDate && (PartyCode && PartyCode != '') && existAlertValidate()) {
            formRowsData.forEach((x) => x.TrnNo = isTrnNo);
            setformRowsData([...formRowsData])
            dispatch(addOrderByTrno(formRowsData))
            setisTrnDate(moment().format('YYYY-MM-DD'))
            setisTrnNo(0)
            setinvoice('')
            setPartyCode('')
            setSelectedOptions('')
            setPaymentDate(moment().format('YYYY-MM-DD'))
            setDueDays(0)
            successPopup('Order confirm')
        }

    };
 

    const setTotalData = () => {
        totalOrderData.Amount = calculateSum(formRowsData, 'Amount');
        totalOrderData.Rate = calculateSum(formRowsData, 'Rate');
        totalOrderData.Pcs = calculateSum(formRowsData, 'Pcs');
        settotalOrderData({ ...totalOrderData })
    }
    const resetTotalData = () => {
        totalOrderData.Amount = 0;
        totalOrderData.Rate = 0;
        totalOrderData.Pcs = 0;
        settotalOrderData({ ...totalOrderData })
    }
    const existAlertValidate = () => {
        let existValue = formRowsData.map(x => x.ItemId)
        existValue = existValue.filter((item, index) => existValue.indexOf(item) !== index)
        existValue = AllItems.filter((x) => existValue.includes(Number(x.ItemId)))
        if (existValue.length > 0) {
            let html = <Alert variant='danger' className='p-2 mt-3'>
                {existValue.map(x => x.ItemName)?.join(', ')} already selected.
            </Alert>
            setisSelected(html)
            return false
        } else {
            setisSelected()
            return true
        }
    }
    const validate = () => {
        validateItem.forEach((x) => {
            formRowsData.forEach((y, index) => {
                if (y[x] == '' || y[x] == 0) {
                    tableError[index] ? tableError[index].push(x) : tableError[index] = [x]
                } else {
                    tableError[index] = tableError[index]?.filter((c) => c != x)
                }
                tableError[index] = [...new Set(tableError[index])]
            })
        })
        settableError([...tableError])
    }
    const getValue = (e, index) => {
        if (e.target.name == 'ItemId') {
            let rowItem = AllItems.find((x) => x.ItemId == Number(e.target.value))
            formRowsData[index].Rate = rowItem.ItemRate;
            formRowsData[index][e.target.name] = Number(e.target.value);
            formRowsData[index].selectedItem = { value: Number(e.target.value), label: rowItem.ItemName };
            formRowsData[index].Amount = formRowsData[index].Rate * formRowsData[index].Pcs;
            setTotalData()
            validate()
            existAlertValidate()
        }
        else if (e.target.name == 'Rate') {
            formRowsData[index].Rate = Number(e.target.value);
        }
        else if (e.target.name == 'Pcs') {
            formRowsData[index].Amount = formRowsData[index].Rate * e.target.value;
            formRowsData[index][e.target.name] = Number(e.target.value);
            validate()
            setTotalData()
        }
        else {
            formRowsData[index][e.target.name] = e.target.value;
        }
        setformRowsData([...formRowsData])
    }
    const getTrnNoValue = (e) => {
        settableError([[]])
        setisTrnNo(Number(e.target.value));
        if (e.target.value != '') {
            dispatch(getOrderByTrno(e.target.value))
        }
        else {
            setformRowsData([{ ...formBlankData }])
            setisTrnDate(moment().format('YYYY-MM-DD'))
            setinvoice('')
            setPartyCode('')
            setPaymentDate(moment().format('YYYY-MM-DD'))
            setDueDays(0)
            resetTotalData()
        }
    }
    const addNewRow = () => {
        formRowsData.push(formBlankData)
        setformRowsData([...formRowsData])
    }
    const removeItem = (index) => {
        confirmationDeletePopup().then((result) => {
            if (result.isConfirmed) {
                let record = formRowsData[index];
                if (record.TrnNo > 0) {
                    dispatch(deleteOrderByTrno(record, isTrnNo))
                    oldAddedData = formRowsData.filter(x => x.SeqNo == 0)
                    setoldAddedData([...oldAddedData])
                }
                else {
                    formRowsData.splice(index, 1)
                    setformRowsData([...formRowsData])
                }
                if (formRowsData.length == 0) {
                    formRowsData = [formBlankData];
                    setformRowsData([...formRowsData])
                }
            }
            setTotalData()
        }).then(() => {
            existAlertValidate()
        })
    }
    const getInvoiceNo = (e) => {
        setinvoice(e.target.value)

    }
    const popupOpen = () => {
        dispatch(getConfirmOrder(loginUser))
        setshow(true)
    }
    const handleClose = () => {
        setshow(false)
    }
    const columns = [
        {
            name: 'Party Name',
            selector: row => row?.PartyName,
            sortable: true,
            minWidth: '230px',
            maxWidth: '250px',
            wrap: true,
        },
        {
            name: 'AcYear',
            selector: row => row.AcYear,
            sortable: true,
            minWidth: '110px',
            maxWidth: '110px',
        },
        {
            name: 'TrnNo',
            selector: row => row.TrnNo,
            right: true,
            minWidth: '90px',
            maxWidth: '90px',
        },
        {
            name: 'TrnDate',
            selector: row => moment(row.TrnDate).format('DD-MM-YYYY'),
            sortable: true,
            width: '130px',
        },
        {
            name: 'Pieces',
            selector: row => row.TotalPcs.toLocaleString('en-IN'),
            right: true,
            sortable: true,
            width: '100px',
        },
        {
            name: 'Rate',
            selector: row => (row?.Rate).toLocaleString('en-IN'),
            right: true,
            sortable: true,
            width: '120px',
        },
        {
            name: 'InvoiceNo',
            selector: row => row.InvoiceNo,
            sortable: true,
            width: '140px',
            omit: !loginCompanyDetail.IsPayment
        },
        {
            name: 'Amount',
            selector: row => (row?.Amount).toLocaleString('en-IN'),
            right: true,
            sortable: true,
            width: '120px',
        },
        {
            name: 'Select',
            selector: (row, i) => <div className='white_space_nowrap' style={{ minWidth: '450px' }}>
                <input type='checkbox' id={`checkButton${i}`} name='IsOrderConfirmed' onChange={(e) => getItems(e, row.TrnNo)} />
            </div>,
            width: '90px',
        }

    ];
    const getItems = (e, TrnNo) => {
        let order = AllConfirmOrders.find(x => x.TrnNo == TrnNo)
        setinvoice(order.InvoiceNo)
        setisTrnNo(TrnNo)
        dispatch(getOrderByTrno(TrnNo))
        setPartyCode(order.PartyCode)
        setDueDays(order.DueDays)
        setshow(false)
        settableError([...tableError])
    }
    const getPaymentdate = (e) => {
        setPaymentDate(e);
        const enddate = moment(e)
        const startdate = moment(isTrnDate ?? moment());
        const diff = enddate.diff(startdate);
        const diffDuration = moment.duration(diff);
        setDueDays(diffDuration._data.days)
    }

    const [selectedOptions, setSelectedOptions] = useState();

    const optionList = AllItems.map((x, i) => {
        return { value: x.ItemId, label: x.ItemName };
    });

    function handleSelect(data) {
        setSelectedOptions(data);
    }

    const partydata = AllCompanies.find((x) => x.IsPayment == true)

    return (
        <>
            <div className='dashboard_bg'>
                <div className='header_sticky'>
                    <Row className='m-0 w-100'>
                        <Col xs={8} className='p-0'>
                            <h2>Orders</h2>
                        </Col>
                    </Row>
                </div>

                <div className='padding_section'>
                    <div className='order_form_bg'>
                        <form>
                            <Row>
                                <Col xxl={2} lg={5} md={5} sm={5}>
                                    <label className='form_label'>Transaction No:</label>
                                    <input type="number" min={0} className='form_input' name='TrnNo' value={isTrnNo} onChange={getTrnNoValue} />
                                </Col>
                                {
                                    <>
                                        <div className='col-auto'>
                                            <div className='row m-0'>
                                                <label className='form_label invisible'>'</label>
                                            </div>
                                            <div className='row m-0 cursor_pointer'>
                                                <div className='form_input' onClick={() => popupOpen()}>
                                                    ...
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                    // loginUser.usercategoryId < 3 ?: ''
                                }
                                <Col xxl={2} lg={5} md={5} sm={5}>
                                    <label className='form_label'>Transaction Date:</label>
                                    <input type="date" className='form_input' name='TrnDate' value={isTrnDate ? isTrnDate : ''} autoComplete="on" onChange={(e) => setisTrnDate(e.target.value)} />
                                    {
                                        isTrnDate == undefined ? <p className='error_message m-0 p-0'>Transaction date must be required</p> : <></>
                                    }
                                </Col>
                                {partydata && (
                                    <Col xxl={2} lg={6} md={12} sm={12}>
                                        <label className='form_label'>Invoice No:</label>
                                        <input
                                            type="text"
                                            className='form_input'
                                            name='InvoiceNo'
                                            value={invoice}
                                            onChange={getInvoiceNo}
                                        />
                                    </Col>
                                )}
                                <Col xxl={2} lg={6} md={12} sm={12}>
                                    <label className='form_label'>Party List:</label>
                                    {
                                        AllParty.length == 1 ? (
                                            <select name="PartyCode" disabled className='form_input min_width_200'>
                                                <option selected className='form_input' >
                                                    {AllParty[0].PartyName}
                                                </option>
                                            </select>
                                        ) :
                                            <select name="PartyCode" className='form_input min_width_200' value={(PartyCode != '') ? PartyCode : ''} onChange={(e) => setPartyCode(e.target.value)} >
                                                <option value='' disabled>Select Party</option>
                                                {
                                                    AllParty.length > 1 && AllParty?.map((x, partyIndex) => {
                                                        return <option key={partyIndex} value={x.PartyCode}>{x.PartyName}</option>
                                                    })
                                                }
                                            </select>
                                    }
                                    {
                                        PartyCode == undefined ? <p className='error_message m-0 p-0'>Party name must be required</p> : <></>
                                    }
                                </Col>
                                <Col lg={12}>
                                    <div className='table_section'>
                                        <table className='table mt-3'>
                                            <thead>
                                                <tr>
                                                    <th>Sequence No.</th>
                                                    <th>Item</th>
                                                    <th>Piece</th>
                                                    <th>Rate</th>
                                                    <th>Amount</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    formRowsData?.length > 0 ?
                                                        formRowsData?.map((x, i) => {
                                                            return <tr key={i}>
                                                                <td className='d-none'><input type="number" min={0} readOnly name="TrnNo" className='form_input pointer_none text-end' onChange={(e) => getValue(e, i)} /></td>
                                                                <td><input type="number" min={0} name="SeqNo" readOnly value={x.SeqNo} className='form_input pointer_none' onChange={(e) => getValue(e, i)} /></td>
                                                                <td>
                                                                    <Select
                                                                        options={optionList}
                                                                        placeholder="--Select Item--"
                                                                        // value={selectedOptions}
                                                                        value={x.selectedItem}
                                                                        onChange={(e) => getValue({ target: { value: e.value, name: 'ItemId' } }, i)}
                                                                        isSearchable={true}
                                                                        name="ItemId"
                                                                        className='form_inputwidth'
                                                                        menuPosition="fixed"
                                                                    />
                                                                    {
                                                                        tableError[i]?.includes('ItemId') ? <p className='error_message m-0 p-0'>Item Piece must be required</p> : <></>
                                                                    }
                                                                </td>
                                                                <td>
                                                                    <input type="number" min={0} name="Pcs" className='form_input min_width_200 text-end' value={x.Pcs} onChange={(e) => getValue(e, i)} />
                                                                    {
                                                                        tableError[i]?.includes('Pcs') ? <p className='error_message m-0 p-0'>Piece must be required</p> : <></>
                                                                    }
                                                                </td>
                                                                <td><input type="number" min={0} name="Rate" readOnly value={(x.Rate)} className='form_input pointer_none min_width_200 bg-light text-end' onChange={(e) => getValue(e, i)} /></td>
                                                                <td><input type="number" min={0} name="Amount" readOnly value={(x.Amount)} className='form_input pointer_none min_width_200 text-end' onChange={(e) => getValue(e, i)} /></td>
                                                                <td>
                                                                    <span className='me-3 mt-2 d-inline-block'><RiDeleteBinLine size={25} className='cursor_pointer text-danger ms-2 ' onClick={() => removeItem(i)} /></span>
                                                                    {
                                                                        formRowsData?.length == i + 1 ?
                                                                            <BiPlusCircle size={25} className='cursor_pointer' onClick={() => addNewRow()} /> :
                                                                            <></>
                                                                    }
                                                                </td>
                                                            </tr>
                                                        })
                                                        :
                                                        <>
                                                            <tr>
                                                                <td colSpan={20} className='text-center'>There is no data.</td>
                                                            </tr>
                                                        </>
                                                }

                                                <tr className={formRowsData?.length > 0 ? 'fw-bold' : 'd-none'}>
                                                    <td>TOTAL</td>
                                                    <td></td>
                                                    <td className='text-end'>{totalOrderData.Pcs}</td>
                                                    <td className='text-end'>{roundValue(totalOrderData.Rate)}</td>
                                                    <td className='text-end'>{roundValue(totalOrderData.Amount)}</td>
                                                    <td></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    {
                                        isSelected ?? <></>
                                    }
                                    <button type='button' className='button_dark py-2 px-3 mt-3' onClick={onSubmit}>Save</button>
                                </Col>
                            </Row>
                        </form>
                    </div>

                    <Modal size='xl' show={show} fullscreen='md-down' onHide={handleClose} backdrop="static" >
                        <Modal.Header className='border-0 p-0'>
                        </Modal.Header>
                        <Modal.Body className='pt-0 p-0'>
                            <CustomDataTable columns={columns} data={AllConfirmOrders} />
                        </Modal.Body>
                        <Modal.Footer className='py-1'>
                            <button type='button' className="button_dark py-2 px-3" onClick={handleClose}>Close</button>
                        </Modal.Footer>

                    </Modal>
                </div>
            </div>
        </>
    )
}

export default OrderMaster