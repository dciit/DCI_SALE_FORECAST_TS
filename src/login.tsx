import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { FormControl, InputAdornment, InputLabel, OutlinedInput, Stack, Typography } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { API_HR_LOGIN , API_PRIVILEGE } from './Service';
import { useNavigate } from 'react-router-dom';
import { KeyboardEvent } from 'react';
import { MLogin } from './Interface';
function Login() {
    const version = import.meta.env.VITE_VERSION;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // let empcodeRedux = '';
    // if (typeof reducer.empcode !== 'undefined') {
    //     empcodeRedux = reducer.empcode;
    // }
    const rev = import.meta.env.VITE_VERSION;
    const [empcode, setEmpcode] = useState<string>('');
    async function handleLogin() {
        // let login = await API_LOGIN({ empcode: empcode });
        let login: MLogin = await API_HR_LOGIN(empcode);
        if (login.status) {
            let privilege = await API_PRIVILEGE('UKEHARAI', 'EDIT');
            console.log(privilege)
            dispatch({ type: 'SET_PRIVILEGE', payload: privilege });
            dispatch({ type: 'LOGIN', payload: { name: login.name, empcode: empcode, rev: rev, dvcd: login.dvcd } })
            navigate('/dcisaleforecast/home');
            setEmpcode('');
        } else {
            alert('ไม่สามารถเข้าสู่ระบบได้ !');
            setEmpcode('');
        }
    }


    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key == 'Enter') {
            handleLogin()
        }
    };
    return (
        <Stack className='h-[100%] w-[100%]' direction={'row'} justifyContent={'center'}  >
            <div className='flex-1 bg-[#36a6ff ]'>
                <Stack className='w-full h-full' justifyContent={'center'} alignContent={'center'} alignItems={'center'}>
                    <MonetizationOnIcon className='text-[20em] animate-bounce delay-10000 text-[#292c3d]' />
                    <Typography variant='h3' className='text-[#292c3d] '>SALE FORECAST</Typography>
                    <span>VERSION : {version}</span>
                </Stack>
            </div>
            <div className='flex flex-1 bg-[#292c3d] items-center justify-center' onKeyUp={handleKeyPress}>
                <Stack className=' w-[100%] flex-right' spacing={3}>
                    <Typography className='text-white pl-[30%] text-[1.5vw]' style={{ fontFamily: 'system-ui' }}>Login to your account</Typography>
                    <Stack className='h-fit'>
                        <div className='px-6'>
                            <FormControl fullWidth sx={{ m: 1 }}>
                                <InputLabel htmlFor="outlined-adornment-amount">EMPCODE</InputLabel>
                                <OutlinedInput
                                    autoFocus
                                    type='text'
                                    className='text-white text-[1.5vw]'
                                    startAdornment={<InputAdornment position="start"><AccountBoxIcon className='text-white' /></InputAdornment>}
                                    label="Amount"
                                    value={empcode}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        let oEmpcode = e.target.value;
                                        if (oEmpcode.length > 5) {
                                            oEmpcode = oEmpcode.substring(0, 5);
                                        }
                                        setEmpcode(oEmpcode)
                                    }}
                                />
                            </FormControl>
                        </div>
                        {/* <div className='px-6'>
                            <FormControl className='border-white' fullWidth sx={{ m: 1 }}>
                                <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                                <OutlinedInput
                                    className='text-white text-[1.5vw]'
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    label="Amount"
                                />
                            </FormControl>
                        </div> */}
                    </Stack>
                    <Stack direction={'row'}>
                        <div className='w-[60%] font-semibold text-[2vw] hover:text-[2.3vw]  border-btn-login py-3  text-[#36a6ff]  bg-white  pl-[25%] duration-500 transition-all select-none cursor-pointer' onClick={handleLogin} > LOGIN</div>
                        <div></div>
                    </Stack>
                </Stack>

            </div>
        </Stack>
    )
}

export default Login