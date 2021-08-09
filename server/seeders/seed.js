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
        console.log("roster Data = ", roster);

        try {
            const foundSite = await Site.findOne({ siteName: rosterData.siteName }).exec();
            roster.siteName = foundSite.siteName;
            console.log("this is roster after rotsterSite added", roster)
        
        } catch(err) {
            console.log("Error finding Site", err.message)
        }

          console.log("this is roster after rotsterSite added", roster)
          
        rosterData.employees.forEach((employeeName) => {
            
            employee.forEach((emp) => {
                // console.log("This is employee Name", employeeName); 
                console.log("this is emp name",emp)
                if (emp.empName === employeeName) {
                    roster.employees.push(emp._id)
                }
            })  
        //   try {
        //     const tempArray = []
        //     const foundEmployee = await Employee.findOne({ empName: employeeName }).exec();
        //     tempArray.push(foundEmployee.empName);
        //     //   console.log("roster post push =", foundEmployee.empName);
        //     // console.log("roster array =", roster);

        //   } catch(err) {
        //       console.log("Employee not found", err.message)
        //   }
            
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



//       }
//     } catch (err) {
//       console.error(err);
//       process.exit(1);
//     }

//     console.log('all done!');
//     process.exit(0);
//   });
