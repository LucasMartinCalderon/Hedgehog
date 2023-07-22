# Copyright Hedgehog DeFi Protocol

from os import environ
import traceback
import logging
import requests
import numpy as np
import matplotlib.pyplot as plt

logging.basicConfig(level="INFO")
logger = logging.getLogger(__name__)

rollup_server = environ["ROLLUP_HTTP_SERVER_URL"]
logger.info(f"HTTP rollup_server url is {rollup_server}")

def hex2str(hex):
    """
    Decodes a hex string into a regular string
    """
    return bytes.fromhex(hex[2:]).decode("utf-8")

def str2hex(str):
    """
    Encodes a string as a hex string
    """
    return "0x" + str.encode("utf-8").hex()

def monte_carlo_simulation():
    annual_vol = 0.3
    lowerBound = 1000
    upperBound = 2000
    qty_x = 1
    period = 606024 
    init_px = 1600

    period_u = period /60/60/24/365
    L = qty_x / (1/np.sqrt(init_px)-1/np.sqrt(upperBound))
    qty_y = L * (np.sqrt(init_px)-np.sqrt(lowerBound))

    def payoff(last_px):
        qty_y_last = L * (np.sqrt(last_px)-np.sqrt(lowerBound))
        qty_x_last = L * (1/np.sqrt(last_px)-1/np.sqrt(upperBound))

        qty_y_last = max(qty_y_last,0)
        qty_x_last = max(qty_x_last,0)

        normal_pnl = qty_x * (last_px - init_px) 
        lp_pnl = (qty_x_last * last_px + qty_y_last) - qty_x * init_px - qty_y
        return normal_pnl - lp_pnl

    payoff = np.vectorize(payoff)

    x = init_px * np.exp(np.random.randn(10000) * annual_vol * np.sqrt(period_u))
    payoffs = payoff(x)
    
    plt.scatter(x, payoffs)
    plt.axlike(np.mean(payoffs))
    plt.save_as('plot.png')

    return np.mean(payoffs)

def handle_advance(data):
    logger.info(f"Received advance request data {data}")

    status = "accept"
    try:
        logger.info("Adding notice")
        response = requests.post(rollup_server + "/notice", json={"payload": data["payload"]})
        logger.info(f"Received notice status {response.status_code} body {response.content}")

        # Call Monte Carlo simulation here
        result = monte_carlo_simulation()
        logger.info(f"Monte Carlo simulation result: {result}")

    except Exception as e:
        status = "reject"
        msg = f"Error processing data {data}\n{traceback.format_exc()}"
        logger.error(msg)
        response = requests.post(rollup_server + "/report", json={"payload": str2hex(msg)})
        logger.info(f"Received report status {response.status_code} body {response.content}")

    return status

def handle_inspect(data):
    logger.info(f"Received inspect request data {data}")
    logger.info("Adding report")
    response = requests.post(rollup_server + "/report", json={"payload": data["payload"]})
    logger.info(f"Received report status {response.status_code}")
    return "accept"

handlers = {
    "advance_state": handle_advance,
    "inspect_state": handle_inspect,
}

finish = {"status": "accept"}

while True:
    logger.info("Sending finish")
    response = requests.post(rollup_server + "/finish", json=finish)
    logger.info(f"Received finish status {response.status_code}")
    if response.status_code == 202:
        logger.info("No pending rollup request, trying again")
    else:
        rollup_request = response.json()
        data = rollup_request["data"]
        
        handler = handlers[rollup_request["request_type"]]
        finish["status"] = handler(rollup_request["data"])
