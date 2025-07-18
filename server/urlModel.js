import pool from "./db.js";

//check if url already exits
export const getUrlByOriginal = async (original_url) => {
  const result = await pool.query(
    "SELECT * FROM urls WHERE original_url = $1",
    [original_url]
  );
  return result.rows[0]; 
};
//short url
export const getUrlByShortCode = async (short_code) => {
  const result = await pool.query(
    "SELECT * FROM urls WHERE short_code = $1",
    [short_code]
  );
  return result.rows[0];
};
// new short url
export const createShortUrl = async (original_url, short_code) => {
  const result = await pool.query(
    "INSERT INTO urls (original_url, short_code) VALUES ($1, $2) RETURNING *",
    [original_url, short_code]
  );
  return result.rows[0];
};
//tracking clicks
export const incrementClickCount = async (short_code) => {
  await pool.query(
    "UPDATE urls SET click_count = click_count + 1 WHERE short_code = $1",
    [short_code]
  );
};
