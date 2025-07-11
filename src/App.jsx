import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import path from "./routes/path.js";
import Login from "./pages/login/login.jsx";
import Home from "./pages/home/Home.jsx";
import HeaderLayout from "./component/layout/headerLayout/HeaderLayout.jsx";
import SideMenuLayout from "./component/layout/sideMenuLayout/SideMenuLayout.jsx";
import {useState} from "react";
import Home2 from "./pages/home/Home2.jsx";


function App() {

    // const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showModule, setShowModule] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
    //
    // const toggleSidebar = () => {
    //     setSidebarOpen(!sidebarOpen);
    // };
    //
    const handleShowModule = () =>{
        setShowModule(true)
        setShowVideo(false)
    };
    const handleCloseModule = () => setShowModule(false);

    const handleVideoShow = () => setShowVideo(true);
    const handleCloseVideo = () => setShowVideo(false);

    return (

        <>
            <BrowserRouter>
                {/*<Header />*/}
                <Routes>
                    <Route path={path.login} element={<Login/>}/>
                    <Route path="/" element={<HeaderLayout
                        // toggleSidebar={toggleSidebar}
                    />}>
                        <Route path="/"
                               element={<SideMenuLayout
                                   // isOpen={sidebarOpen}
                                   onUploadVideoClick={handleVideoShow}
                                   onAddModuleClick={handleShowModule}
                               />}>
                            {/*<Route path={path.home}*/}
                            {/*       element={<Home*/}
                            {/*           // showModule={showModule}*/}
                            {/*           //            handleCloseModule={handleCloseModule}*/}
                            {/*           //            handleShowModule={handleShowModule}*/}
                            {/*           //            showVideo={showVideo}*/}
                            {/*           //            handleCloseVideo={handleCloseVideo}*/}
                            {/*           //            handleVideoShow={handleVideoShow}*/}
                            {/*       />}*/}
                            {/*/>*/}

                            <Route path={path.home2}
                                   element={
                                       <Home2
                                           showModule={showModule}
                                           handleCloseModule={handleCloseModule}
                                           handleShowModule={handleShowModule}
                                           showVideo={showVideo}
                                           handleCloseVideo={handleCloseVideo}
                                           handleVideoShow={handleVideoShow}
                                       />}
                            />


                        </Route>

                    </Route>
                    {/*<Route path="/products" element={<Products />} />*/}
                    {/*<Route path="/contact" element={<Contact />} />*/}
                    {/*<Route path="/single-product/:id" element={<SingleProduct />} />*/}
                    {/*<Route path="/cart" element={<Cart />} />*/}
                    {/*<Route path="*" element={<ErrorPage />} /> */}
                </Routes>
                {/* <Footer /> */}
            </BrowserRouter>
        </>
    )
}

export default App
