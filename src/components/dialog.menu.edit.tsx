import { Dialog, DialogTitle, List, ListItem, ListItemButton, ListItemAvatar, Avatar, ListItemText, DialogContent } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { MRedux } from '../Interface';
function DialogMenuEdit(props: any) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { open, close } = props;
    const reducer = useSelector((state: MRedux) => state.reducer);
    let year: string = moment().format('YYYY');
    if (typeof reducer.select !== 'undefined' && typeof reducer.select.year !== 'undefined') {
        year = reducer.select.year;
    }
    let month: number = 1;
    if (typeof reducer.select !== 'undefined' && typeof reducer.select.month !== 'undefined' && reducer.select.month != '') {
        month = reducer.select.month;
    }
    async function handleEdit() {
        navigate('/dcisaleforecast/edit');
        dispatch({ type: 'SET-MENU', payload: 'edit' })
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
                </List>
            </DialogContent>
        </Dialog>
    )
}

export default DialogMenuEdit