//@ts-nocheck
import { ChangeEvent, useEffect, useState } from 'react'
import { ReactGrid, Column, Row, CellChange, TextCell } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import { MFilterSale, MGetSale, MMasterFilter, MSale } from '../interface/saleforecase.interface';
import { API_GET_SALE, API_UPDATE_SALE } from '../service/saleforecase.service';
import DialogFilter from '../dialog/saleforecase.filter.dialog';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import DialogDistribution from '../dialog/saleforecase.dialog.distribution';
import DialogUnDistribution from '../dialog/saleforecase.dialog.undistribution';
import { getModelGroupOfModelName } from '../function/main.function';
import { downloadExcel } from 'react-export-table-to-excel';
import { Button, Select, Spin } from 'antd';
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineRotateLeft } from "react-icons/ai";
import { AiOutlineRotateRight } from "react-icons/ai";
import { AiOutlineClear } from "react-icons/ai";
import { AiFillFilter } from "react-icons/ai";
import { AiOutlineFilter } from "react-icons/ai";


const colWidth: number = 150;
const colWidthDay: number = 65;
const getColumns = (): Column[] => [...[
    { columnId: "ym", width: 90 },
    { columnId: "customer", width: 90 },
    { columnId: "modelCode", width: 70 },
    { columnId: "modelName", width: colWidth },
    { columnId: "diameter", width: 100 },

    //@ts-ignore
], ...[...Array(31)].map((o: any, i: number) => (
    { columnId: `d${(i + 1).toLocaleString('en', { minimumIntegerDigits: 2 })}`, width: colWidthDay }
)), ...[{ columnId: "pltype", width: 125 }, { columnId: "total", width: 75 }]];
const headerRow: Row = {
    rowId: "header",
    cells: [
        { type: "header", text: `MM/YYYY` },
        { type: "header", text: "Customer" },
        { type: "header", text: "M.CODE" },
        { type: "header", text: "M.NAME" },
        { type: "header", text: "Diameter" },
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
        { type: "header", text: "PLTYPE" },
        { type: "header", text: "TOTAL" },
    ]
};

