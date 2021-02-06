const express = require("express");
const app = express();
const formidable = require('formidable');

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/html/upload.html");
});
app.post('/upload', async (req, res) => {
  const form = formidable({ multiples: true, uploadDir: __dirname + "/saved", keepExtensions: true });
  form.parse(req, async (err, fields, files) => {
    const file = files.filetoupload.path.slice(31) // 24 31 = - upload_
    res.redirect(`/cdn/${file}`)
  })
});

app.get("/cdn/:File", async(req, res) => {
  res.sendFile(__dirname + `/saved/upload_${req.params.File}`);
})

app.get("*", (req, res) => {
  res.status(404)
})
app.listen(300, () => {
  console.log("online")
});
