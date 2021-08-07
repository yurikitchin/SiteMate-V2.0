const db = require('../config/connection');
const { Employee, Roster, Site } = require('../models');
const employeeSeeds = require('./employeeSeeds.json');
const rosterSeeds = require('./rosterSeeds.json');
const siteSeeds = require('./siteSeeds.json');

db.once('open', async () => {
  try {
    await Employee.deleteMany({});
    // await Roster.deleteMany({});
    await Site.deleteMany({});

    await Employee.create(employeeSeeds);
    await Site.create(siteSeeds);
    // await Roster.create(rosterSeeds);

    // await Roster.remove({}, (err, rosters) => {
    //     console.log('Removed all rosters');
    //     rosterSeeds.forEach((rosterData) => {
    //         let roster = 
    //     })
    // })


            console.log("this is rosterSeeds.employees", rosterSeeds[0].employees[0])
    for (let i = 0; i < rosterSeeds.length; i++) {
        console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB", rosterSeeds[i].employees.length)

        const { _id, siteName } = await Roster.create(rosterSeeds[i]);
        const rosterSite = await Site.findOneAndUpdate(
          { siteName: siteName },
          {
            $addToSet: {
              site: _id,
            },
          }
        );
        for (let x = 0; x < rosterSeeds[i].employees.length; x++) {
            console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH", rosterSeeds[i].employees[x])
            const addEmployee =await Employee.findOneAndUpdate(
                { wmpName: rosterSeeds[i].employees[x] },
                {
                    $addToSet: {
                      employee: _id,
                    },
                  })
            
        }
      }
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
    // const addEmployee =await Employee.findOneAndUpdate(
    //     { firstName: employeeName },
    //     {
    //         $addToSet: {
    //           employee: _id,
    //         },
    //       }
    // )
    console.log('all done!');
    process.exit(0);
  });