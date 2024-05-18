import { useEffect, useMemo, useRef, useState } from 'react';
import {
    MaterialReactTable,
    // createRow,
    type MRT_ColumnDef,
    type MRT_Row,
    type MRT_TableOptions,
    useMaterialReactTable,
    MRT_RowVirtualizer,
} from 'material-react-table';
import { API_GET_SALE } from '../service/saleforecase.service';
import { MSale } from '../interface/saleforecase.interface';

function SaleForecaseDev() {
    const [heightTable, setHeightTable] = useState<number>(500);
    const rowVirtualizerInstanceRef = useRef<MRT_RowVirtualizer>(null);
    const [once, setOnce] = useState<boolean>(true);
    const [load, setLoad] = useState<boolean>(true);
    const [data, setData] = useState<MSale[]>([]);
    useEffect(() => {
        if (once == true) {
            SearchData();
            setOnce(false);
        }
    }, [once]);

    const handleResize = () => {
        setHeightTable(handleChangeWidth());
    }
    useEffect(() => {
        window.addEventListener("resize", handleResize, false);
    }, [])

    const SearchData = async () => {
        setLoad(true);
        let ApiSearchData = await API_GET_SALE({});
        setHeightTable(handleChangeWidth());
        setLoad(false);
        setData(ApiSearchData);
    }
    const cols: any = [
        {
            accessorKey: 'ym',
            header: 'M-Y',
            enableEditing: false,
            size: 80,
        },
        {
            accessorKey: 'customer',
            header: 'Customer',
            muiEditTextFieldProps: ({ cell, row }) => ({
                type: 'text',
                required: true,
            }),
        },
        {
            accessorKey: 'modelName',
            header: 'Model',
            muiEditTextFieldProps: ({ cell, row }) => ({
                type: 'text',
                required: true,
            }),
        },
        {
            accessorKey: 'diameter',
            header: 'Diameter',
            muiEditTextFieldProps: ({ cell, row }) => ({
                type: 'text',
                required: true,
            }),
        },
        {
            accessorKey: 'pltype',
            header: 'PL Type',
            muiEditTextFieldProps: ({ cell, row }) => ({
                type: 'text',
                required: true,
            }),
        },
    ];
    [...Array(31)].map((o: any, i: number) => {
        let kDay = (i + 1).toLocaleString('en', { minimumIntegerDigits: 2, useGrouping: false });
        cols.push({
            accessorKey: `d${kDay}`,
            header: `${kDay}`,
            size: 55,
            enableSorting: false,
            enableFilters: true,
            enableColumnOrdering: false,
            enableColumnFilter: false,
            enableColumnFilterModes: false,
            showColumnFilters: false,
            enableColumnActions: false,
        });
    })
    const columns = useMemo<MRT_ColumnDef<MSale>[]>(
        () => cols, []
    );
    function handleChangeWidth() {
        let height: number = 500;
        try {
            let heightOutlet: any = document.getElementById('outlet')?.clientHeight;
            // let heightGroupFilter:any = document.getElementById('group-search')?.clientHeight;
            let heightGroupFilter: number = 0;
            height = heightOutlet - heightGroupFilter;
            height = height - 100;
        } catch {
            height = 500;
        }
        if (isNaN(height)) {
            height = 500;
        }
        console.log(height)
        return height;
    }
    const table = useMaterialReactTable({
        columns,
        data: data,
        editDisplayMode: 'table', //default ('row', 'cell', 'table', and 'custom' are also available)
        enableEditing: true,
        enableColumnVirtualization: true,
        enableRowVirtualization: true,
        rowVirtualizerInstanceRef, //optional
        rowVirtualizerOptions: { overscan: 100 }, //optionally customize the row virtualizer
        columnVirtualizerOptions: { overscan: 1 }, //optionally customize the column virtualizer
        muiTableContainerProps: { sx: { maxHeight: `200px` } },
        state: {
            isLoading: load
        },
        enablePagination: false, // ปิด/เปิด ตัวเลือกหลายหน้า
        initialState: {
            showColumnFilters: true, // แสดงช่องค้นหา column
        }
    });
    return (
        <div className='p-6'>
            <div id="content">
                <MaterialReactTable table={table} />
            </div>
        </div>
    )
}

export default SaleForecaseDev