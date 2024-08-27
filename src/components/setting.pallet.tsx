import { ChangeEvent, useEffect, useState } from 'react'
import {  PropsCustomer, PropsPallet } from '../Interface';
import { ApiGetCustomer, ApiGetPalletOfCustomer, ApiUpdatePalletOfCustomer } from '../Service';
import { Skeleton } from '@mui/material';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
function SettingPallet() {
    // const reducer = useSelector((state: MRedux) => state.reducer);
    // let empcode = "";
    // if (typeof reducer.empcode !== 'undefined' && reducer.empcode != '') {
    //     empcode = reducer.empcode;
    // }
    const [customers, setCustomers] = useState<PropsCustomer[]>([]);
    const [pallet, setPallet] = useState<PropsPallet[]>([]);
    const [palletDef, setPalletDef] = useState<PropsPallet[]>([]);
    const [searchPallet, setSearchPallet] = useState<string>('');
    const [customer, setCustomer] = useState<string>('');
    const [loadPallet, setLoadPallet] = useState<boolean>(true);
    useEffect(() => {
        initCustomer();
    }, []);
    const initCustomer = async () => {
        let res = await ApiGetCustomer();
        setCustomers(res);
    }
    useEffect(() => {
        initPallet();
    }, [customers])
    useEffect(() => {
        if (customer != '') {
            initPallet();
        }
    }, [customer])
    const initPallet = async () => {
        setLoadPallet(true);
        let customerSelected: string = '';
        if (customer == '' && customers.length > 0) {
            customerSelected = customers[0].VenderShortName;
        } else {
            customerSelected = customer;
        }
        if (customerSelected != '') {
            let res = await ApiGetPalletOfCustomer(customerSelected);
            setPallet(res);
            setPalletDef(res);
            setCustomer(customerSelected);
            setLoadPallet(false);
        }
    }
    const handleUpdatePallet = async (oPallet: PropsPallet) => {
        let res = await ApiUpdatePalletOfCustomer({ ...oPallet, CUSTOMER_CODE: customer, CUSTOMER_SHORT_NAME: customer });
        if (res.status) {
            let clone: PropsPallet[] = [...pallet];
            let index = clone.findIndex((oP: PropsPallet) => oP.PLTYPE == oPallet.PLTYPE && oP.MODEL == oPallet.MODEL);
            clone[index] = oPallet;
            setPallet(clone);
            let cloneDef: PropsPallet[] = [...palletDef];
            let indexDef = cloneDef.findIndex((oP: PropsPallet) => oP.PLTYPE == oPallet.PLTYPE && oP.MODEL == oPallet.MODEL);
            cloneDef[indexDef] = oPallet;
            setPalletDef(cloneDef);
        }
    }

    useEffect(() => {
        let cloneDef: PropsPallet[] = [...palletDef];
        console.log(searchPallet)
        if (searchPallet.trim().length > 0) {
            setPallet(cloneDef.filter(o => o.PLTYPE?.includes(searchPallet) || o.MODEL?.includes(searchPallet)));
        } else {
            setPallet([...palletDef]);
        }
    }, [searchPallet])
    return (
        <div className='rounded-xl flex p-[24px] bg-white shadow-md border flex-col gap-3'>
            <div className='flex flex-col'>
                <strong>Pallet Setting</strong>
                <small className='text-[#71717a]'>You can customize it as you wish.</small>
            </div>
            <div className='flex flex-col gap-2'>
                <small className='text-[#71717a]'>ลูกค้า (Supplier)</small>
                {
                    customers.length == 0 ? <Skeleton variant="rounded" height={40} /> : <select className=' border rounded-md focus:outline-none cursor-pointer px-3 py-2 shadow-md ' onChange={(e: any) => setCustomer(e.target.value)} value={customer}>
                        {
                            customers.map((oCus: PropsCustomer, iCus: number) => {
                                return <option value={oCus.VenderShortName} key={iCus}>{oCus.VenderShortName}</option>
                            })
                        }
                    </select>
                }

            </div>

            <div className='flex flex-col gap-2'>
                <small className='text-[#71717a]'>พาเลท (Pallet)</small>
                <div className='flex justify-end my-2'>
                    <input className='bg-[#f9f9fa] border rounded-lg  pl-[16px] pr-[48px] py-[8px] w-fit min-w-[10em] border-[#d7d7db]' placeholder='ค้นหา' onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchPallet(e.target.value)} />
                </div>
                {
                    loadPallet == true ? <Skeleton variant="rounded" height={40} /> : <div className='h-[400px] overflow-y-auto py-3 border rounded-md  px-3 bg-[#f5f5f5]'>
                        <div className='sticky top-0 py-2   text-white drop-shadow-md grid grid-cols-3 rounded-xl gap-3 z-[9999] mb-1'>
                            <div className='col-span-1 bg-black px-6 text-end py-1 rounded-lg'>โมเดล</div>
                            <div className='col-span-2 bg-black px-6 py-1 rounded-lg'>พาเลทที่ใช้งาน</div>
                        </div>
                        {
                            pallet.length == 0 ? <small className='text-red-500'>ไม่พบข้อมูล</small> : <div className='flex flex-col gap-3'>
                                {
                                    [...new Set(pallet.map(o => o.MODEL))].map((o: string) => {
                                        let model: string = o;
                                        let palletOfModel: PropsPallet[] = pallet.filter((oP: PropsPallet) => oP.MODEL == model);
                                        return <div className='grid grid-cols-3 bg-white rounded-md p-6 gap-6 shadow-md'>
                                            <div className='w-full flex justify-end'>
                                                <div className="col-span-1 bg-black/75 text-white pl-4 rounded-lg py-1 pr-4 w-fit  h-fit">
                                                    <div className="  pr-3 drop-shadow-xl">{o}</div>
                                                </div>
                                            </div>
                                            <div className='col-span-2'>
                                                {
                                                    palletOfModel.map((oPL: PropsPallet, iP: number) => {
                                                        return <div className={`${oPL.ACTIVE != 'ACTIVE' && 'opacity-40'} flex gap-2 items-center cursor-pointer select-none opacity-80 hover:opacity-100 transition-all duration-150`} key={iP} onClick={() => handleUpdatePallet({ ...oPL, ACTIVE: (oPL.ACTIVE == 'INACTIVE' ? 'ACTIVE' : 'INACTIVE') })}>
                                                            {
                                                                oPL.ACTIVE == 'INACTIVE' ? < RadioButtonUncheckedOutlinedIcon className={` opacity-80 hover:opacity-100 transition-all duration-150`} fontSize='small' /> : <CheckCircleOutlineOutlinedIcon className='opacity-80 hover:opacity-100 transition-all duration-150' fontSize='small' />
                                                            }
                                                            <span>{oPL.PLTYPE}</span>
                                                            {
                                                                oPL.ACTIVE == 'ACTIVE' && <div className='ml-6 px-6 rounded-full bg-green-600 text-white text-sm'>ใช้งาน</div>
                                                            }
                                                        </div>
                                                    })
                                                }
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        }
                    </div>
                }
            </div>

            {/* pallet.map((oPL: PropsPallet, iPL: number) => {
                                return <div className={`${oPL.ACTIVE != 'ACTIVE' && 'opacity-40'} flex gap-2 items-center cursor-pointer select-none opacity-80 hover:opacity-100 transition-all duration-150`} key={iPL} onClick={() => handleUpdatePallet({ ...oPL, ACTIVE: (oPL.ACTIVE == 'INACTIVE' ? 'ACTIVE' : 'INACTIVE') })}>
                                    {
                                        oPL.ACTIVE == 'INACTIVE' ? < RadioButtonUncheckedOutlinedIcon className={` opacity-80 hover:opacity-100 transition-all duration-150`} fontSize='small' /> : <CheckCircleOutlineOutlinedIcon className='opacity-80 hover:opacity-100 transition-all duration-150' fontSize='small' />
                                    }
                                    <span>{oPL.PLTYPE}</span>
                                </div>
                            }) */}
        </div>
    )
}

export default SettingPallet