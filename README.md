# automate-mapleTA
## This will automate the process of linking a MapleTA assignment to Canvas 
## Description 
This tool allows users to automate the process of linking canvas assignments to 
their mapleTA counterparts. It uses puppeteer to automate the browser and find
the proper assignment and link the assignment to the mapleTA version.

## How to Install

Standard Install

1. Clone this repository:
    ```bash
    git clone https://github.com/byuitechops/mapleta-automate-setup.git
    ```
1. Step into the folder that was just created 
    ```bash
    cd ./mapleta-automate-setup
    ```
1. To install dependancies, run:
    ```bash
    npm i
    ```

1. To initialize the program, run:
    ```bash
    npm start
    ```
<!--- TODO: Add Additional Installation/Set Up Instructions, then delete this comment  --->

## How to Use
Run the following command:
```bash
node main.js
```

The user will need to provide two CSV files for courses and the assignments needing to be run.

The user will be prompted for:
 
1. login credentials
2. CSV containing course list
3. CSV containing Canvas LTI Assignments
 
The Course table needs to include the following:

| **courseName** | **courseNameMapleTA** | **courseIdCanvas** |
| ----------- | --------- | --------- |
| ME 172      | ME (172)  | 12345 |

The assignment table needs to include the following:

| **nameCanvas** | **nameMapleTA** |
| --------------- | -------------- |
| 1.1 quiz 1      | 1.1 (quiz 1) |
| 1.2 quiz 2      | 1.2 (quiz 2) |
