import React from 'react'
import './Page404.css'
import { FaGhost } from "react-icons/fa";
import { NavLink } from 'react-router-dom';

function Page404() {
  return (
    <>
        <div className='Page404'>
            <main>
                <h1>4<span><FaGhost /></span>4</h1>
                <h2 className='mt-4'>Error: 404 page not found</h2>
                <p>Sorry, the page you're looking for cannot be accessed</p>
                <NavLink to='/'><button className='btn btn-light shadow-lg'>GO TO BACK</button></NavLink>
            </main>
        </div>
    </>
  )
}

export default Page404