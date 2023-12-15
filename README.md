# Title:

SQL Employee Tracker

## Table of Contents:

[Description](#description)

[Installation](#installation)

[User Information](#user-information)

[Questions](#questions)

[What I Learned](#what-i-learned)

[Code in index.js](#code-in-javascript)

[Dependencies](#dependencies)

[Link to live site](#link-to-live-site)

[Link to gitHub repo](#link-to-github-repository)

[Images of website functionality](#images-of-webpage-functionality)

[License](#license)


## Description:

This application is an SQL database with inquirer which will allow the user to track departments, roles, and employees. This application will also allow the user to create new departments, roles, and add new employees which will then dynamically be added to the database to be received upon request using the CLI.

## Installation

To install this application please fork this repo. Then, run in terminal: 
//~ npm i

For this application to run successfully without errors you will need to create a .env folder with the following code:

DB_NAME='companyEmployee_db'
DB_PASSWORD='your SQL password'
DB_USER='your SQL user'

Then to run the application please run in terminal //~ npm start

## User Information

<a href='https://github.com/RaszeroT'> Travis Shanhun's github username: RaszeroT</a>

Email: shanhun.codes@gmail.com

## Questions

Please reach out to me if you have any further questions via:

Email: shanhun.codes@gmail.com

<a href='https://github.com/RaszeroT/SQL-Employee-Tracker'>Note Taker</a>

## What I learned:

Creating this application I learned to successfully create a schema folder to spin up databases and a seeds folder to add starter information to the database. Furthermore, I learned to dynamically add information to the database using User input.

## Dependencies 

nodemon@3.0.1 (this is for live updates while creating functions. This dependency is not necessary for running the application)

dotenv@16.3.1

inquirer@8.2.4

mysql2@3.6.5

## Link to live site:

<a href="N/A">No live site to link</a>

## Video Tutorial:

<a href='https://drive.google.com/file/d/1EQs8UwtJ8qjApp2PL9Q-CXVA5gcEQybV/view'>Video Tutorial</a>

## License

MIT License

Copyright (c) 2023 RaszeroT

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.