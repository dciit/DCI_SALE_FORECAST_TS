import React, { useEffect, useState } from 'react'
import { render } from "react-dom";
import { ReactGrid, Column, Row } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import { MSale } from '../interface/saleforecase.interface';
import { API_GET_SALE } from '../service/saleforecase.service';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import FilterListOffOutlinedIcon from '@mui/icons-material/FilterListOffOutlined';
import SwapVertOutlinedIcon from '@mui/icons-material/SwapVertOutlined';
import { faker } from '@faker-js/faker';
const getColumns = (): Column[] => [
    { columnId: "ym", width: 150 },
    { columnId: "customer", width: 150 },
    { columnId: "modelName", width: 150 },
    { columnId: "diamater", width: 150 },
    { columnId: "pltype", width: 150 }
];

const headerRow: Row = {
    rowId: "header",
    cells: [
        { type: "header", text: `MM/YYYY` },
        { type: "header", text: "Customer" },
        { type: "header", text: "Model" },
        { type: "header", text: "Diamater" },
        { type: "header", text: "PLTYPE" },
    ]
};
const getRows = (sale: MSale[]): Row[] => [
    headerRow,
    ...sale.map<Row>((sale, idx) => ({
        rowId: idx,
        cells: [
            { type: "text", text: sale.ym },
            { type: "text", text: sale.customer },
            { type: "text", text: sale.modelName },
            { type: "text", text: sale.diameter },
            { type: "text", text: sale.pltype }
        ]
    }))
];
function SaleForecaseReactGrid() {

    const [heightTable, setHeightTable] = useState<number>(500);
    const [once, setOnce] = useState<boolean>(true);
    const [load, setLoad] = useState<boolean>(true);
    const [data, setData] = useState<MSale[]>([]);
    const columns = getColumns();
    const [people] = React.useState<MSale[]>([]);
    const [rows, setRows] = useState<Row[]>([]);
    useEffect(() => {
        if (once == true) {
            SearchData();
            setOnce(false);
        }
    }, [once]);
    const SearchData = async () => {
        setLoad(true);
        let ApiSearchData = await API_GET_SALE({});
        setRows(getRows(ApiSearchData));
        setLoad(false);
        // setData(ApiSearchData);
    }
    // return <></>
    return <div className='p-6 '>
        <div className='flex '>
            {
                [...Array(5)].map((o: any, i: number) => {
                    let rndText: string = faker.name.firstName()
                    return <div className='py-3 flex flex-col items-start px-3 w-[150px] gap-1' >
                        <div className='flex gap-2 items-center'>
                            <span>{rndText}</span>
                            <SwapVertOutlinedIcon className='text-[#8b8b8b]' style={{ fontSize: '18px' }} />
                        </div>
                        <div key={i} className={`   flex items-center justify-start gap-1`}>
                            <FilterListOutlinedIcon style={{ fontSize: '18px' }} />
                            <input type="text" className='rounded-md px-3 border bg-red-50 w-full' placeholder={`Filter By ${rndText}`} />
                        </div>
                    </div>
                })
            }
        </div>
        <div className='h-[500px] wrapper'>
            <ReactGrid rows={rows} columns={columns} />
        </div>
    </div>
}

export default SaleForecaseReactGrid