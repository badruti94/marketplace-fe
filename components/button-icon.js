import { IconButton } from '@mui/material'
import React from 'react'

const ButtonIcon = ({ Icon, onClick }) => {
    return (
        <IconButton sx={{ mr: 1 }}
            size='medium'
            color='secondary'
            onClick={onClick}
        >
            <Icon fontSize='medium' />
        </IconButton>
    )
}

export default ButtonIcon