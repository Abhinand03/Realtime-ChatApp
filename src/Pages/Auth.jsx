import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode';
import './auth.css'
import { useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google';
import { googlelogin, login, reg } from '../Services/api';
import firebase from 'firebase/compat/app';
import "firebase/compat/storage"
import Swal from 'sweetalert2';

function Auth() {
  const [status, setstatus] = useState(false)

  const [userprofile, setuserprofile] = useState("")

  const [userd, setuserdata] = useState({
    username: '', password: '', profile: '', email: ''
  })
  const [userd2, setuserdata2] = useState({
    username: '', password: '', profile: "https://i.pinimg.com/236x/74/67/ac/7467acd73768ec753f20c4ac6cf39441.jpg", email: ''
  })


  const navigate = useNavigate()

  //manual Login
  const hanldelogin = async () => {

    const { email, password } = userd2

    if (email && password) {
      console.log(userd2);

      const result = await login(userd2)
      if (result.status == 200) {
        
        sessionStorage.setItem("token", result.data.token)
        sessionStorage.setItem("user", JSON.stringify(result.data.existinguser))
        navigate('/dash')


      }
      console.log(result);




    }
    else {
      alert("DSFds")
    }

  }

  //User Manual Reagistration
  const handleregister = async () => {
    const { username, password, email, profile } = userd2
    if (username && password && email && profile) {
      const result = await reg(userd2)
      if (result.status == 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "User Registration Successfully Completed",
          showConfirmButton: false,
          timer: 2500,
          background: '#0c0320'
        });
        setTimeout(() => {
          setstatus(!status)


        }, 2000);

      }

    }
    else {
      Swal.fire({
        icon: "error",

        text: "Fill All Feild Properly",
        background: '#0c0320',
        color: "white"
      });
    }
    console.log(result);

  }




  //change status
  const change = () => {
    setstatus(!status)
    setuserdata2({ ...userd2, username: '', password: '', email: '', profile: '' })

  }


  //google login
  const Login = async () => {

    console.log(userd);
    const result = await googlelogin(userd)
    console.log(result);
    if (result.status == 200) {

      sessionStorage.setItem("token", result.data.token)
      sessionStorage.setItem("user", JSON.stringify(result.data.existingUser))

    }
    else {
      alert(result.data.response)
    }




  }
  // google auth setup
  const handleLoginSuccess = (credentialResponse) => {
    const decodedData = jwtDecode(credentialResponse.credential);
    console.log(decodedData);

    if (decodedData && decodedData.email && decodedData.picture && decodedData.given_name) {
      setuserdata({
        email: decodedData.email,
        profile: decodedData.picture,
        username: decodedData.given_name,
      });


    } else {
      console.error("Decoded data is missing required properties.");
    }

  };
  const handleLoginError = () => {
    console.log('Login Failed');
  };




  //Profile Picture Upload to Firebase
  const handleupload = (e) => {
    const filename = e.target.files[0]

    if (filename) {
      const storageref = firebase.storage().ref()
      const fileref = storageref.child(filename.name)
      fileref.put(filename).then((res) => {
        res.ref.getDownloadURL().then((res2) => {

          setuserdata2({ ...userd2, profile: res2 })
          console.log(userd2);
        })
      })
    }

  }


  useEffect(() => {
    if (userd) {
      console.log(userd);

      if (userd.email) {
        Login()
        navigate('/dash')
      }


    }
  }, [userd])


  return (
    <>
      <div className='lo-m'>
        <div className='lo-m2'>
          <div className='lo-cont shadow'>
            <div className='d-flex flex-column mt-5 '>
              {
                status ?
                  <h1 className='text-white text-center'>Sign In</h1> :
                  <h1 className='text-white'>Welcome Back</h1>
              }
              {
                status &&
                <>
                  <div className='d-flex justify-content-center mt-3'>
                    <label>
                      <input type="file" name="" id="" onChange={handleupload} accept="image/*" style={{ display: 'none' }} />
                      <img className='upload-pro' src={userd2.profile ? userd2.profile : "https://i.pinimg.com/236x/74/67/ac/7467acd73768ec753f20c4ac6cf39441.jpg"} alt="" />
                    </label>

                  </div>

                  <div className="form__group field mt-4">
                    <input type="input" className="form__field" onChange={(e) => { setuserdata2({ ...userd2, username: e.target.value }) }} placeholder="Name" required="" />
                    <label for="name" className="form__label">Enter Username</label>

                  </div>
                </>
              }

              <div className="form__group field mt-4">
                <input type="input" className="form__field" value={userd2.email} placeholder="Name" onChange={(e) => setuserdata2({ ...userd2, email: e.target.value })} required="" />
                <label for="name" className="form__label">Enter Your Email ID</label>

              </div>

              <div className="form__group field mt-2">
                <input type="password" value={userd2.password} className="form__field" placeholder="Name" onChange={(e) => setuserdata2({ ...userd2, password: e.target.value })} required="" />
                <label for="name" className="form__label">Enter Your Password</label>
              </div>
              {
                status ?
                  <button type='submit' className='  mt-3 lo-btn' onClick={handleregister}>Sign In</button> :
                  <button onClick={hanldelogin} className=' mt-3 lo-btn'>Login</button>

              }
              <p className='not-p' onClick={change}>
                {
                  status ?
                    <p className='text-center text-primary mt-4'>Already An member</p> :
                    <p className='text-primary text-center mt-4'><span className='text-secondary'>Not Registerd ?</span>Create An Account</p>

                }

              </p>

              {
                status ? <br /> :
                  <div>
                    <p className='text-center text-white'>OR</p>
                    <div className='w-100 d-flex justify-content-center'>

                      <GoogleLogin
                        onSuccess={handleLoginSuccess}
                        onError={handleLoginError}
                      />
                    </div>

                  </div>
              }
            </div>


          </div>

        </div>
      </div>
    </>
  )
}

export default Auth