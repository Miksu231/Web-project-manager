import { Pool } from "https://deno.land/x/postgres@v0.13.0/mod.ts";

const CONCURRENT_CONNECTIONS = 2;
const connectionPool = new Pool({
  // ADD YOUR OWN DATABASE INFO HERE
  hostname:"",
  database:"",
  user:"",
  password:"",
  port:"",
  /*
  Additionally, you should run the following SQL-queries on your database for it to function:
  
  CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  completed BOOLEAN
);

ALTER TABLE tasks ALTER COLUMN completed SET DEFAULT false;

CREATE TABLE work_entries (
  id SERIAL PRIMARY KEY,
  task_id INTEGER REFERENCES tasks(id),
  started_on TIMESTAMP WITH TIME ZONE,
  finished_on TIMESTAMP WITH TIME ZONE
);

  */
}, CONCURRENT_CONNECTIONS);

const executeQuery = async (query, ...args) => {
    const response = {};
    let client;
  
    try {
      client = await connectionPool.connect();
      const result = await client.queryObject(query, ...args);
      if (result.rows) {
        response.rows = result.rows;
      }
    } catch (e) {
      console.log(e);
      response.error = e;
    } finally {
      if (client) {
        try {
          await client.release();
        } catch (e) {
          console.log("Unable to release database connection.");
          console.log(e);
        }
      }
    }
  
    return response;
  };
  
  export { executeQuery };