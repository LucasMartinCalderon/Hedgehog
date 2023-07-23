import React, { useEffect, useState } from "react";
import { Scatter, getDatasetAtEvent } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
const MonteCarloSimulator = (props) => {

    const {finalDataset} = props

    return (
        <div>
        {
                        <Scatter 
                        data={finalDataset} 
                        options={{
                            scales: {
                              x: {
                                position: 'bottom'
                              }
                            }
                        }}
                    />
        }
    </div>
    );
};

export default MonteCarloSimulator;
