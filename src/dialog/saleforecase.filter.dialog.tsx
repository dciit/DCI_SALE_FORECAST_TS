import { MChoose, MDialogFilter, MFilterSale } from '../interface/saleforecase.interface'
import { useDispatch, useSelector } from 'react-redux'
import { ChangeEvent, useEffect, useState } from 'react'
import { API_GET_CHOOSE } from '../service/saleforecase.service'
import { Button, Input, Modal, Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { AiOutlineCheckCircle } from "react-icons/ai";

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
        <Modal title={'Filter By ' + column} open={open} onClose={() => close(false)} footer={
            <>
                <Button type='primary' onClick={handleFilter} icon={<SearchOutlined />}>ค้นหา</Button>
                <Button onClick={() => close(false)}>ยกเลิก</Button>
            </>
        } >
            <Spin spinning={load}>
                <div className='flex gap-2 flex-col'>
                    <Input type='text' onChange={(e: ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)} placeholder='กรอกข้อมูลที่ต้องการค้นหา' autoFocus />
                    <div className='flex flex-col gap-2'>
                        <div className='flex gap-3 items-center'>
                            <div className='flex items-center gap-1'>
                                <span>Choose a {column}</span>
                                {
                                    (indexFilter != -1 && choose.filter(x => x.checked == true).length > 0) && <span className='text-red-500'>({choose.filter(x => x.checked == true).length})</span>
                                }
                            </div>
                            {
                                (indexFilter != -1 && choose.filter(x => x.checked == true).length > 0) && <Button type='primary' className='bg-[#5c5fc8] text-white' onClick={handleClearFilter}>ล้าง</Button>
                            }
                        </div>
                        <div className='drop-shadow-lg w-full border-[#5c5fc870] rounded-lg border p-6 overflow-y-auto max-h-[500px] gap-2'>
                            {
                                choose.length == 0 ? <div className='text-sm text-[#5c5fc8]'> --- ไม่พบตัวเลือกสำหรับการค้นหา ---</div> :
                                    choose.map((o: MChoose, i: number) => {
                                        // let index: number = selectChoose[indexFilter].value.findIndex((x: string) => x == o.key);
                                        // let checked: boolean = index != -1 ? true : false;
                                        const checked: boolean = o.checked != undefined ? o.checked : false;
                                        return <div key={i} className={` select-none flex items-center gap-2 cursor-pointer rounded-md hover:bg-gradient-to-r hover:from-violet-600/20 hover:to-indigo-600/20   transition-all duration-300 pl-3 ${checked == true && 'font-semibold bg-gradient-to-r from-violet-600/80 to-indigo-600/80 text-white'}`} onClick={() => handleSelectChoose(i)}>
                                            {
                                                checked == true ? <AiOutlineCheckCircle /> : ''
                                            }
                                            <span>{o.value}</span>
                                        </div>
                                    })
                            }
                        </div>
                    </div>
                </div>
            </Spin>

        </Modal >
    )
}

export default DialogFilter