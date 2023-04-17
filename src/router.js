import {
    Outlet,
    createBrowserRouter
} from "react-router-dom"
const router = createBrowserRouter([
    {
        path:"/",
        element: <Layout/>,
        children:[{
            path:'/',
            element: <div>Hello nua ne</div>
        }]
    },
    {
        path:"/about",
        element: <div>About us</div>
    },
    {
        path:'/post/:postId',
        element:<PostDetails/>
    }
])