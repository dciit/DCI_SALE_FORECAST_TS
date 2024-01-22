import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../layout";
import App from "../App";
import Home from "../home";
import Login from "../login";
import CustomerMaster from "../customerMaster";
import Report from "../report";
const Routers = () => {
    let BASE = import.meta.env.VITE_PATH;
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path={`/${BASE}`} element={<Home />} />
                    <Route path={`/${BASE}/home`} element={<Home />} />
                    <Route path={`/${BASE}/edit`} element={<App />} />
                    <Route path={`/${BASE}/customerMaster`} element = {<CustomerMaster/>}/>
                </Route>                            
                <Route path={`/*`} element={<Login />} />
                <Route path={`${BASE}/login`} element={<Login />} />
                <Route path={`${BASE}/report/:ym`} element={<Report />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Routers;