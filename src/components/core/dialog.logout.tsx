import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { base } from '../../constant'
import { MLogout } from '../../interface/core.interface';
import { Modal } from 'antd';
function DialogLogout(props: MLogout) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const redx = useSelector((state: any) => state.core);
    const { open, close } = props;
    useEffect(() => {
        if (open) {

        }
        if (typeof redx?.login != 'undefined' && redx.login == false) {
            navigate(`../${base}/login`);
        }
    }, [open, redx]);
    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
    }
    return (
        <Modal open={open} onClose={() => close(false)} title={'Logout'} footer={<div className='flex gap-2 py-[14px]'>
            <div className='cursor-pointer select-none' onClick={() => close(false)}>
                <span className='border px-[16px] pt-[6px] pb-[8px] rounded-md'>Close</span>
            </div>
            <div className='cursor-pointer select-none' onClick={handleLogout}>
                <span className=' drop-shadow-xl px-[16px] pt-[6px] pb-[8px] rounded-md bg-[#5c5fc8] text-white'>Confirm</span>
            </div>
        </div>}>
            <p>You are about to log out from your account. Logging out will end your current session, and you will need to log in again to access your account. Are you sure you want to proceed with logging out?</p>

        </Modal>
    )
}

export default DialogLogout