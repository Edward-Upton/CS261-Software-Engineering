# CS261 Software Engineering Group Project

A prototype system built for Deutsche Bank used to provide live feedback during a session or over the course of a project.

[Project Guide](https://warwick.ac.uk/fac/sci/dcs/teaching/material/cs261/project)

- [CS261 Software Engineering Group Project](#cs261-software-engineering-group-project)
  - [Client](#client)
  - [Server](#server)
  - [Data Analysis](#data-analysis)
  - [Setup](#setup)
    - [Dependencies](#dependencies)
      - [Python Server](#python-server)
      - [Web Server and React](#web-server-and-react)
    - [Development](#development)
  - [Tutorials Used To Set Up](#tutorials-used-to-set-up)

## Client

A single page web application built using React. Fetches data from the REST API with HTTP requests and displays the data returned.

- [Files](./frontend)
- [ReadMe](./frontend/README.md)

## Server

A HTTP REST API built using Express.js and Socket.IO to provide live feedback to hosts of events. The REST API interacts with database and provides an interface for users and events. The socket server allows hosts of events to receive feedback and data analysis in real time.

- [Files](./server)
- [ReadMe](./server/README.md)

## Data Analysis

A data analysis server built using Python with Rake and TextBlob to analyse the feedback given by participants and provide useful analytics to the hosts of events.

- [Files](./data-analysis/)
- [ReadMe](./data-analysis/README.md)

## Setup

### Dependencies

#### Python Server

- Install `Python 3` and make sure `pip` is installed.
- Run `pip install pipenv` or `pip3 install pipenv` to install the Python virtual environment.
  - Might require administrator Command Prompt or Powershell on Windows.
- Change directory to the python server `cd data-analysis`.
- Run `pipenv shell` to enter the python virtual environment shell.
- Run `pipenv install` to install all dependencies.

#### Web Server and React

- Install `Node.js`.
- Install yarn package manager with `npm i -g yarn`.
- Change directory to the server using `cd server`.
- Install dependencies using `yarn`.
- Change directory to the frontend client using `cd ../frontend`.
- Install dependencies again using `yarn`.

### Development

Read the guides in the separate `README.md` files for information on how to run the various servers.

- [Server](./server/README.md)
- [Client](./frontend/README.md)
- [Python](./data-analysis/README.md)

<!-- ## Using this Repository

Here are instructions on how to download, run and edit the code.
**This will all need to change with the new way we will be doing branches**

1. First I advise to download [GitHub Desktop](https://desktop.github.com/) to help managing the repository.
2. Open GitHub Desktop, click `Add` and go to `Clone Repository...`.
3. Click on `URL` and paste in to the URL field `https://github.com/engiego/CS261-Software-Engineering` (This is the address of where the project is stored on GitHub).
4. Choose where you want it to be stored locally on your computer then click `Clone`.
5. On the main page of GitHub Desktop, click on `Current Branch` which should say `main` currently.
6. You want to change this branch to the section of the project you are working on (`client` or `server`). Branch `main` should only be used when merging the two sections together and testing of the whole system.

**AVOID EDITING THE MAIN BRANCH SINCE THIS WILL MAKE COMBINING CHANGES DIFFERENT PEOPLE HAVE DIFFICULT**

7. When you want to commit your code changes, go onto GitHub Desktop, select this repository and write a commit message.
8. Then click commit and `Publish` them to GitHub

### A few things to note

- Before editing code, make sure you `Fetch` the latest code by going onto GitHub Desktop and clicking `Fetch origin`.
- When changes are needed accross different branches, we will merge the `client` and `server` into the `main` branch which will update them.
- We can go through it all in our next meeting (Wednesday 20th Jan). -->

## Tutorials Used To Set Up

- Setting up Python Environment (pipenv): https://www.datacamp.com/community/tutorials/virtual-environment-in-python
- Creating REST API in Python: https://medium.com/better-programming/api-development-in-python-with-flask-resful-and-mongodb-71e56a70b3a6
- Created React project using `npx create-react-app frontend --template tyepscript`
