import FindInPageIcon from '@mui/icons-material/FindInPage';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const ButtonLink = ({ text, href, icon = 'find' }) => {
    const router = useRouter()

    const icons = {
        find: <FindInPageIcon />,
        add: <AddIcon />,
    }

    return (
        <Button
            size="small"
            variant='contained'
            onClick={() => { router.push(href) }}
            endIcon={icons[icon]}
        >
            {text}
        </Button>
    )
}

export default ButtonLink   