const config = require('../configs/database');

let mysql      = require('mysql');
let pool       = mysql.createPool(config);

pool.on('error',(error)=> {
    console.error(error);
});

module.exports ={
    login(req,res){
        res.render("login",{
            url : 'http://localhost:8080/',
            colorFlash: req.flash('color'),
            statusFlash: req.flash('status'),
            pesanFlash: req.flash('message'),
        });
    },
   
    loginAuth(req,res){
        let email = req.body.email;
        let password = req.body.pass;
        if (email && password) {
            pool.getConnection(function(error, connection) {
                if (error) throw error;
                connection.query(
                    `SELECT * FROM table_user WHERE email = ? AND password = SHA2(?,512)`
                , [email, password],function (error, results) {
                    if (error) throw error;  
                    if (results.length > 0) {
                        req.session.loggedin = true;
                        req.session.userid = results[0].id;
                        req.session.username = results[0].name;
                        res.redirect('/');
                    } else {
                        req.flash('color', 'alert-warning');
                        req.flash('status', 'Ops..');
                        req.flash('message', 'Account not found');
                        res.redirect('/login');
                    }
                });
                connection.release();
            })
        } else {
            res.redirect('/login');
            res.end();
        }
    },
    
    logout(req,res){
        req.session.destroy((err) => {
            if(err) {
                return console.log(err);
            }
            res.clearCookie('secretname');
            res.redirect('/login');
        });
    },
}