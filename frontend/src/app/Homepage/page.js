"use client"
import Image from 'next/image'
import React, { useState, useRef, useEffect, useCallback } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './page.module.css';
import MonteCarloSimulator from '../MonteCarloSimulator/MCSimulator';
import { Select, MenuItem, InputLabel, FormControl, TextField, 
    Accordion, AccordionSummary, AccordionDetails, Autocomplete,
    Typography, Button, Grid, Divider, Box, Chip, Tabs, Tab, Paper, Modal, Slide,
    Stepper, Step, StepLabel } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/system';
import CryptoJS from 'crypto-js';
import ReactEcharts from "echarts-for-react"
// import DataEditor from "@glideapps/glide-data-grid";
import { LineChart } from '@mui/x-charts/LineChart';
import { useAccount, useConnect, useDisconnect, useContractRead,
  useContractWrite, usePrepareContractWrite
} from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

import PropTypes from 'prop-types';
import coverJson from './cover.json'
import Decimal from 'decimal.js';
import { parseEther } from 'viem'

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
  padding: "1em",
  height: 110
})

const StyledModalBoxTwo = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  background: '#000',
  padding: "1em",
  // width: 500,
})

const StyledButton = styled(Button)({
  height: '70px',
  '& .MuiButton-label': {
      fontSize: '1.5rem', // Increase the font size
  }
});

