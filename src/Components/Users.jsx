import React, { useEffect, useState } from 'react'
import './user.css'
import { getuser, re_mess } from '../Services/api'
import { useDispatch, useSelector } from 'react-redux'
import { senduser,sendstatus } from '../Redux/user'
import { getmessage } from '../Services/api'
import { re_message, sendmess } from '../Redux/message'


function Users() {

    //state creation
    const [userdata, setuserdata] = useState([])
    const [getmessa, setgetmess] = useState({
        sender_id: "", receiver_id: ""
    })
    const [remess, setremess] = useState({
        sender_id: "", receiver_id: ""
    })
    const [allmessage, setallmessage] = useState([])
    const [currentuser, setcurrentuser] = useState({ email: "" })


    //get userdetails from local storage
    const userdetails = JSON.parse(sessionStorage.getItem('user'))

    //useselector define
    const { oneuser } = useSelector((state) => state)
    const user = oneuser.user

    
    const messStatus=oneuser.status
    

    //create instance of useDispaych
    const dispatch = useDispatch()

    const chatuser = useSelector((state) => state)
    // console.log("from redux==",chatuser);


    const users = async () => {
        const email2 = userdetails.email

        // console.log("uer",currentuser);
        if (currentuser) {


            const result = await getuser(userdetails)
            // console.log(result);
            setuserdata(result.data)
        }
    }



    const handlegetmes = async () => {
        const result = await getmessage(getmessa)
        const conversation = result.data
        const result2 = await re_mess(remess)
        const recive = result2.data
        console.log("www", result2);
        const all = [...conversation, ...recive]

        setallmessage(all)


        console.log("jh", allmessage);





        dispatch(sendmess(allmessage))



        // console.log('log',result);
    }
    // console.log(userdata);
    useEffect(() => {
        users()
        setgetmess({ ...getmessa, receiver_id: user._id, sender_id: userdetails._id })
        setremess({ ...remess, receiver_id: userdetails._id, sender_id: user._id })
        
        const timeoutid= setTimeout(() => {
            
            handlegetmes()
        },500)
        
        return ()=>clearTimeout(timeoutid)
    



    }, [user,messStatus])
    return (
        <>
            {
                userdata.map((items) => (

                    <div className='ur-m mt-4' onClick={() => { dispatch(senduser(items)) }}>
                        <div className='d-flex' onClick={handlegetmes}> 
                            <div className='rounded-circle'>

                                <img className=' img-pro' src={items?.profile} alt="user-profile" />
                            </div>
                            <button className='btn btn-success' onClick={handlegetmes}>clivk</button>
                            <div className='ur-name'>
                                <p>{items?.username}</p>

                            </div>
                        </div>
                    </div>

                ))
            }

        </>
    )
}

export default Users