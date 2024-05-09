import "bootstrap/dist/css/bootstrap.css"
import Counter from "./Counter/Counter.jsx";
import {Container, Spinner} from "react-bootstrap";
import Home from "./Home/Home.jsx";
// import About from "./About/About.jsx";
import Menu from "./Menu.jsx";
import {createBrowserRouter, Outlet, RouterProvider, useLocation} from "react-router-dom";
import MyForm from "./Form/MyForm.jsx";
import Movies from "./Movies/Movies.jsx";
import {lazy, Suspense} from "react";
import {ErrorBoundary} from "react-error-boundary";


const About = lazy(() => import('./About/About.jsx'))  // This import statement makes the file get separated from the others when doing npm run build

// DOM should never be called from render
// DOM should only be called from effect
// Effects are often run with a dependency array
// The effect is called ONLY if at least one item from the array changes

export default function App() {

    return <RouterProvider router={router}/>

}

function Root(){
    const location = useLocation();
    return (
        <>
            <Menu />
            <Container className='mt-3'>
                <Suspense fallback={<Spinner variant='primary'/>}>
                    <ErrorBoundary fallback={<div>Sorry an error was encountered.</div>} key={location.pathname}>
                        <Outlet/>
                    </ErrorBoundary>
                </Suspense>
            </Container>
        </>
    )
}


let router = createBrowserRouter([
    {
        path: '/',
        element: <Root/>,
        errorElement: <><Menu/><p>Cannot find this page</p></>,
        children: [
            {path: '/',         element: <Home/>,   isIndex: true},
            {path: '/home',     element: <Home/>},
            {path: "/about",    element: <About/>},
            {path: "/counter",  element: <Counter firstName="Mike" lastName="Smith"/>},
            {path: "/form",     element: <MyForm/>},
            {path: "/movies",   element: <Movies/>},
            {                   element: <p>Page Cannot Be Found</p>},
        ]
    },
    ])