export default function Home(props) {

  const [open, setOpen] = useState(false);
  const [coverOpen, setCoverOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [lowerBound, setLowerBound] = useState(0);
  const [upperBound, setUpperBound] = useState(0);
  const [validPeriod, setValidPeriod] = useState(0);
  const [tokenOneQty, setTokenOneQty] = useState(0);
  const [tokenOnePrice, setTokenOnePrice] = useState(1600);
  const [tokenTwoQty, setTokenTwoQty] = useState(0);
  const [tokenTwoPrice, setTokenTwoPrice] = useState(1600);
  const [dataset, setDataset] = useState({});
  const [premium, setPremium] = useState(0);

  let annualVolatility = 0.3

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  function standardNormalDistribution() {
    let u = 0, v = 0;
    while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}

  useEffect(() => {
    const period = validPeriod * 60 * 60 * 24; // validPeriod is in days
    const periodU = period/60/60/24/365;
    let L = tokenOneQty / (1 / Math.sqrt(tokenOnePrice) - 1 / Math.sqrt(upperBound));
    const tempTokenTwoQty = L * (Math.sqrt(tokenOnePrice) - Math.sqrt(lowerBound));
    setTokenTwoQty(tempTokenTwoQty)

    const tempDataset = Array.from({ length: 10000 }, () => {
        const randNum = Math.random();
        const x = tokenOnePrice * Math.exp(randNum * annualVolatility * Math.sqrt(periodU));
        const y = payoff(x, lowerBound, upperBound, tokenOnePrice, tokenOneQty, tempTokenTwoQty, L);
        
        return { x, y };
    });

    const tempArr = Array.from({ length: 100 }, () => {
      const randNum = standardNormalDistribution();
      
      const x = tokenOnePrice * Math.exp(randNum * annualVolatility * Math.sqrt(periodU));
      const y = payoff(x, lowerBound, upperBound, tokenOnePrice, tokenOneQty, tempTokenTwoQty, L);
      
      return { x, y };
  });

    console.log("tempDataset : ", tempDataset);

    console.log("tempArr : ", tempArr);
    
    const premiumY = (tempDataset && (tempDataset.reduce((a, b) => {
      return a + b.y
    }, 0) / tempDataset.length));
  
    const x = (tempArr && tempArr.map(d => d.x) || []);
    const y = (tempDataset && tempDataset.map(d => d.y) || []);
    const averageY = (y && y.reduce((a, b) => a + b, 0) / y.length) || 0;
    const tempDataSetObj = { 
      datasets: [
        {
            label: "Payoffs",
            // type: 'line',
            data: (tempArr || []),
            // fill: false,
            backgroundColor: "rgba(75,192,192,1)",
            borderColor: "rgba(75,192,192,1)",
            // hoverBackgroundColor: "rgba(75,192,192,0.4)",
            // hoverBorderColor: "rgba(75,192,192,1)",
            // showLine: false // Add this to show individual points
        },
        {
            label: "Premium",
            data: (x && x.map(_x => ({ x: _x, y: averageY })) || []),
            type: 'line',  // Change scatter to line
            // fill: false,
            borderColor: "#610080"
        }
    ]
    }
    setDataset(tempDataSetObj || {})
    setPremium(premiumY)
  }, [lowerBound, upperBound, validPeriod, tokenOneQty]);

  const payoff = (lastTokenOnePrice, lowBound, upBound, token1Price, token1Qty, token2Qty, L) => {
    var lastTokenOnePrice_t = lastTokenOnePrice
    if (lastTokenOnePrice > upperBound) {
      lastTokenOnePrice_t  = upBound
    } else if (lastTokenOnePrice < lowBound) {
      lastTokenOnePrice_t = lowBound
    }

    let qty_y_last = L * (Math.sqrt(lastTokenOnePrice_t) - Math.sqrt(lowBound));
    let qty_x_last = L * (1 / Math.sqrt(lastTokenOnePrice_t) - 1 / Math.sqrt(upBound));
    
    qty_y_last = Math.max(qty_y_last, 0);
    qty_x_last = Math.max(qty_x_last, 0);
    
    const normal_pnl = token1Qty * (lastTokenOnePrice - token1Price);
    const lp_pnl = (qty_x_last * lastTokenOnePrice + qty_y_last) - token1Qty * token1Price - token2Qty;
    
    return (normal_pnl - lp_pnl) || 0;
}

  const handleInvestorModalOpen = (eachPool) => {
    setOpen(true)
  };

  const handleInvestorModalClose = () => {
    setOpen(false)
  }

  const handleCoverModalOpen = () => {
    setCoverOpen(true)
  };

  const handleCoverModalClose = () => {
    setActiveStep(0);
    setCoverOpen(false)
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  
  const steps = ['Select Hedge Pool', 'Input Hedge Parameters', 'Confirm'];
  
  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      console.log('end');
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const { data, isError, isLoading } = useContractRead({
    address: '0xf25a91E4042BD119Ac55830158B911eA535a27c9',
    abi: coverJson.abi,
    functionName: 'getUnitPX',
    args: ["0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e"]
  })

  useEffect(() => {
    console.log('data : ', data);
    let tempData = Number(data);
    if (tempData % 1 !== 0) {
      tempData = Math.round(tempData);
    } else {
      tempData = data
    }
    let temp = Number(BigInt(tempData)) / 100000000
    setTokenOnePrice(parseFloat(temp))

  },[data])

  const {write} = useContractWrite({
    address: '0x61d2408168aC3ab91663EB945A53237109768165',
    abi: coverJson.abi,
    functionName: 'buyCover',
    args:[[
      "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e", // eth address token 0
      "0x04b1560f4f58612a24cf13531f4706c817e8a5fe", // pool address token 1
      (Number(tokenTwoQty) % 1 !== 0 ? parseInt(tokenTwoQty) * Math.pow(10, 18) : tokenTwoQty * Math.pow(10, 18)),
      (Number(tokenOneQty) % 1 !== 0 ? parseInt(tokenOneQty) * Math.pow(10, 18) : tokenOneQty * Math.pow(10, 18)),
      (lowerBound * Math.pow(10, 18)),
      (upperBound * Math.pow(10, 18)),
      (validPeriod * 60 * 60 * 24),
      "USDC/WETH",
      (Number(data) % 1 !== 0 ? parseInt(data) * Math.pow(10, 18) : parseInt(data.toString())),
    ]],
    value: parseEther(`${premium /(Number(BigInt(data)) / 100000000)}`),
  });
  
  const handlePremiumPurchase = () => {
    handleNext()
  }
  console.log("cdata, isError, isLoading : ", data, isError, isLoading);

  console.log("write : ", write);
  // console.log("isLoadingBuy : ", isLoadingBuy);
  // console.log("isSuccessBuy : ", isSuccessBuy);
  // console.log("isErrorBuy : ", isErrorBuy);
  // console.log("buyData : ", buyData);
  const { address, connector, isConnected } = useAccount()
  console.log("isConnected : ", isConnected);

  return (
    <Slide direction="up" in={true} mountOnEnter unmountOnExit>
    <div className={styles.homepage}>
        <Grid 
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Grid item>
            <CustomAccordion className={styles.accordian}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Introduction</Typography>
              </AccordionSummary>
              <AccordionDetails>
              <Typography variant="body1" gutterBottom>
                  Hedgehog is a cutting-edge protocol that provides impermanent loss insurance, revolutionizing the way protection is offered in the digital asset space. By minting insurances as NFTs, it not only ensures asset protection but also creates a dynamic marketplace for trading these unique tokens. Engaging with Hedgehog is remarkably easy, enabling you to secure your investment in three straightforward steps. Moreover, you can participate in funding the capital pool by investing in Hedgehog tokens, positioning yourself at the forefront of this innovative financial paradigm.
              </Typography>
              <br/><br/>
              </AccordionDetails>
            </CustomAccordion>
            <br/><br/>
            <div 
              style={{
                display: 'flex',
                justifyContent: 'center', // This will align the div horizontally center.
                alignItems: 'center', // This will align the div vertically center.
                height: '70vh' // This will take the full height of the screen.
              }}
            >
              <div style={{maxWidth: '500px'}}> {/* This is the child div with max-width 500px */}
                <Grid 
                  container
                  spacing={3}
                >
                  <Grid item xs={6}>
                    <StyledButton 
                      fullWidth
                      variant="contained"
                      size="large"
                      onClick={()=> {
                        props.changeAppPage('funding')
                      }}
                    >INVESTOR</StyledButton>
                  </Grid>
                  <Grid item xs={6}>
                    <StyledButton
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={()=> {
                      handleCoverModalOpen()
                    }}
                    >GET COVER PROTECTION</StyledButton>
                  </Grid>
                </Grid>
              </div>
            </div>
          </Grid>
        </Grid>
      <Modal
        open={open}
        onClose={handleInvestorModalClose}
        aria-labelledby="investor"
        aria-describedby="investor-description"
      >
        <StyledModalBox>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <StyledButton fullWidth variant="contained">BUY</StyledButton>
              </Grid>
              <Grid item xs={6}>
                <StyledButton fullWidth variant="contained">SELL</StyledButton>
              </Grid>
          </Grid>
        </StyledModalBox>
      </Modal>
      <Modal
        open={coverOpen}
        onClose={handleCoverModalClose}
        aria-labelledby="investor"
        aria-describedby="investor-description"
      >
        <StyledModalBoxTwo>
          <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps} sx={{color: 'white !important'}}>
                      <Typography color="white">{label}</Typography>
                    </StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </Box>
          <br/><br/>
          <React.Fragment>
            {/* STEPS CONTENT */}
            {/* SELECT POOL */}
            {activeStep === 0 &&<Grid container spacing={3}>
              {activeStep === 0 && ["ETH/WETH Pool", "Pool 2", "Pool 3"].map((eachPool, index) => {
                return <Grid key={index} item xs={4}>
                        <StyledPaper 
                                sx={{margin: '1em', cursor: 'pointer'}} 
                                elevation={3} 
                                key={`pool-${index}`}
                                onClick={handleNext}
                            >
                          {`${eachPool}`}
                        </StyledPaper>
                </Grid>
              })}
            </Grid>}
          {/* INPUT PARAMETERS */}
           {activeStep === 1 && <Grid container spacing={3}>
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
                <Typography id="priceComparison" variant="h6" component="h2">{`Price / Exchange Rate : ${Number(BigInt(data)) / 100000000}`}</Typography>
              </Grid>
              <Grid item xs={12}>
                  <StyledTextField
                      fullWidth
                      type="number"
                      id="validity-period"
                      label="Validity Period (denominated in days)"
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
                <Typography id="tokenQty" variant="h6" component="h2">{`Secondary Token Quantity: ${tokenTwoQty}`}</Typography>
              </Grid>
              <Grid item xs={12}>
                {`Premium : ${premium} Primary Token`}
              </Grid>
              {/* HERE */}
              {lowerBound && upperBound  && validPeriod && tokenOneQty && <Grid item xs={12}>
                <MonteCarloSimulator finalDataset={dataset}/>
              </Grid>}
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>&nbsp;
                <Button disabled={!write} onClick={() => {
                  handlePremiumPurchase()
                  write?.();
                }} variant="contained">Confirm Premium Purchase</Button>
                <br/><br/>
                <Typography id="explanation"><i>{`This will mint an NFT. The NFT can be used to claim protection on a later date.`}</i></Typography>
              </Grid>
          </Grid>}
          {/* COMPLETE */}
          {activeStep === 2 &&<Grid container spacing={3}>
              <Grid item xs={12}>
                <Button onClick={() => {
                  handleCoverModalClose()
                }} variant="contained">Complete</Button>
                <br/><br/>
              </Grid>
            </Grid>}
          {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
          </Box>
        </React.Fragment>
        </StyledModalBoxTwo>
      </Modal>
    </div>
    </Slide>
  );
}