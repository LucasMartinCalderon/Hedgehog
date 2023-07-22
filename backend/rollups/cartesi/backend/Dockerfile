# syntax=docker.io/docker/dockerfile:1.4
FROM cartesi/toolchain:0.14.0

# Install Python 3 and Matplotlib for plotting results
RUN apt-get update && apt-get install -y \
    python3-numpy \
    python3-matplotlib

WORKDIR /opt/cartesi/dapp
COPY . .
