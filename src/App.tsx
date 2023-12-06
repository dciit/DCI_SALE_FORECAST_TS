import { useEffect, useState } from 'react'
import './App.css'
import { ReactGrid, Column, Row, TextCell, CellChange, DefaultCellTypes } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import { Stack, Button, Card, Box, Typography, TextField, Breadcrumbs, Link, Avatar, Paper } from '@mui/material';
import { API_CHANGE_STATUS, API_CLEAR_SALE, API_DISTRIBUTION_SALE, API_GET_SALE, API_STATUS_SALE, API_UPDATE_SALE } from './Service';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import HomeIcon from '@mui/icons-material/Home';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Logo from './assets/logo.svg';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import moment from 'moment';
import { MResponse, MStatusSale, Person } from './Interface';
import BorderColorIcon from '@mui/icons-material/BorderColor';
const getColumns = (): Column[] => [
  { columnId: "customer", width: 100 },
  { columnId: "modelCode", width: 150 },
  { columnId: "sebango", width: 75 },
  { columnId: "pltype", width: 150 },
  { columnId: "d01", width: 75 },
  { columnId: "d02", width: 75 },
  { columnId: "d03", width: 75 },
  { columnId: "d04", width: 75 },
  { columnId: "d05", width: 75 },
  { columnId: "d06", width: 75 },
  { columnId: "d07", width: 75 },
  { columnId: "d08", width: 75 },
  { columnId: "d09", width: 75 },
  { columnId: "d10", width: 75 },
];

const headerRow: Row = {
  rowId: "header",
  cells: [
    { type: "header", text: "customer" },
    { type: "header", text: "modelCode" },
    { type: "header", text: "sebango" },
    { type: "header", text: "pltype" },
    { type: "header", text: "d01" },
    { type: "header", text: "d02" },
    { type: "header", text: "d03" },
    { type: "header", text: "d04" },
    { type: "header", text: "d05" },
    { type: "header", text: "d06" },
    { type: "header", text: "d07" },
    { type: "header", text: "d08" },
    { type: "header", text: "d09" },
    { type: "header", text: "d10" },
  ]
};

const getRows = (people: Person[]): Row[] => [
  headerRow,
  ...people.map<Row>((person, idx) => ({
    rowId: idx,
    cells: [
      { type: "text", text: person.customer },
      { type: "text", text: person.modelCode },
      { type: "text", text: person.sebango },
      { type: "text", text: person.pltype },
      { type: "text", text: person.d01.toString() },
      { type: "text", text: person.d02.toString() },
      { type: "text", text: person.d03.toString() },
      { type: "text", text: person.d04.toString() },
      { type: "text", text: person.d05.toString() },
      { type: "text", text: person.d06.toString() },
      { type: "text", text: person.d07.toString() },
      { type: "text", text: person.d08.toString() },
      { type: "text", text: person.d09.toString() },
      { type: "text", text: person.d10.toString() }
    ]
  }))
]

