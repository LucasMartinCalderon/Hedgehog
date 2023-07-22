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
import { useAccount, useConnect, useDisconnect, useContractRead, useBalance } from 'wagmi'
import PropTypes from 'prop-types';
import hedgeHogNFT from './hedgehogToken.json'
import mcr from './mcr.json'
import hedgehogPool from './hedgehogPool.json'
import coverNFT from './coverNFT.json'
import { useContractWrite, usePrepareContractWrite, useContractReads } from 'wagmi'
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
  padding: "1em"
})

export default function Fundings() {

  const [value, setValue] = useState(0);

  const [open, setOpen] = useState(false);
  const [selectedPool, setSelectedPool] = useState("");

  const [xTokenAmount, setXTokenAmount] = useState(0);
  const [totalTokenFunded, setTotalTokenFunded] = useState(0);
  const [tokenFundedSymbol, setTokenFundedSymbol] = useState("");
  const [totalHedgeTokenSupply, setTotalHedgeTokenSupply] = useState(0);
  const [totalMcr, setTotalMcr] = useState(0);
  const [totalBigMcr, setTotalBigMcr] = useState(0);
  const [tokenFundedValue, setTokenFundedValue] = useState(0);
  const [totalHedgeTokenPrice, setTotalHedgeTokenPrice] = useState(0);

  const handlePremiumModalOpen = (eachPool) => {
    console.log("pool is : ", eachPool);
    setSelectedPool(eachPool)
    setOpen(true)
  };

  const handlePremiumModalClose = () => {
    setOpen(false)
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { data: ethFunded, isError: errorGetEthFunded, isLoading: getEthIsLoading } = useBalance({
    address: '0x77823013F087c737E6D8d8736745859356d10026',
  })

  const { data: coverNFTSupply, isError: errorCoverNFTSupply, isLoading: getTokenSupplyLoading } = useContractRead({
    address: '0xc49646bF12957B2F12d00512DF20B33047851D3D',
    abi: coverNFT.abi,
    functionName: 'totalSupply',
  })

  const { data: mcrData, isError: errormcrData, isLoading: getMcrDataLoading } = useContractRead({
    address: '0x1b817d878B58ff40FfB9B40e2b4A162f08C6cA4a',
    abi: mcr.abi,
    functionName: 'getMCR',
  })

  const { data: hTokenPrice, isError: errorHTokenPrice, isLoading: getTokenPriceLoading } = useContractRead({
    address: '0x77823013F087c737E6D8d8736745859356d10026',
    abi: hedgehogPool.abi,
    functionName: 'getHEDHForEth',
    args: [tokenFundedValue]
  })
  console.log("coverNFTSupply: ",coverNFTSupply)
  const { data: ownerTokenURLSupply, isError: errorownerTokenURLSupply, isLoading: getOwnerTokenURLLoading } = useContractReads({
    
    contracts: Array.from({length: Number(coverNFTSupply)}, (_, index) => {
      return {
        address: '0xc49646bF12957B2F12d00512DF20B33047851D3D',
        abi: coverNFT.abi,
        functionName: 'ownerOf',
        args: [index+1]
      }
    })
  })


  const { data: hedgeTokenSupply, isError: errorHedgeTokenSupply, isLoading: gethTokenSupplyLoading } = useContractRead({
    address: '0x860B45b7d1aF4499F9a9B17bd27764e3b503d130',
    abi: hedgeHogNFT.abi,
    functionName: 'totalSupply',
  })

  console.log("ownerTokenURLSupply,errorownerTokenURLSupply,getOwnerTokenURLLoading, : ", ownerTokenURLSupply,errorownerTokenURLSupply,getOwnerTokenURLLoading,);


  useEffect(() => {

    console.log("ethFunded, errorGetEthFunded, getEthIsLoading : ", ethFunded, errorGetEthFunded, getEthIsLoading);

    if (ethFunded) {
      const {
        decimals: ethFundedDecimals,
        formatted: ethFundedFormatted,
        symbol: ethFundedSymbol,
        value: ethFundedValue
      } = ethFunded

      setTotalTokenFunded(ethFundedFormatted)
      setTokenFundedSymbol(ethFundedSymbol)
      setTokenFundedValue(ethFundedValue)
    }

    if (hedgeTokenSupply) {
      const hedgeTokenFloatVal = Number(hedgeTokenSupply);
      const stringValHedTokenSupply = hedgeTokenFloatVal.toFixed(0); 
      setTotalHedgeTokenSupply(stringValHedTokenSupply)
      console.log("stringValHedTokenSupply : ", stringValHedTokenSupply);
    }

    console.log("mcrData, errormcrData, getMcrDataLoading : ", mcrData, errormcrData, getMcrDataLoading);

    let tempTotalMcr = 0;

    if (mcrData) {
      const mcrFloatVal = Number(mcrData);
      const stringValMcr = mcrFloatVal.toFixed(0); 
      setTotalMcr(parseFloat(stringValMcr))
      tempTotalMcr = parseFloat(stringValMcr)
      console.log("tempTotalMcr : ", tempTotalMcr);
      setTotalBigMcr(mcrData)
    }

    if (hTokenPrice) {
      const hTokenPriceVal = Number(hTokenPrice);
      const stringhTokenPrice = hTokenPriceVal.toFixed(0); 
      setTotalHedgeTokenPrice(stringhTokenPrice)
    }


    console.log("hTokenPriceSuppl, errorHTokenPrice, getTokenPriceLoading : ", hTokenPrice, errorHTokenPrice, getTokenPriceLoading);

  }, [ethFunded, errorGetEthFunded, getEthIsLoading, 
    coverNFTSupply, errorCoverNFTSupply, getTokenSupplyLoading,
    mcrData, errormcrData, getMcrDataLoading,
    hTokenPrice, errorHTokenPrice, getTokenPriceLoading,
    hedgeTokenSupply, errorHedgeTokenSupply, getTokenSupplyLoading,
  ])

  // BUY Hedgehog TOKEN
  const { config } = usePrepareContractWrite({
    address: '0x77823013F087c737E6D8d8736745859356d10026',
    abi: hedgehogPool.abi,
    functionName: 'buyHEDH',
    args: [0]
  })

  const { address, connector, isConnected } = useAccount()
  const { data, isLoading, isSuccess, write } = useContractWrite(config)

  // SELL X TOKEN
  const { config: sellConfig } = usePrepareContractWrite({
    address: '0x77823013F087c737E6D8d8736745859356d10026',
    abi: hedgehogPool.abi,
    functionName: 'sellHEDH',
    args: [xTokenAmount, 0]
  })

  const { data: sellData, isLoading: sellisLoading, isSuccess: sellisSuccess, write: sellWrite } = useContractWrite(sellConfig)


  return (
    <Slide direction="up" in={true} mountOnEnter unmountOnExit>
    <div className={styles.funding}>
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <Typography variant="h5">
          {`Total ${tokenFundedSymbol} Funded : ${totalTokenFunded} ${tokenFundedSymbol}`}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="h5">
          {`Total Hedgehog Token Supply : ${totalHedgeTokenSupply}`}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="h5">
          {`Current Xtoken Price : ${totalHedgeTokenPrice / Math.pow(10,18)}`}
        </Typography>
      </Grid>
    </Grid>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <StyledTab label="Buy" {...a11yProps(0)} />
            <StyledTab label="Sell" {...a11yProps(1)} />
          </Tabs>
        </Box>
        {/* Buy Hedgehog Token */}
        <CustomTabPanel value={value} index={0}>
          <Grid container spacing={3}>
              <Grid item xs={12}>
                <StyledTextField
                    fullWidth
                    type="number"
                    id="xtoken-amount"
                    label="WEI Amount"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={xTokenAmount}
                    onChange={(event) => {
                      setXTokenAmount(parseInt(event.target.value));
                      // x100_000_000 before submit
                    }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" onClick={() => {
                  console.log("xTokenAmount BUY: ", xTokenAmount);
                  write?.({
                    args: [0],
                    from: `${address}`,
                    // value: parseEther(`${xTokenAmount}`),
                    overrides: {value: parseEther(`${xTokenAmount}`)}
                  })
                }}>
                  Buy Hedgehog Token
                </Button>
              </Grid>
          </Grid>
        </CustomTabPanel>
        {/* Sell Hedgehog Token */}
        <CustomTabPanel value={value} index={1}>
        <Grid container spacing={3}>
              <Grid item xs={12}>
                <StyledTextField
                    fullWidth
                    type="number"
                    id="xtoken-amount"
                    label="Hedgehog Token Amount"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={xTokenAmount}
                    onChange={(event) => {
                      setXTokenAmount(parseFloat(event.target.value));
                      // x100_000_000 before submit
                    }}
                />
              </Grid>
              <Grid item xs={12}>
                {/* <Typography>
                  {`{ETH Receive here}`}
                </Typography> */}
              </Grid>
              <Grid item xs={12}>
                <Button 
                  variant="contained"
                  onClick={() => {
                    // HERE
                    sellWrite?.({
                      args: [xTokenAmount, 0],
                    })
                  }}
                >
                  Sell Hedgehog Token
                </Button>
              </Grid>
          </Grid>
        </CustomTabPanel>
      </Box>
    </div>
    </Slide>
  );
}