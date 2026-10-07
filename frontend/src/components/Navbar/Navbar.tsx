import './navbar.css'
import { NavLink } from 'react-router'
import {useAuthStore} from "../../store/useAuthStore.ts";
import {FiLogOut} from "react-icons/fi";

export default function Navbar() {
    const authUser = useAuthStore(state => state.authUser);
    const logOut = useAuthStore(state => state.logout);

    const navLinks = [
        {name: 'Home', to: '/', show: true},
        {name: 'About', to: '/about', show: !authUser},
        {name: 'Pricing', to: '/pricing', show: !authUser},
        {name: 'Login', to: '/login', show: !authUser},
        {name: 'Dashboard', to: '/dashboard', highlight: true, show: !!authUser},
        {name: 'Register', to: '/register', highlight: true, show: !authUser},
    ];

    const navLinksToShow = navLinks.filter(link => link.show);

    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="logo">
                    <NavLink to="/">LinkedLinks</NavLink>
                </div>

                <input type="checkbox" id="menu-checkbox"/>
                <label htmlFor="menu-checkbox" className="menu-btn">
                    <span className="icon"></span>
                </label>

                <ul className="nav-links">
                    {navLinksToShow.map((link, index) => (
                        <li key={index}>
                            <NavLink
                                to={link.to}
                                className={({isActive}) => link.highlight ? "btn-contact" : isActive ? "active" : ""}
                            >
                                {link.name === 'Dashboard' ? `Hello, ${authUser!.username}` : link.name}
                            </NavLink>
                        </li>
                    ))}
                    {
                        authUser && (
                            <li>
                                <button
                                    className="logout-btn"
                                    onClick={logOut}
                                >
                                    <span>Logout</span>
                                    <FiLogOut />
                                </button>
                            </li>
                        )
                    }
                </ul>
            </div>
        </nav>
    )
}