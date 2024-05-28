// @ts-nocheck
import { useEffect, useState } from 'react'

import ShortcutOutlinedIcon from '@mui/icons-material/ShortcutOutlined';
import { ReactGrid, Column, Row, CellChange, TextCell } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import { MFilterSale, MGetSale, MMasterFilter, MSale } from '../interface/saleforecase.interface';
import { API_GET_SALE, API_UPDATE_SALE } from '../service/saleforecase.service';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SwapVertOutlinedIcon from '@mui/icons-material/SwapVertOutlined';
import CelebrationOutlinedIcon from '@mui/icons-material/CelebrationOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Button, CircularProgress, IconButton, MenuItem, Select } from '@mui/material';
import DialogFilter from '../dialog/saleforecase.filter.dialog';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import DialogDistribution from '../dialog/saleforecase.dialog.distribution';
import DialogUnDistribution from '../dialog/saleforecase.dialog.undistribution';
const colWidth: number = 150;
const colWidthDay: number = 50;
const getColumns = (): Column[] => [...[
    { columnId: "ym", width: colWidth },
    { columnId: "customer", width: colWidth },
    { columnId: "modelCode", width: colWidth },
    { columnId: "modelName", width: colWidth },
    { columnId: "diameter", width: colWidth },
    { columnId: "pltype", width: colWidth },
], ...[...Array(31)].map((o: any, i: number) => (
    { columnId: `d${(i + 1).toLocaleString('en', { minimumIntegerDigits: 2 })}`, width: colWidthDay }
))];
const headerRow: Row = {
    rowId: "header",
    cells: [
        { type: "header", text: `MM/YYYY` },
        { type: "header", text: "Customer" },
        { type: "header", text: "ModelCode" },
        { type: "header", text: "ModelName" },
        { type: "header", text: "Diameter" },
        { type: "header", text: "PLTYPE" },
        { type: "header", text: "D01" },
        { type: "header", text: "D02" },
        { type: "header", text: "D03" },
        { type: "header", text: "D04" },
        { type: "header", text: "D05" },
        { type: "header", text: "D06" },
        { type: "header", text: "D07" },
        { type: "header", text: "D08" },
        { type: "header", text: "D09" },
        { type: "header", text: "D10" },
        { type: "header", text: "D11" },
        { type: "header", text: "D12" },
        { type: "header", text: "D13" },
        { type: "header", text: "D14" },
        { type: "header", text: "D15" },
        { type: "header", text: "D16" },
        { type: "header", text: "D17" },
        { type: "header", text: "D18" },
        { type: "header", text: "D19" },
        { type: "header", text: "D20" },
        { type: "header", text: "D21" },
        { type: "header", text: "D22" },
        { type: "header", text: "D23" },
        { type: "header", text: "D24" },
        { type: "header", text: "D25" },
        { type: "header", text: "D26" },
        { type: "header", text: "D27" },
        { type: "header", text: "D28" },
        { type: "header", text: "D29" },
        { type: "header", text: "D30" },
        { type: "header", text: "D31" },
    ]
};
const getRows = (sale: MSale[]): Row[] => [
    headerRow,
    ...sale.map<Row>((sale, idx) => ({
        rowId: idx,
        cells: [
            { type: "text", text: sale.ym },
            { type: "text", text: sale.customer },
            { type: "text", text: sale.modelCode },
            { type: "text", text: sale.modelName },
            { type: "text", text: sale.diameter },
            { type: "text", text: sale.pltype },
            { type: "text", text: sale.d01.toString() },
            { type: "text", text: sale.d02.toString() },
            { type: "text", text: sale.d03.toString() },
            { type: "text", text: sale.d04.toString() },
            { type: "text", text: sale.d05.toString() },
            { type: "text", text: sale.d06.toString() },
            { type: "text", text: sale.d07.toString() },
            { type: "text", text: sale.d08.toString() },
            { type: "text", text: sale.d09.toString() },
            { type: "text", text: sale.d10.toString() },
            { type: "text", text: sale.d11.toString() },
            { type: "text", text: sale.d12.toString() },
            { type: "text", text: sale.d13.toString() },
            { type: "text", text: sale.d14.toString() },
            { type: "text", text: sale.d15.toString() },
            { type: "text", text: sale.d16.toString() },
            { type: "text", text: sale.d17.toString() },
            { type: "text", text: sale.d18.toString() },
            { type: "text", text: sale.d19.toString() },
            { type: "text", text: sale.d20.toString() },
            { type: "text", text: sale.d21.toString() },
            { type: "text", text: sale.d22.toString() },
            { type: "text", text: sale.d23.toString() },
            { type: "text", text: sale.d24.toString() },
            { type: "text", text: sale.d25.toString() },
            { type: "text", text: sale.d26.toString() },
            { type: "text", text: sale.d27.toString() },
            { type: "text", text: sale.d28.toString() },
            { type: "text", text: sale.d29.toString() },
            { type: "text", text: sale.d30.toString() },
            { type: "text", text: sale.d31.toString() },
        ]
    }))
];
function SaleForecaseReactGrid() {
    let masterFilter: MMasterFilter[] = [
        { column: 'MM/YYYY', field: 'ym' },
        { column: 'CUSTOMER', field: 'customer' },
        { column: 'MODEL CODE', field: 'modelCode' },
        { column: 'MODEL NAME', field: 'modelName' },
        { column: 'DIAMETER', field: 'diameter' },
        { column: 'PLTYPE', field: 'pltype' }
    ]
    const dispatch = useDispatch();
    const reduxFilter: MFilterSale[] = useSelector((state: any) => state.reducer.filter);
    const reduxCore: any = useSelector((state: any) => state.reducer);
    const [once, setOnce] = useState<boolean>(true);
    const [load, setLoad] = useState<boolean>(true);
    const [data, setData] = useState<MSale[]>([]);
    const [defData, setDefData] = useState<MSale[]>([]);
    const columns = getColumns();
    const [rows, setRows] = useState<Row[]>([]);
    const [openFilter, setOpenFilter] = useState<boolean>(false);
    const [columnFilter, setColumnFilter] = useState<string>('');
    const rYear: string[] = [moment().add('year', -1).format('YYYY'), moment().format('YYYY')]
    const [year, setYear] = useState<string>(moment().format('YYYY'));
    const [change, setChange] = useState<MSale[]>([]);
    const [openDistribution, setOpenDistribution] = useState<boolean>(false);
    const [openUnDistribution, setOpenUnDistribution] = useState<boolean>(false);
    const [lrev, setLrev] = useState<string>("");
    useEffect(() => {
        if (once == true) {
            SearchData();
            setOnce(false);
        }
    }, [once]);
    useEffect(() => {
        if (columnFilter != '') {
            setOpenFilter(true);
        } else {
            if (once == false) {
                handleFilter();
            }
        }
    }, [columnFilter]);
    useEffect(() => {
        if (!openFilter) {
            setColumnFilter('');
        }
    }, [openFilter])
    const SearchData = async () => {
        setLoad(true);
        let ApiSearchData: MGetSale = await API_GET_SALE({ empcode: reduxCore.empcode, year: year });
        setDefData(ApiSearchData.data);  // default data,  initial data
        setLrev(ApiSearchData.status);
        reduxFilter.map((o: MFilterSale) => {
            if (o.value.length) {
                let field: string = '';
                if (masterFilter.findIndex((x: MMasterFilter) => x.column == o.text) != -1) {
                    field = masterFilter.filter((x: MMasterFilter) => x.column == o.text)[0].field;
                    if (field != '' && field != null) {
                        ApiSearchData.data = ApiSearchData.data.filter((oSale: MSale) => o.value.includes(oSale[field]));
                    }
                }
            }
        });
        // reduxFilter.map((o: MFilterSale) => {
        //     let sort: boolean = o.sort == 'asc' ? true : false;
        //     if (o.text == 'MM/YYYY') {
        //         // console.log('load sort : ', sort ? 'asc' : 'desc')
        //         ApiSearchData.data = ApiSearchData.data.sort((a, b) => (a.ym < b.ym ? -1 : 1));
        //         // ApiSearchData.data = getSortedData(ApiSearchData.data, o.text, sort);
        //     }
        //     console.log(ApiSearchData.data);
        //     if (o.text == 'MODEL') {
        //         ApiSearchData.data = ApiSearchData.data.sort((a, b) => (a.modelName < b.modelName ? -1 : 1));
        //     }
        // });
        setLoad(false);
        setData(ApiSearchData.data);             // data after filter
        setRows(getRows(ApiSearchData.data));    // row after filter to grid
    }

    const handleFilter = () => {
        let buffData: MSale[] = defData.slice();
        reduxFilter.map((o: MFilterSale) => {
            if (o.value.length) {
                let field: string = '';
                if (masterFilter.findIndex((x: MMasterFilter) => x.column == o.text) != -1) {
                    field = masterFilter.filter((x: MMasterFilter) => x.column == o.text)[0].field;
                    if (field != '' && field != null) {
                        buffData = buffData.filter((oSale: MSale) => o.value.toString().toLowerCase().includes(oSale[field].toString().toLowerCase()));
                    }
                }
            }
        });
        // reduxFilter.map((o: MFilterSale) => {
        //     let sort: string = o.sort;
        //     if (o.text == 'MM/YYYY' || o.text == 'CUSTOMER') {
        //         console.log(o.text)
        //         buffData = getSortedData(buffData, o.text, sort == 'asc' ? true : false);
        //     }
        // });
        setData(buffData);
    }

    const handleClearFilter = () => {
        dispatch({ type: 'CLEAR_FILTER' });
        handleFilter();
    }
    useEffect(() => {
        // if (data.length) {
        setRows(getRows(data));
        if (change.length > 0) {
            update(change);
        }
        // }
    }, [data, change])

    const update = async (rowChange: any[]) => {
        let update = await API_UPDATE_SALE({ empcode: reduxCore.empcode, sales: rowChange, year: year });
        if (typeof update != 'undefined' && update.status == true) {

        } else {
            alert('เกิดข้อผิดพลาด');
        }
        setChange([]);
    }

    const applyChangesToPeople = (
        changes: CellChange<TextCell>[],
        prevPeople: MSale[]
    ): MSale[] => {
        let dataUpdate: MSale[] = [];
        changes.forEach((change) => {
            const personIndex = change.rowId;
            const fieldName = change.columnId;
            if (fieldName.toString().startsWith("d")) {
                prevPeople[personIndex][fieldName] = Number(change.newCell.text.replace('\r', ''));
                dataUpdate.push(prevPeople[Number(personIndex)]);
            }
        });
        setChange(dataUpdate);
        return [...prevPeople];
    };

    const handleChanges = (changes: CellChange<TextCell>[]) => {
        if (lrev != '999') {
            setData((prevPeople) => applyChangesToPeople(changes, prevPeople))
        }
    };

    // const handleSort = (textSort: string) => {
    //     let buffData: MSale[] = data.slice();
    //     let sort: string = 'asc';
    //     let rFilter: MFilterSale[] = reduxFilter.filter((x: MFilterSale) => x.text == textSort);
    //     if (rFilter.length) {
    //         sort = rFilter[0].sort == '' ? 'asc' : (rFilter[0].sort == 'asc' ? 'desc' : 'asc');
    //     }
    //     dispatch({
    //         type: 'SET_SORT', payload: {
    //             text: textSort,
    //             sort: sort
    //         }
    //     });

    // buffData = getSortedData(buffData, textSort, sort == 'asc' ? true : false);
    //     setData(buffData);
    // }

    // function getSortedData(data, prop, isAsc) {
    //     return data.sort((a, b) => {
    //         return (a[prop] < b[prop] ? -1 : 1) * (isAsc == true ? 1 : -1)
    //     });
    // }

    return <div className='p-6 flex flex-col gap-3' id='reactGrid'>
        <div className='flex flex-row drop-shadow-lg py-3 border border-[#5c5fc840] rounded-lg px-6'>
            <div className='flex grow flex-row items-center gap-3 select-none'>
                <span>เครื่องมือค้นหา </span>
                <Select size='small' value={year} className='w-fit' onChange={(e: any) => setYear(e.target.value)}>
                    {
                        rYear.map((oYear: string, iYear: number) => {
                            return <MenuItem key={iYear} value={year}>{oYear}</MenuItem>
                        })
                    }
                </Select>
            </div>
            <Button size='small' variant='contained' className={`${lrev == '999' ? 'bg-[#009866]' : 'bg-[#5c5fc8]'} text-white pl-5 pr-6 focus:outline-none`} startIcon={<SearchOutlinedIcon />}>ค้นหา</Button>
        </div>
        <div className={`${defData.length == 0 && 'hidden'} flex  items-center gap-3 ${lrev == '999' ? 'bg-[#00986610]' : 'bg-[#5c5fc810]'} py-2 px-6 rounded-md border ${lrev == '999' ? 'border-[#00986610]' : 'border-[#5c5fc810]'} select-none`}>
            <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${lrev == "999" ? 'bg-[#00986675]' : 'bg-[#5c5fc875]'} opacity-75`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${lrev == "999" ? 'bg-[#009866]' : 'bg-[#5c5fc8]'}`}></span>
            </span>
            <span>{lrev == "999" ? 'ข้อมูลการขาย' : 'หน่วยงานวางแผนการผลิตกำลัง'}</span>
            <span className={`${lrev == "999" ? 'text-[#009688]' : 'text-[#5c5fc8]'} font-semibold`}>{lrev == "999" ? '"แจกจ่าย"' : '"แก้ไข"'}</span>
            <span> {lrev != "999" && 'แก้ไขข้อมูล '}อยู่ขณะนี้</span>
            <div>
                {
                    lrev == "999" ? <Button variant='contained' className='focus:outline-none bg-[#5c5fc8]' startIcon={<ShortcutOutlinedIcon />} onClick={() => setOpenUnDistribution(true)}>แก้ไข</Button> : <Button variant='contained' className='focus:outline-none bg-[#009866]' startIcon={<CelebrationOutlinedIcon />} onClick={() => setOpenDistribution(true)}>แจกจ่าย</Button>
                }
            </div>
        </div>
        <div className='flex '>
            <div className='grow flex flex-row'>
                {
                    reduxFilter.map((o: MFilterSale, i: number) => {
                        let counter: number = o.value.length;
                        let sort: string = o.sort;
                        return <div key={i} className='py-2 flex flex-col items-center px-3 w-[150px] gap-1 border' >
                            <div className='flex gap-2 items-center'>
                                <span className={`${counter > 0 && 'text-[#5c5fc8] font-semibold'} transition-all duration-300`}>{o.text} </span>
                                {
                                    counter > 0 ? <span className='text-red-500 font-semibold'>({counter})</span> : ''
                                }
                            </div>
                            <div key={i} className={`   flex items-center justify-center   gap-1`}>
                                <IconButton onClick={() => setColumnFilter(o.text)} className={`${counter > 0 && 'bg-[#5c5fc820]'}`}>
                                    {/* FilterAltIcon */}
                                    {
                                        counter == 0 ? <FilterAltOutlinedIcon className='text-[#8b8b8b]' style={{ fontSize: '18px' }} /> : <FilterAltIcon className='text-[#5c5fc8]' style={{ fontSize: '18px' }} />
                                    }
                                </IconButton>
                                {/* <IconButton onClick={() => handleSort(o.text)} className='focus:outline-none'>
                                    <SwapVertOutlinedIcon className='text-[#8b8b8b]' style={{ fontSize: '18px' }} />
                                    <span className='text-[12px] text-[#5c5fc8]'>{sort == 'asc' ? 'A-Z' : 'Z-A'} </span>
                                </IconButton> */}
                            </div>
                        </div>
                    })
                }
            </div>
            <div className=' flex items-center gap-2'>

                <Button variant='contained' color='error' startIcon={<CleaningServicesIcon />} onClick={handleClearFilter}>ล้างตัวกรอง</Button>
            </div>
        </div>
        <div className={`h-[500px] wrapper pt-0 gap-3 ${lrev == "999" ? 'tb-distribution' : 'tb-undistribution'}`}>
            {
                load == true ? <div id='loading' className={`flex flex-col gap-2 items-center justify-center h-full  text-white rounded-lg ${lrev == '999' ? 'bg-[#009866]' : 'bg-[#5c5fc8]'}`}>
                    <CircularProgress sx={{ color: 'white' }} />
                    <span className='drop-shadow-xl'>กำลังโหลดข้อมูล</span>
                </div> : (rows.length == 0 ? <div id='nodata'>
                    <span className='text-[#5c5fc8]'>ไม่พบข้อมูล</span>
                </div> : <ReactGrid rows={rows} columns={columns} stickyTopRows={1} stickyLeftColumns={6} onCellsChanged={handleChanges} />)
            }
            {
                (data.length == 0 && load == false) && <div className='border text-center select-none '>ไม่พบข้อมูลที่คุณค้นหา</div>
            }
        </div>
        <div className='flex'>
            <div className={`${lrev == '999' ? 'bg-[#009866]' : 'bg-[#5c5fc8]'} text-white px-3`}>จำนวน</div>
            <div className={`flex border ${lrev == '999' ? 'border-[#009866]' : 'border-[#5c5fc8]'} gap-2 px-3`}>
                <div className={`${lrev == '999' ? 'text-[#009866] font-semibold' : 'text-[#5c5fc8]'} bg-white`}>{(rows.length > 0 ? rows.length - 1 : 0).toLocaleString('en')}</div>
                <div className='text-[#8b8b8b]'>of</div>
                <div className='text-[#8b8b8b]'>{defData.length.toLocaleString('en')}</div>
            </div>
        </div>
        <DialogFilter open={openFilter} close={setOpenFilter} column={columnFilter} year={year} />
        <DialogDistribution open={openDistribution} close={setOpenDistribution} year={year} />
        <DialogUnDistribution open={openUnDistribution} close={setOpenUnDistribution} year={year} />
    </div>
}

export default SaleForecaseReactGrid