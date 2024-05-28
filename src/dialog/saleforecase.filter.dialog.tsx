import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { MChoose, MDialogFilter, MFilterSale } from '../interface/saleforecase.interface'
import CheckIcon from '@mui/icons-material/Check';
import { useDispatch, useSelector } from 'react-redux'
import { ChangeEvent, useEffect, useState } from 'react'
import { API_GET_CHOOSE } from '../service/saleforecase.service'
import { Skeleton } from '@mui/material'
function DialogFilter(props: MDialogFilter) {
    const reduxFilter: MFilterSale[] = useSelector((state: any) => state.reducer.filter);
    const [indexFilter, setIndexFilter] = useState<number>(-1);
    const dispatch = useDispatch();
    const { open, close, column, year } = props;
    const [choose, setChoose] = useState<MChoose[]>([]);
    const [defChoose, setDefChoose] = useState<MChoose[]>([]);
    const [load, setLoad] = useState<boolean>(true);
    useEffect(() => {
        if (open == true) {
            setIndexFilter(reduxFilter.findIndex((o: MFilterSale) => o.text == column));
            setLoad(true);
            initChoose();
        }
    }, [open]);
    const initChoose = async () => {
        let apiChoose: MChoose[] = await API_GET_CHOOSE(column, year);
        let index: number = reduxFilter.findIndex((o: MFilterSale) => o.text == column);
        let groupChecked: string[] = reduxFilter[index].value;
        apiChoose.map((o: MChoose) => {
            let checked: boolean = groupChecked.includes(o.key);
            o.checked = checked;
        })
        setChoose(apiChoose);
        setDefChoose(apiChoose);
    }
    useEffect(() => {
        setLoad(false);
    }, [choose])

    const handleFilter = () => {
        let isChecked: string[] = choose.map((o: MChoose) => {
            return o.checked == true ? o.key : ''
        });
        isChecked = [...new Set(isChecked.filter(x => x != ''))];
        dispatch({ type: 'SET_FILTER', payload: { column: column, value: isChecked } });
        close(false);
    }

    const handleSelectChoose = (index: number) => {
        const clone: MChoose[] = [...choose];
        if (clone[index].checked == undefined) {
            clone[index].checked = true;
        } else {
            clone[index].checked = !clone[index].checked;
        }
        setChoose([...clone]);
    }
    const handleClearFilter = () => {
        let clone: MChoose[] = [...choose];
        clone.map((o: MChoose) => o.checked = false)
        setChoose([...clone]);
    }
    const handleSearch = (txtSearch: string) => {
        let clone: MChoose[] = [...defChoose.filter((o: MChoose) => o.value.toLowerCase().includes(txtSearch.toLowerCase()))];
        setChoose(clone);
    }
    return (
        <Dialog open={open} onClose={() => close(false)} fullWidth maxWidth='sm'>
            <DialogTitle >
                <div className='flex gap-2 flex-row items-center'>
                    <div className='rounded-full bg-[#5c5fc8] text-[#fff]  w-[36px] h-[36px] flex items-center justify-center'>
                        <FilterAltOutlinedIcon sx={{ fontSize: '20px' }} />
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-[18px]'>Filter By {column}</span>
                        <span className='text-[12px] text-[#939393]'>ค้นหาข้อมูล</span>
                    </div>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {
                    load ? <div className='flex flex-col '>
                        <Skeleton className='bg-[#5c5fc8] w-full h-[70px]' />
                        <Skeleton className='bg-[#5c5fc8] w-[150px] h-[50px]' />
                        <Skeleton className='bg-[#5c5fc8] w-full h-[450px]' />
                    </div> : <div className='flex gap-2 flex-col'>
                        <input type="text" className='w-full px-3 py-2 border border-[#5c5fc870] rounded-md font-semibold bg-[#5c5fc810] outline-[#5c5fc8] transition-all duration-300 text-[#5c5fc8]' placeholder='ค้นหาข้อความ' onChange={(e: ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)} />
                        <div className='flex flex-col gap-2'>
                            <div className='flex gap-3 items-center'>
                                <div className='flex items-center gap-1'>
                                    <span>Choose a {column}</span>
                                    {
                                        (indexFilter != -1 && choose.filter(x => x.checked == true).length > 0) && <span className='text-red-500'>({choose.filter(x => x.checked == true).length})</span>
                                    }
                                </div>
                                {
                                    (indexFilter != -1 && choose.filter(x => x.checked == true).length > 0) && <Button variant='contained' size='small' className='bg-[#5c5fc8] text-white' onClick={handleClearFilter}>ล้าง</Button>
                                }
                            </div>
                            <div className='drop-shadow-lg w-full border-[#5c5fc870] rounded-lg border p-6 overflow-y-auto max-h-[500px]'>
                                {
                                    choose.length == 0 ? <div className='text-sm text-[#5c5fc8]'> --- ไม่พบตัวเลือกสำหรับการค้นหา ---</div> :
                                        choose.map((o: MChoose, i: number) => {
                                            // let index: number = selectChoose[indexFilter].value.findIndex((x: string) => x == o.key);
                                            // let checked: boolean = index != -1 ? true : false;
                                            const checked: boolean = o.checked != undefined ? o.checked : false;
                                            return <div key={i} className='select-none flex flex-row gap-2 cursor-pointer rounded-md hover:bg-[#5c5fc850]   transition-all duration-300 pl-3 ' onClick={() => handleSelectChoose(i)}>
                                                <div className='w-[35px]'>
                                                    {
                                                        checked == true ? <CheckIcon /> : ''
                                                    }
                                                </div>
                                                <span>{o.value}</span>
                                            </div>
                                        })
                                }
                            </div>
                        </div>
                    </div>
                }

            </DialogContent>
            <DialogActions>
                <Button variant='outlined' className='border-[#5c5fc870] text-[#5c5fc8]' size='small' onClick={() => close(false)}>ยกเลิก</Button>
                <Button variant='contained' className='bg-[#5c5fc8]' size='small' onClick={handleFilter}>ค้นหา</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogFilter