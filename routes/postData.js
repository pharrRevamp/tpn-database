const router = require("express").Router();
const sql = require("mssql");
const pool = require("../db");
require("dotenv").config();

router.post("/edit-customer", async (req, res) => {
  const arrayOfData = req.body.data;

  //   console.log(arrayOfData);

  try {
    const requestDB = new sql.Request(pool);
    await pool
      .connect()
      .then(() => {
        let loopCount = 0;
        let recordsChanged = 0;
        for (let i = 0; i < arrayOfData.length; i++) {
          loopCount += 1;
          const recordData = arrayOfData[i];
          const {
            uuid,
            submissionDate = recordData["Submission Date"],
            firstName = recordData["First Name"],
            lastName = recordData["Last Name"],
            Date,
            Email,
            phoneNumber = recordData["Phone Number"],
            uAccountNumber = recordData[
              "City of Pharr or North Alamo Water Utilities Account Number"
            ],
            location = recordData["Do You Own or Rent At This Location?"],
            ownerFirstName = recordData["Owner First Name"],
            ownerLastName = recordData["Owner Last Name"],
            propertyOwnerPhone = recordData["Property Owner Phone"],
            streetAddress = recordData["Street Address"],
            streetAddressTwo = recordData["Street Address Line 2"],
            City,
            state = recordData["State / Province "],
            zipCode = recordData["Postal / Zip Code"],
            pharrSectionLocation = recordData[
              "What part of Pharr do you live in?"
            ],
            fiberPlan = recordData["Fiber Optics Plans"],
            paidMethod = recordData["Pay with Credit Card"],
            utilityAccountHolder = recordData["Utility Account Holder"],
            PON,
            installDate = recordData["Install Date"],
            routerType = recordData["Router Type"],
            meshAmount = recordData["Mesh Amount"],
            ownerApproval = recordData["Owner Approval"],
            serviceStatus = recordData["Service Status"],
            Refund,
            refundType = recordData["Refund Type"],
            Notes,
            Verified,
            verifiedBy = recordData["Verified by"],
            hardwareProvision = recordData["Hardware Provisioned"],
            cloudProvision = recordData["Cloud Support Provisioned"],
            smxProvision = recordData["SMX Provisioned"],
          } = recordData;
          // console.log(uuid);
          const sqlString = `
            UPDATE dbo.Registrations
  SET [First Name] = '${firstName}',
  [Last Name] = '${lastName}',
  Email = '${Email}',
  [Phone Number] = '${phoneNumber}',
  [City of Pharr or North Alamo Water utilities Account Number] = '${uAccountNumber}',
  [Owner First Name] = '${ownerFirstName}',
  [Owner Last Name] = '${ownerLastName}',
  [Property Owner Phone] = '${propertyOwnerPhone}',
  [Street Address] = '${streetAddress}',
  [Street Address Line 2] = '${streetAddressTwo}',
  [What part of Pharr do you live in?] = '${pharrSectionLocation}',
  [Utility Account Holder] = '${utilityAccountHolder}',
  PON = '${PON}',
  [Owner Approval] = '${ownerApproval}',
  [Service Status] = '${serviceStatus}',
  Refund = '${Refund}',
  [Refund Type] = '${refundType}',
  Verified = '${Verified}',
  [Verified by] = '${verifiedBy}',
  [Router Type] = '${routerType}',
  [Mesh Amount] = '${meshAmount}',
  [Hardware Provisioned]='${hardwareProvision}',
  [SMX Provisioned]='${smxProvision}',
  [Cloud Support Provisioned]='${cloudProvision}',
  [Install Date] = '${installDate}',
  Notes = '${Notes}'

  WHERE uuid = '${uuid}'`;

          requestDB.query(sqlString, (err, data) => {
            if (err) {
              console.log(err);
              res.status(500).send(err);
              return;
            }
            console.log(data);
          });
        }

        res.status(200).send(`successfully updated data`);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

pool.close();
module.exports = router;
