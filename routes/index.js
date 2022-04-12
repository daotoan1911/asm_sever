var express = require('express');
var router = express.Router();
var fs = require('fs');


var db = 'mongodb+srv://toandm:riI41BJjs4p68DaI@cluster0.xifo4.mongodb.net/asm?retryWrites=true&w=majority'
const mongoose = require('mongoose');
mongoose.connect(db).catch(error => {
    console.log("co loi xay ra")
});

/* GET home page. */
router.get('/mobile', function (req, res, next) {
    // lấy danh sách students
    Asm.find({}, function (err, data) {
        // trả về 1 file ejs.
        res.send(JSON.stringify(data))
    })
});
router.get('/', function (req, res, next) {
    // lấy danh sách students
    Asm.find({}, function (err, data) {
        // trả về 1 file ejs.
        res.render('index', {pagename: 'Home', message: '',data: data})
    })
});

router.get('/Add', function (reg, res) {
    console.log('add');
    res.render('Add', {pagename: 'Beautiful Background'})
});
router.get('/Update', function (reg, res) {
    console.log('else');
    res.render('Update', {pagename: 'Something else here'})
});
router.get('/Delete', function (reg, res) {
    console.log('dele');
    res.render('Delete', {pagename: 'Home'})
});

const AsmSchema = new mongoose.Schema({
    content: 'string',
    date: 'string',
    lienket: 'string'
});
const Asm = mongoose.model('image', AsmSchema);

//Thêm
router.post('/add',function (req,res){
    var content = req.body.content;
    var date = req.body.date;
    var lienket = req.body.lienket;

    const data = new Asm({
        content: content,
        date: date,
        lienket: lienket
    });
    data.save(function (err) {
        if (err) return handleError(err);
        res.render('Add', {
            title: 'About',
            message: 'Chúng tôi đã nhận thông tin'
        })

    });

});
//Update
router.post('/update', async function (req, res) {
    // lấy tham số ra
    var content = req.body.content;
    var date = req.body.date;
    var lienket = req.body.lienket;
    // in ra log để kiểm tra
    console.log(content)
    console.log(date)
    console.log(lienket)

// câu lệnh cập nhật
    const filter = {content: content};
    const update = {date: date,lienket: lienket};
    let ketqua = await Asm.findOneAndUpdate(filter, update, {
        new: true
    });
    Student.find({}, function (err, data) {
        // trả về 1 file ejs.
        res.render('index', {pagename: 'Home', message: '',data: data})
    })
});




module.exports = router;
