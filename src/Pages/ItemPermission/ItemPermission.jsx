import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addSelectedUserWiseItem, getUserWiseItems, updateSelectedUserWiseItem, updateUserWiseItems } from '../../Redux/Actions/UserWiseItemMaster';
import CustomDataTable from '../../Components/CustomDataTable/CustomDataTable';
import { ImagePath } from '../../Shared/Constants/Constant';
import OpenImage from '../../Components/OpenImage/OpenImage';
import { getAuthLoginUser } from '../../Services/AuthService/AuthService';
import { errorPopup, successPopup } from '../../Shared/Constants/PopupConstant/PopupContant';
import { getallItemsByCompanyId } from '../../Redux/Actions/ItemMasterAction';

function ItemPermission() {
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
    const AllCompanies = useSelector(state => state.company.company);
    const [userId, setuserId] = useState();
    const [currentImage, setCurrentImage] = useState();
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const AlluserWiseItems = useSelector(state => state.userWiseItems.userWiseItems);
    const user = useSelector(state => state.user.user)
    const [AllItems, setAllItems] = useState([])
    const users = useSelector(state => state.user.user)
    var userList = users.filter(x => x.UserCategoryName != "Admin")
    const dispatch = useDispatch();
    useEffect(() => {
        if (userId) {
            setAllItems(JSON.parse(JSON.stringify(AlluserWiseItems)))
        }
    }, [AlluserWiseItems])

    useEffect(() => {
        (async () => {
            if (!userId) {
                let loginUser = getAuthLoginUser();
                let response = await getallItemsByCompanyId(loginUser.companyId);
                if (response) {
                    setAllItems(JSON.parse(JSON.stringify(response)))
                }
            }
        })();
    }, [])

    useEffect(() => {
        return () => {
            setuserId()
        }
    }, [])


    const handleSaveClick = () => {
        if (!userId) {
            errorPopup('Pelase Selete User');
        }
        else {
            let filterData = AllItems.filter((x, i) => AlluserWiseItems[i].Enable != x.Enable ||  Number(AlluserWiseItems[i].ItemRate) != Number(x.ItemRate) )
            if (filterData) {
                dispatch(addSelectedUserWiseItem(filterData, userId))
                successPopup('Item Permission Sucess')
                // setuserId('DEFAULT')
            }
        }
    };


    const onSubmit = (data) => {
        dispatch(getUserWiseItems(data.companyId))
    }
    const handleSelectChange = (e) => {
        setuserId(e.target.value)
        dispatch(getUserWiseItems(e.target.value))
    }

    const openImageViewer = (img) => {
        setCurrentImage(img);
        setIsViewerOpen(true);
    };

    const closeImageViewer = () => {
        setIsViewerOpen(false)
        setCurrentImage()
    }
    const getItems = (e, ItemId) => {
        if (userId) {
            let index = AllItems.findIndex(x => x.ItemId == ItemId)
            if (e.target.name == 'Enable') {
                if (e.target.checked) {
                    AllItems[index].Enable = true;
                } else {
                    AllItems[index].Enable = false;
                }
            } else {
                if (e.target.value == '') {
                    AllItems[index].ItemRate = 0;
                } else {
                    AllItems[index].ItemRate = e.target.value;
                }
            }
        } else {
            errorPopup('Pelase Selete User');
        }
        setAllItems([...AllItems])
    }

    // const saveData = (data) => {
    //     // updateUserWiseItems(AllItems)
    //     dispatch(getConfirmOrder(data))
    // }
    const columns = [
        {
            name: 'Item Id',
            selector: row => row.ItemId,
            sortable: true,
            minWidth: '110px',
            maxWidth: '120px',
        },
        {
            name: 'Image',
            selector: (row, index) => {
                return <img
                    src={`${ImagePath}/${row.ItemImage}`}
                    onClick={() => openImageViewer(row.ItemImage ? `${ImagePath}/${row.ItemImage}` : undefined)}
                    width={50}
                    height={50}
                    key={index}
                    className='m-1 cursor_pointer'
                    alt=""
                />
            },
            minWidth: '100px',
            maxWidth: '110px',
        },
        {
            name: 'Name',
            selector: row => row.ItemName,
            sortable: true,
            wrap: true,
            minWidth: '250px',
        },
        {
            name: 'Rate',
            selector: row => <input type='number' name='ItemRate' className='form_input text-end' value={(row.ItemRate)} disabled={!row.Enable} onChange={(e) => getItems(e, row.ItemId)} />,
            sortable: true,
            minWidth: '150px',
            maxWidth: '160px',
        },
        {
            name: 'Code',
            selector: row => row.ItemCode,
            sortable: true,
            minWidth: '90px',
            maxWidth: '130px',
        },
        {
            name: 'IsActive',
            selector: row => row.IsActive ? 'Active' : 'Inactive',
            sortable: true,
            minWidth: '120px',
            maxWidth: '130px',
        },
        {
            name: 'Description',
            selector: row => row.ItemDescription,
            sortable: true,
            wrap: true,
            minWidth: '270px',
            // maxWidth: '250px',
        },
        {
            name: 'Enable' ,
            selector: row => <input type='checkbox' name='Enable' checked={row.Enable} style={{ minWidth: '20px', height: '20px' }} onChange={(e) => getItems(e, row.ItemId)} />,
            sortable: true,
            width: '110px',
        }
    ];
    return (
        <>
            <div className='dashboard_bg'>
                <div className='header_sticky'>
                    <Row className='m-0 w-100'>
                        <Col xs={6} className='p-0'>
                            <h2>Items Permission</h2>
                        </Col>
                    </Row>
                </div>
                <div className='padding_section'>
                    <Row className='table_section py-4'>
                        <Col lg={3}>
                            <select name="UserName" className='form_input min_width_190' defaultValue={"DEFAULT"} onChange={handleSelectChange} value={userId}>
                                <option value='DEFAULT' selected disabled>--Select User--</option>
                                {
                                    user?.map((x, i) => {
                                        return <option key={i} value={x.UserId}>{x.FirstName + " " + x.LastName}</option>
                                    })
                                }
                            </select>
                        </Col>
                        <Col lg={1}>
                            <button className='button_dark py-2 px-3 mt-1' onClick={handleSaveClick}>
                                Save
                            </button>
                        </Col>
                    </Row>

                    <CustomDataTable columns={columns} data={AllItems} />

                    {/* {
                    AllItems?.length > 0 ?
                        <button className='button_dark px-5 py-2' onClick={saveData}>Save</button> : <></>
                } */}

                    {isViewerOpen ?
                        <>
                            <OpenImage img={currentImage} closeImageViewer={closeImageViewer} />
                        </> :
                        <></>
                    }
                </div>
            </div>
        </>
    )
}

export default ItemPermission