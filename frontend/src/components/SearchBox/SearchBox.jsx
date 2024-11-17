import React, { useState } from 'react'
import { Box, TextField, Button, Select, MenuItem } from "@mui/material";

const SearchBox = () => {
    const [keyword, setKeyword] = useState("");
    const [type, setType] = useState("");
    const [location, setLocation] = useState("");

    const advertTypes = [
        {
          value: "Ev İlanı",
          label: "Ev İlanı",
        },
        {
          value: "Ev Arkadaşı Arama",
          label: "Ev Arkadaşı Arama İlanı",
        },
        {
          value: "Eşya İlanı",
          label: "Eşya İlanı",
        },
        {
          value: "Ev Arkadaşı Olma İlanı",
          label: "Ev Arkadaşı Olma İlanı",
        },
    ];

    return (
        <Box
            sx={{
                mt: 8,
                p: 2,
                pt: 4,
                backgroundColor: "#fff",
                width: "80%",
                alignItems: "center",
                display: "flex",
                justifyContent: "space-around",
                borderRadius: 2,
            }}
        >
            <TextField
                id="outlined-basic"
                label="Anahtar Kelime"
                variant="outlined"
                sx={{ mr: 2 }}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <Select
                label="İlan Tipi"
                value={advertTypes[0].value}
                onChange={(e) => setType(e.target.value)}
            >
                {advertTypes.map(advertType => <MenuItem value={advertType.value}>{advertType.label}</MenuItem>)}
            </Select>
            <TextField
                id="outlined-basic"
                label="Location"
                variant="outlined"
                sx={{ mr: 2 }}
                onChange={(e) => setLocation(e.target.value)}
            />
            <TextField
                id="outlined-basic"
                label="Min Price"
                variant="outlined"
                sx={{ mr: 2 }}
            />
            <TextField
                id="outlined-basic"
                label="Max Price"
                variant="outlined"
                sx={{ mr: 2 }}
            />
            <Button
                sx={{ backgroundColor: "#FF5A3C", color: "#ffff", mt: 1, ml: 2 }}
            >
                Search
            </Button>
        </Box>
        
    )
}

export default SearchBox