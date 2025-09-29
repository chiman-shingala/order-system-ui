import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CustomDataTable from '../../Components/CustomDataTable/CustomDataTable';
import moment from 'moment/moment';
import { useForm } from 'react-hook-form';
import { getAllOrderDetails, orderDetailGlobalData, receivedOrderByTrnNo } from '../../Redux/Actions/OrderDetailsByUserAction';
import { getAuthLoginUser } from '../../Services/AuthService/AuthService';
import { dispatchCancelPopup, dispatchPopup, orderReceivedPopup } from '../../Shared/Constants/PopupConstant/PopupContant';
import Select from "react-select";
import { getItemPermission, getPartypermission } from '../../Redux/Actions/orderMasterAction';
import { roundValue } from '../../Shared/Constants/Constant';

function OrderDetails() {
    const AllOrderDetails = useSelector(state => state.orderDetails.orderDetails);
    const userWiseItem = useSelector(state => state.userWiseItems.userWiseItems)
    const [loginUser, setloginUser] = useState(getAuthLoginUser())
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
    const AllItems = useSelector(state => state.items.items);
    const AllCompanies = useSelector(state => state.company.company);
    const dispatch = useDispatch();
    const [items, setitems] = useState([]);
    const [AllParty, setAllParty] = useState([])


    useEffect(() => {
        getPermission()
        GetPartyPermission()
        setValue("FromOrderDate", moment().format('YYYY-MM-DD'))
        setValue("ToOrderDate", moment().format('YYYY-MM-DD'))

        const savedItem = localStorage.getItem("global");
        if(savedItem != null && savedItem != ''){
            dispatch(orderDetailGlobalData(savedItem))
            localStorage.removeItem('global')
        }
        else{
            let currentDate = {
                FromOrderDate:moment().format('YYYY-MM-DD'),
                ToOrderDate:moment().format('YYYY-MM-DD')
            }
             dispatch(getAllOrderDetails(currentDate))
        }
        // FromOrderDate,ToOrderDate'
        
    }, [])
    
    const getPermission = async () => {
        setitems([...await getItemPermission()])
    }
    const GetPartyPermission = async () => {
        setAllParty([...await getPartypermission()])
    }



    let columns = [
        {
            name: 'Party Name',
            selector: row => row.PartyName,
            wrap: true,
            minWidth:"250px",
        },
        {
            name: 'Trn Date',
            selector: row => row.PartyName == 'Order Summary' ? '': moment(row.TrnDate).format('DD-MM-YYYY'),
            minWidth: '120px',
            maxWidth: '130px',
        },
        {
            name: 'Seq No.',
            selector: row => row.PartyName == 'Order Summary' ? '':row.SeqNo ,
            minWidth: '100px',
            maxWidth: '120px',
        },
        {
            name: 'Item Name',
            selector: row => row?.ItemName,
            wrap: true,
            minWidth: '250px',
            maxWidth: '300px',
        },
        {
            name: 'Piece',
            selector: row => row.Pcs.toLocaleString('en-IN'),
            right: true,
            minWidth: '100px',
            maxWidth: '120px',
        },
        {
            name: 'Rate',
            selector: row => (row?.Rate).toLocaleString('en-IN'),
            right: true,
            minWidth: '120px',
            maxWidth: '150px',
        },
        {
            name: 'Amount',
            selector: row => (row?.Amount).toLocaleString('en-IN'),
            right: true,
            minWidth: '120px',
            maxWidth: '150px',
        },
        // {
        //     name: 'Received Order',
        //     selector: (row, i) => <div className='white_space_nowrap' style={{ width: '450px' }}>
        //         <input type='checkbox' className='checkbox-20' checked={row.IsOrderReceived} id={`receivedOrderDetailcheck${i}`} name='IsOrderReceived' onChange={(e) => receivedOrderDetailOrder(e, row.SeqNo)} />
        //     </div>
        // }
    ];

    if (loginUser.usercategoryId > 2) {
        columns.splice(7, 1)
    }
    // if (loginUser.usercategoryId < 3) {
    //     columns.splice(7, 1)
    // }

    const [selectedOptions, setSelectedOptions] = useState();
    // Array of all options
    const userOptionList = items.map((x, i) => {
        return { value: x.ItemId, label: x.ItemName };
    });

    // Function triggered on selection
    function handleSelect(data) {
        setSelectedOptions(data);
    }

    const [selectedParty, setselectedParty] = useState();

    // Array of all options
    const optionList = AllParty.map((x, i) => {
        return { value: x.PartyCode, label: x.PartyName };
    });

    // Function triggered on selection
    function handleSelectParty(data) {
        setselectedParty(data);
    }
    const onSubmit = (data) => {
        if (selectedOptions) {
            data.ItemId = selectedOptions?.map(x => x.value)
        }

        if (selectedParty) {
            data.PartyCode = selectedParty?.map(x => x.value)
        }
        dispatch(getAllOrderDetails(data))
    }

    return (
        <>
            <div className='dashboard_bg'>
                <div className='header_sticky'>
                    <Row className='m-0 w-100'>
                        <Col xs={6} className='p-0'>
                            <h2>Order Details</h2>
                        </Col>
                    </Row>
                </div>

                <div className='padding_section'>
                    <Row className='table_section py-4'>
                        {
                            loginUser.usercategoryId == 1 ?
                                <Col lg={2}>
                                    <label className='form_label'>Company:</label>
                                    <select name="ItemId" className='form_input' defaultValue={"DEFAULT"} {...register("CompanyId")}>
                                        <option value='DEFAULT' disabled>--Select Company--</option>
                                        {
                                            AllCompanies?.map((x, i) => {
                                                return <option key={i} value={x.CompanyId}>{x.CompanyName}</option>
                                            })
                                        }
                                    </select>
                                </Col> : <></>}
                        <Col xxl={4} xl={3} >
                            <label className='form_label'>Item:</label>
                            <Select
                                options={userOptionList}
                                placeholder="Select Item"
                                value={selectedOptions}
                                onChange={handleSelect}
                                isSearchable={true}
                                isMulti
                                name="ItemId"
                                menuPosition="fixed"
                            />
                        </Col>
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
                                        value={selectedParty}
                                        onChange={handleSelectParty}
                                        isSearchable={true}
                                        isMulti
                                        name="ItemId"
                                         menuPosition="fixed"
                                    />

                            }
                        </Col>
                        <Col xxl={2} xl={3} lg={4} md={6}>
                            <label className='form_label'>From Date:</label>
                            <input type="date" className='form_input' {...register("FromOrderDate")} />
                        </Col>
                        <Col xxl={2} xl={3} lg={4} md={6}>
                            <label className='form_label'>To Date:</label>
                            <input type="date" className='form_input' {...register("ToOrderDate")} />
                        </Col>
                        {/* <Col xxl={2} xl={3} lg={4} md={6}>
                        <label className='form_label'>Party:</label>
                        <input type="text" className='form_input' name='PartyCode'  />
                    </Col> */}
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
                            <label className='form_label'>From Piece:</label>
                            <input type="number" min={0} className='form_input' {...register("FromPcs")} />
                        </Col>
                        <Col xxl={2} xl={3} lg={4} md={6}>
                            <label className='form_label'>To Piece:</label>
                            <input type="number" min={0} className='form_input' {...register("ToPcs")} />
                        </Col>
                        {/* <Col lg={3}>
                        <br />
                        <button className='button_dark px-5 py-2 mt-3' onClick={handleSubmit(onSubmit)}>Submit</button>
                    </Col> */}
                        <Col>
                            <label className='form_label invisible'>l</label>
                            <button className='form_input button_dark w-auto align-self-end mt-1 py-2 px-3' onClick={handleSubmit(onSubmit)}>
                                Submit
                            </button>
                        </Col>
                    </Row>

                    <CustomDataTable columns={columns} data={AllOrderDetails} />
                </div>
            </div>
        </>
    )
}

export default OrderDetails