import { Outlet } from "react-router-dom";
import Header from "@/components/layout/header";

const MainLayout = () => {
    return (
        <div className={`relative `}>
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;
