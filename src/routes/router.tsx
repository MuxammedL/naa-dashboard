import MainLayout from "@/components/layout/mainLayout";
import Home from "@/pages/home";
import NotFound from "@/pages/notFound";
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
                path: "*",
                element: <NotFound />,
            },
        ],
    }
];
