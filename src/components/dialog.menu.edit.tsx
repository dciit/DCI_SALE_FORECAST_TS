//@ts-nocheck
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { MRedux, oSale } from '../Interface';
import CHECK_PRIVILEGE from '../Method';
import { API_GET_SALE } from '../Service';
import { downloadExcel } from 'react-export-table-to-excel';
import { useEffect, useState } from 'react';
import { getModelGroupOfModelName } from '../function/main.function';
import { Modal } from 'antd';
function DialogMenuEdit(props: any) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { open, close } = props;
    const reducer = useSelector((state: MRedux) => state.reducer);
    const reduxPrivilege = useSelector((state: MRedux) => state.reducer.privilege);
    const [excelData, setExcelData] = useState<any[]>([]);
    let year: string = moment().format('YYYY');
    if (typeof reducer.select !== 'undefined' && typeof reducer.select.year !== 'undefined') {
        year = reducer.select.year;
    }
    let month: number = 1;
    if (typeof reducer.select !== 'undefined' && typeof reducer.select.month !== 'undefined' && reducer.select.month != '') {
        month = reducer.select.month;
    }
    let distribution: boolean = false;
    if (typeof reducer.select !== 'undefined' && typeof reducer.select.distribution !== 'undefined' && reducer.select.distribution != null) {
        distribution = reducer.select.distribution;
    }
    async function handleEdit() {
        if (CHECK_PRIVILEGE(reduxPrivilege, 'UKEHARAI', 'EDIT', 'DVCD', 'EDIT', reducer.dvcd).length) {
            navigate('/dcisaleforecast/edit');
            dispatch({ type: 'SET-MENU', payload: 'edit' })
        } else {
            alert('คุณไม่มีสิทธิในการแก้ไขข้อมูล กรุณาติดต่อ IT (เบียร์ 611)');
        }
    }
    async function handleReport() {
        navigate(`/dcisaleforecast/report/${year + '' + month.toLocaleString('en', { minimumIntegerDigits: 2 })}`)
    }
    async function handleExport() {
        let excelAPI = await API_GET_SALE({ ym: (year + '' + month.toLocaleString('en', { minimumIntegerDigits: 2 })) });
        const excelFormat = excelAPI.data.map((o: oSale) => {
            let total = 0;
            [...Array(31)].map((oo: any, ii: number) => {
                let day: string = (ii + 1).toLocaleString('en', { minimumIntegerDigits: 2 });
                total += Number(o[`d${day}`]);
            })
            return {
                customer: o.customer,
                modelGroup: getModelGroupOfModelName(o.modelName),
                modelName: o.modelName,
                sebango: o.sebango,
                pltype: o.pltype,
                total: total,
                d01: o.d01,
                d02: o.d02,
                d03: o.d03,
                d04: o.d04,
                d05: o.d05,
                d06: o.d06,
                d07: o.d07,
                d08: o.d08,
                d09: o.d09,
                d10: o.d10,
                d11: o.d11,
                d12: o.d12,
                d13: o.d13,
                d14: o.d14,
                d15: o.d15,
                d16: o.d16,
                d17: o.d17,
                d18: o.d18,
                d19: o.d19,
                d20: o.d20,
                d21: o.d21,
                d22: o.d22,
                d23: o.d23,
                d24: o.d24,
                d25: o.d25,
                d26: o.d26,
                d27: o.d27,
                d28: o.d28,
                d29: o.d29,
                d30: o.d30,
                d31: o.d31,
            }
        });
        if (excelFormat.length > 0) {
            setExcelData(excelFormat);
        }
    }
    const header = ["Customer", "M.Grp", "Model", "Sebango", "Pltype", "Total", "D01", "D02", "D03", "D04", "D05", "D06", "D07", "D08", "D09", "D10", "D11", "D12", "D13", "D14", "D15", "D16", "D17", "D18", "D19", "D20", "D21", "D22", "D23", "D24", "D25", "D26", "D27", "D28", "D29", "D30", "D31"];
    useEffect(() => {
        if (excelData.length > 0) {
            downloadExcel({
                fileName: `saleforecase-${(year + '' + month.toLocaleString('en', { minimumIntegerDigits: 2 }))}`,
                sheet: (year + '' + month.toLocaleString('en', { minimumIntegerDigits: 2 })),
                tablePayload: {
                    header,
                    body: excelData,
                },
            });
        }
    }, [excelData])







    return (
        <Modal onClose={close} open={open} title = {`${year} : ${moment(month, 'M').format('MMM').toUpperCase()}`}>
            {/* <DialogContent dividers>
                <List sx={{ pt: 0 }}>
                    <ListItem disableGutters onClick={handleEdit}>
                        <ListItemButton autoFocus >
                            <ListItemAvatar>
                                <Avatar>
                                    <EditIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="แก้ไข" />
                        </ListItemButton>
                    </ListItem>
                    {
                        distribution && <>
                            <ListItem disableGutters onClick={handleReport}>
                                <ListItemButton autoFocus >
                                    <ListItemAvatar>
                                        <Avatar>
                                            <SearchIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="ดูรายงาน" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disableGutters onClick={handleExport}>
                                <ListItemButton autoFocus >
                                    <ListItemAvatar>
                                        <Avatar>
                                            <ExitToAppIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Export to Excel" />
                                </ListItemButton>
                            </ListItem>
                        </>
                    }
                </List>
            </DialogContent> */}
        </Modal>
    )
}

export default DialogMenuEdit