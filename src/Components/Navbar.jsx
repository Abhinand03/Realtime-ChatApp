import React, { useEffect, useState } from 'react'
import './nav.css'
import io from 'socket.io-client'

function Navbar() {

    const [user, setuser] = useState({})
    const [soket,setsoket]=useState(null)
    const userdetails = JSON.parse(sessionStorage.getItem('user'))

    useEffect(() => {
        if (userdetails) {
            setuser(userdetails)
            const soket1= io("http://localhost:4000")
            setsoket(soket1)

        }
        else{
           if(soket){
            soket.close()
            setsoket(null)
            
           }
        }


    }, [])

    console.log(user);
    return (
        <>
        <div className='nav-main'>

            <div className='text-white d-flex justify-content-between '>
                <div className='d-flex'>
                    <img src={user.profile} className='img-user-pr' alt="Userprofile" />
                    <div className='d-flex align-items-center'>

                        <p className='ms-3'>{user.username}</p>
                    </div>


                </div>
                <div>
                    <i class="fa-solid fa-pen-to-square me-5"></i>
                </div>
            </div>
        </div>
        </>
    )
}

export default Navbar