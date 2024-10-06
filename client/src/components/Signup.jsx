import React, {useState} from 'react';
import  { useNavigate } from 'react-router-dom';

const appUrl = import.meta.env.VITE_APP_API_URL // variable created from the .env file

const Signup = () => {
    // States for registration
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');

    // Error states
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState([]);

    // Navigation
    let navigate = useNavigate()

    // Handlers for input changes
    const handleEmail = (e) => setEmail(e.target.value);
    const handleUserName = (e) => setUserName(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleConfirm = (e) => setConfirm(e.target.value);

    // Form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        let temp = []
        if(email === '' || userName === '' || password === '' || confirm === '') {
            temp.push('Please fill in all fields')
        }else if(password !== confirm){
            temp.push('Password fields do not match')
        } else {
            setSubmitted(true);
            setErrors([]);

            fetch(`${appUrl}/signup`, {
                method: 'POST',
                body: JSON.stringify({
                    email: email,
                    userName: userName,
                    password: password
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include' // Ensures cookies are sent with the request
            })
                .then(res => {
                    if(res.ok) {
                        navigate('/profile')
                    } else {
                        return res.json().then(data => {
                            throw new Error(data.message || 'Signup failed')
                        })
                    }
                })
                .catch(err => {
                    console.error(err);
                    temp.push(err.message || 'Signup failed');
                    setErrors(temp);
                })

        }
        setErrors(temp)
    }

    return (
        <main className="h-full w-full md:m-auto text-black flex justify-center">
            <div className="h-full w-full flex justify-center items-center">
                <section className="mt-5 md:w-[600px] w-full px-2 md:px-0">
                    {errors.map((err,i) => {
                        return <span key="{i}" className="text-red-600">{err}</span>
                    })}
                    <form className="mt-4 border border-black rounded-lg p-4">
                        <div className='text-2xl font-semibold pb-5'>Signup</div>
                        <div className="mb-3 flex flex-col">
                            <label htmlFor="userName" className="form-label">User Name</label>
                            <input onChange={handleUserName} type="text" className="form-control rounded p-1 border border-black" id="userName" name="userName"></input>
                        </div>
                        <div className="mb-3 flex flex-col">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email Address</label>
                            <input onChange={handleEmail} type="email" className="form-control rounded p-1 border border-black" id="exampleInputEmail1" aria-describedby="emailHelp" name="email"></input>
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3 flex flex-col">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input onChange={handlePassword} type="password" className="form-control rounded p-1 border border-black" id="password" name="password"></input>
                        </div>
                        <div className="mb-3 flex flex-col">
                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                            <input type="password" className="form-control rounded p-1 border border-black" onChange={handleConfirm} id="confirmPassword" name="confirmPassword"></input>
                        </div>
                        <button type="submit" className="p-2 bg-black text-white hover:text-black hover:bg-gray-700 rounded-lg" onClick={handleSubmit}>Submit</button>
                    </form>
                    
                </section>
            </div>
        </main>
    )
}

export default Signup