import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserWiseParty, updateSelectedUserWiseParty, updateUserWiseParty } from '../../Redux/Actions/UserWisePartyMasterAction'
import CustomDataTable from '../../Components/CustomDataTable/CustomDataTable';
import { errorPopup, successPopup } from '../../Shared/Constants/PopupConstant/PopupContant';

function PartyPermission() {
  const dispatch = useDispatch();
  const users = useSelector(state => state.user.user)
  const UserWiseList = useSelector(state => state.userWiseParty.userWiseParty)
  var userList = users.filter(x => x.UserCategoryName != "Admin")
  const [userId, setuserId] = useState();


  const handleSelectChange = (e) => {
    setuserId(e.target.value)
    dispatch(getUserWiseParty(e.target.value))
  }


  useEffect(() => {
   dispatch(getUserWiseParty())
  }, [])
  
  const [updatedUserList, setUpdatedUserList] = useState([]);

  useEffect(() => {
    if (UserWiseList) {
      setUpdatedUserList(JSON.parse(JSON.stringify(UserWiseList)));
    }
  }, [UserWiseList]);

  const handleSaveClick = () => {
    if (!userId) {
      errorPopup('Pelase Seleted User')
    }
    else{
      const filterData = updatedUserList.filter((x, i) => UserWiseList[i].Enable != x.Enable)
      dispatch(updateSelectedUserWiseParty(filterData, userId))
      successPopup('Party Permission Add')
    }

  };

  const changePartyPermission = (e, row) => {
    row.Enable = !row.Enable;
    setUpdatedUserList([...updatedUserList])
  }

  const columns = [
    {
      name: 'Party Code',
      selector: row => row.PartyCode,
      sortable: true,
      minWidth: '140px',
      maxWidth: '140px',
    },
    {
      name: 'Party Name',
      selector: row => row.PartyName,
      sortable: true,
      minWidth: '250px',
      wrap: true,
    },
    {
      name: 'AGrp Name',
      selector: row => row.AGRName,
      sortable: true,
      minWidth: '145px',
      maxWidth: '145px',
    },
    {
      name: 'Address',
      selector: row => row.Address,
      wrap: true,
      minWidth: '190px',
    },
    {
      name: 'Mobile',
      selector: row => row.Mobile,
      minWidth: '130px',
      maxWidth: '130px',
    },
    {
      name: 'Phone',
      selector: row => row.Phone,
      minWidth: '130px',
      maxWidth: '130px',
    },
    {
      name: 'Email',
      selector: row => row.Email,
      wrap: true,
      minWidth: '250px',
    },
    {
      name: 'Enable',
      selector: row => (
        <input
          type='checkbox'
          name='Enable'
          checked={row.Enable}
          style={{ minWidth: '20px', height: '20px' }}
          onChange={(e) => changePartyPermission(e, row)}
        />
      ),
      sortable: true,
      width: '120px'
    },
  ];
  return (
    <>
      <div className='dashboard_bg'>
        <div className='header_sticky'>
          <Row className='m-0 w-100'>
            <Col xs={6} className='p-0'>
              <h2>Party Permission</h2>
            </Col>
          </Row>
        </div>

        <div className='padding_section'>
          <Row className='table_section py-4'>
            <Col lg={3}>
              <select name="UserName" className='form_input min_width_190' defaultValue={'DEFAULT'} onChange={handleSelectChange} value={userId}>
                <option value='DEFAULT' disabled>--Select User--</option>
                {
                  userList?.map((x, i) => {
                    return <option key={i} value={x.UserId}>{x.FirstName + " " + x.LastName}</option>
                  })
                }
              </select>
            </Col>
            <Col xs={2}>
              <button className='button_dark py-2 px-3 mt-1' onClick={handleSaveClick}>Save</button>
            </Col>
          </Row>
          <CustomDataTable columns={columns} data={updatedUserList} />
        </div>
      </div>
    </>
  )
}

export default PartyPermission