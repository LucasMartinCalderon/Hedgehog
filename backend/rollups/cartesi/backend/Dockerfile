# syntax=docker.io/docker/dockerfile:1.4
FROM --platform=linux/riscv64 cartesi/python:3.10-slim-jammy

WORKDIR /opt/cartesi/dapp

COPY ./requirements.txt .

RUN apt-get update \
    && pip install --find-links https://felipefg.github.io/pip-wheels-riscv/wheels/ -r requirements.txt \
    && find /usr/local/lib -type d -name __pycache__ -exec rm -r {} + \
    && apt-get install -y --no-install-recommends libopenblas0-serial libgomp1 

COPY ./entrypoint.sh .
COPY ./HedgeHog.py .