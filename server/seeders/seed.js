const db = require("../config/connection");
const { Employee, Roster, Site } = require("../models");
const employeeSeeds = require("./employeeSeeds.json");
const rosterSeeds = require("./rosterSeeds.json");
const siteSeeds = require("./siteSeeds.json");

db.once("open", async () => {
  try {
    await Employee.deleteMany({});
    // await Roster.deleteMany({});
    await Site.deleteMany({});

    const employee = await Employee.create(employeeSeeds);
    await Site.create(siteSeeds);
    // await Roster.create(rosterSeeds);

    await Roster.deleteMany({}, (err, rosters) => {
      console.log("Removed all rosters");
      rosterSeeds.forEach(async (rosterData) => {
        let roster = {
          dayDate: rosterData.dayDate,
          siteName: "",
          employees: [],
          comments: rosterData.comments,
        };
        try {
            const foundSite = await Site.findOne({ siteName: rosterData.siteName }).exec();
            roster.siteName = foundSite._id;
        
        } catch(err) {
            console.log("Error finding Site", err.message)
        }
          
        rosterData.employees.forEach((employeeName) => {
            
            employee.forEach((emp) => {
                if (emp.empName === employeeName) {
                    roster.employees.push(emp._id)
                }
            })  
            
        });
        console.log("this is the final roster", roster);
        await Roster.create(roster);
        console.log('all done!');
        process.exit(0);
      });
      
    });
  } catch (err) {
    console.log("Error adding Roser", err);
      }
});

