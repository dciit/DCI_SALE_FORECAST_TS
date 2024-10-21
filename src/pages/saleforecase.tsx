import { faker } from '@faker-js/faker';
import { Avatar } from 'antd';
import moment from 'moment';
import { AiFillAlert } from "react-icons/ai";

function SaleForecase() {
    const today: string = moment().format('DD');
    const month: string = moment().format('MMM');
    const dddd: string = moment().format('dddd');
    const textColor: string = '#5c5fc8';
    const icons: any[] = [<AiFillAlert />, <AiFillAlert />, <AiFillAlert />];


    return (
        <div className='h-[100%] flex flex-row'>
            <div id="nav" className='w-[75px] flex items-center flex-col pt-6 gap-6 h-full border-r border-r-[#ddd]  '>
                <div className='flex flex-col items-center'>
                    <Avatar className='shadow-lg' src='http://dcidmc.dci.daikin.co.jp/PICTURE/41256.jpg' />
                    <span className={`text-[${textColor}] font-semibold drop-shadow-lg select-none`}>P.K</span>
                </div>
                <div id="nav-menu">
                    {
                        icons.map((oIcon: any, i: number) => {
                            return <div key={i} className='text-black text-center py-2 select-none cursor-pointer hover:text-[#5c5fc8] duration-300 transition-all hover:scale-105'>
                                <div id="icon">{oIcon}</div>
                                <span className='text-[1em]'>{faker.name.firstName().substring(0, 4)}</span>
                            </div>
                        })
                    }
                </div>
            </div>
            <div className=' border-r'>
                <div className='w-[300px]  pt-3'>
                    <div id="calendar " className='flex flex-col gap-2 px-6 border-b pb-5'>
                        <span className='font-semibold'>December</span>
                        <div id="search" className='flex gap-1'>
                            <input type="text" className='bg-[#ddd] rounded-sm pl-3 py-1' placeholder='Search' />
                            <div className='bg-[#ddd] w-fit rounded-sm px-2 py-1 text-[#575757]'>
                                {/* <KeyboardVoiceOutlinedIcon /> */}
                            </div>
                        </div>
                        <div >
                            <div className='flex justify-around w-full'>
                                {
                                    [...Array(7)].map((oDay: string, iDay: number) => {
                                        return <div key={oDay+iDay} className='text-[rgb(189,189,189)]'>{moment().add('days', iDay).format('dd').substring(0, 2)}</div>
                                    })
                                }
                            </div>
                            <div className='flex justify-around w-full select-none cursor-pointer'>
                                {
                                    [...Array(7)].map((oDay: string, iDay: number) => {
                                        let dayLoop = moment().add('days', iDay).format('DD');
                                        return today == dayLoop ? <div key={oDay+iDay} className={`w-[30px] h-[30px] text-[${textColor}] rounded-full flex  justify-center items-center bg-[#5c5fc835] border-[#5c5fc810] font-semibold border`}>
                                            {dayLoop}
                                        </div> : <div className={`w-[30px] h-[30px]  rounded-full flex  justify-center items-center text-[#7e7e7e]  font-semibold`}>
                                            {dayLoop}
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className='px-6 pt-3 flex flex-col'>
                    <div className='flex  gap-3'>
                        <div className='flex gap-1 font-bold text-[#5a5a5a]'>
                            <span>{month.toUpperCase()}</span>
                            <span>{today}</span>
                        </div>
                        <span>{dddd}</span>
                    </div>
                    <div id='listSaleForecase ' className='flex flex-col gap-3'>
                        {
                            [...Array(3)].map((o: any, i: number) => {
                                return <div key={o+i} className={`p-[4px] rounded-md drop-shadow-lg bg-[#5c5fc8] h-[75px] flex`}>
                                    <div className='w-[15px] bg-white rounded-full h-full'></div>
                                    <div>asda</div>
                                    <div></div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SaleForecase