function App() {
  let empcode = "41256";
  let year = useSelector((state: any) => state.reducer.select.year);
  let month: number = useSelector((state: any) => state.reducer.select.month);
  const navigate = useNavigate();
  const [distribution, setDistribution] = useState<boolean>(false);
  const [rowAdd, setRowAdd] = useState<number>(10);
  const [rowCount, setRowCount] = useState<number>(10);
  const [people, setPeople] = useState<Person[]>([]);
  const [rows, setRows] = useState<Row<DefaultCellTypes>[]>([]);
  const columns = getColumns();
  let once = false;
  useEffect(() => {
    if (!once) {
      init();
      once = true;
    }
    return;
  }, []);

  useEffect(() => {
    if (people.length) {
      let oPeople = getRows(people);
      setRows(oPeople);
    }
  }, [people]);

  async function calApi() {
    return await API_GET_SALE({ ym: `${year}${month.toLocaleString('en', { minimumIntegerDigits: 2 })}` });
  }
  async function calStatusSale() {
    return await API_STATUS_SALE({ ym: `${year}${month.toLocaleString('en', { minimumIntegerDigits: 2 })}` });
  }
  async function init() {
    const apiSale = await calApi();
    const statusSale = await calStatusSale();
    console.log(statusSale)
    setDistribution(statusSale);
    const objSale = await defSale(apiSale);
    setPeople(objSale);
  }
  async function defSale(apiSale: any = []) {
    if (apiSale.length < 10) {
      [...Array(10)].map((i: number) => {
        if (typeof apiSale[i] == 'undefined') {
          apiSale.push({ customer: "", modelCode: "", sebango: "", pltype: "", d01: 0, d02: 0, d03: 0, d04: 0, d05: 0, d06: 0, d07: 0, d08: 0, d09: 0, d10: 0 });
        }
      });
    }
    return apiSale;
  }
  const applyChangesToPeople = (
    changes: CellChange<TextCell>[],
    prevPeople: Person[]
  ): Person[] => {
    changes.forEach((change) => {
      const personIndex = change.rowId;
      const fieldName = change.columnId;
      if (fieldName != 'customer' && fieldName != 'modelCode' && fieldName != 'sebango' && fieldName != 'pltype') {
        change.newCell.text = change.newCell.text.replace(/\D/g, '')
        prevPeople[personIndex][fieldName] = change.newCell.text == '' ? 0 : parseInt(change.newCell.text);
      } else {
        prevPeople[personIndex][fieldName] = change.newCell.text.toString();
      }

    });
    return [...prevPeople];
  };
  async function handleChanges(changes: CellChange<TextCell>[]) {
    await setPeople((prevPeople) => applyChangesToPeople(changes, prevPeople));
    const update = await API_UPDATE_SALE({ listSale: people, ym: `${year}${month.toLocaleString('en', { minimumIntegerDigits: 2 })}`, empcode: empcode });
    console.log(update)
  };
  async function handleAddRow() {
    let newRow: Person[] = [];
    [...Array(rowAdd)].map(() => {
      newRow.push({ customer: "", modelCode: "", sebango: "", pltype: "", d01: 0, d02: 0, d03: 0, d04: 0, d05: 0, d06: 0, d07: 0, d08: 0, d09: 0, d10: 0 })
    })
    setPeople([...people, ...newRow])
  }

  async function handleChangeEdit() {
    if (confirm('คุณต้องการปรับจาก "แจกจ่าย" => "แก้ไข" ใช่หรือไม่ ?')) {
      const changeStatus = await API_CHANGE_STATUS({ ym: `${year}${month.toLocaleString('en', { minimumIntegerDigits: 2 })}` });
      console.log(changeStatus)
    }
  }

  async function handleDistribution() {
    if (confirm('คุณต้องการที่จะแจกจ่ายข้อมูลฉบับนี้ ใช่หรือไม่ ? ')) {
      const distribution = await API_DISTRIBUTION_SALE({ ym: `${year}${month.toLocaleString('en', { minimumIntegerDigits: 2 })}` });
      console.log(distribution)
    }
  }
  async function handleClear() {
    try {
      const clear: any = await API_CLEAR_SALE({ ym: `${year}${month.toLocaleString('en', { minimumIntegerDigits: 2 })}` });
      console.log(clear)
      if (typeof clear.status != 'undefined' && clear.status) {
        console.log('success');
      } else {
        alert(`${clear.error}`)
      }
    } catch (e) {
      alert(`ไม่สามารถลบข้อมูลได้ เนื่องจาก ${e}`)
    }
  }

  return <Stack className='page'>
    <Stack p={6} className='bg-[#e1e1e1] h-[92%]' spacing={1}>
      <div role="presentation" >
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/home">
            หน้าหลัก
          </Link>
          <Typography color="text.primary">แก้ไข</Typography>
        </Breadcrumbs>
      </div>
      <Card>
        <Stack spacing={1} p={3} className='h-[100%]'>
          <Stack direction={'row'} spacing={1} alignItems={'center'} className='select-none' title="ปีและเดือนนี้กำลังอยู่ในระหว่างแก้ไข">
            <span className='text-[36px]'>{`${year}-${moment(month, 'M').format('MMM').toUpperCase()}`}</span>
            <Paper elevation={3} className={`h-[35px] flex justify-center items-center px-3 rounded-xl ${distribution ? 'bg-green-600' : 'bg-orange-500'} text-white gap-2`}  >
              {
                distribution ? <Stack direction={'row'} gap={1}>
                  <TaskAltIcon />
                  <Typography>แจกจ่าย</Typography>
                </Stack> : <Stack direction={'row'} gap={1}>
                  <AutoFixHighIcon />
                  <Typography>ระหว่างแก้ไข</Typography>
                </Stack>
              }
            </Paper>
          </Stack>
          <Stack direction={'row'} justifyContent={'space-between'} spacing={1} >
            <Stack direction={'row'} spacing={1}>
              <Button variant='outlined' startIcon={<HomeIcon />} onClick={() => navigate('../home')}>หน้าหลัก</Button>
              <Button onClick={handleChangeEdit} variant='contained' startIcon={<BorderColorIcon />} disabled={!distribution ? true : false}>แก้ไข</Button>
              <Button onClick={handleDistribution} variant='contained' startIcon={<ArrowUpwardIcon />} disabled={distribution ? true : false}>แจกจ่าย</Button>
              <Button onClick={handleClear} variant='contained' color="error" startIcon={<DeleteOutlineIcon />} disabled={distribution ? true : false}>ล้าง</Button>
            </Stack>
            <Stack direction={'row'} spacing={1}>
              <TextField size='small' value={rowAdd} onChange={(e) => setRowAdd(parseInt(e.target.value))} />
              <Button variant='contained' onClick={handleAddRow} startIcon={<SaveAltIcon />} disabled={distribution ? true : false}>เพิ่มรายการ</Button>
            </Stack>
          </Stack>
          <div className='wrapper'>
            {
              distribution ? <div>
                <table className='w-full tbSaleView select-none'>
                  <thead>
                    <tr>
                      {
                        columns.map((vCol: any, iCol: number) => {
                          return <th key={iCol} className={`w-[${vCol.width}px]`}>{vCol.columnId.toUpperCase()}</th>
                        })
                      }
                    </tr>
                  </thead>
                  <tbody>
                    {/* {
                      rows.map((vRow: any, iRow: number) => {
                        console.log(vRow)
                        return vRow.rowId != 'header' ? <tr key={iRow}>
                          {
                            vRow.map((vData: string, iData: number) => {
                              return <td key={iData}>{vData}</td>
                            })
                          }
                        </tr> : <tr></tr>
                      })
                    } */}
                  </tbody>
                </table>
              </div> : <ReactGrid rows={rows} className="select-none" columns={columns} onCellsChanged={handleChanges} enableRowSelection enableFillHandle />
            }
          </div>
          <Stack>
            <Typography variant='caption'>จำนวน {rowCount} รายการ</Typography>
          </Stack>
        </Stack>
      </Card>
    </Stack>

  </Stack>
}

export default App
