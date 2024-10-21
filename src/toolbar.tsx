import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MRedux } from './Interface';
import { persistor } from '../src/redux/store';
import { useState } from 'react';
import { Avatar } from 'antd';
import { AiFillAlert } from "react-icons/ai";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineSetting } from "react-icons/ai";


function ToolbarComponent() {
    const reducer = useSelector((state: MRedux) => state.reducer);
    let oName = '';
    if (typeof reducer.name !== 'undefined') {
        oName = reducer.name;
    }
    const navigate = useNavigate();
    const activeMenu = useSelector((state: MRedux) => state.reducer);
    // const [openCustomerMaster, setOpenCustomerMaster] = useState<boolean>(false);
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
    // async function handleShowCustomerMaster() {
    //     setOpenCustomerMaster(true);
    // }
    const [menus] = useState<any>([
        { name: 'Home', value: 'home', icon: <AiOutlineHome className='text-gray-500' /> },
        { name: 'Setting', value: 'customerSetting', icon: <AiOutlineSetting className='text-gray-500' /> },
        { name: 'COMPRESSOR HOLD', value: 'compressorhold', icon: <AiFillAlert className='text-gray-500' /> },
    ]);
    return (
        <div className='toolbar h-[10%] bg-[#f6f8fa]  flex flex-col' >
            <div className='select-none flex-1 cursor-pointer flex justify-between pl-3 pr-6 p-3 items-center' onClick={() => handleActiveMenu('home')}>
                <div className=' transform-all duration-300' >
                    {/* <MonetizationOnIcon className='text-blue-500 text-[2em] ' /> */}
                    <span className='font-semibold' color="initial">SALE FORECAST</span>
                </div>
                <div onClick={handleLogout} className='cursor-pointer flex items-center gap-2' >
                    <span>{oName}</span>
                    <Avatar>{oName.substring(0, 1)}</Avatar>
                </div>
            </div>
            <div className='select-none flex  h-[50%]' >
                {
                    menus.map((o: any, i: number) => {
                        return <div key={i} className={` flex   items-center gap-1 ${typeof activeMenu.menuActive != 'undefined' && activeMenu.menuActive.toString() == o.value ? 'border-b-2 border-b-blue-500 bg-blue-500/10' : ''}  cursor-pointer h-[100%] hover:border-b-2 hover:border-blue-500 px-3 transform-all duration-100`} onClick={() => handleActiveMenu(o.value)}>
                            {o.icon}
                            <span color="initial" className='font-semibold text-gray-600'>{o.name}</span>
                        </div>
                    })
                }
                {/* <div className={` flex   items-center gap-1 ${typeof activeMenu.menuActive != 'undefined' && activeMenu.menuActive.toString() == "home" ? 'border-b-2 border-b-blue-500 bg-blue-500/10' : ''}  cursor-pointer h-[100%] hover:border-b-2 hover:border-blue-500 px-3 transform-all duration-100`} onClick={() => handleActiveMenu('home')}>
                    <AiOutlineHome className='text-gray-500' />
                    <span color="initial" className='font-semibold text-gray-600'>Home</span>
                </div>
                <div className={`flex  items-center  gap-1  ${typeof activeMenu.menuActive != 'undefined' && activeMenu.menuActive.toString() == "customerSetting" ? 'border-b-2 border-b-[#fd8c73]' : ''}  cursor-pointer h-[100%] hover:border-b-2 hover:border-b-[#fd8c73] px-3 transform-all duration-100`} onClick={() => handleActiveMenu('customerSetting')}>
                    <AiOutlineSetting className='text-gray-500' />
                    <span color="initial" className='font-semibold text-gray-600'>ตั้งค่า</span>
                </div> */}
                {/* <div className={` flex  items-center  gap-1  ${typeof activeMenu.menuActive != 'undefined' && activeMenu.menuActive.toString() == "customerMaster" ? 'border-b-2 border-b-[#fd8c73]' : ''}  cursor-pointer h-[100%] hover:border-b-2 hover:border-b-[#fd8c73] px-3 transform-all duration-100`} onClick={() => handleShowCustomerMaster()}>
                    <AiOutlineTruck className='text-gray-500' />
                    <span color="initial" className='font-semibold text-gray-600'>Customer Master</span>
                </div> */}
                {/* <div className={` flex  items-center  gap-1  ${typeof activeMenu.menuActive != 'undefined' && activeMenu.menuActive.toString() == "compressorhold" ? 'border-b-2 border-b-[#fd8c73]' : ''}  cursor-pointer h-[100%] hover:border-b-2 hover:border-b-[#fd8c73] px-3 transform-all duration-100`} onClick={() => handleActiveMenu('compressorhold')}>
                    <AiOutlineQrcode className='text-gray-500' />
                    <span color="initial" className='font-semibold text-gray-600'>COMPRESSOR HOLD</span>
                </div> */}
            </div>
            {/* <CustomerMaster open={openCustomerMaster} close={setOpenCustomerMaster} /> */}
        </div>
    )
}

export default ToolbarComponent