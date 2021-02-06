# simple-cdn
A simple way to make a CDN

## Required libraries

`express`: To make our server<br>
`formidable`: So that we can work with files sent from the client side

## Getting Started:

 First we will create an HTML file, basic with only one form

```html
  <form action="/upload" method="post" enctype="multipart/form-data">
    <input type="file" name="filetoupload"><br><br>
    <input type="submit">
  </form>
```
<br>
 Now we can go to the server side.<br>
 You can use another library, I will use express because it is my preference.<br>
 Just a simple code, for the routes, we won't focus on them too much.<br>

```js
const express = require("express");
const app = express();
const formidable = require('formidable');


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/html/upload.html")
});
app.post('/upload', async (req, res) => {
  
});

app.get("/cdn/:File")

app.get("*", (req, res) => {
  res.status(404)
})
app.listen(300, () => {
  console.log("online")
});
```
<br>

`/`: This is the default route, where we will upload files<br>
`/upload`: `POST`, will receive the file<br>
`/cdn/:File`: Here we will send this file to the user.
<br>

### Handling files:

 In order for us to handle the received files, we will use formidable to save the file. You can also do anything else with this file, such as sending it to some third party storage.<br>

```js
const form = formidable({ multiples: true, uploadDir: __dirname + "/saved", keepExtensions: true });
``` 
<br>
 Here we will save the file in the folder called "saved" , saving the file extension.<br>
 Just that line of code already saves our file, but let's do a little more with this information.

```js
const form = formidable({ multiples: true, uploadDir: __dirname + "/saved", keepExtensions: true });
form.parse(req, async (err, fields, files) => {
  const file = files.filetoupload.path.slice(31) // 24 31 = - upload_
  res.redirect(`/cdn/${file}`)
})
```
<br>
 
 Here we will read the name of the saved file and redirect the user to this page.<br>
 Using the `slice` function, we will cut the string that is the file path. In the parameters, 24 cuts to `upload_code`, 31 cuts to `upload_` too, this makes the URL a little more beautiful.

### Sending the file to the user via a URL:

 This part is also very simple, we will just add `upload_` to the requested URL and search for a file by this name.<br>

```js
app.get("/cdn/:File", (req, res) => {
  res.sendFile(__dirname + `/saved/upload_${req.params.File}`);
});
```

### Limiting file size:

 It is also possible to limit the size of files received by entering a new parameter:<br>
```js
maxFileSize: X * 1024 * 1024
```
 `X` represents a number that will be the maximum amount of MB. For example, if it is 30, the limit is 30 MB.<br>
 If the file is bigger, it will return an error, so you will have to check.<br>

```js
if(err){
   res.send("The file is too big, try to send a smaller one.")
   return
}
```

 These codes in action:<br>

![](https://host.cloudyyuw.repl.co/i/e6ec7f963380809994eadb5d439f0abe.gif)
<br>
 Now go, go and use your creativity!
<hr>

### References:

[Nodejs Upload Files, by W3schools](https://www.w3schools.com/nodejs/nodejs_uploadfiles.asp)<br>
[Formidable Docs](https://www.npmjs.com/package/formidable)
