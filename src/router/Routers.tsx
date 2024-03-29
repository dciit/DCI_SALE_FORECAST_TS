import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../layout";
import App from "../App";
import Home from "../home";
import Login from "../login";
import CustomerMaster from "../customerMaster";
import Report from "../report";
import ReactVirtualizedTable from "../test";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { persistor } from "../redux/store";
const Routers = () => {
    let BASE = import.meta.env.VITE_PATH;
    let VER = import.meta.env.VITE_VERSION;
    const redux = useSelector((state: any) => state.reducer);
    const dispatch = useDispatch();
    useEffect(() => {
        if (typeof redux.rev == 'undefined' || redux.rev != VER) {
            localStorage.clear();
            persistor.purge();
            dispatch({ type: 'RESET' });
            dispatch({ type: 'SET_VERSION', payload: VER });
            location.reload();
        }
    }, []);
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path={`/${BASE}`} element={<Home />} />
                    <Route path={`/${BASE}/home`} element={<Home />} />
                    <Route path={`/${BASE}/edit`} element={<App />} />
                    <Route path={`/${BASE}/customerMaster`} element={<CustomerMaster />} />
                </Route>
                <Route path={`/*`} element={<Login />} />
                <Route path={`${BASE}/login`} element={<Login />} />
                <Route path={`${BASE}/report/:ym`} element={<Report />} />
                <Route path={`${BASE}/test`} element={<ReactVirtualizedTable />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Routers;