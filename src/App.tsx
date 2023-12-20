import { useEffect, useState } from 'react'
import './App.css'
import { ReactGrid, Column, Row, TextCell, CellChange, DefaultCellTypes, Highlight } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import { Stack, Button, Typography, TextField, Badge, MenuItem, styled, Menu, alpha, MenuProps } from '@mui/material';
import { API_CHANGE_STATUS, API_CLEAR_SALE, API_CUSTOMER, API_DISTRIBUTION_SALE, API_GET_SALE, API_MODEL, API_NEW_ROW, API_STATUS_SALE, API_UPDATE_SALE } from './Service';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { MCustomer, MModel, MRedux, MStatusSale, Person } from './Interface';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useNavigate } from 'react-router-dom';
import ExportToExcel from './ExportToExcel';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
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
  { columnId: "d11", width: 75 },
  { columnId: "d12", width: 75 },
  { columnId: "d13", width: 75 },
  { columnId: "d14", width: 75 },
  { columnId: "d15", width: 75 },
  { columnId: "d16", width: 75 },
  { columnId: "d17", width: 75 },
  { columnId: "d18", width: 75 },
  { columnId: "d19", width: 75 },
  { columnId: "d20", width: 75 },
  { columnId: "d21", width: 75 },
  { columnId: "d22", width: 75 },
  { columnId: "d23", width: 75 },
  { columnId: "d24", width: 75 },
  { columnId: "d25", width: 75 },
  { columnId: "d26", width: 75 },
  { columnId: "d27", width: 75 },
  { columnId: "d28", width: 75 },
  { columnId: "d29", width: 75 },
  { columnId: "d30", width: 75 },
  { columnId: "d31", width: 75 },
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
    { type: "header", text: "d11" },
    { type: "header", text: "d12" },
    { type: "header", text: "d13" },
    { type: "header", text: "d14" },
    { type: "header", text: "d15" },
    { type: "header", text: "d16" },
    { type: "header", text: "d17" },
    { type: "header", text: "d18" },
    { type: "header", text: "d19" },
    { type: "header", text: "d20" },
    { type: "header", text: "d21" },
    { type: "header", text: "d22" },
    { type: "header", text: "d23" },
    { type: "header", text: "d24" },
    { type: "header", text: "d25" },
    { type: "header", text: "d26" },
    { type: "header", text: "d27" },
    { type: "header", text: "d28" },
    { type: "header", text: "d29" },
    { type: "header", text: "d30" },
    { type: "header", text: "d31" },
  ]
};

const getRows = (people: Person[]): Row[] => [
  headerRow,
  ...people.map<Row>((sale, idx) => ({
    rowId: idx,
    cells: [
      { type: "text", text: sale.customer },
      { type: "text", text: sale.modelCode },
      { type: "text", text: sale.sebango },
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
      { type: "text", text: sale.d31.toString() }
    ]
  }))
]

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

