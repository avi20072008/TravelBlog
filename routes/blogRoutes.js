const express = require('express')
const Blog = require('../models/blog')

const router = express.Router();

router.get('/', (req, res) => {
    //res.sendFile('./views/index.html', { root: __dirname});

    // const blogs = [
    //     {title:'mario likes mashrooms', snippet: 'jsad qa asda bzxc e asda dadas'},
    //     {title:'yoshi likes stars', snippet: 'sdaaa qa asda bzxc e asda dadas'},
    //     {title:'bowser likes mario', snippet: 'mario qa asda bzxc e asda dadas'}
    // ];

    Blog.find().sort({createdAt: -1})
    .then((result) => {
        res.render('index', {title: 'All Blogs', blogs: result});
    })
    .catch(err => console.log(err));
});

router.post('/', (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
    .then((result)=>{
        res.redirect('/blogs');
    })
    .catch(err => console.log(err))
});

// create new blog
router.get('/create', (req, res) => {
    res.render('create', {title: 'Create New Blog'});
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    
    Blog.findById(id)
        .then(result => {
            //details is a name of view
            res.render('details', {blog: result, title: 'Blog Details'})
        })
        .catch(err => console.log(err))
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
    .then(result => {
        res.json({ redirect: '/blogs'});
    })
    .catch(err => console.log(err)); 
});

module. exports = router;