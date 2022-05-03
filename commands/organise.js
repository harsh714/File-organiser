let fs = require("fs");
let path = require("path");

let types = {
  media: ["mp4", "mkv"],
  archives: ["srt", "zip", "rar", "tar", "iso", "xz", "7z", "gz"],
  documents: [
    "pdf",
    "pptx",
    "docs",
    "doc",
    "xlsx",
    "xls",
    "odt",
    "odg",
    "odp",
    "ods",
    "odf",
    "txt",
    "ps",
    "ppt",
    "png",
    "jpeg",
  ],
  app: ["exe", "dmg", "pkg", "deb"],
};

function organiseFn(dirPath) {
  //   console.log("organise implemented for", dirPath);

  // 1. input-> directoy path given

  let destPath;
  if (dirPath == undefined) {
    let destPath = process.cwd();
    return;
  } else {
    let doesExist = fs.existsSync(dirPath);

    if (doesExist) {
      // 2. create organised_files -> directory

      destPath = path.join(dirPath, "organised_files"); //destPath -> Path of the organised_file directory in src

      if (fs.existsSync(destPath) == false) {
        fs.mkdirSync(destPath);
      }
    } else {
      console.log("Kindly enter the path");
      return;
    }
  }
  organiseHelper(dirPath, destPath);
}

// src is the path of directory containing files
// dest is the path of organised_files directory

function organiseHelper(src, dest) {
  // 3. identify categories of all the files present in the input directory

  let childName = fs.readdirSync(src);
  // console.log(childName);
  for (let i = 0; i < childName.length; i++) {
    let childAddress = path.join(src, childName[i]); // childName -> Adress of single file in src
    let isFile = fs.lstatSync(childAddress).isFile(); // checking for file or folder
    if (isFile) {
      // console.log(childName[i]);

      let category = getCategory(childName[i]);
      console.log(childName[i], "Belongs to-> ", category);

      // 4. copy/cut the files to that organised directory inside of any category folder

      sendFiles(childAddress, dest, category);
    }
  }
}

function sendFiles(srcFile, dest, category) {
  let categoryPath = path.join(dest, category); // categoryPath -> it is the path of the type in organised_files directory
  if (fs.existsSync(categoryPath) == false) {
    fs.mkdirSync(categoryPath);
  }

  let fileName = path.basename(srcFile); // .basename() -> returns the base name of file which menas actula name of file eg. : file.doc
  let destFilePath = path.join(categoryPath, fileName);

  fs.copyFileSync(srcFile, destFilePath);
}

function getCategory(name) {
  let ext = path.extname(name);
  // console.log(ext);
  ext = ext.slice(1);

  for (let type in types) {
    let currTypeArr = types[type];
    for (let i = 0; i < currTypeArr.length; i++) {
      if (ext == currTypeArr[i]) {
        return type;
      }
    }
  }
  return "others";
}

module.exports = {
  organiseKey: organiseFn,
};
