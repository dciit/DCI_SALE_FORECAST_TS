//@ts-nocheck
import { useEffect, useState } from "react"
import { API_GET_SALE } from "../Service";
import { MDeliveryControl, MGetSale, oSale } from "../Interface";

function DeliveryControlSheet() {
    const ym = '202405'
    const [data, setData] = useState<MDeliveryControl[]>();
    useEffect(() => {
        init();
    }, []);
    async function init() {
        let res: MGetSale = await API_GET_SALE({ ym: ym });
        let bufferData: MDeliveryControl[] = [];
        await res.data.map((oSale: oSale) => {
            let have: boolean = false;
            [...Array(31)].map((o: any, i: number) => {
                if (oSale[`d${(i + 1).toLocaleString('en', { minimumIntegerDigits: 2 })}`] > 0) {
                    have = true;
                }
            })
            if (have) {
                bufferData.push(oSale);
            }
        });
        setData(bufferData)
    }
    useEffect(() => {
        console.log(data)
    }, [data]);
    return (
        <div className='flex items-center justify-center bg-gray-300'>
            <div className='page-a3 bg-white' >
                <div className='p-6 flex justify-between flex-col h-full'>
                    <table className='w-full text-[8px] ' id="tbDeliveryControl">
                        <tr>
                            <td>
                                <span>DCI</span>
                            </td>
                            <td colSpan={35} className='text-right'>Secret</td>
                        </tr>
                        <tr>
                            <td colSpan={24}>&nbsp;</td>
                            <td colSpan={4}>APPROVED BY</td>
                            <td colSpan={4}>CHECKED BY</td>
                            <td colSpan={4}>ISSUED BY</td>
                        </tr>
                        <tr>
                            <td colSpan={5}>
                                Delivery Control Sheet
                            </td>
                        </tr>
                        <tr>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>-</td>
                        </tr>
                        <tr>

                            <td>CUSTOMER</td>
                            <td className='bg-yellow-300'>Group Model</td>
                            <td>MODELNAME</td>
                            <td>SEBANGO</td>
                            <td>PLTYPE</td>
                            {
                                [...Array(31)].map((o: any, i: number) => {
                                    return <td>{`D${(i + 1).toLocaleString('en', { minimumIntegerDigits: 2 })}`}</td>
                                })
                            }
                            <td>SUM</td>
                        </tr>
                        {
                            data?.map((oDelivery: MDeliveryControl, iDelivery: number) => {
                                return <tr key={iDelivery}>
                                    <td>{oDelivery.customer}</td>
                                    <td>{oDelivery.modelGroup}</td>
                                    <td>{oDelivery.modelName}</td>
                                    <td>{oDelivery.sebango}</td>
                                    <td>{oDelivery.pltype}</td>
                                    {
                                        [...Array(31)].map((o: any, i: number) => {
                                            let day = (i + 1).toLocaleString('en', { minimumIntegerDigits: 2 });
                                            return <td>{oDelivery[`d${day}`]}</td>
                                        })
                                    }
                                </tr>
                            })
                        }
                        <tr>
                            Summary
                        </tr>
                    </table>
                    <span>aทดสอบ</span>
                </div>
            </div>
        </div>
    )
}

export default DeliveryControlSheet