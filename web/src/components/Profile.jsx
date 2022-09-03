import React, { useEffect, useState } from "react";

import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Context from "../context/context";

import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import Typography from '@mui/material/Typography';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 'auto',
    maxHeight: 200,
}));

const columns = [
    {
        field: 'week',
        headerName: 'Week',
        minWidth: 100, 
        flex: 1,
    },
    {
        field: 'totalHours',
        headerName: 'Totaal Uren',
        minWidth: 100, 
        flex: 1,
        valueGetter: (params) => {
            const totalHours = params.row.totalHours;

            let hours = totalHours.hours < 10 ? `0${totalHours.hours}` : totalHours.hours;
            let minutes = totalHours.minutes < 10 ? `0${totalHours.minutes}` : totalHours.minutes;

            return `${hours}:${minutes}`
        }
    },
    {
        field: 'totalSalary',
        headerName: 'Totaal Salaris',
        minWidth: 100, 
        flex: 1,
        valueGetter: (params) => {
            return `€${(params.row.totalSalary).toFixed(2)}`
        }
    },
];

const Profile = () => {
    return (
        <Context.Consumer>
            {(value) => {
                return (
                    <div className="Main_Table">
                        <Box sx={{ height: '5%', width: '100%', marginBottom: '1%' }}>
                            <Typography component="h1" variant="h10" fontSize={"3vh"}>Mijn Profiel</Typography>
                        </Box>
                        <Box sx={{ flexGrow: 1, height: '90%' }}>
                            <Grid container spacing={5}>
                                <Grid item xs={8}>
                                    <Box sx={{ height: 400, width: '100%' }}>
                                        <DataGrid
                                            rows={value.clockWeeks}
                                            columns={columns}
                                            pageSize={5}
                                            rowsPerPageOptions={[5]}
                                            disableColumnFilter
                                            disableColumnSelector
                                            disableDensitySelector
                                            disableSelectionOnClick
                                            disableColumnMenu
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={4}>
                                    <Item>xs=4</Item>
                                </Grid>
                                <Grid item xs={4}>
                                    <Item>xs=4</Item>
                                </Grid>
                                <Grid item xs={4}>
                                    <Item>xs=8</Item>
                                </Grid>
                                <Grid item xs={4}>
                                    <Item>xs=8</Item>
                                </Grid>
                            </Grid>
                        </Box>
                    </div>
                )
            }}
        </Context.Consumer>
    )
}

export default Profile;