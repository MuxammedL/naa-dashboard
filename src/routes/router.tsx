import MainLayout from "@/components/layout/mainLayout";
import Home from "@/pages/home";
import NotFound from "@/pages/notFound";
import TeacherStaffPage from "@/pages/teacherStaffPage";
import type { RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/muellim-heyeti",
                element: <TeacherStaffPage />,
            },
            {
                path: "*",
                element: <NotFound />,
            },
        ],
    }
];
