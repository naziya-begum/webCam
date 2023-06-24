import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import 'dotenv/config'
// dotenv.config()

const PORT = process.env.PORT || 5000;


mongoose.connect(`mongodb+srv://mdnaziya2833:${process.env.API_KEY}@cluster0.7vojiuz.mongodb.net/webCameraDataBase?retryWrites=true&w=majority`)

const app = express();

app.use(bodyParser.json({ limit: '10mb' }));
import cors from 'cors';
app.use(cors())
const WebCamSchema = mongoose.Schema({
    ID: String,
    ApplicantName: String,
    RelativeName: String,
    Volunteer: String
})
const webCamModel = mongoose.model('startingfiledb', WebCamSchema);


const finalItemsSchema = mongoose.Schema({
    Name: String,
    Image: String,
    Volunteer: String

})
const finalmodel = mongoose.model('finaldb', finalItemsSchema)

app.get('/', function (req, res) {

    webCamModel.find({}).then(data => {
        data.map(obj => {

            const NameList = obj.ApplicantName;
            // console.log(NameList)

        })
        return res.json(data)
    }).catch(err => { console.log(err) })




})
app.post('/', function (req, res) {
    const getItems = req.body;


    // console.log(getItems.name)
    webCamModel.findOneAndDelete({ ApplicantName: getItems.name })
        .then(deletedObj => {
            console.log(deletedObj)
        })
        .catch(err => {
            console.log(err)
        })

    res.json({ success: true });

})
app.get('/reports', function (req, res) {
    finalmodel.find({}).then(data1 => {
        data1.map(obj => {

            const NameList = obj.ApplicantName;
            // console.log(NameList)

        })
        return res.json(data1)
    }).catch(err => { console.log(err) })

})
app.post('/reports', function (req, res) {
    // console.log(req.body)
    const insert = new finalmodel({
        Name: req.body.Name,
        Image: req.body.Image,
        Volunteer: req.body.volunteer

    })
    insert.save()
    res.json({ msg: 'sucessfully sent to reports page' })
})

app.listen(PORT, function () {
    console.log(`server running on port ${PORT}`)

})

