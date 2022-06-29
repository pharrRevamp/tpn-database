const router = require("express").Router();
const sql = require("mssql");
const pool = require("../db");
require("dotenv").config();

router.post("/customer-list", (req, res) => {
  try {
    const sqlString = `SELECT * FROM dbo.Registrations`;
    const requestDB = new sql.Request(pool);
    pool
      .connect()
      .then(() => {
        requestDB.query(sqlString, (err, data) => {
          if (err) throw err;
          res.status(200).send(data.recordset);
        });
      })
      .catch(err => {
        res.status(500).send(`unable to retrieve customer data`);
      });
  } catch (err) {
    console.log(`unable to connect to server to get customer names`);
    res.status(500).send(err);
  }
});

router.post("/street-name", (req, res) => {
  const address = req.body.data;
  try {
    const sqlString = `SELECT * FROM dbo.Registrations WHERE [Street Address] like '%${address}%' OR [Street Address Line 2] like '%${address}%'`;
    const requestDB = new sql.Request(pool);

    pool
      .connect()
      .then(() => {
        requestDB.query(sqlString, (err, data) => {
          if (err) throw err;

          res.status(200).send(data.recordset);
        });
      })
      .catch(err => {
        res.status(500).send(err);
      });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/customer-email", (req, res) => {
  const dataString = req.body.data;
  try {
    const sqlString = `SELECT * FROM dbo.Registrations WHERE Email = '${dataString}'`;
    const requestDB = new sql.Request(pool);
    pool
      .connect()
      .then(() => {
        requestDB.query(sqlString, (err, data) => {
          if (err) throw err;
          res.status(200).send(data.recordset);
        });
      })
      .catch(err => {
        res.status(500).send(`unable to retrieve customer data`);
      });
  } catch (err) {
    console.log(`unable to connect to server to get customer names`);
    res.status(500).send(err);
  }
});

router.post("/customer-phone", (req, res) => {
  const dataString = req.body.data;
  try {
    const sqlString = `SELECT * FROM dbo.Registrations WHERE [Phone Number] = '${dataString}'`;
    const requestDB = new sql.Request(pool);
    pool
      .connect()
      .then(() => {
        requestDB.query(sqlString, (err, data) => {
          if (err) throw err;
          res.status(200).send(data.recordset);
        });
      })
      .catch(err => {
        res.status(500).send(`unable to retrieve customer data`);
      });
  } catch (err) {
    console.log(`unable to connect to server to get customer names`);
    res.status(500).send(err);
  }
});

router.post("/customer-name", (req, res) => {
  const firstName = req.body.data.firstname;
  const lastName = req.body.data.lastname;

  try {
    let sqlSearch = "";
    if (firstName == null || firstName == "") {
      console.log(`firstname is not present`);
      sqlSearch = `[Last Name] = '${lastName}'`;
    } else if (lastName == null || lastName == "") {
      console.log(`lastname is not present`);
      sqlSearch = `[First Name] = '${firstName}'`;
    } else {
      sqlSearch = `[First Name] = '${firstName}' AND [Last Name] = '${lastName}'`;
    }
    const sqlString = `SELECT * FROM dbo.Registrations WHERE ${sqlSearch}`;
    const requestDB = new sql.Request(pool);
    pool
      .connect()
      .then(() => {
        requestDB.query(sqlString, (err, data) => {
          if (err) throw err;
          res.status(200).send(data.recordset);
        });
      })
      .catch(err => {
        res.status(500).send(`unable to retrieve customer data`);
      });
  } catch (err) {
    console.log(`unable to connect to server to get customer names`);
    res.status(500).send(err);
  }
});

router.post("/pon", (req, res) => {
  const dataString = req.body.data;
  try {
    const sqlString = `SELECT * FROM dbo.Registrations WHERE PON = '${dataString}'`;
    const requestDB = new sql.Request(pool);
    pool
      .connect()
      .then(() => {
        requestDB.query(sqlString, (err, data) => {
          if (err) throw err;
          res.status(200).send(data.recordset);
        });
      })
      .catch(err => {
        res.status(500).send(err);
      });
  } catch (err) {
    console.log(`unable to connect to server to get he PON info`);
    res.status(500).send(err);
  }
});

router.post("/account-number", (req, res) => {
  const dataString = req.body.data;
  try {
    const sqlString = `SELECT * FROM dbo.Registrations WHERE [City of Pharr or North Alamo Water Utilities Account Number] = '${dataString}'`;
    const requestDB = new sql.Request(pool);
    pool
      .connect()
      .then(() => {
        requestDB.query(sqlString, (err, data) => {
          if (err) throw err;
          res.status(200).send(data.recordset);
        });
      })
      .catch(err => {
        res.status(500).send(err);
      });
  } catch (err) {
    res.status(500).send(err);
  }
});
pool.close();
module.exports = router;
