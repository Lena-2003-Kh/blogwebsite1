// Importing required modules for the application
import express from "express";  // Express framework for building the web server
import bodyParser from "body-parser";  // Middleware to parse incoming request bodies
import pg from "pg";
import dotenv from "dotenv";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



dotenv.config();  // Load environment variables from a .env file

const app = express();  // Creating an instance of the Express app


// Use pg.Pool instead of pg.Client
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Remove db.connect(); entirely. 
// The pool handles connections automatically when you call pool.query().



// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));  // Parse incoming form data as URL-encoded
app.use(express.static(path.join(__dirname, 'public')));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");  // Set the template engine to EJS for rendering views


// Route for the home page (display all posts)
app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM posts");

    result.rows.forEach(post => {
      const localDate = new Date(post.dates).toLocaleString('en-US', {
        timeZone: 'Asia/Amman', // Specify Jordan's timezone
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      
      post.date = localDate; 
   });
  
  

    res.render("index", { posts: result.rows }); // Render the index view and pass the posts data
  } catch (err) {
    res.status(500).send("Error retrieving posts");
  }
});


// Route for displaying the create post form
app.get("/create", (req, res) => {
  res.render("create", { title: "", content: "", author: "" }); // Render the create form view
});


// Route for handling post creation (POST request)
app.post("/create-post", async (req, res) => {
  const { title, content, author } = req.body;  // Extract form data from the request body
    // Format the date as 'YYYY-MM-DD' for storing in the database
    const date = new Date().toISOString();  // This gives "2025-05-02"
  try {
      await db.query("INSERT INTO posts (title, content, author, dates) VALUES ($1, $2, $3, $4)", [title, content, author, date]);
      res.redirect("/");  // Redirect to the homepage after the post is created
  } catch (err) {
      console.log(err);
      res.status(500).send("Error creating post");  // Handle any errors during the post creation
  }
});

// Route for displaying the edit post form (GET request)
app.get("/edit/:id", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM posts WHERE id=$1", [req.params.id]);  // Fetch the post from the database using the ID
    const post = result.rows[0];  // Extract the first row (the post)
    
    if (!post) {
      return res.status(404).send({ message: "Post not found" });  // If the post does not exist, return 404 error
    }
    
    res.render("edit", { post });  // Pass the post to the 'edit' view
  } catch (err) {
    res.status(500).send("Error fetching post for editing");  // Return a 500 error if the query fails
  }
});


// Route to handle the  request for editing a post
app.post("/edit/:id", async (req, res) => {
  const { title, content, author } = req.body;  // Get the new values for the post from the form submission
  
  const updatedAt = new Date().toISOString();  // Get the current date and time in ISO format

  try {
    // Update the post in the database with the new values, including the current date and time
    await db.query("UPDATE posts SET title=$1, content=$2, author=$3, dates=$4 WHERE id=$5", 
      [title, content, author, updatedAt, req.params.id]);

    res.redirect("/");  // After updating, redirect to the homepage
  } catch (err) {
    console.log(err);
    res.status(500).send("Error editing post");  // Return a 500 error if updating the post fails
  }
});


// Route to handle deleting a post
app.get("/delete/:id", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM posts WHERE id=$1", [req.params.id]);  // Fetch the post by ID
    const post = result.rows[0];  // Extract the first row (the post)
    
    if (!post) {
      return res.status(404).send({ message: "Post not found" });  // Post not found
    }
    
    // Render the confirmation page and pass the post details
    res.render("delete", { post }); 
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching post for deletion");
  }
});


app.post("/delete/:id", async (req, res) => {
  try {
    // Delete the post from the database using its ID
    const result = await db.query("DELETE FROM posts WHERE id=$1", [req.params.id]);

    // If no rows were deleted, that means the post doesn't exist
    if (result.rowCount === 0) {
      return res.status(404).send("Post not found");
    }

    // Redirect to the homepage after successful deletion
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error deleting post");
  }
});

db.connect()
  .then(() => console.log("Connected to Supabase"))
  .catch(err => console.error("Database connection error", err.stack));

// Start the server and listen on the specified port
export default app;