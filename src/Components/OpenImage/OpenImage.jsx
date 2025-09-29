import React, { useEffect, useState } from 'react';
import './OpenImage.css'
import {AiOutlineClose} from 'react-icons/ai'

function OpenImage(props) {
    const [isShow, setisShow] = useState(props.img)
    useEffect(() => {
      setisShow(props.img)
    }, [props.img])
    
  return (
    <>
    {
        isShow ? 
        <>
            <div className='main_div text-center'>
                <div className='float-end p-4'>
                    <AiOutlineClose size={30} color='white' className='cursor_pointer' onClick={() => props.closeImageViewer(false)} />
                </div>
                  <img src={props.img} alt=""  />
            </div>
        </> : <></>
    }
        
    </>
  )
}

export default OpenImage