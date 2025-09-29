import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addNewUser, deleteUsers, getAllUsers, updateUser } from '../../Redux/Actions/UserMasterAction';
import { Col, Modal, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { confirmationDeletePopup } from '../../Shared/Constants/PopupConstant/PopupContant';
import { getAllUsersCategory } from '../../Redux/Actions/userCategoryMasterAction';
import { getAllCompanies } from '../../Redux/Actions/CompanyMasterAction';
import CustomDataTable from '../../Components/CustomDataTable/CustomDataTable';
import { getAuthLoginUser } from '../../Services/AuthService/AuthService';
import { RxPencil2 } from 'react-icons/rx';
import { RiDeleteBinLine } from 'react-icons/ri';

/*eslint eqeqeq: "off"*/
function UserMaster() {
  const [show, setshow] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
  const [loginUser, setloginUser] = useState(getAuthLoginUser())
  const ALLUsers = useSelector(state => state.user.user);
  const ALLCompany = useSelector(state => state.company.company);
  const category = useSelector(state => state.userCategory.userCategory)
  let userCategory = category.filter(x => x.UserCategoryName != "Superadmin")
  const dispatch = useDispatch();
  const [isAdd, setisAdd] = useState(true)
  const [hideCategory, setHideCategory] = useState(false);

  const onSubmit = (data) => {
    if (isAdd) {
      dispatch(addNewUser(data))
    } else {
      dispatch(updateUser(data))
    }
    reset()
    handleClose()
  };


  const editUser = (UserId) => {
    setisAdd(false)

    handleShow();
    const editData = ALLUsers.find(x => x.UserId === UserId)
    setHideCategory(editData.UserCategoryName === "Superadmin");

    for (let key in editData) {
      setValue(key, editData[key]);
    }
    let companyId = ALLCompany.find(x => x.CompanyName == editData.CompanyName)?.CompanyId;
    let userCategoryId = category.find(x => x.UserCategoryName == editData.UserCategoryName)?.UserCategoryId

    setValue('CompanyId', companyId)
    setValue('UserCategoryId', userCategoryId)
  }

  
  const deleteUser = (UserId) => {
    confirmationDeletePopup().then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUsers(UserId))
        return true
      }
    })
  }

  const handleShow = () => {
    setshow(true)
  }
  const handleClose = () => {
    setshow(false)
    setisAdd(true)
    reset()
  }

  const columns = [
    {
      name: 'User Id',
      selector: row => row.UserId,
      sortable: true,
      width: '110px',
    },
    {
      name: 'User Email',
      selector: row => row.Email,
      sortable: true,
      minWidth: '300px',
    },
    {
      name: 'Company Name',
      selector: row => row.CompanyName,
      sortable: true,
      minWidth: '180px',
      wrap: true,
    },

    {
      name: 'User Category Name',
      selector: row => row.UserCategoryName,
      sortable: true,
      wrap: true,
      minWidth: '220px',
      maxWidth: '225px',
    },
    {
      name: 'Actions',
      selector: (row) => <div className='white_space_nowrap' style={{ minWidth: '450px' }}>
        <RxPencil2 size={25} className='cursor_pointer text-success' onClick={() => editUser(row.UserId)} />
        <RiDeleteBinLine size={25} className='cursor_pointer text-danger ms-2 ' onClick={() => deleteUser(row.UserId)} />
      </div>,
      sortable: true,
      width: '175px'
    },
  ];

  const filterField = [
    {
      displayText: 'Filter Email',
      fieldName: 'Email',
      type: 'text'
    }
  ]
  return (
    <>
    <div className='dashboard_bg'>
        <div className='header_sticky '>
          <Row className='mt-2 ps-3 w-100'>
            <Col xs={8} className='p-0'>
              <h2>Users</h2>
            </Col>
            <Col xs={4} className='p-0 text-end'>
              <button className='button_dark py-2 px-3' onClick={handleShow}>Add +</button>
            </Col>
          </Row>
        </div>

        <div className='padding_section'>
          <Modal size='lg' show={show} fullscreen='md-down' onHide={handleClose} backdrop="static" >
            <Modal.Header closeVariant='white' closeButton className='border-0 black_Background text-white'>
              <Modal.Title>{isAdd ? 'ADD NEW USER' : 'EDIT'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col lg={6}>
                    <label className='form_label'>First Name:</label>
                    <input type="text" className='form_input' autoComplete="on" {...register("FirstName", { required: true })} />
                    {errors.FirstName && <span className='error_message'>FirstName is required</span>}
                  </Col>
                  <Col lg={6}>
                    <label className='form_label'>Last Name:</label>
                    <input type="text" className='form_input' autoComplete="on" {...register("LastName", { required: true })} />
                    {errors.LastName && <span className='error_message'>LastName is required</span>}
                  </Col>
                  <Col lg={6} >
                    <label className='form_label'>Email:</label>
                    <input type="email" className='form_input' autoComplete="on" {...register("Email", { required: isAdd ? true : false })} />
                    {errors.Email && <span className='error_message'>Email is required</span>}
                  </Col>
                  <Col lg={6} className={isAdd ? '' : 'd-none'}>
                    <label className='form_label'>Password:</label>
                    <input type="password" className='form_input' autoComplete="on" {...register("Password", { required: isAdd ? true : false })} />
                    {isAdd ? errors.Password && <span className='error_message'>Password is required</span> : ''}
                  </Col>
                  {
                    loginUser.usercategoryId == 1 ?
                      <Col lg={6} >
                        <label className='form_label'>Company:</label>
                        <select name="CompanyId" className='form_input' defaultValue={'DEFAULT'} {...register("CompanyId", { required: true })}>
                          <option value='DEFAULT' disabled>--Select Company--</option>
                          {
                            ALLCompany?.map((x, i) => {
                              return <option key={i} value={x.CompanyId}>{x.CompanyName}</option>
                            })
                          }
                        </select>
                        {errors.CompanyId && <span className='error_message'>Company  is required</span>}
                      </Col> : <></>
                  }
                  {!hideCategory &&
                    <Col lg={6}>
                      <>
                        <label className='form_label'>User Category:</label>
                        <select name="UserCategoryId" className='form_input' defaultValue={''} {...register("UserCategoryId", { required: true })}>
                          <option value='' disabled>--Select Category--</option>
                          {
                            userCategory?.map((x, i) => {
                              return <option key={i} value={x.UserCategoryId}>{x.UserCategoryName}</option>
                            })
                          }
                        </select>
                        {errors.UserCategoryId && <span className='error_message'>User Category is required</span>}</>
                    </Col>
                  }
                  <Col lg={6}>
                    <label className='form_label'>IsActive:</label>
                    <input type="checkbox" style={{ minWidth: '25px', height: '25px' }} className='mt-2' autoComplete="on" {...register("IsActive")} />
                  </Col>
                </Row>
              </form>
            </Modal.Body>
            <Modal.Footer className='border-0'>
              <button className='button_dark mt-5 py-2 px-3' onClick={handleSubmit(onSubmit)}>Save</button>
            </Modal.Footer>
          </Modal>



        <CustomDataTable columns={columns} data={ALLUsers} filterField={filterField} />
      </div>
    </div>
    </>
  )
}

export default UserMaster