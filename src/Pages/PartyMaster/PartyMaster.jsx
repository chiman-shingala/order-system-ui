import React, { useEffect, useRef, useState } from 'react'
import { Col, Modal, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import '../PartyMaster/PartyMaster.css'
import { useDispatch, useSelector } from 'react-redux';
import { addNewParty, deleteParty, getAllPartyDetail } from '../../Redux/Actions/PartyMasterAction';
import { getAgrDetail } from '../../Redux/Actions/AGRmasterAction';
import DataTable from 'react-data-table-component';
import { tableCustomStyles, tableCustomStyles2 } from '../../Shared/Constants/Constant';
import { confirmationDeletePopup, successPopup } from '../../Shared/Constants/PopupConstant/PopupContant';
import { getPartyCodeAction } from '../../Redux/Actions/GetPartyCodeAction';
import moment from 'moment';

function PartyMaster() {
    const [show, setshow] = useState(false)
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
    const dispatch = useDispatch();
    const party = useSelector(state => state.partyDetail.partyDetail)
    const partyCode = useSelector(state => state.partyCode.partyCode)
    const AllAgrGroup = useSelector(state => state.agrDetail.agrDetail)
    const AllCompanies = useSelector(state => state.company.company);
    const [DueDays, setDueDays] = useState(0)

    // const elementRef = useRef()
    useEffect(() => {
        dispatch(getAgrDetail())
        dispatch(getPartyCodeAction())
    }, [])

    useEffect(() => {
        setValue("PartyCode", partyCode.PartyCode)
    }, [partyCode])

    const handleSelectChange = (e) => {
        dispatch(getAllPartyDetail(e.target.value));
        dispatch(getPartyCodeAction())
        setValue("PartyCode", partyCode.PartyCode)
    }

    useEffect(() => {
        if (AllAgrGroup && AllAgrGroup.length === 1) {
            dispatch(getAllPartyDetail(AllAgrGroup[0].Agrcode));
            setValue("Agrcode", AllAgrGroup[0].Agrcode)
            dispatch(getPartyCodeAction())
        }
    }, [AllAgrGroup])


    const FillPartyForm = (row) => {
        setPartyInForm(row)
    }
    const column = [
        {
            name: 'PartyName',
            selector: (row, i) => <div className='w-100 h-100 d-flex align-items-center px-2 cursor_pointer' onClick={() => FillPartyForm(row)}>
                {row?.PartyName}
            </div>
            ,
            sortable: true
        }
    ];
    const handleClose = () => {
        setshow(false);
    }
    const popupOpen = () => {
        setshow(true);
        // setTimeout(() => {
        //     if (elementRef?.current) {
        //         let ele = elementRef?.current;
        //         ele.parentElement.style.width = "100%"
        //         ele.parentElement.style.height = "100%"
        //         // ele.parentElement.parentElement.style.padding = "0"
        //     }
        // }, 100);
    }
    const setPartyInForm = (row) => {
        for (let key in row) {
            setValue(key, row[key])
        }
        handleClose();
    }
    const onSubmit = (data) => {
        data.DueDays = Number(data.DueDays)
        data.Agrcode = String(data.Agrcode)
        for (let key in data) {
            setValue(key, '')
        }
        dispatch(addNewParty(data))
        dispatch(getAgrDetail())

    }
    const onDelete = (data) => {
        confirmationDeletePopup().then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteParty(data));
                return true
            }
        })
        for (let key in data) {
            setValue(key, '')
        }
        setValue("PartyCode", partyCode.PartyCode)
    }

    const getdueDays = (e) => {
        setDueDays(Number(e));
    };



    return (
        <>
            <div className='dashboard_bg'>
                <div className='header_sticky'>
                    <Row>
                        <Col xs={10}>
                            <h2>Party Master</h2>
                        </Col>
                    </Row>
                </div>

                <div className='padding_section'>
                    <Row className='d-flex justify-content-center align-items-center' >
                        <Col xs={12} md={12} lg={7} >
                            <form className='shadow-lg w-100 px-4 pt-3 pb-4 bg-white'>
                                <Row>
                                    <Col sm={12} md={12} lg={7} hidden >
                                        <label className='form_label'>Account Group:</label>
                                        <select name="CompanyId" disabled className='party_form_input' {...register("Agrcode")} onChange={handleSelectChange}>
                                            {
                                                AllAgrGroup.length === 1 &&
                                                <option selected >{AllAgrGroup[0].Agrname}</option>

                                            }
                                        </select>
                                        {errors.Agrcode && <span className='error_message'>Account group is required.</span>}
                                    </Col>


                                    <Col xs={9} sm={10} lg={6}>
                                        <label className='form_label'>Party Code:</label>
                                        <input type="text" className='party_form_input bg-light' autoComplete="on" {...register("PartyCode", { required: true })} readOnly />
                                    </Col>
                                    <div className='party_form_input w-auto align-self-end px-2 shadow-sm ms-3' style={{ height: 'fit-content', cursor: 'pointer' }} onClick={() => popupOpen()}>
                                        ...
                                    </div>
                                    {errors.PartyCode && <span className='error_message'>Party code is required.</span>}


                                    <Col sm={12} lg={12} className='mt-2'>
                                        <hr style={{ border: '1.5px solid gray' }} />
                                    </Col>
                                    <Col sm={12} lg={12}>
                                        <label className='form_label'>Party Name:</label>
                                        <input type="text" className='party_form_input' autoComplete="on" {...register("PartyName", { required: true })} />
                                        {errors.PartyName && <span className='error_message'>Party name is required.</span>}
                                    </Col>
                                    <Col sm={12} lg={12}>
                                        <label className='form_label'>Reference Name:</label>
                                        <input type="text" className='party_form_input' autoComplete="on" {...register("ReferenceName")} />
                                    </Col>
                                    <Col sm={12} lg={4}>
                                        <label className='form_label'>Adress 1:</label>
                                        <input type="text" className='party_form_input' autoComplete="on" {...register("Add1")} />
                                    </Col>
                                    <Col sm={12} lg={4}>
                                        <label className='form_label'>Adress 2:</label>
                                        <input type="text" className='party_form_input' autoComplete="on" {...register("Add2")} />
                                    </Col>
                                    <Col sm={12} lg={4}>
                                        <label className='form_label'>Adress 3:</label>
                                        <input type="text" className='party_form_input' autoComplete="on" {...register("Add3")} />
                                    </Col>
                                    <Col sm={12} lg={4}>
                                        <label className='form_label'>City:</label>
                                        <input type="text" className='party_form_input' autoComplete="on" {...register("City")} />
                                    </Col>
                                    <Col sm={12} lg={4}>
                                        <label className='form_label'>State:</label>
                                        <input type="text" className='party_form_input' autoComplete="on" {...register("State")} />
                                    </Col>
                                    <Col sm={12} lg={4}>
                                        <label className='form_label'>Due Days:</label>
                                        <input type="number" className='party_form_input' name='DueDays'  onChange={(e) => getdueDays(e.target.value)} min={0} {...register("DueDays", { required: true })} />
                                        {errors.DueDays && <span className='error_message'>DueDays is required.</span>}
                                    </Col>
                                    <Col sm={12} lg={6}>
                                        <label className='form_label'>Mobile:</label>
                                        <input type="number" className='party_form_input' autoComplete="on" {...register("Mobile")} />
                                    </Col>
                                    <Col sm={12} lg={6}>
                                        <label className='form_label'>Phone:</label>
                                        <input type="number" className='party_form_input' autoComplete="on" {...register("Phone")} />
                                    </Col>
                                    <Col sm={12} lg={6}>
                                        <label className='form_label'>Fax:</label>
                                        <input type="text" className='party_form_input' autoComplete="on" {...register("Fax")} />
                                    </Col>
                                    <Col sm={12} lg={6}>
                                        <label className='form_label'>Email:</label>
                                        <input type="email" className='party_form_input' autoComplete="on" {...register("Email", { required: true })} />
                                        {errors.Email && <span className='error_message'>Email is required.</span>}
                                    </Col>
                                    <Col sm={12} lg={6}>
                                        <label className='form_label'>PAN No:</label>
                                        <input type="text" className='party_form_input' autoComplete="on" {...register("PanNo")} />
                                    </Col>
                                    <Col sm={12} lg={6}>
                                        <label className='form_label'>GST No:</label>
                                        <input type="text" className='party_form_input' autoComplete="on" {...register("Gstno")} />
                                    </Col>
                                    <Col sm={12} lg={12}>
                                        <label className='form_label'>Remark:</label>
                                        <input type="text" className='party_form_input' autoComplete="on" {...register("Remark")} />
                                    </Col>
                                    <Col sm={12} lg={12}>
                                        <button className='button_dark mt-4 py-2 px-3 ' onClick={handleSubmit(onSubmit)}>Save</button>
                                        <button className='button_dark ms-2 mt-4 py-2 px-3 ' onClick={handleSubmit(onDelete)} >Delete</button>
                                    </Col>
                                </Row>
                            </form>
                        </Col>
                    </Row>
                </div>

                <Modal size='md' show={show} fullscreen='md-down' onHide={handleClose} backdrop="static" >
                    <Modal.Header className='border-0 p-0 rounded'>
                    </Modal.Header>
                    <Modal.Body className=' p-0'>
                        <DataTable columns={column}
                            data={party} fixedHeader
                            fixedHeaderScrollHeight="75vh"
                            customStyles={tableCustomStyles2} />

                    </Modal.Body>
                    <Modal.Footer className='py-1'>
                        <button type='button' className="button_dark py-2 px-3" onClick={handleClose}>Close</button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}

export default PartyMaster