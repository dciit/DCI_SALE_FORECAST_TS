// import moment from 'moment';
// import { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import DialogMenuEdit from './components/dialog.menu.edit';
// import { API_LIST_STATUS_SALE } from './Service';
// import { MRedux, MStatusSale } from './Interface';
// function Home() {
//     // const DtNoActive = "01/01/1900 00:00:00";
//     // const monthTh = useState<string[]>(["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"])
//     const dispatch = useDispatch();
//     const reducer = useSelector((state: MRedux) => state.reducer);
//     let year: number = parseInt(moment().format('YYYY'));
//     if (typeof reducer.select !== 'undefined' && typeof reducer.select.year !== 'undefined' && reducer.select.year != '') {
//         year = reducer.select.year;
//     }
//     const [yearSelected, setYearSelected] = useState<number>(year);
//     const [listSale, setListSale] = useState<MStatusSale[]>([]);
//     const [years, setYears] = useState<number[]>([]);
//     const [once, setOnce] = useState<boolean>(false);
//     const [openMenu, setOpenMenu] = useState<boolean>(false);
//     const [loading, setLoading] = useState<boolean>(true);
//     useEffect(() => {
//         if (!once) {
//             initYear();
//             initData();
//             setOnce(true);
//         }
//     }, [once])
//     useEffect(() => {
//         if (listSale.length > 0) {
//             setLoading(false);
//         }
//     }, [listSale])
//     async function initData() {
//         const grid = await API_LIST_STATUS_SALE({ year: `${yearSelected.toString()}` });
//         setListSale(grid);
//     }
//     async function initYear() {
//         let y = moment().add('year', -1).format('YYYY');
//         const listYear = await [...Array(3)].map((v: any, i: number) => {
//             console.log(v)
//             return parseInt(y) + i;
//         });
//         setYears(listYear);
//     }

//     async function handleChangeYear(e: any) {
//         setYearSelected(parseInt(e.target.value));
//         setOnce(false);
//     }

//     async function handleOpenMenu(month: number, distribution: boolean = false) {
//         dispatch({ type: 'EDIT-INIT', payload: { year: yearSelected, month: month, distribution: distribution } })
//         setOpenMenu(true);
//     }
//     async function handleCloseMenu() {
//         dispatch({ type: 'EDIT-INIT', payload: { year: '', month: '', distribution: false } });
//         setOpenMenu(false);
//     }
//     return (
//         <div className=' p-8 flex gap-2' >
//             {/* <Grid container>
//                 <Grid item xs={4} md={12} lg={12} sm={12}>
//                     <div direction={'row'} alignItems={'center'} spacing={2} px={3}>
//                         <span>ปี</span>
//                         <Select value={yearSelected} size='small' className=' bg-[#f6f8fa]' onChange={handleChangeYear}>
//                             {
//                                 years.map((v, i) => {
//                                     return <MenuItem key={i} value={v}>{v}</MenuItem>
//                                 })
//                             }
//                         </Select>
//                     </div>
//                 </Grid>
//                 <Grid item xs={12}>
//                     {
//                         loading ? <div spacing={1} justifyContent={'center'} alignItems={'center'}><CircularProgress /><span>กำลังโหลดข้อมูล</span></div> : <Grid key={1} container spacing={3} p={3} pl={0} >
//                             {
//                                 listSale.map((v: MStatusSale, i: number) => {
//                                     let ymd: string = moment(v.dt).format('DD/MM/YYYY HH:mm:ss');
//                                     let month: number = i + 1;
//                                     let monthName: string = moment(month, 'M').format('MMMM').toUpperCase();
//                                     return <Grid item xs={12} sm={6} md={4} lg={3} xl={3} className='select-none cursor-pointer transform-all duration-300 ' onClick={() => handleOpenMenu(month, v.isDistribution)}>
//                                         <motion.div whileHover={{
//                                             scale: 1.1,
//                                         }}>
//                                             <div className={`rounded-[8px] p-4 ${v.isDistribution && 'bg-[#eff8ff]'}`} style={{ border: '1px solid #d0d7de' }}>
//                                                 <div direction={'row'} justifyContent={'space-between'} alignItems={'top'}>
//                                                     <div>
//                                                         <span className={` ${v.isDistribution ? 'text-[#0969da]  font-semibold' : 'text-[#a2a2a2]'}`}>{monthName}</span>
//                                                         <span className='text-[#656d76]' variant='caption'>{`${monthTh[0][i]}  (${moment(month, 'M').format('MM').toUpperCase()}) - ${yearSelected}`} </span>
//                                                     </div>
//                                                     <div className={`rounded-[16px] px-2 pb-1 pt-[.5px] h-fit ${v.isDistribution ? 'bg-blue-600' : 'bg-white'}`} style={{ border: '1px solid #ddd' }}>
//                                                         <span className={`${v.isDistribution ? 'text-white' : 'text-[#323232]'}`} variant='caption'>
//                                                             {
//                                                                 v.isDistribution ? 'แจกจ่าย' : 'ดำเนินการ'
//                                                             }
//                                                         </span>
//                                                     </div>
//                                                 </div>
//                                                 <div direction={'row'} justifyContent={'space-between'} alignItems={'center'} pt={2}>
//                                                     <div direction={'row'} spacing={1}>
//                                                         <CircleIcon className={`${v.isDistribution ? 'text-[#2196f3]' : 'text-[#ddd]'}`} sx={{ fontSize: 18 }} />
//                                                         <span variant='caption' className='text-[#6f6f6f]'>REV : {v.rev?.toLocaleString('en', { minimumIntegerDigits: 2 })}</span>
//                                                     </div>
//                                                     {
//                                                         ymd != DtNoActive ? <span variant='caption'>Updated {ymd != DtNoActive ? ymd : '-'}</span> : ''
//                                                     }
//                                                 </div>
//                                             </div>
//                                         </motion.div>

//                                     </Grid>
//                                 })
//                             }
//                         </Grid>
//                     }

//                 </Grid>
//             </Grid> */}
//             <DialogMenuEdit open={openMenu} close={handleCloseMenu} />
//         </div>
//     )
// }

// export default Home