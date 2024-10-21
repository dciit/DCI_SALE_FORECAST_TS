import { useEffect, useState } from 'react'
import { API_UN_DISTRIBUTION } from '../service/saleforecase.service'
import { useSelector } from 'react-redux'
import { Button, Modal } from 'antd';
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
        <Modal title={'UnDistribution'} open={open} onClose={() => close(false)} footer={<>
            <Button className=' border-[#5c5fc8] text-[#5c5fc8] focus:outline-none' onClick={() => close(false)} >ปิดหน้าต่าง</Button>
            <Button type='primary' loading={loading} className={` min-w-[7em] focus:outline-none ${loading ? 'bg-[#5c5fc875]' : 'bg-[#5c5fc8]'} text-white`} onClick={handleDistribution}>
                <span >
                    {loading == true ? txtLoad : txtConfirm}
                </span>
            </Button>
        </>} >
            <div>
                <span className=''>คุณต้องการ</span>
                <span className='text-[#5c5fc8]'>"แก้ไข" </span>
                <span className=''>ข้อมูลการขาย ใช่หรือไม่ ?</span>
            </div>

        </Modal>
    )
}

export default DialogUnDistribution