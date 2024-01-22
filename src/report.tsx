import { useEffect, useMemo, useState } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
} from 'material-react-table';
import { useNavigate, useParams } from 'react-router-dom';
import { API_GET_SALE } from './Service';
import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
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
};

//nested data is ok, see accessorKeys in ColumnDef below
function Report() {
    const [loading, setLoading] = useState<boolean>(true);
    var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const navigate = useNavigate();
    const [data, setData] = useState<Sale[]>([]);
    const { ym } = useParams();
    const _year: string = typeof ym == 'string' ? ym?.substring(0, 4) : '';
    const _month: string = typeof ym == 'string' ? ym?.substring(4, 6) : '';
    let cols: MRT_ColumnDef<Sale>[] = [
        {
            accessorKey: 'customer', //access nested data with dot notation
            header: 'Customer',
            size: 150,
        },
        {
            accessorKey: 'modelName', //access nested data with dot notation
            header: 'ModelName',
            size: 150,
        },
        {
            accessorKey: 'sebango', //access nested data with dot notation
            header: 'Sebango',
            size: 150,
        },
        {
            accessorKey: 'pltype', //access nested data with dot notation
            header: 'Pltype',
            size: 150,
        },
    ];
    [...Array(31)].map((oDay: any, iDay: number) => {
        let day = iDay + 1;
        cols.push({
            accessorKey: `d${day.toLocaleString('en', { minimumIntegerDigits: 2 })}`,
            header: `D${day.toLocaleString('en', { minimumIntegerDigits: 2 })}`,
            size: 75,
            Cell: (cell: any) => {
                let SaleOfDay = cell.cell.getValue();
                return <span className={`${oDay} ${SaleOfDay > 0 ? 'font-bold' : 'text-[#ddd]'}`}>{SaleOfDay}</span>
            }
        })
    })

    const columns = useMemo<MRT_ColumnDef<Sale>[]>(
        () => cols,
        [],
    );

    useEffect(() => {
        init();
    }, [])
    async function init() {
        setLoading(true);
        let apiData = await API_GET_SALE({ ym: ym });
        setData(apiData.data);
        setLoading(false);
    }
    const table = useMaterialReactTable({
        columns,
        data,
        initialState: {
            density: 'compact',
            pagination: {
                pageSize: 1000,
                pageIndex: 0
            }
        },
        enableDensityToggle: false,
        enableFullScreenToggle: false,
        muiPaginationProps: {
            rowsPerPageOptions: [1000],
            showFirstButton: false,
            showLastButton: false,
        },
        paginationDisplayMode: 'pages',
        muiSearchTextFieldProps: {
            size: 'small',
            variant: 'outlined',
        },
    });
    let BASE_PATH = import.meta.env.VITE_PATH;
    function handleHome() {
        navigate(`/${BASE_PATH}/home`)
    }
    return <div className='page-report'>
        <Stack p={3} gap={2}>
            <div className='flex justify-center'>
                <Typography variant='h4'>SALE FORECAST REPORT  {_year}</Typography>&nbsp;
                <Typography variant='h4' className='text-blue-500'>{_month != '' ? monthNames[parseInt(_month) - 1].toUpperCase() : '-'}</Typography>
            </div>
            <Stack justifyContent={'start'} justifyItems={'start'} alignContent={'start'} alignItems={'start'}>
                <Button variant='contained' onClick={handleHome} startIcon={<HomeIcon />}>กลับหน้าแรก</Button>
            </Stack>
            {
                loading ? <Box>
                    <Stack gap={2} direction={'column'} alignItems={'center'}>
                        <CircularProgress />
                        <Typography>กำลังโหลดข้อมูล ...</Typography>
                    </Stack>
                </Box> : <MaterialReactTable table={table} />
            }
        </Stack>
    </div>;
}

export default Report