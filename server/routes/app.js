// IMPORTS
const router = require("express").Router();
const mysql = require("mysql");

// DATABASE
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "gwen0701",
  database: "form_simple_project",
});
// connect into the databases
db.connect((err) => {
  if (err) {
    console(err);
  } else {
    console.log("Connected to database");
  }
});
// execute the query into database
const executeQuery = (query) => {
  return new Promise((resolve, reject) => {
    db.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

// FUNCTIONALITY
// displaying the data in the database
const displayAllData = async () => {
  const query = `SELECT * FROM person_data`;
  return await executeQuery(query);
};
// inserting data in the database
const insertData = async (person_name, amount, spend_time, category) => {
  const query = `INSERT INTO person_data(person_name, amount, spend_date, category)
                VALUES ('${person_name}', '${amount}', '${spend_time}', '${category}') `;
  return await executeQuery(query);
};
// deleting data in the database
const deleteData = async (id) => {
  const query = `DELETE FROM person_data WHERE id = ${id}`;
  return await executeQuery(query);
};
const updateData = async (updatedId, id, name, amount, spendTime, category) => {
  const query = `UPDATE person_data SET id = '${id}', person_name = '${name}', amount = '${amount}', spend_date = '${spendTime}', category = '${category}' WHERE id = ${updatedId}`;
  return await executeQuery(query);
};

// ROUTERS
// handle the home page
router.get("/api/home", (req, res) => {
  res.json({ message: "Hello from the Express server! its working?" });
});
// handle the data display
router.get("/api/display", async (req, res) => {
  // call the function that execute query
  try {
    displayAllData()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
});
// handle add data
router.post("/api/addData", async (req, res) => {
  // hndle the insert data, restructure first the data
  try {
    let { id, name, amount, spendTime, category } = req.body;
    insertData(name, amount, spendTime, category).then((result) => {
      console.log("Insert Successfully!!");
      name = "";
      amount = "";
      spendTime = "";
      category = "";
    });
  } catch (err) {
    console.log(err);
  }
});
// handle the delete data
router.delete("/api/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    deleteData(id).then((result) => {
      console.log("Delete Successfully!!");
    });
  } catch (err) {
    console.log(err);
  }
});
// handle the update data
router.put("/api/updateData/:id", async (req, res) => {
  const updateId = req.params.id;
  const { id, name, amount, spendTime, category } = req.body;
  try {
    updateData(updateId, id, name, amount, spendTime, category).then(
      (result) => {
        console.log("Update Successfully!!");
      }
    );
  } catch (err) {
    console.log(err);
  }
});
// export the routes
module.exports = router;
