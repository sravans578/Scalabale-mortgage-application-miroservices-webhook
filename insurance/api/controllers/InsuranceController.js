/**
 * InsuranceController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    calculate: async function(req,res)
    {
        var appraisal_value = req.body.appraisal_value;
        var mort_id = req.body.mort_id;
        var mlsid = req.body.mlsid;
        var name = req.body.name;

        var insured_value = appraisal_value * 0.70;
        var deductible_value = appraisal_value * 0.05;

        await Insurance.createEach([{mort_id:mort_id, appraisal_value: appraisal_value, insured_value:insured_value, deductible_value:deductible_value, mlsid: mlsid, name: name}]);

         return res.json(
         {
             name: name,
             mort_id: mort_id,
             mlsid: mlsid,
             insured_value: insured_value,
             deductible_value: deductible_value,
             
         });

         
      
    },  
  

};

