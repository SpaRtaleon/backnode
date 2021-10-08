let express=require('express');
let router=express.Router();
let dbconnection=require('../dbconnenction');

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
    res.json(products);
})
router.post('/',(req,res)=>{
     const products={
         id:products.length+1,
         name:(req.body.name),
         type:(req.body.type),
         price:(req.body.price)
     };
     products.push(products);
     res.send(products)
});


router.post('/addproduct',(req,res,next)=>{
    console.log(req.body);
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