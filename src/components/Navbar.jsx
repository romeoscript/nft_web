import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg'

const Navbar = () => {
    const [user, setUser] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchuserINfo = async () => {
            try {
                // Retrieve the access token from local storage
                const accessToken = localStorage.getItem('token');

                // If the token is not found, you can handle it accordingly (e.g., redirect to login)
                if (!accessToken) {
                    throw new Error('Access token not found');
                }

                // Set the Authorization header with the bearer token
                const response = await fetch('https://nftapi-production-405a.up.railway.app/userInfo', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setUser(data.email.slice(0,1))
               //console.log(data.email.slice(0,1));
            } catch (e) {
                setError(e.message); // Set any error that occurred
            } finally {
                setIsLoading(false); // Set loading to false when the request is complete
            }
        };

        fetchuserINfo();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
 
    const logout = () => {
        localStorage.removeItem('token')
        navigate('/')
        window.location.reload()
    }
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <Link to='/'> <img src={logo} alt="" /> <a className="btn btn-ghost normal-case text-xl">PandaNFt</a></Link>
            </div>
            <div className="flex-none gap-2">
                <div className="form-control">
                    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                </div>
                <div className="dropdown dropdown-end z-40">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full flex justify-center items-center text-2xl ">
                         {user}
                            {/* <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" /> */}
                        </div>
                    </label>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        <li>
                            <Link to='/mynft'>
                                MyNfts
                            </Link>

                        </li>
                        <Link to='/create'>
                            Create Nfts
                        </Link>

                        <li onClick={logout}><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar