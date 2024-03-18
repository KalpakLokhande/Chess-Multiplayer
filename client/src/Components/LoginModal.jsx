import React, { useState } from 'react'

const LoginModal = ({ isOpen, close }) => {

    const [userName, setUserName] = useState()

    const login = () => {

        sessionStorage.setItem('userName', userName)
        close(false)

    }

    if (!isOpen) return null

    return (
        <div style={{filter:'blur(0px)',zIndex:1, position:'absolute', display: isOpen ? 'block' : 'none', textAlign:'center',padding:'10px', width: '40%', height: '40%', borderRadius: '20px', background: '#242424', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '20px', color: 'aliceblue' }} >
            <p>Please Enter Your Name here <br></br> This will be visible to other online players</p>
            <input onChange={(e) => { setUserName(e.target.value) }} placeholder='Enter Your User Name' type='text' style={{border:'none',textAlign:'center', width: '80%', height: '15%', borderRadius: '15px' }} ></input>
            <button onClick={() => login()} style={{ padding: '8px 12px' }} >Login</button>
        </div>
    )
}

export default LoginModal
