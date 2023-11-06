import React from 'react'
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const Register = () => {
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

                <form action="" className='w-full'>

                    <div className="form-control md:w-full my-[2rem]">
                        <label className="label">
                            <span className="label-text">Email <span className='text-[red]'>*</span></span>
                        </label>
                        <input type="text" placeholder="Type here" className="input input-bordered w-full " />

                    </div>
                    <div className="form-control md:w-full my-[2rem]">
                        <label className="label">
                            <span className="label-text">Username <span className='text-[red]'>*</span></span>
                        </label>
                        <input type="text" placeholder="Type here" className="input input-bordered w-full " />

                    </div>
                    <div className="form-control md:w-full my-[2rem]">
                        <label className="label">
                            <span className="label-text">Password <span className='text-[red]'>*</span></span>
                        </label>
                        <input type="password" placeholder="Type here" className="input input-bordered w-full " />

                    </div>


                    <div className="form-control w-52 my-[2rem]">
                        <label className="cursor-pointer label">
                            <span className="label-text">Remember me</span>
                            <input type="checkbox" className="toggle toggle-primary" checked />
                        </label>
                    </div>

                    <button className="w-full btn btn-wide">Register</button>
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