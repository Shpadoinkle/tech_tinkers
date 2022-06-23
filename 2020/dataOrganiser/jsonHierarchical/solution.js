// Obj Template
class taskObj {
  task = {
    ID: "",
    description: "",
    nextID: null,
    previousID: null,
    parentID: "",
  };
  subTasks = [];
}

const insertIntoOrderedArray = (obj, array) => {
  if (!obj.task.previousID) {
    // This is the first element -- add to front of list
    array.unshift(obj);
  } else if (array.findIndex((e) => e.task.ID === obj.task.previousID) > -1) {
    //insert item behind it's 'previousID'
    const index = array.findIndex((e) => e.task.ID === obj.task.previousID);
    array.splice(index + 1, 0, obj);
  } else {
    // elements 'previous' obj does not yet exist.. push to end of array
    array.push(obj);
  }
};

const fs = require("fs");
const myArgs = process.argv.slice(2);

if (myArgs.length < 2) {
  console.log("Two paths are requaired for this command");
  return;
}

const SOURCE_FILE = require(myArgs[0]);
let sourceFileInitialBuild = SOURCE_FILE.map((e) => {
  const tempObj = new taskObj();
  tempObj.task = { ...e };
  return tempObj;
});

const finalArray = [];
const keysArray = {};

sourceFileInitialBuild.forEach((o) => {
  keysArray[o.task.ID] = o;
});

sourceFileInitialBuild.forEach((o) => {
  if (!!o.task.parentID) {
    insertIntoOrderedArray(o, keysArray[o.task.parentID].subTasks);
  } else {
    // use obj maintain/reference
    insertIntoOrderedArray(o, finalArray);
  }
});

fs.writeFile(myArgs[1], JSON.stringify(finalArray, null, 2), function (err) {
  if (err) throw err;
  console.log("Restructure complete");
});
