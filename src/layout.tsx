import React from 'react'
import { Outlet } from "react-router";
import { Box, Stack } from "@mui/material";
import ToolbarComponent from './toolbar';
import FooterComponent from './footer';
function Layout() {
    return <Stack className='h-[100%] bg-[#e7ebee]'>
        <ToolbarComponent />
        <Outlet />
    </Stack>
}

export default Layout