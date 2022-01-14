# rules-framework

This application serves as a server to validate the a email address via the Node JS Application

This application consist of two sub application which is the API, and the UI

The UI runs under http://localhost:3000
THe API runs under http://localhost:3001

First start the API, so that it can be able to serve the data to the UI.

To Start the API, you have to run first NPM INSTALL, and then NPM START, under the /api directory

To Start the UI is also the same process, NPM INSTALL FIRST THEN NPM START, under the /ui directory

The is an input list under /api/data/data.json, where a list of email address, blacklisted keywords for users and domains which are used as out input.

and there is a front end application under UI which serves to display the data stating which emails are valid and which are not.

This Application consists of a string validation class when it can be easily extended to add other forms of validations. The API routes are also structured in a way that adding an endpoint will allow you to use existing validations and also add other endpoints to validate other types of input (e.g Password Policy validations).