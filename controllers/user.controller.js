exports.allAccess = (req ,res) =>{
    res.status(200).send({
        msg : 'Public content'
    });
};
exports.userBoard = (req,res)=>{
    res.status (200).send ({ msg : 'User Content'});
};

exports.shopAdminBoard = (req,res)=>{
    res.status (200).send({msg : 'Admin Content'});
};
exports.superAdminBoard =(req,res)=>{
    res.status(200).send({ msg : 'SuperAdmin Content'});
};
