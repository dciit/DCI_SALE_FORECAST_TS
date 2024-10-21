import { Outlet } from "react-router";
import ToolbarComponent from './toolbar';
import { useDispatch, useSelector } from "react-redux";
import { MRedux } from "./Interface";
import Login from "./login";
import { persistor } from '../src/redux/store'
function Layout() {
    const dispatch = useDispatch();
    const VITE_REV = parseFloat(import.meta.env.VITE_VERSION);
    const reducer = useSelector((state: MRedux) => state.reducer);
    const redexRev = reducer?.rev;
    let oLogin = false;
    if (typeof reducer?.login !== 'undefined') {
        oLogin = reducer.login;
    }
    try {
        if (redexRev != VITE_REV) {
            persistor.purge();
            dispatch({ type: 'SET_REV', payload: VITE_REV });
        }
    } catch {
        persistor.purge();
        location.reload();
    }
    return <div className='h-[100%] w-[100%] bg-[#e7ebee++]'>
        {
            !oLogin ? <Login /> : <div className='h-[100%] w-[100%] bg-[#e7ebee++]'>
                <ToolbarComponent />
                <div className="h-[90%]" id="outlet">
                    <Outlet />
                </div>
            </div>
        }
        {/* <div  className="flex items-center justify-center h-full w-full text-red-500 font-bold">
            ปิดใช้งานชั่วคราว 
        </div> */}
    </div>
}

export default Layout