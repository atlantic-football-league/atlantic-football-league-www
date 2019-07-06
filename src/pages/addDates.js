// const fs = require("fs");

// const allFiles = fs.readdir("./news", (err, filenames) => {
//   filenames.forEach(function(filename) {
//     fs.readFile("./news/" + filename, "utf-8", function(err, content) {
//       const str = filename.slice(0, 10);
//       const date = new Date(filename.slice(0, 10));
//       if (date.toString() !== "Invalid Date") {
//         console.log(date.toISOString());
//         const newContent = content.replace(
//           "2019-06-20T00:00:00.000Z",
//           date.toISOString()
//         );
//         fs.writeFile("./news/" + filename, newContent);
//       }
//     });
//   });
// });

// // const file = fs.readFile()
