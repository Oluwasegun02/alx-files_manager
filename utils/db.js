const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    // Get MongoDB connection details from environment variables or use default values
    this.host = process.env.DB_HOST || 'localhost';
    this.port = parseInt(process.env.DB_PORT, 10) || 27017;
    this.database = process.env.DB_DATABASE || 'files_manager';

    // Initialize the MongoDB client
    this.client = new MongoClient(`mongodb://${this.host}:${this.port}`);
  }

  async connect() {
    try {
      // Connect to MongoDB
      await this.client.connect();
      // Select the database
      this.db = this.client.db(this.database);
    } catch (error) {
      throw new Error(`Error connecting to MongoDB: ${error}`);
    }
  }

  async isAlive() {
    try {
      // Check if the connection to MongoDB is successful
      await this.client.db().admin().ping();
      return true;
    } catch (error) {
      return false;
    }
  }

  async nbUsers() {
    // Assuming you have a collection named 'users'
    const usersCollection = this.db.collection('users');
    return await usersCollection.countDocuments({});
  }

  async nbFiles() {
    // Assuming you have a collection named 'files'
    const filesCollection = this.db.collection('files');
    return await filesCollection.countDocuments({});
  }
}

// Create an instance of DBClient
const dbClient = new DBClient();

module.exports = dbClient;
