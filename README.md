# BamazonCLI App Project

## What Is Bamazon CLI? 
Bamazon is an Amazon-like storefront that uses a MySQL database. The app will take in orders from customers and deplete stock from the store's inventory.

## The Bamazon App Will...
 - Show a list of products with a product id, name and price.
 - Ask the user what product they would like to purchase.
 - Ask the user how many of the chosen product they would like to purchase.
 - Checks to see if there is enough of the chosen product in inventory to fulfill the order. 
 - If there's not enough inventory to fill the order, tell customer how many are available.
 - If there are enough items, display the order details - product name, quantity and total price.

## How the App Is Organized
The App uses a few different npm packages to process the user iputs
 - NPM inquirer is used for the user prompts
 - NPM mysql is a node.js driver for mysql
 - NPM cli-table2 to display the product table
The app uses mySQL database to store product data.
 
## How to Use the App
     1 - Product table is displayed
       - ![User Selects Prompt](https://kknape.github.io/bamazonCLI/images/bamazon_1.png)
     2 - User selects item to purchase
     3 - User selects quantity of item to purchase
       - ![User Selects Prompt](https://kknape.github.io/bamazonCLI/images/bamazon_2.png)
     4 - App checks to see if there's enough inventory
     5 - If there's not enough inventory to fill the order, message to customer displays how much inventory is available.
       - ![User Selects Prompt](https://kknape.github.io/bamazonCLI/images/bamazon_3.png)
     6 - If there is enough inventory, message to the customer the order details - Product Name, Quantity, Total Price
       - ![User Selects Prompt](https://kknape.github.io/bamazonCLI/images/bamazon_4.png)     
