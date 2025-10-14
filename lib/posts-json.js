// Import the 'fs' module to read files from the file system
import fs from 'fs';
// Import the 'path' module to work with file and directory paths
import path from 'path';

// Define the directory where the JSON file is located
const dataDirectory = path.join(process.cwd(), 'data');

// Function to get and sort all posts from the JSON file
export function getSortedPostsData() {
  // Create the full path to the JSON file inside the data folder
  const filePath = path.join(dataDirectory, 'posts.json');
  // Read the file contents as a UTF-8 string
  const fileContents = fs.readFileSync(filePath, 'utf8');
  // Convert the string into a JavaScript object (array of posts)
  const posts = JSON.parse(fileContents);
  // Sort posts by date (newest first)
  posts.sort((a, b) => {
    if (a.date < b.date) return 1;
    if (a.date > b.date) return -1;
    return 0; // same date
  });

  return posts;
}

// Function to get all post IDs for dynamic routing in Next.js
export function getAllPostIds() {
  // Create the full path to the JSON file
  const filePath = path.join(dataDirectory, 'posts.json');
  // Read and parse the JSON data
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const posts = JSON.parse(fileContents);
  // Map over posts to return objects with the required 'params.id' structure
  return posts.map((post) => ({
    params: {
      id: post.id,
    },
  }));
}

// Function to get the full data for a single post based on its ID
export function getPostData(id) {
  // Create the full path to the JSON file
  const filePath = path.join(dataDirectory, 'posts.json');
  // Read and parse the JSON data
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const posts = JSON.parse(fileContents);
  // Find the post object that matches the given ID
  const post = posts.find((p) => p.id === id);
  // Return the found post object
  return post;
}
