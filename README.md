# CS261-Software-Engineering

CS261: Software Engineering Group Project

[Project Guide](https://warwick.ac.uk/fac/sci/dcs/teaching/material/cs261/project)

## Client - [files](./client)

The progressive web app using React.

## Server - [files](./server)

The Flask REST API and data analysis.

## Using this Repository

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
- We can go through it all in our next meeting (Wednesday 20th Jan).

## Tutorials Used To Set Up

- Setting up Python Environment (pipenv): https://www.datacamp.com/community/tutorials/virtual-environment-in-python
- Connect Flask to MongoDB Atlas Database: https://medium.com/@summerxialinqiao/connect-flask-app-to-mongodb-atlas-using-pymongo-328e119a7bd8
- Creating REST API in Python: https://medium.com/better-programming/api-development-in-python-with-flask-resful-and-mongodb-71e56a70b3a6
- Created React project using `npx create-react-app frontend --template tyepscript`

## Set Up

### Dependencies

This will outline how to set up your device to be able to code.

#### Python

- Install `Python3` and make sure `pip` is installed.
- Run `pip3 install pipenv` which will be used for the Python virtual environment.
- Run `cd server` in the repository's root.
- Run `pipenv shell` to go into the Python environment.
- Run `pipenv install` to install all dependencies for this Python project.

#### React

- Install `nodeJS` (https://nodejs.org/en/download/).
- Run `npm install --global yarn` to install the yarn package manager (might have to run it in sudo).
- Run `cd frontend` in the repository's root.
- Run `yarn` to install all dependencies for this React project.
  
### Development

This will outline how to start coding each time you come to work on the project.

#### Python

- Run `cd server` in the repository root.
- Run `pipenv shell`, this will turn your terminal to be inside the Python environment.
- Add any dependencies using `pipenv install <dependencyName>` which will correctly add it to the environment.
- When in this environment, you can run any Python file using `python3 <fileName>`.

#### React

- Run `cd frontend` in the repository root.
- Run `yarn start` to start the React project.
