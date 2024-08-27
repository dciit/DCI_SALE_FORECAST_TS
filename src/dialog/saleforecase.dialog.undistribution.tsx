import { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import { API_UN_DISTRIBUTION } from '../service/saleforecase.service'
import CelebrationOutlinedIcon from '@mui/icons-material/CelebrationOutlined';
import { CircularProgress } from '@mui/material'
import { useSelector } from 'react-redux'
function DialogUnDistribution(props: any) {
    const redx = useSelector((state: any) => state.reducer);
    const empcode: string = redx?.empcode;
    const { open, close, year } = props;
    const txtConfirm: string = 'ยืนยัน';
    const txtLoad: string = 'กำลังแก้ไข'
    const [loading, setLoading] = useState<boolean>(false);
    const handleDistribution = async () => {
        setLoading(true);
        let un_distribution = await API_UN_DISTRIBUTION({ year: year, empcode: empcode });
        if (un_distribution.status == true) {
            location.reload();
        } else {
            alert(un_distribution.messsage)
        }
        setLoading(false);
    }
    useEffect(() => {
        if (open == false)
            setLoading(false)
    }, [open])
    return (
        <Dialog open={open} onClose={() => close(false)} fullWidth maxWidth={'sm'} >
            <DialogTitle >
                <div className='flex gap-2 flex-row items-center'>
                    <div className='rounded-full bg-[#5c5fc8] text-[#fff]  w-[36px] h-[36px] flex items-center justify-center'>
                        <CelebrationOutlinedIcon sx={{ fontSize: '20px' }} />
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-[18px]'>UnDistribution</span>
                        <span className='text-[12px] text-[#939393]'>แก้ไข</span>
                    </div>
                </div>
            </DialogTitle>
            <DialogContent dividers className='select-none flex gap-2'>
                <span className=''>คุณต้องการ</span>
                <span className='text-[#5c5fc8]'>"แก้ไข" </span>
                <span className=''>ข้อมูลการขาย ใช่หรือไม่ ?</span>
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' className=' border-[#5c5fc8] text-[#5c5fc8] focus:outline-none' onClick={() => close(false)} >ปิดหน้าต่าง</Button>
                <Button variant='contained' className={` min-w-[7em] focus:outline-none ${loading ? 'bg-[#5c5fc875]' : 'bg-[#5c5fc8]'} text-white`} onClick={handleDistribution}>
                    <div className='flex flex-row gap-2 items-center'>
                        {
                            loading == true && <CircularProgress className='text-white' size={'16px'} />
                        }
                        <span >
                            {loading == true ? txtLoad : txtConfirm}
                        </span>
                    </div>
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogUnDistribution