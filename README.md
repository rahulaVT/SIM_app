## Introduction

SHSim is an open-source tool to simulate cyber-physical attacks on smart home/building. 

This project has been bootstrapped with [Create React App](https://github.com/facebook/create-react-app). 
The backend (simulation engine) has been built using python. The graph visualization has been done using [D3.js](https://observablehq.com/@d3/force-directed-graph). 
The front-end communicates with the backend using [Flask services](https://flask.palletsprojects.com/en/1.1.x/). 

## Platform dependencies 

1. Node v14.15.4
2. Python v3.8.5
3. Pip 20.3.3

## Steps to run the app

1. Install node dependencies using `npm install`
2. Launch the web app using `npm start` 
3. Change directory to `cd flask_service`
4. Install python backend dependencies using `pip install -r requirements.txt`
5. Start flask server `python api.py`
