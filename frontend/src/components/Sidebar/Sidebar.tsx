import './sidebar.css'
import {NavLink, Link} from "react-router";
import {CiLink} from "react-icons/ci";
import {FiLogOut} from "react-icons/fi";
import {RiPagesLine} from "react-icons/ri";
import {IoAnalyticsOutline, IoArrowBack} from "react-icons/io5";
import Avatar from "../Avatar/Avatar.tsx";
import {useAuthStore} from "../../store/useAuthStore.ts";

export default function Sidebar() {
    const authUser = useAuthStore(state => state.authUser);
    const logOut = useAuthStore(state => state.logout);

    return (
            <aside className="sidebar">
                <div className="avatar-container">
                    <Avatar authUser={authUser} />

                    <div className='my-page'>
                        <Link to={`/${authUser?.username}`}><CiLink />/<span>{authUser?.username}</span></Link>
                    </div>
                </div>


                <div className="actions">
                    <NavLink
                        to={`/dashboard/${authUser?.username}`}
                        className={({isActive}) => isActive ? "action active" : "action"}
                    >
                        <span>My Page</span>
                        <RiPagesLine />
                    </NavLink>
                    <NavLink
                        to="/dashboard/analytics"
                        className={({isActive}) => isActive ? "action active" : "action"}
                    >
                        <span>Analytics</span>
                        <IoAnalyticsOutline />
                    </NavLink>
                    <button
                        className="action"
                        onClick={logOut}
                    >
                        <span>Logout</span>
                        <FiLogOut />
                    </button>
                </div>

                <hr className="divider" />

                <Link to="/" className="back">
                    <IoArrowBack />
                    <span>Back to website</span>
                </Link>

            </aside>
    );
}