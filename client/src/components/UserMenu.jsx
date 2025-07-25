import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Divider from './Divider'

const UserMenu = () => {

    const user = useSelector((state)=> state.user)

  return (
    <div>
        <div className='font-semibold'>My Account</div>
        <div className='text-sm'>{user.name || user.mobile}</div>
        
        <Divider/>
        <div className='grid text-sm gap-2'>
            <Link to={""}>My Order</Link>
            <Link to={""}>Save Address</Link>
            <button className='text-left'>Log Out</button>
        </div>
    </div>
  )
}

export default UserMenu
