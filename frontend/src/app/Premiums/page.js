"use client"
import Image from 'next/image'
import React, { useState, useRef, useEffect, useCallback } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './page.module.css';
import { Select, MenuItem, InputLabel, FormControl, TextField, 
    Accordion, AccordionSummary, AccordionDetails, Autocomplete,
    Typography, Button, Grid, Divider, Box, Chip, Tabs, Tab, Paper, Modal, Slide } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/system';
import CryptoJS from 'crypto-js';
import ReactEcharts from "echarts-for-react"
// import DataEditor from "@glideapps/glide-data-grid";
import { LineChart } from '@mui/x-charts/LineChart';

import PropTypes from 'prop-types';


// import "@glideapps/glide-data-grid/dist/index.css";

const StyledSelect = styled(Select)({
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "white",
        },
        "&:hover fieldset": {
          borderColor: "white",
        },
        "&.Mui-focused fieldset": {
          borderColor: "white",
        },
    },
    "& .MuiInputBase-input": {
        color: "white",
    },
    "& .MuiFormLabel-root": {
        color: "white",
    },
    "& .MuiInputLabel-root": {
        color: 'white',
    },
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'white',
    },
    '& .MuiSvgIcon-root': {
        color: 'white'
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'white',
    },
});

const StyledChip = styled(Chip)({
    "& .MuiChip-deleteIcon": {
        color: 'white',
    },
    '&:hover .MuiChip-deleteIcon': {
        color: 'white',
    },
    "& .MuiChip-label": {
        color: 'white',
    },
});

const StyledTab = styled(Tab)({
  color: 'white',
  '&.Mui-selected': {
    // color: theme.palette.primary.main,
  },
});

const StyledAutocomplete = styled(Autocomplete)({
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "white",
        },
        "&:hover fieldset": {
          borderColor: "white",
        },
        "&.Mui-focused fieldset": {
          borderColor: "white",
        },
    },
    "& .MuiInputBase-input": {
        color: "white",
    },
    "& .MuiFormLabel-root": {
        color: "white",
    },
    "& .MuiInputLabel-root": {
        color: 'white',
    },
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'white',
    },
    '& .MuiSvgIcon-root': {
        color: 'white'
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'white',
    },
});

const StyledDataGrid = styled(DataGrid)({
    '& .MuiDataGrid-row': {
        height: '25px',
    },
    '& .MuiDataGrid-cell': {
        padding: '0 4px',
      },
    '& .MuiDataGrid-row:hover': {
        backgroundColor: '#ef7f91', // Change this to the color you want on hover
    },
    '& .MuiDataGrid-row.Mui-selected': {
        backgroundColor: '#5b6dd5 !important', // Change this to the color you want for selected rows
    },
});

const StyledTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
    "& .MuiInputBase-input": {
      color: "white"
    },
    "& .MuiFormLabel-root": {
      color: "white"
    }
  });

const CustomAccordion = styled(Accordion)({
    color: 'rgba(236,236,241,1)',
    background: '#673ab7',
});

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  margin: '1em',
  padding: theme.spacing(2),
  color: 'white',
  background: 'linear-gradient(135deg, #000000 0%, #610080 70%, #5b6dd5 97%, #ef7f91 100%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  textAlign: 'center'
}));

const StyledModalBox = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  background: '#000',
  padding: "1em"
})

