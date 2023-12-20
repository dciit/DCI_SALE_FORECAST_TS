import { CircularProgress, IconButton, InputBase, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { MCustomer} from './Interface'
import { API_CUSTOMER } from './Service';
import SearchIcon from '@mui/icons-material/Search';
function CustomerMaster() {
    const [customerDefault, setCustomerDefault] = useState<MCustomer[]>([]);
    const [customer, setCustomer] = useState<MCustomer[]>([]);
    const [search, setSearch] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        init();
    }, []);

    async function init() {
        setLoading(true);
        await initCustomer();
    }

    async function initCustomer() {
        let apiCustomer = await API_CUSTOMER();
        setCustomer(apiCustomer);
        setCustomerDefault(apiCustomer);
        setLoading(false);
    }
    const filterData = (inpSearch: string) => {
        setSearch(inpSearch)
        const filters = customerDefault.filter((row: MCustomer) => {
            return row.customerCode.toLowerCase().includes(inpSearch.toLowerCase()) || row.customerName.toLowerCase().includes(inpSearch.toLowerCase()) || row.customerNameShort.includes(inpSearch.toLowerCase())
        });
        setCustomer(filters);
    }
    return (
        <Stack spacing={2} className='p-8 bg-[#fafafa]' alignItems={'end'}>
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
            >
                <InputBase
                    value={search}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => filterData(e.target.value)}
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="ค้นหา ..."
                    inputProps={{ 'aria-label': 'search google maps' }}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper>
            <Paper elevation={3} className='w-full'>
                <TableContainer component={Paper}>
                    <Table size='small'>
                        <TableHead>
                            <TableRow>
                                <TableCell>CODE</TableCell>
                                <TableCell>NAME</TableCell>
                                <TableCell>SHORT NAME</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                !loading ? (customer.length ? customer.map((v: MCustomer) => {
                                    return <TableRow>
                                        <TableCell>{v.customerCode}</TableCell>
                                        <TableCell>{v.customerName}</TableCell>
                                        <TableCell className='bg-[#009688] text-white'>{v.customerNameShort}</TableCell>
                                    </TableRow>
                                }) : <TableRow>
                                    <TableCell colSpan={3} className='text-center'>ไม่พบข้อมูล</TableCell>
                                </TableRow>) : <TableRow>
                                    <TableCell colSpan={3}>
                                        <Stack p={3} spacing={1} alignItems={'center'}>
                                            <Typography>กำลังโหลดข้อมูล</Typography>
                                            <CircularProgress />
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Stack>
    )
}

export default CustomerMaster