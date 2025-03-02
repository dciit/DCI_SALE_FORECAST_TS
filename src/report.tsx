
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_GET_SALE } from './Service';
import DialogReportFilter from './dialog.report.fitler';
import { MFitlerEdit, MReactSelect, Person } from './Interface';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
type Sale = {
    customer: string;
    modelName: string;
    sebango: string;
    pltype: string;
    d01: string | number;
    d02: string | number;
    d03: string | number;
    d04: string | number;
    d05: string | number;
    d06: string | number;
    d07: string | number;
    d08: string | number;
    d09: string | number;
    d10: string | number;
    d11: string | number;
    d12: string | number;
    d13: string | number;
    d14: string | number;
    d15: string | number;
    d16: string | number;
    d17: string | number;
    d18: string | number;
    d19: string | number;
    d20: string | number;
    d21: string | number;
    d22: string | number;
    d23: string | number;
    d24: string | number;
    d25: string | number;
    d26: string | number;
    d27: string | number;
    d28: string | number;
    d29: string | number;
    d30: string | number;
    d31: string | number;
    total: number;
    modelGroup: string;
};
function Report() {
    const [filterCustomer, setFilterCustomer] = useState<MReactSelect[]>([]);
    var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const navigate = useNavigate();
    const [data, setData] = useState<Sale[]>([]);
    const [dataDef, setDataDef] = useState<Sale[]>([]);
    const { ym } = useParams();
    const _year: string = typeof ym == 'string' ? ym?.substring(0, 4) : '';
    const _month: string = typeof ym == 'string' ? ym?.substring(4, 6) : '';
    const [isLoading, setIsLoading] = useState(true);
    let once = true;
    useEffect(() => {
        if (once) {
            handleClearFilter();
            init();
            once = false;
        }
    }, [once]);
    
    async function init() {
        let apiData = await API_GET_SALE({ ym: ym });
        apiData.data.map((oData: Person, iData: number) => {
            let sum = 0;
            //@ts-ignore
            [...Array(31)].map((oNum: any, iNum: number) => {
                let strDay: string = `d${((iNum + 1).toLocaleString('en', { minimumIntegerDigits: 2 }))}`;
                if (typeof oData[strDay] != 'undefined') {
                    sum += oData[strDay];
                }
            });
            apiData.data[iData]['total'] = sum;
            let modelGroup = oData.modelName.substring(0, 1);
            if (modelGroup == '1' || modelGroup == '2') {
                modelGroup = `${modelGroup}YC`;
            } else if (modelGroup == 'J') {
                modelGroup = 'SCR';
            } else {
                modelGroup = 'ODM';
            }
            apiData.data[iData]['modelGroup'] = modelGroup;
        });
        setDataDef(apiData.data);
        setData(apiData.data);
    }
    useEffect(() => {
        if (Object.keys(data).length) {
            setIsLoading(false);
        }
    }, [data]);
    let BASE_PATH = import.meta.env.VITE_PATH;
    const [openFilter, setOpenFilter] = useState<boolean>(false);
    const [columnFilter, setColumnFilter] = useState<string>('');
    const [defVal, setDefVal] = useState<any[]>([]);
    const reduxFilterReport = useSelector((state: any) => state.reducer?.reportFilter);
    const dispatch = useDispatch();
    function handleHome() {
        navigate(`/${BASE_PATH}/home`);
    }
    // function handleOpenFilter(colFilter = '') {
    //     setColumnFilter(colFilter);
    // }
    useEffect(() => {
        if (columnFilter != '') {
            setOpenFilter(true);
        }
    }, [columnFilter]);
    function handleCloseDialogFilter() {
        setColumnFilter('');
        setOpenFilter(false);
        setDefVal([]);
    }
    function filterReport() {
        let dataDefault = dataDef;
        if (typeof reduxFilterReport.customer != 'undefined' && reduxFilterReport.customer.length > 0) {
            dataDefault = dataDefault.filter((o => reduxFilterReport.customer.map((x: MFitlerEdit) => x.value).includes(o.customer)));
        }
        if (typeof reduxFilterReport.modelGroup != 'undefined' && reduxFilterReport.modelGroup.length > 0) {
            dataDefault = dataDefault.filter((o => reduxFilterReport.modelGroup.map((x: MFitlerEdit) => x.value).includes(o.modelGroup)));
        }
        if (typeof reduxFilterReport.model != 'undefined' && reduxFilterReport.model.length > 0) {
            dataDefault = dataDefault.filter((o => reduxFilterReport.model.map((x: MFitlerEdit) => x.value).includes(o.modelName)));
        }
        if (typeof reduxFilterReport.sebango != 'undefined' && reduxFilterReport.sebango.length > 0) {
            dataDefault = dataDefault.filter((o => reduxFilterReport.sebango.map((x: MFitlerEdit) => x.value).includes(o.sebango)));
        }
        if (typeof reduxFilterReport.pltype != 'undefined' && reduxFilterReport.pltype.length > 0) {
            dataDefault = dataDefault.filter((o => reduxFilterReport.pltype.map((x: MFitlerEdit) => x.value).includes(o.pltype)));
        }
        setData([...dataDefault])
    }
    useEffect(() => {
        filterReport();
    }, [reduxFilterReport])
    async function handleClearFilter() {
        await dispatch({ type: 'CLEAR_FILTER' });
    }
    return <div className='page-report'>
        <div >
            <div className='flex justify-center'>
                <span >SALE FORECAST REPORT  {_year}</span>&nbsp;
                <span  className='text-blue-500'>{_month != '' ? monthNames[parseInt(_month) - 1].toUpperCase() : '-'}</span>
            </div>
            <div  >
                <Button   onClick={handleHome} >กลับหน้าแรก</Button>
            </div>
            <div  >
                <span>ทั้งหมด : {data.length} รายการ</span>
                <div className='flex gap-1'>
                    <Button onClick={() => window.open('../deliverycontrol', '_blank')}>Delivert Control Sheet</Button>&nbsp;
                    <Button    onClick={handleClearFilter}>Clear Filter</Button>
                </div>
            </div>
            <div className='wrapper h-[600px] pt-0'>
                <table id='tb-report' className='w-full'>
                    <thead>
                        <tr >
                            <th className='w-[50px] text-center'>#</th>
                            <th >
                                <div >
                                    <span>Customer</span>
                                    {/* <FilterAltIcon onClick={() => handleOpenFilter('customer')} className={`cursor-pointer ${Object.keys(typeof reduxFilterReport.customer != 'undefined' ? reduxFilterReport.customer : []).length ? 'text-red-500' : 'text-gray-400'}`} /> */}
                                </div>
                            </th>
                            <th >
                                <div >
                                    <span>M.Grp</span>
                                    {/* <FilterAltIcon onClick={() => handleOpenFilter('modelGroup')} className={`cursor-pointer ${Object.keys(typeof reduxFilterReport.modelGroup != 'undefined' ? reduxFilterReport.modelGroup : []).length ? 'text-red-500' : 'text-gray-400'}`} /> */}
                                </div>
                            </th>
                            <th >
                                <div >
                                    <span>Model</span>
                                    {/* <FilterAltIcon onClick={() => handleOpenFilter('model')} className={`cursor-pointer ${Object.keys(typeof reduxFilterReport.model != 'undefined' ? reduxFilterReport.model : []).length ? 'text-red-500' : 'text-gray-400'}`} /> */}
                                </div>
                            </th>
                            <th >
                                <div >
                                    <span>Sebango</span>
                                    {/* <FilterAltIcon onClick={() => handleOpenFilter('sebango')} className={`cursor-pointer ${Object.keys(typeof reduxFilterReport.sebango != 'undefined' ? reduxFilterReport.sebango : []).length ? 'text-red-500' : 'text-gray-400'}`} /> */}
                                </div>
                            </th>
                            <th >
                                <div >
                                    <span>Ptype</span>
                                    {/* <FilterAltIcon onClick={() => handleOpenFilter('pltype')} className={`cursor-pointer ${Object.keys(typeof reduxFilterReport.pltype != 'undefined' ? reduxFilterReport.pltype : []).length ? 'text-red-500' : 'text-gray-400'}`} /> */}
                                </div>
                            </th>
                            <th >
                                <div >
                                    <span>Total</span>
                                </div>
                            </th>
                            {
                                [...Array(31)].map((_: any, i: number) => {
                                    return <th key={i} className='text-center w-[50px]'>{`D${(i + 1).toLocaleString('en', { minimumIntegerDigits: 2 })}`}</th>
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isLoading ? <tr><th colSpan={38} className='text-center'>
                                <span className='text-[1.5em]'>กำลังโหลดข้อมูล . . . </span>
                            </th></tr> : (
                                data.length == 0 ? <tr><td colSpan={38} className='text-center bg-white'>    <span className='text-[1.5em]'>ไม่พบข้อมูล</span></td></tr> :
                                    data.map((oData: Sale, iData: number) => {
                                        let num: number = iData + 1;
                                        let total: string = oData.total > 0 ? oData.total.toLocaleString('en', { minimumIntegerDigits: 2 }) : '';
                                        let modelGroup: string = oData.modelName.substring(0, 1);
                                        if (modelGroup == '1' || modelGroup == '2') {
                                            modelGroup += 'YC';
                                        } else if (modelGroup == 'J') {
                                            modelGroup = 'SCR';
                                        } else {
                                            modelGroup = 'ODM';
                                        }
                                        return <tr key={iData}>
                                            <td className='text-center'>{num}</td>
                                            <td>{oData.customer}</td>
                                            <td className='text-center'>{modelGroup}</td>
                                            <td>{oData.modelName}</td>
                                            <td>{oData.sebango}</td>
                                            <td>{oData.pltype}</td>
                                            <td className={`${total != '' && 'font-bold'} bg-orange-300 text-right`}>{total}</td>
                                            {
                                                [...Array(31)].map((_: any, i: number) => {
                                                    let txtVal: string|number = oData[`d${(i + 1).toLocaleString('en', { minimumIntegerDigits: 2 })}` as keyof Sale] != '' ? oData[`d${(i + 1).toLocaleString('en', { minimumIntegerDigits: 2 })}` as keyof Sale] : '0';
                                                    let val: number = txtVal != '0' ? Number(txtVal) : 0;
                                                    return <td key={i} className={`${val > 0 ? 'font-bold bg-green-300' : 'bg-gray-400'} text-right`}>{val > 0 ? val.toLocaleString('en', { minimumIntegerDigits: 2 }) : ''}</td>
                                                })
                                            }
                                        </tr>
                                    })
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
        <DialogReportFilter filter={columnFilter} open={openFilter} handleClose={handleCloseDialogFilter} customer={filterCustomer} setCustomer={setFilterCustomer} filterReport={filterReport} setFilter={setColumnFilter} defVal={defVal} setDefVal={setDefVal} />
    </div>
}

export default Report