export default function Premiums() {

  const [value, setValue] = React.useState(0);

  const [open, setOpen] = React.useState(false);
  const [selectedPool, setSelectedPool] = React.useState("");

  const [lowerBound, setLowerBound] = React.useState(0);
  const [upperBound, setUpperBound] = React.useState(0);
  const [validPeriod, setValidPeriod] = React.useState(0);
  const [tokenOneQty, setTokenOneQty] = React.useState(0);

  const handlePremiumModalOpen = (eachPool) => {
    setSelectedPool(eachPool)
    setOpen(true)
  };

  const handlePremiumModalClose = () => {
    setOpen(false)
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <Slide direction="up" in={true} mountOnEnter unmountOnExit>
    <div className={styles.portfolio}>
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <StyledTab label="Buy Premiums" {...a11yProps(0)} />
          <StyledTab label="Claim Protections" {...a11yProps(1)} />
        </Tabs>
      </Box>
      {/* Premiums */}
      <CustomTabPanel value={value} index={0}>
        {
          ["Pool 1", "Pool 2", "Pool 3"].map((eachPool, index) => {
            return <StyledPaper 
                    sx={{margin: '1em', }} 
                    elevation={3} 
                    key={`pool-${index}`}
                    onClick={() => {handlePremiumModalOpen(eachPool)}}
                >
              {`${eachPool}`}
              test
            </StyledPaper>
          })
        }
      </CustomTabPanel>
      {/* Claims */}
      <CustomTabPanel value={value} index={1}>
        <Grid container spacing={3}>
          {
            ["Claim 1", "Claim 2", "Claim 3", "Claim 4", "Claim 5", "Claim 6"].map((eachPool, index) => {
              return <Grid item xs={4} key={`claim-${index}`}><StyledPaper 
                      sx={{margin: '1em', }} 
                      elevation={3} 
                  >
                <div>{`${eachPool}`}</div>
                <br/><br/>
                <div><Button variant='contained'>Claim</Button></div>
              </StyledPaper></Grid>
            })
          }
          </Grid>
      </CustomTabPanel>
    </Box>

    <Modal
        open={open}
        onClose={handlePremiumModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <StyledModalBox>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {`Premium Questionaire: ${selectedPool}`}
          </Typography>
          <br/><br/>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                  <StyledTextField
                      fullWidth
                      type="number"
                      id="lower-bound"
                      label="Lower Bound"
                      InputLabelProps={{
                          shrink: true,
                      }}
                      value={lowerBound}
                      onChange={(event) => {
                        setLowerBound(parseFloat(event.target.value));
                        // x10000 before submit
                      }}
                  />
              </Grid>
              <Grid item xs={12}>
                  <StyledTextField
                      fullWidth
                      type="number"
                      id="upper-bound"
                      label="Upper Bound"
                      InputLabelProps={{
                          shrink: true,
                      }}
                      value={upperBound}
                      onChange={(event) => {
                        setUpperBound(parseFloat(event.target.value));
                        // x10000 before submit
                      }}
                  />
              </Grid>
              <Grid item xs={12}>
                <Typography id="priceComparison" variant="h6" component="h2">{`{Price Comparison Here}`}</Typography>
              </Grid>
              <Grid item xs={12}>
                  <StyledTextField
                      fullWidth
                      type="number"
                      id="validity-period"
                      label="Validity Period (denominated in seconds)"
                      InputLabelProps={{
                          shrink: true,
                      }}
                      value={validPeriod}
                      onChange={(event) => {
                        setValidPeriod(parseInt(event.target.value));
                      }}
                  />
              </Grid>
              <Grid item xs={12}>
                  <StyledTextField
                      fullWidth
                      type="number"
                      id="token1-qty"
                      label="Primary Token Quantity"
                      InputLabelProps={{
                          shrink: true,
                      }}
                      value={tokenOneQty}
                      onChange={(event) => {
                        setTokenOneQty(parseFloat(event.target.value));
                        // x100_000_000 before submit
                      }}
                  />
              </Grid>
              <Grid item xs={12}>
                <Typography id="priceComparison" variant="h6" component="h2">{`{Display (Auto Calculate) Token 2 Quantity}`}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained">Calculate Premium</Button>
              </Grid>
              <Grid item xs={12}>
                {`{Display Premium Here}`}
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained">Confirm Premium Purchase</Button>
                <br/><br/>
                <Typography id="priceComparison"><i>{`This will mint an NFT. The NFT can be used to claim protection on a later date.`}</i></Typography>
              </Grid>
          </Grid>
        </StyledModalBox>
      </Modal>
    </div>
    </Slide>
  );
}