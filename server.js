const express = require('express');
const cors = require('cors');
const multer = require('multer');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/data/uploads')
    },
    filename: function (req, file, cb) {
      let extArray = file.mimetype.split("/");
      let extension = extArray[extArray.length - 1];
      cb(null, file.fieldname + '-' + Date.now()+ '.' +extension)
    }
  })
const upload = multer({ storage: storage })


const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
    res.json({
        name: req.file.originalname,
        type: req.file.mimetype,
        size: req.file.size
    });
});


app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + process.env.PORT);
    console.log(`http://localhost:${process.env.PORT || 3000}`);
}
);
