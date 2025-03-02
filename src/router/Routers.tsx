import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../layout";
import Login from "../login";
// import CustomerMaster from "../customerMaster";
import Report from "../report";
// import ReactVirtualizedTable from "../test";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { persistor } from "../redux/store";
import DeliveryControlSheet from "../components/sheet.delivery.control";
import SaleForecase from "../pages/saleforecase";
// import SaleForecaseDev from "../pages/saleforecase-dev";
import SaleForecaseReactGrid from "../pages/saleforecase.react-grid";
import CustomerSetting from "../pages/customer.setting";
import CompressorHold from "../pages/compressor.hold";
const Routers = () => {
    let BASE = import.meta.env.VITE_PATH;
    let VER = import.meta.env.VITE_VERSION;
    const redux = useSelector((state: any) => state.reducer);
    const dispatch = useDispatch();
    useEffect(() => {
        if (typeof redux?.rev == 'undefined' || redux.rev != VER) {
            localStorage.clear();
            persistor.purge();
            dispatch({ type: 'RESET' });
            dispatch({ type: 'SET_VERSION', payload: VER });
        }
    }, []);
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path={`/${BASE}`} element={<SaleForecaseReactGrid />} />
                    <Route path={`/${BASE}/home`} element={<SaleForecaseReactGrid />} />
                    <Route path={`/${BASE}/dev`} element={<SaleForecaseReactGrid />} />
                    <Route path={`/${BASE}/edit`} element={<SaleForecaseReactGrid />} />
                    {/* <Route path={`/${BASE}/customerMaster`} element={<CustomerMaster />} /> */}
                    <Route path={`/${BASE}/customerSetting`} element={<CustomerSetting />} />
                    <Route path={`/${BASE}/compressorhold`} element={<CompressorHold />} />
                </Route>
                <Route path={`/*`} element={<Login />} />
                <Route path={`${BASE}/login`} element={<Login />} />
                <Route path={`${BASE}/report/:ym`} element={<Report />} />
                {/* <Route path={`${BASE}/test`} element={<ReactVirtualizedTable />} /> */}
                <Route path={`${BASE}/deliverycontrol`} element={<DeliveryControlSheet />} />
                <Route path={`${BASE}/saleforecase`} element={<SaleForecase />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Routers;