//bamazon js file

var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table2");


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
})

//Shows list of available product details
function displayProducts() {
// connection.query("SELECT * FROM products", function(err,results){
 connection.query("SELECT item_id, product_name, price FROM products", function(err,results){
        if (err) throw err;


        console.log("----------------------------------------------------\n");
        console.log("---              Welcome to Bamazon!             ---\n");
        console.log("---           Shop Today's Top Sellers!          ---\n");
        console.log("----------------------------------------------------\n");
  
      //  console.log(results);

      //show products in a table
      var table = new Table({
          head: ["Product ID", "Product Name", "Price"],
          colWidths: [12, 30, 8],
          colAligns: ["center", "left", "right"],
              style: { 
                head: ["aqua"],
                compact: true
                }
        });
          for(var i=0; i<results.length; i++){
            //prints price in currency format
            var num =Number.parseFloat(results[i].price);
            var numString = num.toFixed(2);
            table.push([results[i].item_id, results[i].product_name, "$"+ numString]);
          } 
          //add values to the table
          console.log(table.toString());
          console.log("");
    });
  };

//Takes customer input for item to purchase. Takes customer input for quantity of the item to purchase. Checks to see if there's enough inventory.        
function makeOrder() {
        // query the database for all items available to buy
        connection.query("SELECT * FROM products", function(err, results) {
        //  console.log(results);
           if (err) throw err;
            // once you have the items, prompt the user for what they'd like to purchase
            inquirer.prompt(
                    {
                    name: "productChoice",
                    type: "rawlist",
                    choices: function() {
                        var choiceArray = [];
                        for (var i=0; i < results.length; i++) {
                        choiceArray.push(results[i].product_name);
                        }
                        return choiceArray;
                            },
                    message: "What would you like to purchase?",
                    })

            .then(function(answer) {
              for (var i=0; i<results.length; i++){
                if (results[i].product_name==answer.productChoice){
                  var chosenItem = results[i];
                    inquirer.prompt({
                      name: "qty",
                      type: "input",
                      message: "How many would you like to purchase?",
                  //checks to see if it's a number
                      validate: function(value){
                            if(isNaN(value)==false){
                              return true;
                            }
                            else {
                              return false;
                              }
                            }
                      })
                    .then(function(answer){                     
                   //   console.log(chosenItem.stock_qty);
                   //   console.log(answer.qty);
                      var qtyReq = parseInt(answer.qty);
                    //  console.log(chosenItem.stock_qty-qtyReq);
                        if(chosenItem.stock_qty >= qtyReq){
                          var stockAdj = chosenItem.stock_qty-qtyReq;
                    //      console.log(stockAdj);
                         connection.query("UPDATE products SET ? WHERE ?",[{
                            stock_qty: stockAdj
                            },
                          {
                            item_id: chosenItem.item_id
                              }]
                            )
                        console.log("Thank you for your order!\n" + chosenItem.product_name + "\nQty: " + qtyReq + "\nTotal Cost: $" + (qtyReq*chosenItem.price) + "\n\n");
                        displayProducts();
                        makeOrder();   
                          }  
                            else {
                              console.log("Insufficient inventory! There are " +chosenItem.stock_qty+ " left in stock.")                           
                              displayProducts();
                              makeOrder();
                            }
                          })
                        }
                  }
                })
              })
            }

displayProducts();
makeOrder();
