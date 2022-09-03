import React, { useEffect } from "react";

import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Context from "../context/context";

import Typography from '@mui/material/Typography';

const GetTotalTime = (startTime, endTime) => {
    var diffMs = (endTime - startTime); // milliseconds between now & Christmas
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes

    if (diffHrs < 10) { diffHrs = "0" + diffHrs;}
    if (diffMins < 10) { diffMins = "0" + diffMins;}
    return diffHrs + ':' + diffMins;
}

const options = {  
    weekday: "long", year: "numeric", month: "short",  
    day: "numeric", hour: "2-digit", minute: "2-digit"  
}

function getFridayOfCurrentWeek(todayDate) {
    const today = todayDate;
    const first = today.getDate() - today.getDay() + 1;
    const fifth = first + 4;
  
    const friday = new Date(today.setDate(fifth));
  
    return friday;
}

function getCurrentWeek() {
    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), 0, 1);
    let days = Math.floor((currentDate - startDate) /
        (24 * 60 * 60 * 1000));
         
    let weekNumber = Math.ceil(days / 7);
    return weekNumber;
}

const Overview = () => {
    const today = new Date();
    const currentWeek = getCurrentWeek();

    const gridColumns = [
        {
            field: 'week',
            headerName: 'Week',
            width: 150, 
            editable: false,
        },
        {
            field: 'starttime',
            headerName: 'Begin Tijd',
            minWidth: 100, 
            flex: 1,
            editable: false,
            filterable: false,
            valueGetter: (params) => {
                const startDate = new Date(params.row.starttime);
                return (startDate.toLocaleDateString("en-us", options))
            }
        },
        {
            field: 'endtime',
            headerName: 'Eind Tijd',
            minWidth: 200, 
            flex: 1,
            editable: false,
            filterable: false,
            valueGetter: (params) => {
                if (!params.row.endtime) {
                    return ("...")
                }
                const endDate = new Date(params.row.endtime);
                return (endDate.toLocaleDateString("en-us", options))
            }
        },
        {
            field: 'totalTime',
            headerName: 'Totale Uren',
            minWidth: 200, 
            flex: 1,
            editable: false,
            filterable: false,
            valueGetter: (params) => {
                const startDate = new Date(params.row.starttime);
                const endDate = new Date(params.row.endtime ? params.row.endtime : new Date());
                const totalTime = GetTotalTime(startDate, endDate);

                return (totalTime);
            }
        },
        {
            field: 'totalPayout',
            headerName: 'Salaris',
            minWidth: 200, 
            flex: 1,
            editable: false,
            filterable: false,
            valueGetter: (params) => {
                const startDate = new Date(params.row.starttime);
                const endDate = new Date(params.row.endtime ? params.row.endtime : new Date());
                const totalSeconds = ((endDate - startDate) / 1000);
                const moneyPerHour = (10 / 3600)
    
                return (`€ ${(totalSeconds * moneyPerHour).toFixed(2)}`);
            }
        },
    ]

    return (
        <Context.Consumer>
            {(value) => {
                return (
                    <div className="Main_Table">
                        <Box sx={{ height: '4%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                           <Typography component="h1" variant="h10" fontSize={"3vh"}>Uren Registratie</Typography>
                           <Typography component="h1" variant="h10" fontSize={"3vh"}>Week {currentWeek}</Typography>
                        </Box>
                        <Box sx={{ height: '10%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            { value.user.last_clock ? <Button variant="contained" color={"error"} onClick={value.ClockOut}>Uitklokken</Button> : <Button variant="contained" color={"success"} onClick={() => { value.ClockIn(currentWeek) }}>Inklokken</Button> }
                            <Box sx={{ height: '100%', width: 'fit-content', display: 'flex', alignItems: 'center', }}>
                                <Button variant="contained" color={"error"} onClick={value.Clear}>Clear</Button>
                            </Box>
                        </Box>
                        <Box sx={{ height: '86%', width: '100%' }}>
                            <DataGrid
                                rows={value.clockTimes}
                                columns={gridColumns}
                                experimentalFeatures={{ newEditingApi: true }}

                                // disableColumnMenu
                                // disableColumnFilter
                                disableColumnSelector
                                disableSelectionOnClick

                                initialState={{
                                    sorting: {
                                      sortModel: [{ field: 'starttime', sort: 'desc' }],
                                    },
                                }}
                            />
                        </Box>
                    </div>
                )
            }}
        </Context.Consumer>
    )
}

export default Overview;