import React, { useState } from 'react'
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { useRegisterUser } from '../hooks/useRegister';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';


const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { mutate, isLoading, isError, error } = useRegisterUser();
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
  
    const handleSubmit = (e) => {
        e.preventDefault();
        mutate({ email, username, password });
    };

    return (
        <>
            <div className="text-sm breadcrumbs py-[2rem] px-[4rem]">
                <ul>
                    <li><a>Home</a></li>
                    <li>Register</li>
                </ul>
            </div>
            <h2 className='text-center font-bold text-3xl'> Register</h2>
            <section className='flex justify-center items-center flex-cols md:w-[50%] m-auto p-[3rem]'>

                <form onSubmit={handleSubmit} className='w-full'>

                    <div className="form-control md:w-full my-[2rem]">
                        <label className="label">
                            <span className="label-text">Email <span className='text-[red]'>*</span></span>
                        </label>
                        <input type="text" value={email}
                            onChange={(e) => setEmail(e.target.value)} placeholder="Type here" className="input input-bordered w-full " />

                    </div>
                    <div className="form-control md:w-full my-[2rem]">
                        <label className="label">
                            <span className="label-text">Username <span className='text-[red]'>*</span></span>
                        </label>
                        <input type="text" placeholder="Type here" onChange={(e) => setUsername(e.target.value)} value={username} className="input input-bordered w-full " />

                    </div>
                    <div className="form-control md:w-full my-[2rem]">
                        <label className="label">
                            <span className="label-text">Password <span className='text-[red]'>*</span></span>
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Type here"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input input-bordered w-full pr-10"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-0 flex items-center px-2"
                            >
                                {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                            </button>
                        </div>
                    </div>


                    <div className="form-control w-52 my-[2rem]">
                        <label className="cursor-pointer label">
                            <span className="label-text">Remember me</span>
                            <input type="checkbox" className="toggle toggle-primary" checked />
                        </label>
                    </div>

                    <button className="w-full btn btn-wide">   {isLoading ? 'Registering...' : 'Register'}</button>
                    {error && <p className="text-red-500">Error: {error.message}</p>}
                    <label className="label">
                        <span className="label-text-alt">already have an account? <Link to='/login'> <a className='underline text-[blue]'>Login</a></Link></span>
                    </label>
                </form>


            </section>
            <Footer />
        </>
    )
}

export default Register