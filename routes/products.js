let express=require('express');
let router=express.Router();
let dbconnection=require('../config/dbconnenction');

router.get('/',(req,res)=>{
   let products=[{
       'produc name':'Nike shoe',
       'product type':'Fashion',
       'price':'$230'
    },
    {
        'produc name':'buma shoe',
        'product type':'Fashion',
        'price':'$130'
    }]
    res.json("hiiiii");
})
router.post('/',(req,res)=>{
     res.send({msg:'works'});
});


router.post('/addproduct',(req,res,next)=>{
    console.log(req.body);
    res.json({'name':'product'});
})
module.exports = router;
// const product=function(product){
//     this.productName=product.name;
//     this.type=product.type;
//     this.productPrice=product.price;

// }
// product.create =(newproduct,result)=>{
//     sql.query('INSERT INTO ${product}.type(${productName} varchar,${productPrice} )',newproduct,(err,res)=>{
//         if (err){
//             console.log(err);
//             result(err, null);
//       return;
//         }
//         console.log("created Product",{id:res.insertId,newproduct});
//         result(null,{id:res.insertId,newproduct})

//     }
//     );
// };