require("dotenv").config({ path: "./../.env" });
var randomId = require("random-id");
var axios = require("axios");
const { TMDB } = require("../config/config");
var DB = require("./../DB");

class Exception {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }
}

class People {
  constructor() {}

  static async get(id) {
    var db = new DB();
    var movie = await db.query("SELECT * FROM People WHERE people_id=$1", [
      id.toString(),
    ]);
    await db.end();
    if (movie.rows.length == 0)
      throw new Exception(400, "Person Doesn't Exist in Database");
    else return movie.rows[0];
  }
  static async getAllPeople() {
    var db = new DB();
    var people = await db.query("SELECT * FROM People");
    await db.end();
    return people;
  }
  static async createPeople(name, image, profession) {
    var db = new DB();
    var len = 15;
    var pattern = "aA0";
    var id = randomId(len, pattern);
    await db.query(
      "INSERT INTO People (people_id,name,image,profession) VALUES ($1,$2,$3,$4)",
      [id, name, image, profession]
    );
    await db.end();
    return true;
  }
  static async updatePeople(id, data) {
    var db = new DB();
    await db.query(
      "UPDATE People SET name=$1, image=$2, profession=$3 WHERE people_id=$4",
      [data.name, data.image, data.profession, id.toString()]
    );
    await db.end();
    return true;
  }
  static async deletePeople(id) {
    var db = new DB();
    await db.query("DELETE FROM Reviews WHERE people_id=$1", [id.toString()]);
    await db.query("DELETE FROM Casting WHERE people_id=$1", [id.toString()]);
    await db.query("DELETE FROM People WHERE people_id=$1", [id.toString()]);
    await db.end();
    return true;
  }
  static async getReviews(id) {
    var db = new DB();
    var reviews = await db.query(
      "SELECT user_id,pic,name,review_id,review_text,rating FROM Reviews NATURAL JOIN Users  WHERE people_id=$1;",
      [id.toString()]
    );
    await db.end();
    return reviews.rows;
  }

  static async getMovies(id) {
    var db = new DB();
    var movies = await db.query(
      "SELECT movie_id,title,plot,poster,release_date,role FROM Casting NATURAL JOIN Movie WHERE people_id=$1;",
      [id.toString()]
    );
    await db.end();
    return movies.rows;
  }

  static async add(id, name, image, profession) {
    var db = new DB();
    await db.query(
      "INSERT INTO People (people_id,name,image,profession) VALUES ($1,$2,$3,$4) ON CONFLICT DO NOTHING;",
      [id, name, image, profession]
    );
    await db.end();
    return true;
  }

  static async postReview(people_id, user_id, rating, review) {
    var db = new DB();
    await db.query(
      "INSERT INTO Reviews (review_id,review_text,rating,user_id,people_id) VALUES (default,$1,$2,$3,$4) ON CONFLICT DO NOTHING;",
      [review, rating, user_id, people_id]
    );
    await db.end();
    return true;
  }

  static async fetch(id) {
    try {
      var movie = await axios({
        url: "https://api.themoviedb.org/3/movie/" + id + "?api_key=" + TMDB,
        method: "GET",
      });
      return movie.data;
    } catch (e) {
      throw new Exception(400, "Invalid Movie ID");
    }
  }

  static async fetchCast(id) {
    try {
      var movie = await axios({
        url:
          "https://api.themoviedb.org/3/movie/" +
          id +
          "/credits?api_key=" +
          TMDB,
        method: "GET",
      });
      return movie.data.cast;
    } catch (e) {
      throw new Exception(400, "Invalid Movie ID");
    }
  }
}

module.exports = People;
