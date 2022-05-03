function helpFn(dirPath) {
  console.log(`
      List of all commands:
                  node main.js tree "directory path"
                  node main.js organize
                  node main.js help
      `);
}
// `` are Template literals, here we are using them for making the multiple line string

module.exports = {
    helpKey: helpFn
};
