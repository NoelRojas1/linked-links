import './dashboard.css';
import Sidebar from "../../components/Sidebar/Sidebar.tsx";
import {Outlet} from "react-router";

export default function Dashboard() {
    return (
        <div className="dashboard">
            <Sidebar />
            <div className="dashboard-right">
                <Outlet />
            </div>
        </div>
    )
}