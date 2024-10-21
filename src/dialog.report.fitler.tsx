import { useEffect, useState } from 'react'
import { API_GET_CUSTOMER, API_GET_MODELS, API_GET_PLTYPE, API_GET_SEBANGO } from './Service'
import Select from 'react-select'
import { MReactSelect } from './Interface'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal, Typography } from 'antd'
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
        <Modal title='Filter' open={open} onClose={() => handleClose()} footer={<Button onClick={() => handleClose()} >Close</Button>}>
            <div className='h-[500px]' >
                <div >
                    <Typography className='text-blue-500 font-semibold'>{filter}</Typography>
                    {
                        load ? <div >
                            {/* <CircularProgress /> */}
                            <Typography>กำลังโหลดข้อมูล</Typography>
                        </div> :
                            <Select options={options} defaultValue={defVal} isMulti onChange={handleChange} closeMenuOnSelect={false} />
                    }
                </div>
            </div>
        </Modal>
    )
}

export default DialogReportFilter