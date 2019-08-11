//bamazon js file

var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "kadonna",
  database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
});


function displayProducts() {
    connection.query("SELECT * FROM products", function(err,results){
        console.log(results);
        if (err) throw err;
//function makeOrder() {
        // query the database for all items available to buy
 //       connection.query("SELECT * FROM products", function(err, results) {
     //       if (err) throw err;
            // once you have the items, prompt the user for what they'd like to purchase
            inquirer.prompt([
                    {
                    name: "choice",
                    type: "rawlist",
                    choices: function() {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].item_id);
                        }
                        return choiceArray;
                            },
                    message: "What would you like to purchase?",
                    }
                  /*  {
                    name: "qty",
                    type: "rawlist",
                    message: "How many would you like to purchase?",
                    choices: function() {
                        var choiceQty = [];
                        for (var i = 0; i < results.length; i++) {
                        choiceQty.push(results[i].stock_qty);
                        }
                        return choiceQty;
                            },
                    }*/
                    ])
            .then(function(answer) {
                console.log(choiceArray)
                // get the information of the chosen item
              //  var chosenItem;
             //   for (var i = 0; i < results.length; i++) {
              //  if (results[i].item_name === answer.choice) {
             //       chosenItem = results[i];
             //                   }
             //               }
                        });
                  });
                }
       
displayProducts();
//makeOrder();

