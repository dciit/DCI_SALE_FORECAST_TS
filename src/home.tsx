import { Card, Grid, MenuItem, Select, Stack, Typography, Paper, CircularProgress } from '@mui/material'
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import DialogMenuEdit from './components/dialog.menu.edit';
import { API_LIST_STATUS_SALE } from './Service';
import { MStatusSale } from './Interface';

function Home() {
    const dispatch = useDispatch();
    const [yearSelected, setYearSelected] = useState<number>(parseInt(moment().format('YYYY')));
    const [listSale, setListSale] = useState<MStatusSale[]>([]);
    const [years, setYears] = useState<number[]>([]);
    const [once, setOnce] = useState<boolean>(false);
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        if (!once) {
            initYear();
            initData();
            setOnce(true);
        }
    }, [])
    useEffect(() => {
        setLoading(false);
    }, [listSale])
    async function initData() {
        const grid = await API_LIST_STATUS_SALE({ year: `${yearSelected.toString()}` });
        setListSale(grid);
    }
    async function initYear() {
        let y = moment().format('YYYY');
        const listYear = await [...Array(3)].map((v, i: number) => {
            return parseInt(y) + i;
        });
        setYears(listYear);
    }

    async function handleChangeYear(e: any) {
        setYearSelected(parseInt(e.target.value));
    }

    async function handleOpenMenu(month: number) {
        dispatch({ type: 'EDIT-INIT', payload: { year: yearSelected, month: month } })
        setOpenMenu(true);
    }
    async function handleCloseMenu() {
        dispatch({ type: 'EDIT-INIT', payload: { year: '', month: '' } });
        setOpenMenu(false);
    }
    return (
        <Stack className=' p-8' spacing={2}>
            <Grid container>
                <Grid item xs={4}>
                    <Card className='p-3'>
                        <Stack direction={'row'} alignItems={'center'} spacing={2}>
                            <Typography>ปี</Typography>
                            <Select value={yearSelected} size='small' className='w-full' onChange={handleChangeYear}>
                                {
                                    years.map((v, i) => {
                                        return <MenuItem key={i} value={v}>{v}</MenuItem>
                                    })
                                }
                            </Select>
                        </Stack>
                    </Card>
                </Grid>
            </Grid>
            {
                loading ? <Stack spacing={1} justifyContent={'center'} alignItems={'center'}><CircularProgress /><Typography>กำลังโหลดข้อมูล</Typography></Stack> : <Grid container spacing={3} p={3} >
                    {
                        listSale.map((v: MStatusSale, i: number) => {
                            let month: number = i + 1;
                            let monthName: string = moment(month, 'M').format('MMM').toUpperCase();
                            return <Grid item key={i} xs={3} className='cursor-pointer select-none' onClick={() => handleOpenMenu(month)}>
                                <Card className='h-[75px]'>
                                    <Stack className={`h-full`} alignItems={'center'} justifyContent={'start'} direction={'row'} spacing={3}>
                                        <div className={`h-full px-6 flex w-[40%] items-center justify-center ${v.isDistribution ? 'bg-[#29bdff] ' : 'bg-[#535353]'} text-white shadow-lg`}>
                                            <Typography className='text-shadow' variant='h4'>{monthName}</Typography>
                                        </div>
                                        <Stack spacing={0} className='w-[60%]'>
                                            <Typography>Rev : {v.rev?.toLocaleString('en', { minimumIntegerDigits: 2 })}</Typography>
                                            <Typography className={`font-semibold ${v.isDistribution ? 'text-green-600' : 'text-red-400'}`}>{
                                                v.isDistribution ? 'แจกจ่าย' : 'ดำเนินการ'
                                            }</Typography>
                                        </Stack>
                                    </Stack>
                                </Card>
                            </Grid>
                        })
                    }
                </Grid>
            }
            <DialogMenuEdit open={openMenu} close={handleCloseMenu} />
        </Stack>
    )
}

export default Home