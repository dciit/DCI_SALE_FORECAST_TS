import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { API_HR_LOGIN, API_PRIVILEGE } from './Service';
import { useNavigate } from 'react-router-dom';
import { KeyboardEvent } from 'react';
import { MLogin } from './Interface';
import { Button, Input } from 'antd';
function Login() {
    const [load, setLoad] = useState<boolean>(false)
    const version = import.meta.env.VITE_VERSION;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const rev = import.meta.env.VITE_VERSION;
    const [empcode, setEmpcode] = useState<string>('');
    async function handleLogin() {
        setLoad(true);
        let login: MLogin = await API_HR_LOGIN(empcode);
        if (login.status) {
            let privilege = await API_PRIVILEGE('UKEHARAI', 'EDIT');
            dispatch({ type: 'SET_PRIVILEGE', payload: privilege });
            dispatch({ type: 'LOGIN', payload: { name: login.name, empcode: empcode, rev: rev, dvcd: login.dvcd } })
            navigate('/dcisaleforecast/home');
            setEmpcode('');
        } else {
            alert('ไม่สามารถเข้าสู่ระบบได้ !');
            setEmpcode('');
            setLoad(false);
        }
    }


    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key == 'Enter') {
            handleLogin()
        }
    };
    return (
        <div className='h-[100%] w-[100%] flex flex-col gap-3 items-center justify-center bg-gradient-to-r from-blue-600 to-violet-600'>
            <div className='flex flex-col gap-6 w-fit border rounded-lg shadow-md px-6 pb-6 pt-5 bg-white'>
                <div className='flex flex-col '>
                    <span className='text-[3em] font-bold'>SALE FORECASE</span>
                    <span className='text-gray-600'>ระบบจัดการข้อมูลการขาย</span>
                </div>
                <div className='flex  flex-col gap-1'>
                    <span className='text-black/80'>รหัสพนักงาน</span>
                    <Input value={empcode} onChange={(e) => setEmpcode(e.target.value)} placeholder='ระบุรหัสพนักงาน' autoFocus onKeyDown={handleKeyPress}  disabled = {load}/>
                </div>
                <Button type='primary' onClick={handleLogin} loading={load}>เข้าสู่ระบบ</Button>
            </div>
            <div className='text-white/80 flex items-end '>
                <span>Version : {version}</span>
            </div>
        </div>
    )
}

export default Login