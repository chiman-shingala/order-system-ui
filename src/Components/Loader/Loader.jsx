import React from 'react'
import { Puff } from 'react-loader-spinner'

export const loaderService = (value) => {
    if(value){
        document.documentElement.style.setProperty('--loader-display', 'block')
    }else{
        document.documentElement.style.setProperty('--loader-display', 'none')
    }
}

function Loader() {
  return (
    <>
        <div className='Loader_bg'>
            <div className='Loader'>
                <Puff
                    height="80"
                    width="80"
                    radius={1}
                    color="black"
                    ariaLabel="puff-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            </div>
        </div>
    </>
  )
}

export default Loader