import { Outlet } from "react-router-dom";
import Header from "@/components/layout/header";
import Sidebar from "../sidebar";

const MainLayout = () => {
    return (
        <div className={`relative `}>
            <Header />
            <main>
                <Sidebar />
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;
