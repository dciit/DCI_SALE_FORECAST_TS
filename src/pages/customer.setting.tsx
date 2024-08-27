import { Autocomplete, Button, IconButton, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { API_ADD_MODEL_TO_CUSTOMER, API_DEL_MODEL_OF_CUSTOMER, API_GETCUSTOMER_SETTING, API_GET_MODEL, API_GET_MODEL_BY_CUSTOMER } from '../service/saleforecase.service';
import { DictMstr, Status } from '../interface/saleforecase.interface';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SettingPallet from '../components/setting.pallet';
export interface mOption {
    label: string;
    value: string;
}
interface PropsTabs {
    key: string;
    title: string;
    active: boolean;
}
function CustomerSetting() {
    const [customers, setCustomers] = useState<string[]>([]);
    const [customer, setCustomer] = useState<string>('');
    const [modelMaster, setModelMaster] = useState<mOption[]>([]);
    const [modelOfCustomer, setModelOfCustomer] = useState<DictMstr[]>([]);
    const [modelSelected, setModelSelected] = useState<string | undefined>('');
    const [once, setOnce] = useState<boolean>(true);
    useEffect(() => {
        if (once == true) {
            init();
            setOnce(false);
        }
    }, [once]);
    const init = async () => {
        let apiGetCustomer = await API_GETCUSTOMER_SETTING();
        setCustomers(apiGetCustomer);
    }
    useEffect(() => {
        if (customers.length) {
            if (customer == '') {
                setCustomer(customers[0]);
            }
        } else {
            setCustomer('');
        }
    }, [customers])
    useEffect(() => {
        if (customer != '') {
            getModelMaster();
            getModelByCustomerCode(customer);
        }
    }, [customer])
    const getModelByCustomerCode = async (code: string) => {
        let apiGetModelByCustomer = await API_GET_MODEL_BY_CUSTOMER(code);
        setModelOfCustomer(apiGetModelByCustomer);
    }
    const getModelMaster = async () => {
        let apiGetModelMaster = await API_GET_MODEL();
        let master: mOption[] = [];
        apiGetModelMaster.map((o: string) => {
            master.push({
                label: o,
                value: o
            })
        })
        setModelMaster(master);
    }
    const handleAddModelToCustomer = async () => {
        if (modelSelected == undefined || modelSelected == '') {
            alert('กรุณาเลือก model');
            return false;
        }
        let apiAddModelToCustomer: Status = await API_ADD_MODEL_TO_CUSTOMER({ code: customer, refCode: modelSelected });
        if (apiAddModelToCustomer.status == true) {
            getModelByCustomerCode(customer);
        } else {
            alert(apiAddModelToCustomer.message);
        }
    }
    const handleDelModelOfCustomer = async (dictId: string, model: string) => {
        if (confirm(`คุณต้องการลบ Model : ${model} ออกจาก Customer : ${customer} ใช่หรือไม่ ?`)) {
            let apiDelModelOfCustomer = await API_DEL_MODEL_OF_CUSTOMER({
                custShortName: customer,
                dictId: dictId
            });
            if (apiDelModelOfCustomer.status == true) {
                getModelByCustomerCode(customer);
            } else {
                alert(apiDelModelOfCustomer.message);
            }
        }

    }

    const [tabs, setTabs] = useState<PropsTabs[]>([
        { key: 'model', title: 'โมเดลของลูกค้า', active: true },
        { key: 'pltype', title: 'พาเลทของลูกค้า', active: false }
    ]);
    const handleChangeTabActive = (index: number) => {
        setTabs(tabs.map((oTab: PropsTabs, iTab: number) => {
            if (iTab == index) {
                oTab.active = true;
            } else {
                oTab.active = false;
            }
            return oTab;
        }))
    }
    // useEffect(()=>{
    //     if(tabs.find(x=>x.key == 'pallet' && x.active == true) != undefined){
    //         initPallet();
    //     }
    // },[tabs]);
    // const initPallet = async ()=>{
    //     let resPallet = await ApiGetPalletOfCustomer();
    // }
    return (
        <div className='p-6 flex  flex-col gap-3'>
            <div className='flex flex-col gap-2'>
                <div className='flex flex-col  gap-2'>
                    <small className='text-[#5f5f5f] opacity-80 '>เมนูที่สามารถใช้ได้</small>
                    <div id="tabs" className='flex items-center p-[4px] bg-[#f4f4f5] rounded-xl'>
                        {
                            tabs.map((oTab: PropsTabs, iTab: number) => <div key={iTab} className={`${oTab.active == true && 'text-[#3b82f6]'} px-[12px] py-[4px] rounded-md cursor-pointer select-none ${oTab.active == true ? 'bg-white shadow-sm border opacity-100' : 'opacity-70'} hover:opacity-100 transition-all duration-300`} onClick={() => handleChangeTabActive(iTab)}>
                                {oTab.title}
                            </div>)
                        }
                    </div>
                </div>
                {
                    tabs.find(x => x.active == true)?.key == 'model' && <div className='py-3 flex flex-col gap-6'>
                        <div className='flex flex-col gap-1 px-4 py-4 shadow-md border'>
                            <span>Please Select Customer : </span>
                            <select className='border rounded-md focus:outline-none cursor-pointer px-3 py-2 bg-[#5c5fc810]' onChange={(e: any) => setCustomer(e.target.value)} value={customer}>
                                {
                                    customers.map((oCus: string, iCus: number) => {
                                        return <option value={oCus} key={iCus}>{oCus}</option>
                                    })
                                }
                            </select>

                            <span>Please Select Model of Customer : </span>
                            <div className='flex gap-3'>
                                <Autocomplete
                                    className='grow'
                                    size='small'
                                    options={modelMaster}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} />}
                                    onChange={(e: any, newValue) => {
                                        console.log(e);
                                        setModelSelected(newValue?.value)
                                    }}
                                />
                                <Button variant='contained' onClick={handleAddModelToCustomer}>เพิ่ม</Button>
                            </div>
                        </div>
                        <div className='flex flex-col gap-1  overflow-y-auto max-h-[500px]'>
                            <span>Drawing of Customer ({modelOfCustomer.length})</span>
                            <table className='w-[100%]'>
                                <tbody>
                                    <tr className='bg-[#5c5fc8] text-white sticky top-0'>
                                        <td className='border px-3 '>ModelName</td>
                                        <td className='border  text-center'>#</td>
                                    </tr>
                                    {
                                        modelOfCustomer.length == 0 ? <tr><td className='border text-center'>ไม่พบข้อมูล</td></tr> :
                                            modelOfCustomer.map((o: DictMstr, i: number) => {
                                                return <tr key={i}>
                                                    <td width={'90%'} className='border px-3 cursor-pointer hover:bg-[#5c5fc810] transition-all duration-300'>{o.refCode}</td>
                                                    <td className='border text-center'><IconButton className='focus:outline-none' onClick={() => {
                                                        if (o.dictId != undefined && o.dictId != '' && o.refCode != undefined && o.refCode != '') {
                                                            handleDelModelOfCustomer(o.dictId, o.refCode)
                                                        } else {
                                                            alert(`ข้อมูลไม่ครบถ้วน Dict Code : ${o.dictId}, Model : ${o.refCode}`)
                                                        }
                                                    }}><DeleteOutlineIcon className='text-[#5c5fc8] ' /></IconButton></td>
                                                </tr>
                                            })

                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                }
                {
                    tabs.find(x => x.active == true)?.key == 'pltype' && <SettingPallet/>
                }
            </div>

        </div>
    )
}

export default CustomerSetting