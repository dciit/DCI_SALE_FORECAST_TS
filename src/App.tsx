//@ts-nocheck
import { useEffect, useState } from 'react'
import './App.css'
import { ReactGrid, Column, Row, TextCell, CellChange, DefaultCellTypes, Highlight } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import { Stack, Button, Typography, TextField, Badge, MenuItem, styled, Menu, alpha, MenuProps, Backdrop, CircularProgress } from '@mui/material';
import { API_CHANGE_STATUS, API_CLEAR_EMPTY, API_CLEAR_SALE, API_CUSTOMER, API_DISTRIBUTION_SALE, API_GET_SALE, API_MODEL, API_NEW_ROW, API_STATUS_SALE, API_UPDATE_SALE } from './Service';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { MCustomer, MFitlerEdit, MModel, MRedux, MStatusSale, Person } from './Interface';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useNavigate } from 'react-router-dom';
import ExportToExcel from './ExportToExcel';
import SearchIcon from '@mui/icons-material/Search';
import SelectReact from 'react-select';
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();
const getColumns = (): Column[] => [
  { columnId: "customer", width: 100 },
  { columnId: "modelName", width: 150 },
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
    { type: "header", text: "modelName" },
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
      { type: "text", text: sale.modelName },
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
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
function App() {
  const dispatch = useDispatch();
  let BASE = import.meta.env.VITE_PATH;
  const [typeFilter] = useState<string>('');
  const [, setInvisibleCustomer] = useState<boolean>(true);
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
  const [itemSelectCustomer, setItemSelectCustomer] = useState<MFitlerEdit[]>([]);
  const reducerFilterCustomer = useSelector((state: MRedux) => state.reducer.filterCustomer);
  const reducerFilterSBU = useSelector((state: MRedux) => state.reducer.filterSBU);
  const [itemSelectSBU] = useState<MFitlerEdit[]>([
    { value: '1Y', label: '1YC' },
    { value: '2Y', label: '2YC' },
    { value: 'J', label: 'SCR' },
    { value: '%', label: 'ODM' }
  ]);
  const [model, setModel] = useState<MModel[]>([]);
  const [people, setPeople] = useState<Person[]>([]);
  const [rows, setRows] = useState<Row<DefaultCellTypes>[]>([]);
  const [width, setWidth] = useState<number>(0);
  const columns = getColumns();
  const [rev, setRev] = useState<number>(0);
  const navigate = useNavigate();
  let once = false;
  const [menuFilter] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [loadAddRow, setLoadAddRow] = useState<boolean>(false);
  const [loadFirst, setLoadFirst] = useState<boolean>(true);
  const [load, setLoad] = useState<boolean>(true);
  const [msgBackdrop, setMsgBackdrop] = useState<string>('กำลังเพิ่มรายการให้คุณ');
  const handleClose = (choice: string, type: string) => {
    if (type == 'customer') {
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
    initHighlight();
  }, [rows]);

  async function calApi() {
    const temp = await API_GET_SALE({ empcode: empcode, ym: `${year}${month.toLocaleString('en', { minimumIntegerDigits: 2 })}`, filterCustomer: reducerFilterCustomer, filterSBU: reducerFilterSBU });
    return temp;
  }
  async function calStatusSale() {
    return await API_STATUS_SALE({ ym: `${year}${month.toLocaleString('en', { minimumIntegerDigits: 2 })}` });
  }
  async function init() {
    setLoad(true);
    let apiCustomer: MCustomer[] = await API_CUSTOMER();
    setItemSelectCustomer(apiCustomer.map((v: MCustomer) => {
      var codeCustomer = v.customerCode.replace(/(\r\n|\n|\r)/gm, "")
      var codeShortCustomer = v.customerNameShort.replace(/(\r\n|\n|\r)/gm, "")
      var newItemCustomer: MFitlerEdit = { value: codeShortCustomer, label: `${v.customerName.replace(/(\r\n|\n|\r)/gm, "")} (${codeShortCustomer}) (${codeCustomer})` }
      return newItemCustomer
    }))
    setCustomer(apiCustomer);
    const apiModel = await API_MODEL();
    setModel(apiModel);
    const apiSale = await calApi();
    const detailSale: MStatusSale = await calStatusSale();
    setDistribution(detailSale!.isDistribution!);
    setRev(detailSale!.rev!);
    // const objSale = await defSale(apiSale.data);
    // setPeople(objSale);
    setPeople(apiSale.data);
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
        let itemModelName = v.modelName;
        const hasModel = model.filter((vModel) => vModel.model == itemModelName);
        if (Object.keys(hasModel).length == 0 && itemModelName != '') {
          const exist = cloneHighlight.filter((vMod) => {
            return vMod.columnId == 'modelName' && vMod.rowId == i
          });
          if (Object.keys(exist).length == 0) {
            cloneHighlight.push({ columnId: 'modelName', rowId: i, borderColor: "#ff0000" });
          }
        }
      });
      setHighlights([...cloneHighlight]);
    }
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
      change.newCell.text = change.newCell.text.replace(/(\r\n|\n|\r)/gm, "");
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
        if (fieldName == 'modelName') {
          const hasModel = model.filter((v) => v.model == change.newCell.text);
          if (Object.keys(hasModel).length == 0) { // ไม่พบ Customer Code ?
            const exist = cloneHighlight.filter((v, i: number) => {
              return v.columnId == fieldName && v.rowId == personIndex && i > -1
            });
            if (Object.keys(exist).length == 0) {
              cloneHighlight.push({ columnId: fieldName, rowId: personIndex, borderColor: "#ff0000" })
            }
            prevPeople[personIndex]['sebango'] = '';
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
          let sebango = '';
          if (typeof prevPeople[personIndex] != 'undefined') {
            sebango = prevPeople[personIndex]['sebango'];
            const hasModel = model.filter((v) => v.model == sebango);
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
        if (fieldName == 'customer' || fieldName == 'modelName' || fieldName == 'pltype' || fieldName == 'sebango') {
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
    setLoadFirst(false);
    setHighlights([...finalHighlight])
    return [...prevPeople];
  };
  async function handleChanges(changes: CellChange<TextCell>[]) {
    setMsgBackdrop('กำลังแก้ไขข้อมูลของคุณ');
    setLoadAddRow(true);
    await setPeople((prevPeople) => applyChangesToPeople(changes, prevPeople));
  };

  useEffect(() => {
    setLoadAddRow(false);
    if (people.length) {
      let oPeople = getRows(people);
      setLoad(false);
      if (rows.length > 0 && loadFirst == false) {
        API_UPDATE_SALE({ listSale: people, ym: `${year}${month.toLocaleString('en', { minimumIntegerDigits: 2 })}`, empcode: empcode });
      }
      setRows(oPeople);
      setHighlights([...highlights])
    }
  }, [people]);


  async function handleAddRow() {
    setMsgBackdrop('กำลังเพิ่มรายการให้กับคุณ')
    setLoadAddRow(true);
    let ym = `${year}${month.toLocaleString('en', { minimumIntegerDigits: 2 })}`;
    let newRow: Person[] = [];
    [...Array(rowAdd)].map(() => {
      newRow.push({ ym: ym, customer: "", modelName: "", sebango: "", pltype: "", d01: 0, d02: 0, d03: 0, d04: 0, d05: 0, d06: 0, d07: 0, d08: 0, d09: 0, d10: 0, d11: 0, d12: 0, d13: 0, d14: 0, d15: 0, d16: 0, d17: 0, d18: 0, d19: 0, d20: 0, d21: 0, d22: 0, d23: 0, d24: 0, d25: 0, d26: 0, d27: 0, d28: 0, d29: 0, d30: 0, d31: 0 })
    });
    const apiNewRow = await API_NEW_ROW({ data: newRow, ym: ym });
    if (apiNewRow.status) {
      location.reload();
    }
    setPeople([...people, ...newRow])
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
      setMsgBackdrop(`กำลังปรับสถานะไปยัง "แจกจ่าย"`);
      setLoadAddRow(true);
      const distribution = await API_DISTRIBUTION_SALE({ ym: `${year}${month.toLocaleString('en', { minimumIntegerDigits: 2 })}`, empcode: empcode });
      if (typeof distribution.status != 'undefined' && distribution.status) {
        navigate(`/${BASE}/home`);
        setLoadAddRow(false);
      }
    }
  }
  async function handleClear() {
    try {
      if (confirm(`คุณต้องการลบข้อมูลประจำวันเดือน ${moment(month, 'M').format('MMMM').toUpperCase()} ปี ${year} ใช่หรือไม่ ?`)) {
        setMsgBackdrop(`กำลังล้างประจำวันเดือน ${moment(month, 'M').format('MMMM').toUpperCase()} ปี ${year}`);
        setLoadAddRow(true);
        const clear: any = await API_CLEAR_SALE({ ym: `${year}${month.toLocaleString('en', { minimumIntegerDigits: 2 })}` });
        if (typeof clear.status != 'undefined' && clear.status) {
          setLoadAddRow(false);
          location.reload();
        } else {
          alert(`${clear.error}`)
        }
      }
    } catch (e) {
      alert(`ไม่สามารถลบข้อมูลได้ เนื่องจาก ${e}`)
    }
  }
  async function handleChangeCustomer(e: any) {
    dispatch({ type: 'SET_FILTER_CUSTOMER', payload: e })
  }
  async function handleChangeSBU(e: any) {
    dispatch({ type: 'SET_FILTER_SBU', payload: e })
  }
  async function handleSearch() {
    init();
  }
  async function handleClearEmpty() {
    setMsgBackdrop('กำลังล้างข้อมูลที่ว่าง')
    setLoadAddRow(true);
    var clearEmpty: any = await API_CLEAR_EMPTY({ listSale: people, ym: `${year}${month.toLocaleString('en', { minimumIntegerDigits: 2 })}`, empcode: empcode });
    if (clearEmpty.status > 0 && clearEmpty != 9999) {
      location.reload();
      setLoadAddRow(false);
    } else {
      setLoadAddRow(false);
      if (clearEmpty == 9999) {
        alert('เกิดข้อมูลผิดพลาดกับการล้างข้อมูลที่ว่างเปล่า');
      }
      location.reload();
    }
  }
  return <Stack >
    <Stack p={6} className='h-[800px]' spacing={1}>
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
        <Stack className='select-none py-3 pl-5 pr-4 rounded-[8px] border-mtr bg-[#f6f8fa]'>
          <Stack alignItems={'start'} spacing={1}>
            <Typography>ค้นหา</Typography>
            <Stack direction={'row'} spacing={1} className='w-[100%]'>
              <SelectReact className='max-w-[60%] min-w-[60%]' isMulti options={itemSelectCustomer} value={reducerFilterCustomer} closeMenuOnSelect={false} components={animatedComponents} placeholder={'เลือก Customer ของคุณ'} onChange={(e: any) => handleChangeCustomer(e)} />
              <SelectReact className='max-w-[30%] min-w-[30%]' isMulti options={itemSelectSBU} value={reducerFilterSBU} closeMenuOnSelect={false} components={animatedComponents} placeholder={'เลือก SBU ของคุณ '} onChange={(e: any) => handleChangeSBU(e)} isDisabled={false} />
              <Button startIcon={<SearchIcon />} className='w-[10%]' variant='contained' onClick={handleSearch}>ค้นหา</Button>
            </Stack>
          </Stack>
        </Stack>
        <Stack mb={2} direction={'row'} justifyContent={'space-between'} spacing={1} >
          <Stack direction={'row'} spacing={1}>
            <Button onClick={handleChangeEdit} variant='contained' startIcon={<BorderColorIcon />} disabled={!distribution ? true : false}>แก้ไข</Button>
            <Button onClick={handleDistribution} variant='contained' startIcon={<ArrowUpwardIcon />} disabled={distribution ? true : false}>แจกจ่าย</Button>
            <Button onClick={handleClearEmpty} variant='contained' color="warning" startIcon={<CleaningServicesIcon />} disabled={distribution ? true : false}>ล้างรายการที่ว่างเปล่า</Button>
            <Button onClick={handleClear} variant='contained' color="error" startIcon={<DeleteOutlineIcon />} disabled={distribution ? true : false}>ล้างข้อมูลทั้งหมด</Button>
            <ExportToExcel year={`${year}`} month={parseInt(month).toLocaleString('en', { minimumIntegerDigits: 2 })} rows={rows} column={columns} />
          </Stack>
          <Stack direction={'row'} spacing={1}>
            <TextField size='small' value={rowAdd} onChange={(e) => setRowAdd(e.target.value != '' ? parseInt(e.target.value) : 0)} />
            <Button variant='contained' onClick={handleAddRow} startIcon={<SaveAltIcon />} disabled={distribution ? true : false}>เพิ่มรายการ</Button>
          </Stack>
        </Stack>
        <div className='wrapper'>
          {
            load ? <Stack direction={'column'} alignItems={'center'} className='h-full' justifyContent={'center'}>
              <CircularProgress />
              <Typography>กำลังโหลดข้อมูล</Typography>
            </Stack> :
              (distribution && width > 0) ?
                <table className={`tbSaleView w-[2800px] text-[#692525] select-none `} >
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
                  <Stack direction={'row'}>
                    <ReactGrid rows={rows} columns={columns} highlights={highlights} onCellsChanged={handleChanges} enableRowSelection enableColumnSelection stickyTopRows={1} />
                  </Stack>
                </div>
          }
        </div>
        <Stack>
          <Typography variant='caption'>จำนวน {(rows.length > 0) ? (rows.length - 1) : 0} รายการ</Typography>
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
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loadAddRow}
    >
      <Stack direction={'column'} alignItems={'center'} gap={2}>
        <Typography>{msgBackdrop} กรุณารอสักครู่ ...</Typography>
        <CircularProgress color="inherit" />
      </Stack>
    </Backdrop>
  </Stack>
}

export default App
