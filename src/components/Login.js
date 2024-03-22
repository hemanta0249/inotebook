import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [data, setData] = useState({email:"", password:""});
    let navigate = useNavigate();

    const onchange = (e)=>{
        setData({...data, [e.target.name]:e.target.value})
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email:data.email, password:data.password})
        })
        const json = await response.json();
        console.log(json);
        // setData({email:"", password:""})
        if(json.success){
            localStorage.setItem('token', json.authToken);
            navigate('/');
        }
        else{
            alert("invalid");
        }
    }

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="mb-3 my-5">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" value={data.email} onChange={onchange} className="form-control" id="email" name='email' aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" value={data.password} onChange={onchange} className="form-control" id="password" name='password'/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={(e) => handleSubmit(e)}>Submit</button>
            </form>
        </div> 
    )
}

export default Login
