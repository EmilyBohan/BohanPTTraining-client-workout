import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const appUrl = import.meta.env.VITE_APP_API_URL
console.log(appUrl)

// appUrl = http://localhost:5050/

export default function Login() {
  let navigate = useNavigate();

  // States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  function handleSubmit(e) {
    e.preventDefault();
    
    let temp = [];
    if(email === '' || password === '') {
      temp.push('Fields cannot be empty.')
    } else {
      fetch(`${appUrl}/login`, {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          password: password
        }),
        headers: {
          'Content-type': 'application/json',
        },
        credentials: 'include', // Ensures cookies are sent with the request 
      })
      .then(res => {
        if(res.ok) {
          navigate('/profile')
        } else {
          res.json()
          .then(data => {
            throw new Error(data.message || 'Login failed')
          })
        }
      })
      .catch(err => {
        console.error(err)
        temp.push(err.message || 'Login failed')
      })
    }
    setErrors(temp)
  }

  return (
    <div className='h-full flex justify-center items-center'>
      {errors.map((err, i) => {
          return <span key='{i}' className='text-red-600'>{err}</span>
        })}
      <form className="mt-4 border border-black rounded-lg p-4 md:w-[400px] w-full">
        <div className='text-2xl font-semibold pb-5'>Sign In</div>
        <div className="mb-3 flex flex-col">
          <label for="exampleInputEmail1" className="form-label">Email address</label>
          <input
              type="email"
              className="form-control rounded p-1 text-black border border-black"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              onChange={handleEmail}
          ></input>
        </div>
        <div className="mb-3 flex flex-col">
          <label for="exampleInputPassword1" className="form-label">Password</label>
          <input
              type="password"
              className="form-control rounded p-1 text-black border border-black"
              id="exampleInputPassword1"
              name="password"
              onChange={handlePassword}
          ></input>
        </div>
        <button onClick={handleSubmit} type="submit" className="p-2 bg-black text-white hover:text-black hover:bg-gray-700 rounded-lg">Submit</button>
      </form>
    </div>
      
  );
};
