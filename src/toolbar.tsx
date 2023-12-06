import { Stack, Typography, Avatar } from '@mui/material'
function ToolbarComponent() {
    return (
        <Stack className='toolbar h-[5%] bg-white' justifyContent={'center'} px={2} style={{ borderBottom: '1px solid #d9d9d9' }}>
            <Stack className='select-none' direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                <Typography color="initial">SALE FORECAST</Typography>
                <Stack className='cursor-pointer'>
                    <Avatar >N</Avatar>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default ToolbarComponent