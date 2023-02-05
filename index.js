//import required modules
const express = require("express");
const path = require("path");
const { MongoClient, ObjectId } = require("mongodb");

//Mongo config 
const dbUser = "appUser";
const dbPassword = "user";
const dbUrl = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.cygls90.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(dbUrl);

//set up Express app
const app = express();
const port = process.env.PORT || 8888;

//define important folders
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
//setup public folder
app.use(express.static(path.join(__dirname, "public")));


//HTTP GET 
app.get("/",async(request, response) => {
  let links = await getLinks();
  response.render("index", { title: "Home", menu: links });
});

app.get("/nutrition", async(request, response) => {
  let links = await getLinks();
  response.render("nutrition", { title: "Nutrition", menu: links });
});

app.get("/products", async(request, response) => {
  let links = await getLinks();
  let products = await getProducts();
  response.render("products", { title: "Products", menu: links, products });
});

//set up server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});


//Mongo Function
//Function to connect to the db
async function connection() {
  await client.connect();
  let db = client.db("chickenBeastDb")
  return db;
}

//Function to select all documents from menuLinks
async function getLinks() {
  let db = await connection();
  let result = await db.collection("menuLinks").find({}).sort({order:1}).toArray();
  return result
}

async function getProducts() {
  let db = await connection();
  let result = await db.collection("prod_chickenBreast").find({}).toArray();
  return result
}