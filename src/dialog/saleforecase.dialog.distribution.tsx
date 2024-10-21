import { useEffect, useState } from 'react'
import { API_DISTRIBUTION } from '../service/saleforecase.service'
import { useSelector } from 'react-redux'
import { Button, Modal } from 'antd'
function DialogDistribution(props: any) {
    const redx = useSelector((state: any) => state.reducer);
    const empcode: string = redx?.empcode;
    const { open, close, year } = props;
    const [loading, setLoading] = useState<boolean>(false);
    const handleDistribution = async () => {
        setLoading(true);
        let distribution = await API_DISTRIBUTION({ year: year, empcode: empcode });
        if (distribution.status != '0') {
            location.reload();
        } else {
            alert(distribution.message)
        }
        setLoading(false);
    }
    useEffect(() => {
        if (open == false)
            setLoading(false)
    }, [open])
    return (
        <Modal title={'Distribution'} open={open} onClose={() => loading ? false : close(false)} footer={
            <>
                <Button type='primary' loading={loading} className={``} onClick={handleDistribution}>
                    {/* <div className='flex flex-row gap-2 items-center'>
                        {
                            loading == true && <CircularProgress className='text-white' size={'16px'} />
                        }
                        <span >
                            {loading == true ? txtLoad : txtConfirm}
                        </span>
                    </div> */}
                    ยืนยัน
                </Button>
                <Button disabled={loading} onClick={() => close(false)} >ปิดหน้าต่าง</Button>
            </>
        } >
            <span className=''>คุณต้องการ</span>
            <span className='text-[#009866]'>"แจกจ่าย" </span>
            <span className=''>ข้อมูลการขายให้กับระบบอื่นๆ แล้ว ใช่หรือไม่ ?</span>
        </Modal>
    )
}

export default DialogDistribution