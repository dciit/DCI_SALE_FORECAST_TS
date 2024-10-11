import { Stack, Typography, Avatar } from '@mui/material'
import HouseSidingIcon from '@mui/icons-material/HouseSiding';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { MRedux } from './Interface';
import { persistor } from '../src/redux/store';
import { useState } from 'react';
import CustomerMaster from './customerMaster';
import SearchIcon from '@mui/icons-material/Search';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import BackupTableIcon from '@mui/icons-material/BackupTable';

function ToolbarComponent() {
    const reducer = useSelector((state: MRedux) => state.reducer);
    let oName = '';
    if (typeof reducer.name !== 'undefined') {
        oName = reducer.name;
    }
    const navigate = useNavigate();
    const activeMenu = useSelector((state: MRedux) => state.reducer);
    const [openCustomerMaster, setOpenCustomerMaster] = useState<boolean>(false);
    const dispatch = useDispatch();
    function handleActiveMenu(menu: string) {
        dispatch({ type: 'SET-MENU', payload: menu });
        navigate(`/dcisaleforecast/${menu}`)
    }
    async function handleLogout() {
        if (confirm('คุณต้องการออกจากระบบใช่หรือไม่ ? ...')) {
            dispatch({ type: 'LOGOUT' });
            persistor.purge();
            location.reload();
        }
    }
    async function handleShowCustomerMaster() {
        setOpenCustomerMaster(true);
    }
    return (
        <Stack className='toolbar h-[10%] bg-[#f6f8fa]' justifyContent={'space-between'} px={2}>
            <Stack className='select-none flex-1 cursor-pointer ' direction={'row'} justifyContent={'space-between'} alignItems={'center'} onClick={() => handleActiveMenu('home')}>
                <Stack className=' transform-all duration-300' direction={'row'} justifyContent={'center'} alignItems={'center'} gap={1}>
                    <MonetizationOnIcon className='text-blue-500 text-[2em] ' />
                    <Typography className='font-semibold' color="initial">SALE FORECAST</Typography>
                </Stack>
                <Stack onClick={handleLogout} className='cursor-pointer' direction={'row'} alignItems={'center'} gap={1}>
                    <Typography>{oName}</Typography>
                    <Avatar>{oName.substring(0, 1)}</Avatar>
                </Stack>
            </Stack>
            <Stack className='select-none flex-1' direction={'row'} justifyContent={'start'} alignItems={'center'}>
                <Stack className={`${typeof activeMenu.menuActive != 'undefined' && activeMenu.menuActive.toString() == "home" ? 'border-b-2 border-b-[#fd8c73]' : ''}  cursor-pointer h-[100%] hover:border-b-2 hover:border-b-[#fd8c73] px-3 transform-all duration-100`} direction={'row'} alignItems={'center'} justifyItems={'center'} justifyContent={'center'} spacing={1} onClick={() => handleActiveMenu('home')}>
                    <HouseSidingIcon className='text-gray-500' />
                    <Typography color="initial" className='font-semibold text-gray-600'>Home</Typography>
                </Stack>
                <Stack className={`${typeof activeMenu.menuActive != 'undefined' && activeMenu.menuActive.toString() == "customerSetting" ? 'border-b-2 border-b-[#fd8c73]' : ''}  cursor-pointer h-[100%] hover:border-b-2 hover:border-b-[#fd8c73] px-3 transform-all duration-100`} direction={'row'} alignItems={'center'} justifyItems={'center'} justifyContent={'center'} spacing={1} onClick={() => handleActiveMenu('customerSetting')}>
                    <TuneOutlinedIcon className='text-gray-500' />
                    <Typography color="initial" className='font-semibold text-gray-600'>ตั้งค่า</Typography>
                </Stack>
                <Stack className={`${typeof activeMenu.menuActive != 'undefined' && activeMenu.menuActive.toString() == "customerMaster" ? 'border-b-2 border-b-[#fd8c73]' : ''}  cursor-pointer h-[100%] hover:border-b-2 hover:border-b-[#fd8c73] px-3 transform-all duration-100`} direction={'row'} alignItems={'center'} justifyItems={'center'} justifyContent={'center'} spacing={1} onClick={() => handleShowCustomerMaster()}>
                    <SearchIcon className='text-gray-500' />
                    <Typography color="initial" className='font-semibold text-gray-600'>Customer Master</Typography>
                </Stack>
                <Stack className={`${typeof activeMenu.menuActive != 'undefined' && activeMenu.menuActive.toString() == "customerSetting" ? 'border-b-2 border-b-[#fd8c73]' : ''}  cursor-pointer h-[100%] hover:border-b-2 hover:border-b-[#fd8c73] px-3 transform-all duration-100`} direction={'row'} alignItems={'center'} justifyItems={'center'} justifyContent={'center'} spacing={1} onClick={() => handleActiveMenu('compressorhold')}>
                    <BackupTableIcon  className='text-gray-500' />
                    <Typography color="initial" className='font-semibold text-gray-600'>COMPRESSOR HOLD</Typography>
                </Stack>
            </Stack>
            <CustomerMaster open={openCustomerMaster} close={setOpenCustomerMaster} />
        </Stack>
    )
}

export default ToolbarComponent