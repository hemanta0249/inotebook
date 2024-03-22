import { useState } from 'react'
import React from 'react'
import { useNavigate } from 'react-router-dom'


const Signup = () => {
    const [data, setData] = useState({name:"", email:"", password:"", cpassword:""});
    let navigate = useNavigate();

    const onchange = (e)=>{
        setData({...data, [e.target.name]:e.target.value})
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createusers",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name:data.name, email:data.email, password: data.password})
        })
        const json = await response.json();
        console.log(json);
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
            <form onSubmit={handleSubmit}>
            <div className="mb-3 my-5">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" value={data.name} id="name" name='name' aria-describedby="emailHelp" onChange={onchange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={data.email} id="email" name='email' aria-describedby="emailHelp" onChange={onchange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={data.password} id="password" name='password' onChange={onchange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" value={data.cpassword} id="cpassword" name='cpassword' onChange={onchange} minLength={5} required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
