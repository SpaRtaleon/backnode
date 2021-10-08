let mysql=require('mysql');
let connection= mysql.createConnection({
 host:'localhost',
 user:'root',
 password:'Intel@123',
 database:'shopzz',
 connectionLimit : 10,               // this is the max number of connections before your pool starts waiting for a release
multipleStatements : true           // I like this because it helps prevent nested sql statements, it can be buggy though, so be careful
})
connection.connect((err) => {  
    if(!err) {  
        console.log("Db Connection Succeed");  
    }  
    else{  
        console.log("Db connect Failed \n Error :" + JSON.stringify(err,undefined,2));  
    }  
});  


// connection.query("INSERT INTO grocery (id,Product_Name,Price) VALUES (123,'channa',122)",(err,rows,fields)=>{  
//     if(!err)   
//     console.log(!err)  
//     else  
//         console.log(err);  })
module.exports = connection;