const SaleTotal = (o: MSale) => {
    let Total: number = 0;
    [...Array(31)].map((_, i: number) => {
        let day = (i + 1).toString().padStart(2, '0');
        Total += Number((o as any)[`d${day}`]);
    })
    return Total.toLocaleString('en');
}
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
            { type: "text", text: (sale.d01 != null && typeof sale.d01 !== 'undefined' && !isNaN(sale.d01) ? sale.d01.toString() : '0') },
            { type: "text", text: (sale.d02 != null && typeof sale.d02 != 'undefined' && !isNaN(sale.d02) ? sale.d02.toString() : '0') },
            { type: "text", text: (sale.d03 != null && typeof sale.d03 != 'undefined' && !isNaN(sale.d03) ? sale.d03.toString() : '0') },
            { type: "text", text: (sale.d04 != null && typeof sale.d04 != 'undefined' && !isNaN(sale.d04) ? sale.d04.toString() : '0') },
            { type: "text", text: (sale.d05 != null && typeof sale.d05 != 'undefined' && !isNaN(sale.d05) ? sale.d05.toString() : '0') },
            { type: "text", text: (sale.d06 != null && typeof sale.d06 != 'undefined' && !isNaN(sale.d06) ? sale.d06.toString() : '0') },
            { type: "text", text: (sale.d07 != null && typeof sale.d07 != 'undefined' && !isNaN(sale.d07) ? sale.d07.toString() : '0') },
            { type: "text", text: (sale.d08 != null && typeof sale.d08 != 'undefined' && !isNaN(sale.d08) ? sale.d08.toString() : '0') },
            { type: "text", text: (sale.d09 != null && typeof sale.d09 != 'undefined' && !isNaN(sale.d09) ? sale.d09.toString() : '0') },
            { type: "text", text: (sale.d10 != null && typeof sale.d10 != 'undefined' && !isNaN(sale.d10) ? sale.d10.toString() : '0') },
            { type: "text", text: (sale.d11 != null && typeof sale.d11 != 'undefined' && !isNaN(sale.d11) ? sale.d11.toString() : '0') },
            { type: "text", text: (sale.d12 != null && typeof sale.d12 != 'undefined' && !isNaN(sale.d12) ? sale.d12.toString() : '0') },
            { type: "text", text: (sale.d13 != null && typeof sale.d13 != 'undefined' && !isNaN(sale.d13) ? sale.d13.toString() : '0') },
            { type: "text", text: (sale.d14 != null && typeof sale.d14 != 'undefined' && !isNaN(sale.d14) ? sale.d14.toString() : '0') },
            { type: "text", text: (sale.d15 != null && typeof sale.d15 != 'undefined' && !isNaN(sale.d15) ? sale.d15.toString() : '0') },
            { type: "text", text: (sale.d16 != null && typeof sale.d16 != 'undefined' && !isNaN(sale.d16) ? sale.d16.toString() : '0') },
            { type: "text", text: (sale.d17 != null && typeof sale.d17 != 'undefined' && !isNaN(sale.d17) ? sale.d17.toString() : '0') },
            { type: "text", text: (sale.d18 != null && typeof sale.d18 != 'undefined' && !isNaN(sale.d18) ? sale.d18.toString() : '0') },
            { type: "text", text: (sale.d19 != null && typeof sale.d19 != 'undefined' && !isNaN(sale.d19) ? sale.d19.toString() : '0') },
            { type: "text", text: (sale.d20 != null && typeof sale.d20 != 'undefined' && !isNaN(sale.d20) ? sale.d20.toString() : '0') },
            { type: "text", text: (sale.d21 != null && typeof sale.d21 != 'undefined' && !isNaN(sale.d21) ? sale.d21.toString() : '0') },
            { type: "text", text: (sale.d22 != null && typeof sale.d22 != 'undefined' && !isNaN(sale.d22) ? sale.d22.toString() : '0') },
            { type: "text", text: (sale.d23 != null && typeof sale.d23 != 'undefined' && !isNaN(sale.d23) ? sale.d23.toString() : '0') },
            { type: "text", text: (sale.d24 != null && typeof sale.d24 != 'undefined' && !isNaN(sale.d24) ? sale.d24.toString() : '0') },
            { type: "text", text: (sale.d25 != null && typeof sale.d25 != 'undefined' && !isNaN(sale.d25) ? sale.d25.toString() : '0') },
            { type: "text", text: (sale.d26 != null && typeof sale.d26 != 'undefined' && !isNaN(sale.d26) ? sale.d26.toString() : '0') },
            { type: "text", text: (sale.d27 != null && typeof sale.d27 != 'undefined' && !isNaN(sale.d27) ? sale.d27.toString() : '0') },
            { type: "text", text: (sale.d28 != null && typeof sale.d28 != 'undefined' && !isNaN(sale.d28) ? sale.d28.toString() : '0') },
            { type: "text", text: (sale.d29 != null && typeof sale.d29 != 'undefined' && !isNaN(sale.d29) ? sale.d29.toString() : '0') },
            { type: "text", text: (sale.d30 != null && typeof sale.d30 != 'undefined' && !isNaN(sale.d30) ? sale.d30.toString() : '0') },
            { type: "text", text: (sale.d31 != null && typeof sale.d31 != 'undefined' && !isNaN(sale.d31) ? sale.d31.toString() : '0') },
            { type: "text", text: sale.pltype },
            { type: "text", text: SaleTotal(sale) },
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
        { column: 'PLTYPE', field: 'pltype' },
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
    const [monthSelected, setMonthSelected] = useState<string>('all');

    // const rYear: string[] = [moment().add('year', -1).format('YYYY'), moment().format('YYYY'), moment().add('year', 1).format('YYYY')]
    const [year, setYear] = useState<string>((reduxCore.filters != undefined && reduxCore.filters.y != undefined && reduxCore.filters.y != '') ? reduxCore.filters.y : moment().format('YYYY'));
    const [change, setChange] = useState<MSale[]>([]);
    const [openDistribution, setOpenDistribution] = useState<boolean>(false);
    const [openUnDistribution, setOpenUnDistribution] = useState<boolean>(false);
    const [lrev, setLrev] = useState<string>("");
    const [excelData, setExcelData] = useState<any[]>([]);
    const [loadExcel, setLoadExcel] = useState<boolean>(false);
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
        dispatch({ type: 'SET_FILTER_SALE_PAGE', payload: { y: year } })
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
        setLoad(false);
        setData(ApiSearchData.data);
    }

    const handleFilter = () => {
        let buffData: MSale[] = defData.slice();
        reduxFilter.map((o: MFilterSale) => {
            if (o.value.length) {
                let field: string = '';
                if (masterFilter.findIndex((x: MMasterFilter) => x.column == o.text) != -1) {
                    field = masterFilter.filter((x: MMasterFilter) => x.column == o.text)[0].field;
                    if (field != '' && field != null) {
                        // buffData = buffData.filter((oSale: MSale) => o.value.toString().toLowerCase().includes(oSale[field].toString().toLowerCase()));
                        buffData = buffData.filter((oSale: MSale) => {
                            if (o.value.toString().toLowerCase().includes(oSale[field].toString().toLowerCase())) {

                            }
                            let have: boolean = false;
                            o.value.map((oValue: string) => {
                                if (oValue.toLowerCase() == oSale[field].toString().toLowerCase()) {
                                    have = true;
                                }
                            })
                            if (have == false) {
                                return false;
                            }
                            return o;
                        });
                    }
                }
            }
        });
        setData(buffData);
    }

    const handleClearFilter = () => {
        dispatch({ type: 'CLEAR_FILTER' });
        handleFilter();
    }
    useEffect(() => {
        setRows(getRows(data));
        if (change.length > 0) {
            update(change);
        }
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
            const personIndex = change.rowId as number;
            const fieldName = change.columnId;
            if (fieldName.toString().startsWith("d") && fieldName.toString().toLowerCase() != 'diameter') {
                prevPeople[personIndex][fieldName] = Number(change.newCell.text.replace('\r', '').replace(',', ''));
                dataUpdate.push(prevPeople[Number(personIndex)]);
            }
        });
        setChange(dataUpdate);
        return [...prevPeople];
    };

    const handleChanges = (changes: CellChange<any>[]) => {
        if (lrev != '999') {
            setData((prevPeople) => applyChangesToPeople(changes, prevPeople))
        }
    };
    const [summarys, setSummarys] = useState<{ [key: string]: any }>({
        sum1YC: { text: '1YC', value: 0 },
        sum2YC: { text: '2YC', value: 0 },
        sumSCR: { text: 'SCR', value: 0 },
        sumODM: { text: 'ODM', value: 0 },
        sumTotal: { text: 'Total', value: 0 }
    });
    useEffect(() => {
        if (defData.length > 0) {
            let clone = summarys;
            clone.sum1YC.value = defData.filter(x => x.modelName.substring(0, 2) == '1Y' && (monthSelected != 'all' ? x.ym == `${year}${monthSelected}` : true)).reduce((a, b) => a + (b.d01 + b.d02 + b.d03 + b.d04 + b.d05 + b.d06 + b.d07 + b.d08 + b.d09 + b.d10 + b.d11 + b.d12 + b.d13 + b.d14 + b.d15 + b.d16 + b.d17 + b.d18 + b.d19 + b.d20 + b.d21 + b.d22 + b.d23 + b.d24 + b.d25 + b.d26 + b.d27 + b.d28 + b.d29 + b.d30 + b.d31), 0);
            clone.sum2YC.value = defData.filter(x => x.modelName.substring(0, 2) == '2Y' && (monthSelected != 'all' ? x.ym == `${year}${monthSelected}` : true)).reduce((a, b) => a + (b.d01 + b.d02 + b.d03 + b.d04 + b.d05 + b.d06 + b.d07 + b.d08 + b.d09 + b.d10 + b.d11 + b.d12 + b.d13 + b.d14 + b.d15 + b.d16 + b.d17 + b.d18 + b.d19 + b.d20 + b.d21 + b.d22 + b.d23 + b.d24 + b.d25 + b.d26 + b.d27 + b.d28 + b.d29 + b.d30 + b.d31), 0);
            clone.sumSCR.value = defData.filter(x => x.modelName.substring(0, 1) == 'J' && (monthSelected != 'all' ? x.ym == `${year}${monthSelected}` : true)).reduce((a, b) => a + (b.d01 + b.d02 + b.d03 + b.d04 + b.d05 + b.d06 + b.d07 + b.d08 + b.d09 + b.d10 + b.d11 + b.d12 + b.d13 + b.d14 + b.d15 + b.d16 + b.d17 + b.d18 + b.d19 + b.d20 + b.d21 + b.d22 + b.d23 + b.d24 + b.d25 + b.d26 + b.d27 + b.d28 + b.d29 + b.d30 + b.d31), 0);
            clone.sumODM.value = defData.filter(x => x.modelName.substring(0, 1) != 'J' && x.modelName.substring(0, 2) != '1Y' && x.modelName.substring(0, 2) != '2Y' && (monthSelected != 'all' ? x.ym == `${year}${monthSelected}` : true)).reduce((a, b) => a + (b.d01 + b.d02 + b.d03 + b.d04 + b.d05 + b.d06 + b.d07 + b.d08 + b.d09 + b.d10 + b.d11 + b.d12 + b.d13 + b.d14 + b.d15 + b.d16 + b.d17 + b.d18 + b.d19 + b.d20 + b.d21 + b.d22 + b.d23 + b.d24 + b.d25 + b.d26 + b.d27 + b.d28 + b.d29 + b.d30 + b.d31), 0);
            clone.sumTotal.value = defData.filter(x => (monthSelected != 'all' ? x.ym == `${year}${monthSelected}` : true)).reduce((a, b) => a + (b.d01 + b.d02 + b.d03 + b.d04 + b.d05 + b.d06 + b.d07 + b.d08 + b.d09 + b.d10 + b.d11 + b.d12 + b.d13 + b.d14 + b.d15 + b.d16 + b.d17 + b.d18 + b.d19 + b.d20 + b.d21 + b.d22 + b.d23 + b.d24 + b.d25 + b.d26 + b.d27 + b.d28 + b.d29 + b.d30 + b.d31), 0);
            setSummarys({
                ...summarys,
            })
        } else {
            setSummarys({
                sum1YC: { text: '1YC', value: 0 },
                sum2YC: { text: '2YC', value: 0 },
                sumSCR: { text: 'SCR', value: 0 },
                sumODM: { text: 'ODM', value: 0 },
                sumTotal: { text: 'Total', value: 0 }
            })
        }
    }, [data, defData, year, monthSelected])

    async function handleExport() {
        setLoadExcel(true);
        const excelFormat = data.map((oExcel: MSale) => {
            let total = 0;
            //@ts-ignore
            [...Array(31)].map((oo: any, ii: number) => {
                let day: string = (ii + 1).toLocaleString('en', { minimumIntegerDigits: 2 });
                total += Number(oExcel[`d${day}`]);
            })
            return {
                ym: oExcel.ym,
                customer: oExcel.customer,
                modelGroup: getModelGroupOfModelName(oExcel.modelName),
                modelName: oExcel.modelName,
                sebango: oExcel.modelCode,
                diameter: oExcel.diameter,
                pltype: oExcel.pltype,
                total: total,
                d01: oExcel.d01,
                d02: oExcel.d02,
                d03: oExcel.d03,
                d04: oExcel.d04,
                d05: oExcel.d05,
                d06: oExcel.d06,
                d07: oExcel.d07,
                d08: oExcel.d08,
                d09: oExcel.d09,
                d10: oExcel.d10,
                d11: oExcel.d11,
                d12: oExcel.d12,
                d13: oExcel.d13,
                d14: oExcel.d14,
                d15: oExcel.d15,
                d16: oExcel.d16,
                d17: oExcel.d17,
                d18: oExcel.d18,
                d19: oExcel.d19,
                d20: oExcel.d20,
                d21: oExcel.d21,
                d22: oExcel.d22,
                d23: oExcel.d23,
                d24: oExcel.d24,
                d25: oExcel.d25,
                d26: oExcel.d26,
                d27: oExcel.d27,
                d28: oExcel.d28,
                d29: oExcel.d29,
                d30: oExcel.d30,
                d31: oExcel.d31,
            }
        });
        if (excelFormat.length > 0) {
            setExcelData(excelFormat);
        }
    }
    const header = ["YYYYMM", "Customer", "M.Grp", "Model", "Sebango", "Diameter", "Pltype", "Total", "D01", "D02", "D03", "D04", "D05", "D06", "D07", "D08", "D09", "D10", "D11", "D12", "D13", "D14", "D15", "D16", "D17", "D18", "D19", "D20", "D21", "D22", "D23", "D24", "D25", "D26", "D27", "D28", "D29", "D30", "D31"];
    useEffect(() => {
        if (excelData.length > 0) {
            downloadExcel({
                fileName: `saleforecase-${(year)}`,
                sheet: year,
                tablePayload: {
                    header,
                    body: excelData,
                },
            });
            setExcelData([]);
            setLoadExcel(false);
        }
    }, [excelData])


    return <div className='p-6 flex flex-col gap-3' id='reactGrid'>
        <div className='flex flex-row  py-3   rounded-lg px-6  shadow-sm ' style={{ border: '1px solid #ddd' }} >
            <div className='flex grow flex-row items-center gap-3 select-none'>
                <span>เครื่องมือค้นหา </span>
                <Select
                    defaultValue={year}
                    options={[
                        { value: moment().subtract(1, 'years').format('YYYY'), label: moment().subtract(1, 'years').format('YYYY') },
                        { value: moment().format('YYYY'), label: moment().format('YYYY') },
                        { value: moment().add(1, 'years').format('YYYY'), label: moment().add(1, 'years').format('YYYY') }
                    ]}
                    onChange={(value) => setYear(value)}
                />
            </div>
            <div className='flex gap-2'>
                <Button type='primary' icon={<AiOutlineSearch />} onClick={SearchData} >ค้นหา</Button>
                <Button onClick={handleExport} loading={loadExcel} icon={
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20px" height="20px"><path fill="#169154" d="M29,6H15.744C14.781,6,14,6.781,14,7.744v7.259h15V6z" /><path fill="#18482a" d="M14,33.054v7.202C14,41.219,14.781,42,15.743,42H29v-8.946H14z" /><path fill="#0c8045" d="M14 15.003H29V24.005000000000003H14z" /><path fill="#17472a" d="M14 24.005H29V33.055H14z" /><g><path fill="#29c27f" d="M42.256,6H29v9.003h15V7.744C44,6.781,43.219,6,42.256,6z" /><path fill="#27663f" d="M29,33.054V42h13.257C43.219,42,44,41.219,44,40.257v-7.202H29z" /><path fill="#19ac65" d="M29 15.003H44V24.005000000000003H29z" /><path fill="#129652" d="M29 24.005H44V33.055H29z" /></g><path fill="#0c7238" d="M22.319,34H5.681C4.753,34,4,33.247,4,32.319V15.681C4,14.753,4.753,14,5.681,14h16.638 C23.247,14,24,14.753,24,15.681v16.638C24,33.247,23.247,34,22.319,34z" /><path fill="#fff" d="M9.807 19L12.193 19 14.129 22.754 16.175 19 18.404 19 15.333 24 18.474 29 16.123 29 14.013 25.07 11.912 29 9.526 29 12.719 23.982z" /></svg>}>Export</Button>
            </div>
        </div>
        <div className={`${defData.length == 0 && 'hidden'} flex  items-center gap-3 ${lrev == '999' ? 'bg-[#00986610]' : 'bg-[#5c5fc810]'} py-2 px-6 rounded-md select-none`} style={{ border: `1px solid ${lrev == '999' ? '#00986610' : '#5c5fc810'}` }}>
            <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${lrev == "999" ? 'bg-[#00986675]' : 'bg-[#5c5fc875]'} opacity-75`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${lrev == "999" ? 'bg-[#009866]' : 'bg-[#5c5fc8]'}`}></span>
            </span>
            <span>{lrev == "999" ? 'ข้อมูลการขาย' : 'หน่วยงานวางแผนการผลิตกำลัง'}</span>
            <span className={`${lrev == "999" ? 'text-[#009688]' : 'text-[#5c5fc8]'} font-semibold`}>{lrev == "999" ? '"แจกจ่าย"' : '"แก้ไข"'}</span>
            <span> {lrev != "999" && 'แก้ไขข้อมูล '}อยู่ขณะนี้</span>
            <div>
                {
                    lrev == "999" ? <Button disabled = {load} type='primary' icon={<AiOutlineRotateLeft />} onClick={() => setOpenUnDistribution(true)}>เข้าสู่โหมดแก้ไข</Button> : <Button  disabled = {load}  type='primary' onClick={() => setOpenDistribution(true)} icon={<AiOutlineRotateRight />}>แจกจ่าย</Button>
                }
            </div>
        </div>
        <div className='flex justify-between'>
            <table className='shadow-md' style={{ border: '1px solid #5c5fc850' }}>
                <tbody>
                    <tr className='font-semibold'>
                        <td className={`border px-3 text-white ${lrev == '999' ? 'bg-[#009866] border-[#009866]' : 'bg-[#5c5fc8] border-[#5c5fc8] '}`}>Summary </td>
                        <td className={`border text-white ${lrev == '999' ? 'bg-[#009866] border-[#009866]' : 'bg-[#5c5fc8] border-[#5c5fc8]'}`}>
                            <span>Month : </span>
                            <Select onChange={(e: ChangeEvent<HTMLSelectElement>) => setMonthSelected(e)} className='w-[75px]' value={monthSelected}>

                                <Select.Option value="all">ALL</Select.Option>
                                {
                                    [...Array(12)].map((o: any, i: number) => {
                                        let month = (i + 1).toLocaleString('en', { minimumIntegerDigits: 2 });
                                        return <Select.Option key={i} value={month}>{month}</Select.Option>
                                    })
                                }
                            </Select>
                        </td>
                        {
                            Object.keys(summarys).map((o: string, i: number) => {
                                let value: number = (summarys[o] != undefined && summarys[o].value != undefined) ? summarys[o].value : 0;
                                let text: string = (summarys[o] != undefined && summarys[o].text != undefined) ? summarys[o].text : '-';
                                return <td key={i} className={`border ${lrev == '999' ? 'border-[#009866] bg-[#00986610]' : 'border-[#5c5fc8] bg-[#5c5fc810]'}`}>
                                    <div className='flex gap-1 px-2'>
                                        <span>{text} :</span>
                                        <span className={`${lrev == '999' ? 'text-[#009866]' : 'text-[#5c5fc8]'} font-bold`}>{value.toLocaleString('en')}</span>
                                    </div>
                                </td>
                            })
                        }
                    </tr>
                </tbody>
            </table>
            <div>
                <div className=' rounded-md px-6 py-2 text-red-500 font-semibold drop-shadow-sm shadow-sm' style={{ border: '1px solid #ddd' }}>Secret</div>
            </div>
        </div>
        <div className='flex '>
            <div className='grow flex flex-row'>
                {
                    reduxFilter.map((o: MFilterSale, i: number) => {
                        let counter: number = o.value.length;
                        return <div key={i} className='py-2 flex flex-col items-center px-3 w-[150px] gap-1 border' >
                            <div className='flex gap-2 items-center'>
                                <span className={`${counter > 0 && 'text-[#5c5fc8] font-semibold'} transition-all duration-300`}>{o.text} </span>
                                {
                                    counter > 0 ? <span className='text-red-500 font-semibold'>({counter})</span> : ''
                                }
                            </div>
                            <div key={i} className={`   flex items-center justify-center   gap-1`}>
                                <Button shape='circle' onClick={() => setColumnFilter(o.text)} >
                                    {
                                        counter == 0 ? <AiOutlineFilter /> : <AiFillFilter />
                                    }
                                </Button>
                            </div>
                        </div>
                    })
                }
            </div>
            <div className=' flex items-center gap-2'>
                <Button color='danger' icon={<AiOutlineClear />} onClick={handleClearFilter}>ล้างตัวกรอง</Button>
            </div>
        </div>
        <div className={`w-[100%] overflow-x-auto  h-[500px]  pt-0 gap-3 ${lrev == "999" ? 'tb-distribution' : 'tb-undistribution'}`}>
            {/* {
                load == true ? <div id='loading' className={`flex flex-col gap-2 items-center justify-center h-full  text-white rounded-lg ${lrev == '999' ? 'bg-[#009866]' : 'bg-[#5c5fc8]'}`}>
                    <CircularProgress sx={{ color: 'white' }} />
                    <span className='drop-shadow-xl'>กำลังโหลดข้อมูล</span>
                </div> : (rows.length == 0 ? <div id='nodata'>
                    <span className='text-[#5c5fc8]'>ไม่พบข้อมูล</span>
                </div> : )
            }
            {
                (data.length == 0 && load == false) && <div className='border text-center select-none '>ไม่พบข้อมูลที่คุณค้นหา</div>
            } */}
            <Spin spinning={load} >
                <ReactGrid rows={rows} columns={columns} stickyTopRows={1} stickyLeftColumns={4} onCellsChanged={handleChanges} stickyRightColumns={2} />
            </Spin>
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