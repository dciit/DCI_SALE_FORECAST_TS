import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../layout";
import Page404 from "../page404";
import App from "../App";
import Home from "../home";
const Routers = () => {
    var BasePath = import.meta.env.VITE_PATH;
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path={'edit'} element={<App />} />
                    <Route path={'home'} element={<Home />} />
                </Route>
                <Route path="*" element={<Page404 />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Routers;