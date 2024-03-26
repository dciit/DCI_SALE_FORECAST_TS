import { Dialog, DialogTitle, List, ListItem, ListItemButton, ListItemAvatar, Avatar, ListItemText, DialogContent } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { MRedux } from '../Interface';
import SearchIcon from '@mui/icons-material/Search';
import CHECK_PRIVILEGE from '../Method';
function DialogMenuEdit(props: any) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { open, close } = props;
    const reducer = useSelector((state: MRedux) => state.reducer);
    const reduxPrivilege = useSelector((state: MRedux) => state.reducer.privilege);
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
    return (
        <Dialog onClose={close} open={open} >
            <DialogTitle>{`${year} : ${moment(month, 'M').format('MMM').toUpperCase()}`}</DialogTitle>
            <DialogContent dividers>
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
                        distribution && <ListItem disableGutters onClick={handleReport}>
                            <ListItemButton autoFocus >
                                <ListItemAvatar>
                                    <Avatar>
                                        <SearchIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="ดูรายงาน" />
                            </ListItemButton>
                        </ListItem>
                    }
                </List>
            </DialogContent>
        </Dialog>
    )
}

export default DialogMenuEdit