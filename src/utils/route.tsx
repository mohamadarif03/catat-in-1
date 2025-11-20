import UserLayout from "@/layout/UserLayout";
import AllFiles from "@/pages/user/AllFiles";
import Dashboard from "@/pages/user/dashboard";
import FileOpen from "@/pages/user/FileOpen";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
    {
        path: "/",
        element: <UserLayout/>,
        children: [
            {
                path: "dashboard",
                element : <Dashboard />
            },
            {
                path: "files",
                element : <AllFiles />
            },
            {
                path: "file/:id",
                element : <FileOpen />    
            }
        ]
    },
]);

export default router;