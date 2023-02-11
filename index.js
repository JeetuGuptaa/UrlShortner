const express = require('express');
const ejs = require('ejs');
const URLShortner = require('./model/URL');
const db = require('./config/mongoose');
const {nanoid} = require('nanoid');
const path = require('path')
const app = express();

app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.urlencoded({extended : false}));

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', async (req, res)=>{
    try{
        let url = await URLShortner.find({}); 
        return res.render('home', {
            url : url
        });
    }catch(err){
        conosle.log(err);
        return res.redirect('back');
    }
});

app.post('/short-url', async (req, res)=>{
    try{
        console.log(req.body.url)
        let url;

        url = await URLShortner.findOne({
            url : req.body.url
        });

        if(!url){
            url = await URLShortner.create({
                url : req.body.url,
                short_url : nanoid(8)
            });
        }
        
        return res.status(200).json({
            data : {
                url : url
            },
            message : "Request Successfull"
        });
        
    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
});

app.get('/u/:url', async (req, res)=>{
    try{
        let url = await URLShortner.findOne({short_url : req.params.url});
        url.click++;
        url.save();
        return res.redirect(`${url.url}`);
    }catch(err){
        console.log(err);
        return res.redirect('back');
    } 
});

app.listen(8000,(err)=>{
    if(err){
        console.log(`Error in starting the server, ${err}`);
        return;
    }
    console.log("Server running on port : 8000");
})