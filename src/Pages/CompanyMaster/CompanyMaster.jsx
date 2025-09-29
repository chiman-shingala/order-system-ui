import React, { useEffect, useState } from 'react'
import { Col, Modal, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addNewCompanies, deleteCompanies, getAllCompanies, updateCompany } from '../../Redux/Actions/CompanyMasterAction';
import { confirmationDeletePopup } from '../../Shared/Constants/PopupConstant/PopupContant';
import CustomDataTable from '../../Components/CustomDataTable/CustomDataTable';
import { RxPencil2 } from 'react-icons/rx';
import { RiDeleteBinLine } from 'react-icons/ri';
import moment from "moment";

/*eslint eqeqeq: "off"*/
function CompanyMaster() {
  const AllCompanies = useSelector(state => state.company.company);
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
  const [isAdd, setisAdd] = useState(true)
  const [show, setshow] = useState(false)
  
  const handleShow = () => {
    setshow(true)
  }
  const handleClose = () => {
    setshow(false)
    setisAdd(true)
    reset()
  }
  const onSubmit = (data) => {
    if(isAdd){
      dispatch(addNewCompanies(data))
    }else{
      dispatch(updateCompany(data))
    }
    reset()
    handleClose()
  };

  const deleteCompany = (CompanyId) => {
    confirmationDeletePopup().then((result) => {
        if (result.isConfirmed) {
            dispatch(deleteCompanies(CompanyId))
          return true
        }
      })
}
  const editCompany = (CompanyId) => {
    setisAdd(false)
    handleShow();
    const editData = AllCompanies.find(x => x.CompanyId === CompanyId)
    for (let key in editData) 
    {
      setValue(key, editData[key]);
    }
      setValue('FTrnDate', moment(editData.FTrnDate).format('YYYY-MM-DD'));
      setValue('TTrnDate', moment(editData.TTrnDate).format('YYYY-MM-DD'));
  }

  const formatDate = (date) => {
    return moment(date).format('DD-MM-YYYY');
  }

  const columns = [
    {
        name: 'Company Name',
        selector: row => row.CompanyName,
        sortable : true
    },
    {
        name: 'Company Address',
        selector: row => row.CompanyAddress,
        sortable : true
    },
    {
        name: 'FirstName(Contact Person)',
        selector: row => row.ContactPersonFirstName,
        sortable : true
    },
    {
        name: 'LastName (Contact Person)',
        selector: row => row.ContactPersonLastName,
        sortable : true
    },
    {
        name: 'Office Contact No.',
        selector: row => row.ContactNoOffice,
        sortable : true
    },
    {
        name: 'Personal Contact No.',
        selector: row => row.ContactNoPersonal,
        sortable : true
    },
    {
        name: 'Account Year',
        selector: row => row.AcYear,
        sortable: true
    },
    {
        name: 'FromTransaction Date',
        selector: row => formatDate(row.FTrnDate),
        sortable: true
    },
    {
        name: 'ToTransaction Date',
        selector: row => formatDate(row.TTrnDate),
        sortable: true
    },
    {
        name: 'Remark',
        selector: row => row.Remark,
        sortable: true
    },
    {
      name: 'IsActive',
      selector: row => row.IsActive ? 'Active' : 'Inactive',
      sortable: true
    },
    {
      name: 'IsPayment',
      selector: row => row.IsPayment ? 'Active' : 'Inactive',
      sortable: true
    },
    {
      name: 'IsEmail Sent',
      selector: row => row.IsInvoice ? 'Active' : 'Inactive',
      sortable: true
    },
    {
        name: 'Actions',
        selector: (row) => <div className='white_space_nowrap' style={{width:'550px'}}>
            <RxPencil2 size={25} className='cursor_pointer text-success'  onClick={() => editCompany(row.CompanyId)}/>
            <RiDeleteBinLine size={25} className='cursor_pointer text-danger ms-2 ' onClick={() => deleteCompany(row.CompanyId)}/>
        </div>,
        sortable : true
    },
  ];
  return (
    <>
      <div className='dashboard_bg'>
        <div className='header_sticky'>
          <Row className='mt-2 ps-3 w-100'>
            <Col xs={6} className='p-0'>
              <h2>Company</h2>
            </Col>
            <Col xs={6} className='p-0 text-end'>
              <button className='button_dark py-2 px-3' onClick={handleShow}>Add +</button>
            </Col>
          </Row>
        </div>

        <div className='padding_section'>
          <Modal size='lg' show={show} fullscreen='md-down' onHide={handleClose} backdrop="static" >
            <Modal.Header closeVariant='white' closeButton className='border-0 black_Background text-white'>
              <Modal.Title>{isAdd ? 'ADD NEW COMPANY' : 'EDIT'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col lg={6}>
                    <label className='form_label'>Company Name:</label>
                    <input type="text" className='form_input' {...register("CompanyName", { required: true })} />
                    {errors.CompanyName && <span className='error_message'>Company Name is required</span>}
                  </Col>

                  <Col lg={6}>
                    <label className='form_label'>Company Adress:</label>
                    <input type="text" className='form_input' autoComplete="on" {...register("CompanyAddress", { required: true })} />
                    {errors.CompanyAddress && <span className='error_message'>Company Adress is required</span>}
                  </Col>
                  <Col lg={6}>
                    <label className='form_label'>Contact Person First Name:</label>
                    <input type="text" className='form_input' autoComplete="on" {...register("ContactPersonFirstName", { required: true })} />
                    {errors.ContactPersonFirstName && <span className='error_message'>ContactPerson FirstName is required</span>}
                  </Col>
                  <Col lg={6}>
                    <label className='form_label'>Contact Person Last Name:</label>
                    <input type="text" className='form_input' autoComplete="on" {...register("ContactPersonLastName", { required: true })} />
                    {errors.ContactPersonLastName && <span className='error_message'>ContactPerson LastName is required</span>}
                  </Col>
                  <Col lg={6}>
                    <label className='form_label'>ContactNo Office:</label>
                    <input type="number" min={0} className='form_input' autoComplete="on" {...register("ContactNoOffice", { required: true })} />
                    {errors.ContactNoOffice && <span className='error_message'>ContactNo Office is required</span>}
                  </Col>
                  <Col lg={6}>
                    <label className='form_label'>IsActive:</label>
                    <input type="checkbox" style={{ width: '25px', height: '25px' }} className='mt-2' autoComplete="on" {...register("IsActive")} />
                  </Col>
                  <Col lg={6}>
                    <label className='form_label'>IsPayment:</label>
                    <input type="checkbox" style={{ width: '25px', height: '25px' }} className='mt-2' autoComplete="on" {...register("IsPayment")} />
                  </Col>
                  <Col lg={6}>
                    <label className='form_label'>IsEmail Sent:</label>
                    <input type="checkbox" style={{ width: '25px', height: '25px' }} className='mt-2' autoComplete="on" {...register("IsInvoice")} />
                  </Col>
                  <Col lg={6}>
                    <label className='form_label'>ContactNo Personal:</label>
                    <input type="number" min={0} className='form_input' autoComplete="on" {...register("ContactNoPersonal", { required: true })} />
                    {errors.ContactNoPersonal && <span className='error_message'>ContactNo Personal is required</span>}
                  </Col>
                  <Col lg={6}>
                    <label className='form_label'>Account Year:</label>
                    <input type="number" min={0} className='form_input' autoComplete="on" {...register("AcYear", { required: true })}/>
                    {errors.AcYear && <span className='error_message'>Account Year is required</span>}
                  </Col>
                  <Col lg={6}>
                    <label className='form_label'>FromTransaction Date:</label>
                    <input type="date" className='form_input' dateFormat='dd-mm-yy' {...register("FTrnDate", { required: true })}/>
                    {errors.FTrnDate && <span className='error_message'>FromTransaction Date is required</span>}
                  </Col>
                  <Col lg={6}>
                  <label className='form_label'>ToTransaction Date:</label>
                    <input type="date" className='form_input' {...register("TTrnDate", { required: true })} />
                    {errors.TTrnDate && <span className='error_message'>ToTransaction Date is required</span>}
                  </Col>
                  <Col lg={6}>
                    <label className='form_label'>Remark:</label>
                    <input type="text" className='form_input' autoComplete="on" {...register("Remark", { required: true })}/>
                    {errors.Remark && <span className='error_message'>Remark is required</span>}
                  </Col>

              </Row>
            </form>
          </Modal.Body>
          <Modal.Footer className='border-0'>
            <button className='button_dark mt-5 py-2 px-3' onClick={handleSubmit(onSubmit)}>Save</button>
          </Modal.Footer>
        </Modal>

          <CustomDataTable columns={columns} data={AllCompanies} />

        </div>
      </div>

    </>
  )
}

export default CompanyMaster