import { NavLink } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {

    const [toggler, setToggler] = useState(false)

    return (
        <div>
            <nav className='fixed w-full'>
                {/* Container */}
                <div className='flex flex-row w-full bg-black justify-between items-start py-4 px-2 text-white font-oxygen'>
                    {/* Row 1*/}
                    <div className={`flex ${toggler ? 'flex-col' : 'flex-row'} justify-start gap-5`}>
                        {/* Col 1 */}
                        <div className='text-3xl font-bold hover:text-alloy-orange'>
                            <NavLink to='/'>
                                APP
                            </NavLink>
                        </div>
                        {/* Col 2 */}
                        <div className={`list-none ${toggler ? 'flex' : 'hidden'} md:flex md:flex-row flex-col gap-4 justify-center items-center`}>
                            <NavLink to='/'>
                                Home
                            </NavLink>
                            <NavLink to='/'>
                                About
                            </NavLink>
                        </div>
                    </div>
                    {/* Row 2 */}
                    <div onClick={() => setToggler(!toggler)} className='md:hidden flex'>
                        <i className="fa-solid fa-bars fa-2x hover:border hover:border-white p-1 rounded-xl hover:cursor-pointer"></i>
                    </div>
                </div>
                    


                {/* <div>
                    <NavLink className="" to="/create">
                        Create Employee
                    </NavLink>
                </div> */}
            </nav>
        </div>
    )
}