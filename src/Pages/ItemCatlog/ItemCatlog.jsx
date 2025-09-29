import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { ImagePath } from '../../Shared/Constants/Constant';
import { Modal } from 'react-bootstrap';
import { IoIosArrowForward } from "react-icons/io";
import ItemCatalogCard from '../ItemCatalogCard/ItemCatalogCard';
import { useDispatch, useSelector } from 'react-redux';
import { addOrderByTrno, getItemPermission, getPartypermission } from '../../Redux/Actions/orderMasterAction';
import { getAuthLoginUser } from '../../Services/AuthService/AuthService';
import { addNewItems, getallItemsByCompanyId } from '../../Redux/Actions/ItemMasterAction';
import ItemView from '../ItemView/ItemView';
import { errorPopup, successPopup } from '../../Shared/Constants/PopupConstant/PopupContant';

function ItemCatlog() {
    const { id } = useParams()
    const dispatch = useDispatch();
    const [loginUser, setloginUser] = useState(getAuthLoginUser())
    const [allPartyDetail, setallPartyDetail] = useState([])
    const [AllItems, setAllItems] = useState([])
    let [selectedParty, setselectedParty] = useState('')
    let allParty = useSelector(state => state.allParty.allParty)
    let items = useSelector(state => state.items.items)

    useEffect(() => {
        getAllData()
    }, [loginUser, items, allParty])

    const getAllData = async () => {
        if (loginUser && loginUser.usercategoryId == 3) {
            setAllItems([...await getItemPermission()])
            setallPartyDetail([...await getPartypermission()])
        } else {
            setAllItems([...items])
            setallPartyDetail([...allParty])
        }
    }


    useEffect(() => {
        if (id && !loginUser) {
            (async () => {
                let response = await getallItemsByCompanyId(atob(id));
                if(response){
                    setAllItems([...response])
                }
            })();
        }
       
    }, [id]);

    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});

    const Carddata = async (data) => {
        setShowModal(true);
        setSelectedItem(data)

    };


    const handleCloseModal = () => {
        setShowModal(false);
    };

    const getValue = (value, item) => {
        item.Pcs = value;
        let index = AllItems.findIndex(x => x.ItemId == item.ItemId);
        if (index >= 0) {
            items[index] = item;
            setAllItems([...AllItems])
        }
    }

    useEffect(() => {
        if (allPartyDetail.length === 1) {
            setselectedParty(allPartyDetail[0].PartyCode);
        }
    }, [allPartyDetail]);


    const saveOrder = () => {
        if (!selectedParty) {
            errorPopup('Please Select Party');
            return; 
        }

        if (allPartyDetail.length === 0) {
            errorPopup('No party details available');
            return;
        }

        const findpic = AllItems.find((x) => x.Pcs > 0);
        if (!findpic) {
            errorPopup('Please Enter Pcs');
            return;
        }

        const orderData = AllItems.filter((x) => x.Pcs && x.Pcs > 0).map((x) => ({
            ...x,
            TrnDate: new Date(),
            userId: getAuthLoginUser().userId,
            rate: x.ItemRate,
            PartyCode: selectedParty,
            Amount: Number(x.ItemRate) * Number(x.Pcs),
            InvoiceNo: '',
        }));

        dispatch(addOrderByTrno(orderData));
        getAllData();

        successPopup('Order successfully added');
        setselectedParty('');
    };



    return (
        <>
            <div className='row m-0 g-2'>
                {
                    (loginUser && loginUser.usercategoryId == 3) &&
                    <div className='d-flex justify-content-end align-items-center'>
                        <div className='me-2 mt-2'>
                            <h6>Party  :</h6>
                        </div>
                        <div style={{ minWidth: '150px' }}>

                            {
                                allPartyDetail.length == 1 ? (
                                    <select name="PartyCode" disabled className='form_input w-100'>
                                        <option selected className='form_input' >
                                            {allParty[0].PartyName}
                                        </option>
                                    </select>
                                ) :
                                    <select name="PartyCode" className='form_input' defaultValue={''} value={selectedParty} onChange={(e) => setselectedParty(e.target.value)} >
                                        <option value='' style={{ textAlign: 'center' }} disabled>Select Party</option>
                                        {
                                            allPartyDetail.length > 1 && allPartyDetail?.map((x, partyIndex) => {
                                                return <option key={partyIndex} value={x.PartyCode}>{x.PartyName}</option>
                                            })
                                        }
                                    </select>
                            }
                        </div>
                        <div>
                            {
                                (loginUser && loginUser.usercategoryId == 3) && <div className='text-end p-3'>
                                    <button className='button_dark py-2 px-3' onClick={saveOrder}>Save</button>
                                </div>
                            }</div>
                    </div>
                }
                {
                    AllItems?.map((element, index) => {
                        return <div className='col-12 col-sm-4 col-lg-3 col-xl-2 p-2'>
                            <ItemCatalogCard data={element} datas={element} Carddata={Carddata} getValue={getValue} isUser={loginUser?.usercategoryId == 3} />
                        </div>
                    })
                }

                <Modal size='lg' show={showModal} fullscreen='md-down' onHide={handleCloseModal} backdrop="static" >
                    <Modal.Header closeVariant='white' closeButton className='border-0 black_Background text-white'>
                        <Modal.Title>{selectedItem.ItemName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='modal-body' style={{ height: '70vh', overflowY: 'scroll' }} >
                        <div>
                            <div className='ms-2 mt-2' >
                                <img src={`${ImagePath}${selectedItem.ItemImage}`} alt="" style={{ width: "100%", height: "500px" }} width={450} />
                            </div>
                            <div className='ms-2 mt-4'>
                                <div className='d-flex'>
                                    <label className='form_label fs-5 me-5' style={{ color: 'gray' }}><span className='text-dark fs-5'>Code :</span> {selectedItem.ItemCode}</label>
                                    <label className='form_label fs-5 text-success'  ><span className='text-dark fs-5'>MRP :</span> {selectedItem.Mrp}</label>
                                </div>
                                <div style={{display:'flex'}}>
                                    <label className='form_label fs-6' style={{ color: 'gray'}}><span className='text-dark fs-5'>Description : </span>{selectedItem.ItemDescription}</label>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>

        </>
    )
}

export default ItemCatlog