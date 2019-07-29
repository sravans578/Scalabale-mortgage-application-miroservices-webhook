/**
 * REControllerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  

    login: function(req,res){
        var uname = req.body.username;
        var pwd = req.body.password;
        console.log(uname);
        console.log(pwd);

        if(uname == ""){
            res.send("No username");
        }
		if(uname == "" && pwd == "") {
			res.send("No username or password specified!");
        }
        else{
            Users.find( { "userID": uname , "password": pwd}).exec(function(err,result){
                console.log("result",result);
            if (err) {
                sails.log.debug('Some error occurred ' + err);
                return res.json(300, { error: 'Some error occurred' });
            }
            else
            {
                if(result != ""){
                sails.log.debug('Success', JSON.stringify(result));
                return res.json({ success: 'Login Successful' });
                }
                else
                {
                return res.json({ error: ' Please check the username and password' });
                }
            } 
      });

    }
    },

    adddetails: function(req, res){

        var name = req.body.name;
        var mID = req.body.mID;
        var mlsID = req.body.mlsID;

    

        Requests.create({"mortgageID": mID, "mlsID":mlsID, "name":name}).exec(function(err){
            if(err){
                console.log("error",err);
            }
            Requests.find( { "mortgageID": mID, "mlsID":mlsID, "name":name}).exec(function(err,result){
                console.log(result);
                if(result.length <=0){
                    res.json({result: false});
                }
                res.json({result: 'Application submitted succesfully'});
                            
            });
        });
    }



};

