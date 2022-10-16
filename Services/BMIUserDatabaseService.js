const mysql = require("mysql2");
const { BMIStatus } = require("./BMICalculator");

function connectToDatabase () {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1234',
        database: 'BMIDatabase'
      });

    connection.connect((err,result) => {
        if (err) throw err;
        console.log('Connected to database!');
    });

    return connection;
}

function queryDatabase(queryString, succesfulLogMessage) {
    const connection = connectToDatabase();
    const queryResult = connection.query(queryString, function (error, results) {
        if (error) throw error;
        console.log(succesfulLogMessage);
    });

    return queryResult;
}

function getData(queryString) {

    const connection = connectToDatabase();

    return new Promise((resolve, reject) => {
        connection.query(queryString, function (error, result) {
            if (error) throw error;
            if (result === undefined) {
                reject(new Error("no such user in our database."));
            } else {
                resolve(result);
            }
        });
    } ) 
}

const BMIUserDatabaseService = {

    createDB: () => {

        let queryString = `CREATE DATABASE IF NOT EXISTS BMIDatabase`;

        queryString = `CREATE TABLE IF NOT EXISTS BMITable (
            name VARCHAR (255) NOT NULL, 
            gender VARCHAR (255), 
            weight VARCHAR (255),
            height VARCHAR (255),
            BMIValue VARCHAR (255),
            BMIStatus VARCHAR (255),
            PRIMARY KEY (name)
            )`;

        queryDatabase(queryString, 'created database!');
    },
   
    //insert into database
    registerUserResult: (name, gender, weight, height, BMIValue) => {

        let queryString = `INSERT IGNORE INTO BMITable (name, gender, weight, height, BMIValue, BMIStatus) 
        VALUES (
        '${name}', 
        '${gender}', 
        '${weight}', 
        '${height}', 
        '${BMIValue}', 
        '${BMIStatus}'
        )`

        queryDatabase(queryString, 'successfully inserted data into database.');
    },

    //get user data from database
    getUserData: async (name) => {
        let queryString = `SELECT name, gender, weight, height, BMIValue, BMIStatus from BMITable
         WHERE name = '${name}'`;

        return await getData(queryString);     
    }
}

module.exports = BMIUserDatabaseService;