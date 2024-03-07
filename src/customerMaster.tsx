import { CircularProgress, IconButton, InputBase, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { MCustomer } from './Interface'
import { API_CUSTOMER } from './Service';
import SearchIcon from '@mui/icons-material/Search';
function CustomerMaster(props: any) {
    const { open, close } = props;
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
        <Dialog open={open} onClose={() => close(false)} fullWidth maxWidth={'lg'}>
            <DialogTitle>
                Customer Master
            </DialogTitle>
            <DialogContent dividers>
                <Stack spacing={2} alignItems={'end'}>
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
                                        <TableCell className='bg-[#0b786e] text-white font-semibold'>CODE</TableCell>
                                        <TableCell className='bg-[#0b786e] text-white font-semibold'>NAME</TableCell>
                                        <TableCell className='bg-[#0b786e] text-white font-semibold'>SHORT NAME</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        !loading ? (customer.length ? customer.map((v: MCustomer) => {
                                            return <TableRow>
                                                <TableCell>{v.customerCode}</TableCell>
                                                <TableCell className='font-bold'>{v.customerName}</TableCell>
                                                <TableCell className='bg-[#009688] text-white'>
                                                    <Stack direction={'row'} justifyContent={'space-between'}>
                                                        <Typography className='font-bold'>{v.customerNameShort}</Typography>
                                                        <Button variant='contained' size='small' className='bg-white text-black' onClick={() => { navigator.clipboard.writeText(v.customerNameShort) }}>Copied</Button>
                                                    </Stack>
                                                </TableCell>
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
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' onClick={() => close(false)}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CustomerMaster