import React, { useEffect, useState } from 'react'
import './Dash.css'
import { useSelector } from 'react-redux'
import { getmessage, sendmessage } from '../Services/api'
import { useDispatch } from 'react-redux'
import { sendstatus } from '../Redux/user'



function Chatpage({ status }) {
  //all state define
  const [messagem, setmessage] = useState(
    { sender_id: '', receiver_id: '', sendmessage: "" }
  )
  const [getmessa, setgetmess] = useState({
    sender_id: "", receiver_id: ""
  })
  const [stastus, setstatus] = useState(false)

  const dispatch = useDispatch()
  
  //use selector 
  const { oneuser, message, } = useSelector((state) => state)
  const sendmess2 = message.mess
  const user = oneuser.user
  const status1=oneuser.status
  console.log(status1);
  

  const sortdata=[...sendmess2].sort((a,b)=> new Date(a.mess_time) - new Date(b.mess_time))
  console.log(sortdata);



   //getting userdetsild from local storage
  const userdetails = JSON.parse(sessionStorage.getItem('user'))
  
  
  //function for send messages
  const send = async () => {
    console.log(messagem);
    const result = await sendmessage(messagem)
    console.log(result);
    if (result.status == 200) {
      setmessage({ ...messagem, sendmessage: "" })

        
        setstatus(!stastus)
  
        dispatch(sendstatus(stastus))
    

    
    }
  }
  
  
  
//use effect define
  useEffect(() => {
    setmessage({ ...messagem, receiver_id: user._id, sender_id: userdetails._id })
   
    
    
  }, [user,stastus])


  return (
    <>
      {
        status ?

          <div className='cha-div'>
            <div className='d-flex p-2 ch-top-div'>
              <div className='d-flex align-items-center '>
                <button className='text-white btn  '><i class="fa-solid fa-arrow-left"></i></button>
              </div>
              <img src={user.profile} className='img img-pr img-fluid ms-4' alt="" />
              <div className='d-flex align-items-center ms-3'>
                <h5 className='text-white'>{user.username}</h5>
              </div>
            </div>
            <div className='chat-div'>
              
              <div className='chat-div2'>
                <v clasName='chat-box w-100'>
                  
                    <div className=' justify-content-end w-100'>
                      <div className='chat-end'>
                        {
                          sortdata.map((items) => (
                            items.sender_id == userdetails._id ?
                            <div className='d-flex justify-content-end'>

                              <h6 className='text-white send-mes'>{items.message}</h6> 
                            </div>
                              :
                              <div className='d-flex justify-content-star'>
                                

                              <h6 className='text-white send-mes2'>{items?.message}</h6>
                              </div>

                          ))
                        }


                      </div>
                    </div>
                    <div className='d-flex'>
                    </div>
                  
                </v>
              </div>
            </div>

            <div className='inp-box'>
              <input type="text" className='mess-inp' value={messagem.sendmessage} placeholder='Type a message' onChange={(e) => { setmessage({ ...messagem, sendmessage: e.target.value }) }} /><span onClick={send} className='send text-white'><i class="fa-solid fa-paper-plane"></i></span>
            </div>
          </div> :
          <div >
            <h1>WElcome</h1>
          </div>
      }
    </>
  )
}

export default Chatpage