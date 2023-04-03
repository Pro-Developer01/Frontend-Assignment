import { Box, Paper } from '@mui/material'
import React, { useState } from 'react'
import UISchema from './UISchema.js'
import JSONEditor from './JSONEditor.js'
// import formJson from '../Assets/pizza.json'

export default function UiSchema() {
    const [formJson, setFormJson] = useState(null)

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '82%',
                gap: '1.5rem'

            }}
        >


            <Paper elevation={3} >

                < JSONEditor setFormJson={setFormJson} />

            </Paper>
            <Paper elevation={3} >

                <UISchema data={formJson} />

            </Paper>

        </Box>
    )
} 