function App() {
  let BASE = import.meta.env.VITE_PATH;
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [, setInvisibleCustomer] = useState<boolean>(true);
  const [invisibleModelCode] = useState<boolean>(true);
  const [modelCodeSelect] = useState<string>('');
  const [customerSelect, setCustomerSelect] = useState<string>('');
  const reducer = useSelector((state: MRedux) => state.reducer);
  let empcode = "";
  if (typeof reducer.empcode !== 'undefined' && reducer.empcode != '') {
    empcode = reducer.empcode;
  }
  let year = useSelector((state: MRedux) => state.reducer.select.year);
  let month: number | string = useSelector((state: MRedux) => state.reducer.select.month);
  const [highlights, setHighlights] = useState<Highlight[]>([
  ]);
  const [distribution, setDistribution] = useState<boolean>(false);
  const [rowAdd, setRowAdd] = useState<number>(10);
  const [customer, setCustomer] = useState<MCustomer[]>([]);
  const [model, setModel] = useState<MModel[]>([]);
  const [people, setPeople] = useState<Person[]>([]);
  const [rows, setRows] = useState<Row<DefaultCellTypes>[]>([]);
  const [width, setWidth] = useState<number>(0);
  const columns = getColumns();
  const [rev, setRev] = useState<number>(0);
  const navigate = useNavigate();
  let once = false;
  const [menuFilter, setMenuFilter] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuCustomer = (event: React.MouseEvent<HTMLElement>) => {
    setTypeFilter('customer');
    const newMenu = customer.map((v: MCustomer) => { return `${v.customerCode}:${v.customerNameShort}`.replace(/(\r\n|\n|\r)/gm, "") });
    setMenuFilter(newMenu);
    setAnchorEl(event.currentTarget);
  }

  const handleMenuModelCode = (event: React.MouseEvent<HTMLElement>) => {
    setTypeFilter('modelCode');
    const newMenu = model.map((v: MModel) => { return `${v.model}`.replace(/(\r\n|\n|\r)/gm, "") });
    setMenuFilter(newMenu);
    setAnchorEl(event.currentTarget);
  }
  const handleClose = (choice: string, type: string) => {
    if (type == 'customer') {
      setCustomerSelect(choice);
      setInvisibleCustomer(false);
    }
    setAnchorEl(null);
  };
  useEffect(() => {
    if (!once) {
      init();
      let w = 0;
      columns.map((v: Column) => {
        w += v.width!;
      })
      setWidth(w);
      once = true;
    }
    return;
  }, []);

  useEffect(() => {
    if (people.length) {
      let oPeople = getRows(people);
      setRows(oPeople);
      setHighlights([...highlights])
    }
  }, [people]);

  useEffect(() => {
    initHighlight();
  }, [rows]);
  // useEffect(() => {
  //   setRows(getRows(people));
  //   console.log('set ')
  // },[highlights])
  async function calApi() {
    const temp = await API_GET_SALE({ empcode: empcode, ym: `${year}${month.toLocaleString('en', { minimumIntegerDigits: 2 })}` });
    return temp;
  }
  async function calStatusSale() {
    return await API_STATUS_SALE({ ym: `${year}${month.toLocaleString('en', { minimumIntegerDigits: 2 })}` });
  }
  async function init() {
    const apiCustomer = await API_CUSTOMER();
    setCustomer(apiCustomer);
    const apiModel = await API_MODEL();
    setModel(apiModel);
    const apiSale = await calApi();
    const detailSale: MStatusSale = await calStatusSale();
    setDistribution(detailSale!.isDistribution!);
    setRev(detailSale!.rev!);
    const objSale = await defSale(apiSale.data);
    setPeople(objSale);
  }
  async function initHighlight() {
    if (Object.keys(people).length) {
      let cloneHighlight = highlights;
      await people.map((v: Person, i: number) => {
        let itemCustomer = (v.customer).substring(0, 15);
        const hasCustomer = customer.filter((vCustomer) => vCustomer.customerNameShort == itemCustomer);
        if (Object.keys(hasCustomer).length == 0 && itemCustomer != '') {
          const exist = cloneHighlight.filter((vCus) => {
            return vCus.columnId == 'customer' && vCus.rowId == i
          });
          if (Object.keys(exist).length == 0) {
            cloneHighlight.push({ columnId: 'customer', rowId: i, borderColor: "#ff0000" });
          }
        }
        let itemModelCode = v.modelCode;
        const hasModel = model.filter((vModel) => vModel.model == itemModelCode);
        if (Object.keys(hasModel).length == 0 && itemModelCode != '') {
          const exist = cloneHighlight.filter((vMod) => {
            return vMod.columnId == 'modelCode' && vMod.rowId == i
          });
          if (Object.keys(exist).length == 0) {
            cloneHighlight.push({ columnId: 'modelCode', rowId: i, borderColor: "#ff0000" });
          }
        }
      });
      setHighlights([...cloneHighlight]);
    }
  }
  async function defSale(apiSale: any = []) {
    if (apiSale.length < 10) {
      [...Array(10)].map((i: number) => {
        if (typeof apiSale[i] == 'undefined') {
          apiSale.push({ customer: "", modelCode: "", sebango: "", pltype: "", d01: 0, d02: 0, d03: 0, d04: 0, d05: 0, d06: 0, d07: 0, d08: 0, d09: 0, d10: 0, d11: 0, d12: 0, d13: 0, d14: 0, d15: 0, d16: 0, d17: 0, d18: 0, d19: 0, d20: 0, d21: 0, d22: 0, d23: 0, d24: 0, d25: 0, d26: 0, d27: 0, d28: 0, d29: 0, d30: 0, d31: 0 });
        }
      });
    }
    return apiSale;
  }
  const applyChangesToPeople = (
    changes: CellChange<TextCell>[],
    prevPeople: Person[]
  ): Person[] => {
    if (Object.keys(changes).length > 1) {
      changes.pop();
    }
    const cloneHighlight = highlights;
    changes.forEach((change) => {
      const personIndex: number = parseInt(change.rowId.toString());
      const fieldName: string | number = change.columnId;
      if ((fieldName != 'customer' && fieldName != 'modelCode' && fieldName != 'sebango' && fieldName != 'pltype') && (fieldName == 'd01' || fieldName == 'd02' || fieldName == 'd03' || fieldName == 'd04' || fieldName == 'd05' || fieldName == 'd06' || fieldName == 'd07' || fieldName == 'd08' || fieldName == 'd09' || fieldName == 'd10' || fieldName == 'd11' || fieldName == 'd12' || fieldName == 'd13' || fieldName == 'd14' || fieldName == 'd15' || fieldName == 'd16' || fieldName == 'd17' || fieldName == 'd18' || fieldName == 'd19' || fieldName == 'd20' || fieldName == 'd21' || fieldName == 'd22' || fieldName == 'd23' || fieldName == 'd24' || fieldName == 'd25' || fieldName == 'd26' || fieldName == 'd27' || fieldName == 'd28' || fieldName == 'd29' || fieldName == 'd30' || fieldName == 'd31')) {
        change.newCell.text = change.newCell.text.replace(/\D/g, '');
        prevPeople[personIndex][fieldName] = change.newCell.text == '' ? "0" : change.newCell.text;
      } else {
        if (fieldName == 'customer') {
          change.newCell.text = change.newCell.text.substring(0, 15);
          const hasCustomer = customer.filter((v, i: number) => v.customerNameShort == change.newCell.text && i > -1);
          if (Object.keys(hasCustomer).length == 0) { // ไม่พบ Customer Code ?
            const exist = cloneHighlight.filter((v, i: number) => {
              return v.columnId == fieldName && v.rowId == personIndex && i != -1
            });
            if (Object.keys(exist).length == 0) {
              cloneHighlight.push({ columnId: fieldName, rowId: personIndex, borderColor: "#ff0000" })
            }
          } else { // พบ Customer Code !
            const exist = cloneHighlight.filter((v) => {
              return v.columnId == fieldName && v.rowId == personIndex
            });
            if (Object.keys(exist).length > 0) {
              const index: number = cloneHighlight.indexOf(exist[0]);
              cloneHighlight.splice(index, 1);
            }
          }
        }
        if (fieldName == 'modelCode') {
          const hasModel = model.filter((v) => v.model == change.newCell.text);
          if (Object.keys(hasModel).length == 0) { // ไม่พบ Customer Code ?
            const exist = cloneHighlight.filter((v, i: number) => {
              return v.columnId == fieldName && v.rowId == personIndex && i > -1
            });
            if (Object.keys(exist).length == 0) {
              cloneHighlight.push({ columnId: fieldName, rowId: personIndex, borderColor: "#ff0000" })
            }
          } else { // พบ Customer Code !
            const exist = cloneHighlight.filter((v) => {
              return v.columnId == fieldName && v.rowId == personIndex
            });
            if (Object.keys(exist).length > 0) {
              const index: number = cloneHighlight.indexOf(exist[0]);
              cloneHighlight.splice(index, 1);
            }
            // if(hasModel[0].modelCode != ''){
            prevPeople[personIndex]['sebango'] = hasModel[0].modelCode;
            // }
          }
        }
        if (fieldName == 'sebango') {
          let modelCode = '';
          if (typeof prevPeople[personIndex] != 'undefined') {
            modelCode = prevPeople[personIndex]['modelCode'];
            const hasModel = model.filter((v) => v.model == modelCode);
            if (Object.keys(hasModel).length) {
              if (hasModel[0].modelCode != '') {
                change.newCell.text = hasModel[0].modelCode;
              }
            }
          }
        }
        if (fieldName == 'pltype') {
          let pltype = '';
          if (typeof prevPeople[personIndex] != 'undefined') {
            pltype = prevPeople[personIndex]['pltype'];
            const hasModel: any = model.filter((v) => v.model == pltype);
            if (Object.keys(hasModel).length) {
              change.newCell.text = hasModel[0].pltype!;
            }
          }
        }
        if (fieldName == 'customer' || fieldName == 'modelCode' || fieldName == 'pltype' || fieldName == 'sebango') {
          prevPeople[personIndex][fieldName] = change.newCell.text.toString();
        }
      }
    });
    let group = cloneHighlight.reduce((r: any, a: any) => {
      r[a.rowId] = [...r[a.rowId] || [], a];
      return r;
    }, {});
    let distinctRowId = Object.keys(group);
    let finalHighlight = cloneHighlight;
    finalHighlight.map((oHighlight: Highlight) => {
      if (distinctRowId.indexOf(oHighlight.rowId.toString()) > -1) {
        finalHighlight = finalHighlight.filter(x => x.rowId != oHighlight.rowId);
      }
    })
    setHighlights([...finalHighlight])
    return [...prevPeople];
  };
 
  async function handleChanges(changes: CellChange<TextCell>[]) {
    await setPeople((prevPeople) => applyChangesToPeople(changes, prevPeople));
    const update = await API_UPDATE_SALE({ listSale: people, ym: `${year}${month.toLocaleString('en', { minimumIntegerDigits: 2 })}`, empcode: empcode });
    console.log(update)
  };
  async function handleAddRow() {
    let ym = `${year}${month.toLocaleString('en', { minimumIntegerDigits: 2 })}`;
    let newRow: Person[] = [];
    [...Array(rowAdd)].map(() => {
      newRow.push({ ym: ym, customer: "", modelCode: "", sebango: "", pltype: "", d01: 0, d02: 0, d03: 0, d04: 0, d05: 0, d06: 0, d07: 0, d08: 0, d09: 0, d10: 0, d11: 0, d12: 0, d13: 0, d14: 0, d15: 0, d16: 0, d17: 0, d18: 0, d19: 0, d20: 0, d21: 0, d22: 0, d23: 0, d24: 0, d25: 0, d26: 0, d27: 0, d28: 0, d29: 0, d30: 0, d31: 0 })
    });
    const apiNewRow = await API_NEW_ROW({ data: newRow, ym: ym });
    if(apiNewRow.status){
      location.reload();
    }
    // setPeople([...people, ...newRow])
  }
  async function handleChangeEdit() {
    if (confirm('คุณต้องการปรับจาก "แจกจ่าย" => "แก้ไข" ใช่หรือไม่ ?')) {
      const changeStatus = await API_CHANGE_STATUS({ ym: `${year}${month.toLocaleString('en', { minimumIntegerDigits: 2 })}` });
      if (typeof changeStatus.status != 'undefined' && changeStatus.status) {
        navigate(`/${BASE}/home`)
      }
    }
  }
  async function handleDistribution() {
    if (highlights.length > 0) {
      alert('พบข้อมูลไม่ถูกต้องตามที่ระบบต้องการ !')
      return;
    }
    if (confirm('คุณต้องการที่จะแจกจ่ายข้อมูลฉบับนี้ ใช่หรือไม่ ? ')) {
      const distribution = await API_DISTRIBUTION_SALE({ ym: `${year}${month.toLocaleString('en', { minimumIntegerDigits: 2 })}` });
      if (typeof distribution.status != 'undefined' && distribution.status) {
        // location.reload();
        console.log(`/${BASE}/home`)
        navigate(`/${BASE}/home`)
      }
    }
  }
  async function handleClear() {
    try {
      if (confirm(`คุณต้องการลบข้อมูลประจำวันเดือน ${moment(month, 'M').format('MMMM').toUpperCase()} ปี ${year} ใช่หรือไม่ ?`)) {
        const clear: any = await API_CLEAR_SALE({ ym: `${year}${month.toLocaleString('en', { minimumIntegerDigits: 2 })}` });
        console.log(clear)
        if (typeof clear.status != 'undefined' && clear.status) {
          location.reload();
        } else {
          alert(`${clear.error}`)
        }
      }
    } catch (e) {
      alert(`ไม่สามารถลบข้อมูลได้ เนื่องจาก ${e}`)
    }
  }
  return <Stack >
    {/* {
      JSON.stringify(highlights)
    } */}
    <Stack p={6} className='h-[800px]' spacing={1}>
      {/* <div role="presentation" >
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/home">
            หน้าหลัก
          </Link>
          <Typography color="text.primary">แก้ไข</Typography>
        </Breadcrumbs>
      </div> */}
      <Stack spacing={2} className='h-[100%] '>
        <Stack direction={'row'} spacing={1} alignItems={'center'} justifyContent={'space-between'} className='select-none py-3 pl-5 pr-6 rounded-[8px] border-mtr bg-[#f6f8fa]' title="ปีและเดือนนี้กำลังอยู่ในระหว่างแก้ไข" >
          <Stack spacing={1} direction={'row'}>
            <div className='bg-white border-mtr rounded-[8px] px-6 py-1 font-semibold cursor-pointer' >
              <span>{`${moment(month, 'M').format('MMMM').toUpperCase()} - ${year}`} </span>
            </div>
            <div className='bg-white border-mtr rounded-[8px] px-6 py-1 font-semibold cursor-pointer' >
              <span>เวอร์ชั่น : {rev.toLocaleString('en', { minimumIntegerDigits: 2 })}</span>
            </div>
          </Stack>

          {/* <Stack direction={'row'} spacing={1}>
            <div className='rounded-[8px] px-4 pb-1 pt-[.5px] h-fit text-white bg-white' style={{ border: '1px solid #ddd' }}>
              <Typography className={`text-[#323232] text-[14px]`} variant='caption'>
                สถานะ
              </Typography>
            </div>
            <div className={`rounded-[8px] px-4 pb-1 pt-[.5px] h-fit  ${distribution ? 'bg-blue-600' : 'bg-gray-600'}`} style={{ border: '1px solid #ddd' }}>
              <Typography className={`text-[14px] ${distribution ? 'text-white' : 'text-white'}`} variant='caption'>
                {
                  distribution ? 'แจกจ่ายแล้ว' : 'ระหว่างแก้ไขข้อมูล'
                }
              </Typography>
            </div>
          </Stack> */}

          <Badge badgeContent="">
            <span className="relative flex h-3 w-3">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${distribution ? 'bg-blue-400' : 'bg-gray-400'} opacity-50`}></span>
              <span className={`relative inline-flex rounded-full h-3 w-3 ${distribution ? 'bg-blue-500' : 'bg-gray-500'}`}></span>
            </span>
            <div className={`rounded-[8px] px-4 pb-1 pt-[.5px] h-fit  ${distribution ? 'bg-blue-600' : 'bg-gray-600'}`} style={{ border: '1px solid #ddd' }}>
              <Typography className={`text-[14px] ${distribution ? 'text-white' : 'text-white'}`} variant='caption'>
                {
                  distribution ? 'แจกจ่ายแล้ว' : 'ระหว่างแก้ไขข้อมูล'
                }
              </Typography>
            </div>
          </Badge>
        </Stack>
        <Stack className='select-none py-3 pl-5 pr-6 rounded-[8px] border-mtr bg-[#f6f8fa]'>
          <Stack alignItems={'start'} spacing={1}>
            <Typography>ค้นหา</Typography>
            <Stack direction={'row'} spacing={1}>

              <Badge badgeContent={customerSelect} color="primary" invisible={customerSelect.length ? false : true} >
                <Stack className='bg-white rounded-full pl-4 pr-2 pt-1 pb-1 cursor-pointer' direction={'row'} style={{ border: '1px solid #ddd' }} onClick={handleMenuCustomer}>
                  <Typography>Customer</Typography>
                  <ArrowDropDownIcon />
                </Stack>
              </Badge>
              <Badge badgeContent={modelCodeSelect} color="primary" invisible={invisibleModelCode} >
                <Stack className='bg-white rounded-full pl-4 pr-2 pt-1 pb-1 cursor-pointer' direction={'row'} style={{ border: '1px solid #ddd' }} onClick={handleMenuModelCode}>
                  <Typography>ModelCode</Typography>
                  <ArrowDropDownIcon />
                </Stack>
              </Badge>
              <Stack className='bg-white rounded-full pl-4 pr-2 pt-1 pb-1 cursor-pointer' direction={'row'} style={{ border: '1px solid #ddd' }} onClick={handleClick}>
                <Typography>Pallet Type</Typography>
                <ArrowDropDownIcon />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack mb={2} direction={'row'} justifyContent={'space-between'} spacing={1} >
          <Stack direction={'row'} spacing={1}>
            {/* <Button variant='outlined' startIcon={<HomeIcon />} onClick={() => {
                dispatch({ type: 'SET-MENU', payload: 'home' })
                navigate('../home');
              }}>หน้าหลัก</Button> */}

            <Button onClick={handleChangeEdit} variant='contained' startIcon={<BorderColorIcon />} disabled={!distribution ? true : false}>แก้ไข</Button>
            <Button onClick={handleDistribution} variant='contained' startIcon={<ArrowUpwardIcon />} disabled={distribution ? true : false}>แจกจ่าย</Button>
            <Button onClick={handleClear} variant='contained' color="error" startIcon={<DeleteOutlineIcon />} disabled={distribution ? true : false}>ล้าง</Button>
            <ExportToExcel year={`${year}`} month={parseInt(month).toLocaleString('en', { minimumIntegerDigits: 2 })} rows={rows} column={columns} />
          </Stack>
          <Stack direction={'row'} spacing={1}>
            <TextField size='small' value={rowAdd} onChange={(e) => setRowAdd(parseInt(e.target.value))} />
            <Button variant='contained' onClick={handleAddRow} startIcon={<SaveAltIcon />} disabled={distribution ? true : false}>เพิ่มรายการ</Button>
          </Stack>
        </Stack>

        <div className='wrapper'>
          {
            (distribution && width > 0) ?
              <table className={`tbSaleView w-[2800px] text-[#000000] select-none `} >
                <thead className={`bg-[#f2f2f2]`}>
                  <tr>
                    {
                      columns.map((vCol: any, iCol: number) => {
                        return <th key={iCol} style={{ width: parseInt(vCol.width) }}>{vCol.columnId.toUpperCase()}</th>
                      })
                    }
                  </tr>
                </thead>
                <tbody>
                  {
                    rows.map((vRow: any) => {
                      return vRow.rowId != 'header' ? <tr  >
                        {
                          vRow.cells.map((vData: any, iData: number) => {
                            return <td key={iData} className={`${iData > 3 ? 'text-right' : ''} ${vData.text != '0' ? 'text-black' : 'text-[#ddd]'}`}>{vData.text}</td>
                          })
                        }
                      </tr> : <tr></tr>
                    })
                  }
                </tbody>
              </table>
              : <div className='bg-white  select-none'>
                <ReactGrid rows={rows} columns={columns} highlights={highlights} onCellsChanged={handleChanges} enableFillHandle />
              </div>
          }
        </div>
        <Stack>
          <Typography variant='caption'>จำนวน {rows.length} รายการ</Typography>
        </Stack>
      </Stack>
    </Stack>
    <StyledMenu
      id="demo-customized-menu"
      MenuListProps={{
        'aria-labelledby': 'demo-customized-button',
      }}
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
    >
      {
        menuFilter.map((v: string) => {
          return <MenuItem onClick={() => handleClose(v, typeFilter)} disableRipple >
            {v}
          </MenuItem>
        })
      }
    </StyledMenu>
  </Stack>
}

export default App
