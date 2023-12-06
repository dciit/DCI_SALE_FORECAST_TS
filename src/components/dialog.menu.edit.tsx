import { Dialog, DialogTitle, List, ListItem, ListItemButton, ListItemAvatar, Avatar, ListItemText, DialogContent } from '@mui/material'
import { blue } from '@mui/material/colors'
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import { useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
function DialogMenuEdit(props: any) {
    const navigate = useNavigate();
    const { open, close } = props;
    const year = useSelector((state: any) => state.reducer.select.year);
    const month: number = useSelector((state: any) => state.reducer.select.month);
    async function handleEdit() {
        navigate('/edit')
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