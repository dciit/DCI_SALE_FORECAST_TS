import { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import { API_GET_CUSTOMER, API_GET_MODELS, API_GET_PLTYPE, API_GET_SEBANGO } from './Service'
import Select from 'react-select'
import { Box, CircularProgress, Stack, Typography } from '@mui/material'
import { MReactSelect } from './Interface'
import { useDispatch, useSelector } from 'react-redux'
function DialogReportFilter(props: any) {
    const reduxFilterReport = useSelector((state: any) => state.reducer);
    const dispatch = useDispatch();
    if (typeof reduxFilterReport.filterCustomer == 'undefined') {
        dispatch({ type: 'LOGOUT' });
        location.reload();
    }
    const { open, handleClose, filter, filterReport, defVal, setDefVal } = props;
    const [options, setOptions] = useState<MReactSelect[]>([]);
    const [load, setLoad] = useState<boolean>(true);
    useEffect(() => {
        setLoad(true);
        if (open == true) {
            setOptions([]);
            setDefVal(reduxFilterReport.reportFilter[`${filter}`]);
        }
    }, [open]);
    useEffect(() => {
        initFilter();
    }, [defVal]);
    useEffect(() => {
        if (options.length) {
            setLoad(false);
        }
    }, [options])
    async function initFilter() {
        let items: MReactSelect[] = [];
        if (filter == 'customer') {
            let res: any = await API_GET_CUSTOMER();
            res.map((o: any) => {
                let item: MReactSelect = {
                    label: o.customerNameShort,
                    value: o.customerNameShort
                }
                items.push(item);
            });
            setOptions([...items]);
        } else if (filter == 'modelGroup') {
            let res: MReactSelect[] = [
                {
                    label: '1YC',
                    value: '1YC'
                },
                {
                    label: '2YC',
                    value: '2YC'
                },
                {
                    label: 'SCR',
                    value: 'SCR'
                },
                {
                    label: 'ODM',
                    value: 'ODM'
                }
            ];
            setOptions([...res]);
        } else if (filter == 'model') {
            let res: any = await API_GET_MODELS();
            setOptions([...res]);
        } else if (filter == 'sebango') {
            let res: any = await API_GET_SEBANGO();
            setOptions([...res]);
        } else if (filter == 'pltype') {
            let res: any = await API_GET_PLTYPE();
            setOptions([...res]);
        }
    }
    async function handleChange(e: any) {
        let clone: any = reduxFilterReport.reportFilter;
        clone[`${filter}`] = [...e];
        dispatch({ type: 'SET_FILTER_REPORT', payload: clone });
        filterReport();
    }
    return (
        <Dialog open={open} onClose={() => handleClose()} fullWidth>
            <DialogTitle>
                Filter
            </DialogTitle>
            <DialogContent dividers>
                <Box height={'500px'}>
                    <Stack gap={1}>
                        <Typography className='text-blue-500 font-semibold'>{filter}</Typography>
                        {
                            load ? <Stack alignItems={'center'} gap={1}>
                                <CircularProgress />
                                <Typography>กำลังโหลดข้อมูล</Typography>
                            </Stack> :
                                <Select options={options} defaultValue={defVal} isMulti onChange={handleChange} closeMenuOnSelect={false} />
                        }
                    </Stack>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' onClick={() => handleClose()} >Close</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogReportFilter