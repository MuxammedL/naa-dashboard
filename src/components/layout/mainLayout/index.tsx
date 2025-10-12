import { Outlet } from "react-router-dom";
import Header from "@/components/layout/header";
import Sidebar from "../sidebar";

const MainLayout = () => {
    return (
        <div className="flex flex-col h-screen">
            <Header />
            <main className="h-full flex">
                <Sidebar />
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;
