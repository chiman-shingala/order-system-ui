import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Col, Modal, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { addNewItems, deleteItems, getAllItems, updateItems } from '../../Redux/Actions/ItemMasterAction';
import { confirmationDeletePopup } from '../../Shared/Constants/PopupConstant/PopupContant';
import CustomDataTable from '../../Components/CustomDataTable/CustomDataTable';
import {AiOutlineCloudDownload} from 'react-icons/ai'
import { ImagePath, toBase64 } from '../../Shared/Constants/Constant';
import OpenImage from '../../Components/OpenImage/OpenImage';
import { roundValue } from '../../Shared/Constants/Constant';
import { getAuthLoginUser } from '../../Services/AuthService/AuthService';
import { RxPencil2 } from "react-icons/rx";
import { RiDeleteBinLine } from "react-icons/ri";

/*eslint eqeqeq: "off"*/
function ItemMaster() {
    const [show, setshow] = useState(false)
    const { register, handleSubmit, formState: { errors }, reset , setValue} = useForm();
    const [currentImage, setCurrentImage] = useState();
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const AllItems = useSelector(state => state.items.items);
    const dispatch = useDispatch();
    const [isAdd, setisAdd] = useState(true);

    let imageRef = useRef();

    const onSubmit = (data) => {
        if(isAdd){
            dispatch(addNewItems(data))
        }else{
            dispatch(updateItems(data))
        }
        reset()
        handleClose()
        imageRef.current.style.display = 'none';
    };

    const handleShow = () => {
        setshow(true)
    }
    const handleClose = () => {
        setshow(false)
        setisAdd(true)
        reset()
    }

    const deleteItem = (itemId, itemImage) => {
        confirmationDeletePopup().then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteItems(itemId , itemImage))
              return true
            }
          })
    }

    const editItem = async (itemId) => {
        setisAdd(false)
        handleShow();
        const editData = AllItems.find(x => x.ItemId === itemId)
        for(let key in editData){
            setValue(key , editData[key]);
        }
        setTimeout(() => {
            if(editData.ItemImage){
                imageRef.current.style.display = 'block';
                imageRef.current.src = `${ImagePath}/${editData.ItemImage}`;
            }
        }, 100);
    }

    const getImage = async (e) => {
        if(e.target.files[0]){
            imageRef.current.src = await toBase64(e.target.files[0]) ;
            imageRef.current.style.display = 'block';
        }
    }
  
    const openImageViewer = (img) => {
      setCurrentImage(img);
      setIsViewerOpen(true);
    };

    const closeImageViewer = () => {
        setIsViewerOpen(false)
        setCurrentImage()
    }

    const resetImage = () => {
        imageRef.current.style.display = 'none';
        imageRef.current.src = '' ;
    }

    const columns = [
        {
            name: 'Item Id',
            selector: row => row.ItemId,
            sortable : true,
            width:'110px',
        },
        {
            name: 'Image',
            selector: (row,index) =>{
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
            sortable : true,
            minWidth: '250px',
            maxWidth: '350px',
        },
        {
            name: 'Rate',
            selector: row => (row.ItemRate).toLocaleString('en-IN'),
            right: true,
            sortable : true,
            minWidth: '150px',
            maxWidth: '200px',
        },
        {
            name: 'MRP',
            selector: row => (row.Mrp).toLocaleString('en-IN'),
            right: true,
            sortable : true,
            minWidth: '150px',
            maxWidth: '200px',
        },
        {
            name: 'Code',
            selector: row => row.ItemCode,
            sortable : true,
            width: '100px'
        },
        {
            name: 'IsActive',
            selector: row => row.IsActive ? 'Active' : 'Inactive',
            sortable : true,
            width: '120px',
        },
        {
            name: 'Description',
            selector: row => row.ItemDescription,
            sortable : true,
            wrap: true,
            minWidth:'350px'
        },
        {
            name: 'Actions',
            selector: (row) => <div className='white_space_nowrap'>
                <RxPencil2 size={25} className='cursor_pointer text-success'  onClick={() => editItem(row.ItemId)}/>
                <RiDeleteBinLine size={25} className='cursor_pointer text-danger ms-2 ' onClick={() => deleteItem(row.ItemId, row.ItemImage)}/>
            </div>,
            width: '200px'
        }
    ];

    const filterField = [
        {
            displayText : 'Name',
            fieldName : 'ItemName',
            type : 'text'
        },
        {
            displayText : 'Rate',
            fieldName : 'ItemRate',
            type : 'number'
        },
        {
            displayText : 'Code',
            fieldName : 'ItemCode',
            type : 'text'
        },
    
    ]

    const [showModal, setShowModal] = useState(false);
    const [userDetails, setUserDetails] = useState();

    const openShareLink = async () => {
        setShowModal(true);
        const user = await getAuthLoginUser();
        setUserDetails(user);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const Urlshow = () => {

    }

    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        const url = window.location.origin +'/ItemCatalog/MQ==';

        navigator.clipboard.writeText(url)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 3000);
            })
            .catch(err => console.error('Failed to copy: ', err));
    };

    return (
        <>
            <div className='dashboard_bg'>
                <div className='header_sticky'>
                    <Row className='mt-2 ps-3 w-100'>
                        <Col xs={6} className='p-0'>
                            <h2>Items</h2>
                        </Col>
                        <Col xs={6} className='p-0 text-end'>
                            <button className='button_dark py-2 px-3' onClick={handleShow}>Add +</button>
                            <button className='button_dark py-2 px-3 ms-2' onClick={() => openShareLink()}>Share Link</button>
                        </Col>
                    </Row>
                </div>

                <div className='padding_section'>
                    <Modal size='lg' show={showModal} fullscreen='md-down' onHide={handleCloseModal} backdrop="static" >
                        <Modal.Header closeVariant='white' closeButton className='border-0 black_Background text-white'>
                            <Modal.Title>GENERATED LINK</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className='modal-body' style={{ height: '150px', overflowY: 'scroll' }} >
                            {
                                userDetails && (
                                    <a href={`${window.location.origin}/ItemCatalog/${btoa(userDetails.companyId)}`} target="_blank" >
                                        <span style={{ color: 'blue' }}>{`${window.location.origin}/ItemCatalog/${btoa(userDetails.companyId)}`}</span> <br />
                                        <button className='button_dark py-2 px-2 mt-3' onClick={Urlshow}>open</button></a>
                                )
                            }
                            <button className='button_dark py-2 px-2 mt-3 ms-3' onClick={handleCopy} isQuantity={true}> {copied ? 'Copied!' : 'Copy URL'}</button>
                        </Modal.Body>
                    </Modal>



                    <Modal size='lg' show={show} fullscreen='md-down' onHide={handleClose} backdrop="static" >
                        <Modal.Header closeVariant='white' closeButton className='border-0 black_Background text-white'>
                            <Modal.Title>{isAdd ? 'ADD NEW ITEM' : 'EDIT'}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className='modal-body' style={{ height: '70vh', overflowY: 'scroll' }}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Row>
                                    <Col lg={6}>
                                        <label className='form_label'>Item Name:</label>
                                        <input type="text" className='form_input' {...register("ItemName", { required: true })} />
                                        {errors.ItemName && <span className='error_message'>Item Name is required</span>}
                                    </Col>
                                    <Col lg={6}>
                                        <label className='form_label'>Item Rate:</label>
                                        <input type="number" min={0} className='form_input' autoComplete="on" {...register("ItemRate", { required: true })} />
                                        {errors.ItemRate && <span className='error_message'>Item Rate is required</span>}
                                    </Col>
                                    <Col lg={6}>
                                        <label className='form_label'>Item MRP:</label>
                                        <input type="number" min={0} className='form_input' autoComplete="on" {...register("Mrp", { required: true })} />
                                        {errors.Mrp && <span className='error_message'>Item Rate is required</span>}
                                    </Col>
                                    <Col lg={6}>
                                        <label className='form_label'>Item Code:</label>
                                        <input type="text" className='form_input' autoComplete="on" {...register("ItemCode", { required: true })} />
                                        {errors.ItemCode && <span className='error_message'>Item Code is required</span>}
                                    </Col>
                                    <Col lg={6}>
                                        <label className='form_label'>IsActive:</label>
                                        <input type="checkbox" style={{ width: '25px', height: '25px' }} className='mt-2' autoComplete="on" {...register("IsActive")} />
                                    </Col>
                                    <Col lg={6}>
                                        <label className='form_label'>Item Description:</label>
                                        <textarea name="itemDescription" className='resize_none w-100 border_light_gray focus_none' style={{ height: '70px' }} {...register("ItemDescription", { required: true })}></textarea>
                                        {errors.ItemDescription && <span className='error_message'>Item Description is required</span>}
                                    </Col>
                                    <Col lg={12}>
                                        <label className='form_label' >Item Image:</label>
                                        <label htmlFor='file' className='selectItemImage' onClick={resetImage}><AiOutlineCloudDownload size={25} className='me-2' />Select Image</label>
                                        <input type="file" className='mt-2 d-none' id='file' autoComplete="on" {...register("file", { required: isAdd ? true : false })} onChangeCapture={getImage} />
                                        {errors.file && <span className='error_message'>Item Image is required</span>}
                                    </Col>
                                    <Col lg={12}>
                                        <img src='' style={{ display: 'none' }} className='my-4' ref={imageRef} alt="" width='100%' height='100%' />
                                    </Col>
                                </Row>
                            </form>
                        </Modal.Body>
                        <Modal.Footer className='border-0'>
                            <button className='button_dark py-2 px-3' onClick={handleSubmit(onSubmit)}>Save</button>
                        </Modal.Footer>
                    </Modal>

                    <CustomDataTable columns={columns} data={AllItems} filterField={filterField} />

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

export default ItemMaster