const mysql=require('mysql');

const userModel= new mysql.Schema({
firstName:{ type:String , default:null },
lastName:{ type:String , default:null },
emai:{ type:String , default:null },
password:{ type:String },
token:{}
});
module.exports("User",userModel)