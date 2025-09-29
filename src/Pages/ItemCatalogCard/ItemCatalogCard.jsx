import React, { useState } from 'react'
import { ImagePath } from '../../Shared/Constants/Constant'
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useSelector } from 'react-redux';


function ItemCatalogCard({ data, isQuantity, Carddata, getValue, isUser }) {

    const formBlankData = { TrnNo: 0, SeqNo: 0, TrnDate: "", ItemId: "", Pcs: "", Rate: "", Amount: "", CompanyId: "", AcYear: "", UserId: "", selectedItem: null }
    let [formRowsData, setformRowsData] = useState([{ ...formBlankData }])

     let allParty = useSelector(state => state.allParty.allParty)
      

    const onSubmit = (action) => {
        if (action == 'increment') {
            getValue(Number(data.Pcs ?? 0) + 1, data)
        } else {
            if (data.Pcs > 0) {
                getValue(Number(data.Pcs ?? 0) - 1, data)
            }
        }
    };


    return (
        <>
            <div className='card h-100 border-0 shadow' style={{ minHeight: '400px' }}>
                <div className='card-body p-0'>
                    <div className='d-flex align-items-center h-100'>
                        <img src={`${ImagePath}${data.ItemImage}`} className="card-img-top" alt="" />
                    </div>
                </div>
                <div class="card-footer text-muted">
                    <div className='d-flex justify-content-between align-items-center'>
                        <div className='position-relative' style={{ width: '70%' }}>
                            <h5 className='d-inline-block text-truncate' style={{ width: '100%' }}>{data.ItemName}</h5>
                            <p className='mb-0'>MRP: <span className='text-success fw-bold'>{data.Mrp}</span></p>
                        </div>
                        <div className='bg-success d-flex justify-content-center align-items-center cursor_pointer' onClick={() => Carddata(data)} style={{ borderRadius: '50%', height: '35px', width: '35px' }}> <IoMdInformationCircleOutline size={30} color='white' /></div>
                    </div>
                </div>
                <div className='p-2'>
                    {
                        isUser &&
                        formRowsData.map((x, i) => {
                            return <>
                                <div className='d-flex' style={{ height: '35px' }}>
                                    <button onClick={() => onSubmit('decrement')} className='me-2 btn btn-danger'>-</button>
                                    <input type="number" min={0} style={{ width: '50px' }} name="Pcs" value={data.Pcs ?? ''} className='form_input py-0 text-center' onChange={(e) => getValue(e.target.value, data)} />
                                    <button onClick={() => onSubmit('increment')} className='ms-2 btn btn-primary'>+</button>
                                </div>
                            </>
                        })
                    }

                </div>
            </div>
        </>
    )
}

export default ItemCatalogCard