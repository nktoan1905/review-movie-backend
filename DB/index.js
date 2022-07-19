require("dotenv").config({ path: "./../.env" });
const { Client } = require("pg");
const { DATABASE_URL } = require("../config/config");
class Exception {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }
}

class DB {
  constructor() {
    this.client = new Client({
      connectionString: DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    });
    this.client.connect();
  }

  async query(query, params) {
    try {
      return await this.client.query(query, params);
    } catch (e) {
      throw new Exception(500, e.message);
    }
  }

  async end() {
    await this.client.end();
  }
}

module.exports = DB;
