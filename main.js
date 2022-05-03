#!/usr/bin/env node

// made bin in package.json -> "peppy": main.js

let inputArr = process.argv.slice(2);
let fs = require("fs");
let path = require("path");

let helpObj = require("./commands/help");
let organiseObj = require("./commands/organise");
let treeObj = require("./commands/tree");


// console.log(inputArr);

// node main.js tree "directory path"
// node main.js organize
// node main.js help

let command = inputArr[0];

switch (command) {
  case "tree":
    treeObj.treeKey(inputArr[1]);
    break;
  case "organise":
    organiseObj.organiseKey(inputArr[1]);
    break;
  case "help":
    helpObj.helpKey();
    break;
  default:
    console.log("Enter valid input");
    break;
}

