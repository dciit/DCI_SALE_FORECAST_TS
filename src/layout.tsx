import { Outlet } from "react-router";
import { Stack } from "@mui/material";
import ToolbarComponent from './toolbar';
import { useSelector } from "react-redux";
import { MRedux } from "./Interface";
import Login from "./login";
function Layout() {
    const reducer = useSelector((state: MRedux) => state.reducer);
    let oLogin = false;
    if (typeof reducer.login !== 'undefined') {
        oLogin = reducer.login;
    }
    return <Stack className='h-[100%] w-[100%] bg-[#e7ebee++]'>
        {
            !oLogin ? <Login /> : <Stack className='h-[100%] w-[100%] bg-[#e7ebee++]'>
                <ToolbarComponent />
                <div className="h-[90%]">
                    <Outlet />
                </div>
            </Stack>
        }
    </Stack>
}

export default Layout