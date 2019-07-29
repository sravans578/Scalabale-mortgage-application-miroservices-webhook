/**
 * REControllerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var request = require('request');


module.exports = {


  login: function(req, res) {
    var uname = req.body.username;
    var pwd = req.body.password;
    console.log(uname);
    console.log(pwd);

    if (uname == "") {
      res.send("No username");
    }
    if (uname == "" && pwd == "") {
      return res.ok({
        error: 'No username or password specified!'
      }, 400);
    } else {
      Users.find({
        "userID": uname,
        "password": pwd,
        "type": req.body.type
      }).exec(function(err, result) {
        if (err) {
          sails.log.debug('Some error occurred ' + err);
          return res.ok({
            error: 'Some error occurred'
          }, 300);

        } else {
          if (result != "") {
            sails.log.debug('Success', JSON.stringify(result));
            return res.ok({
              success: 'Login Successful'
            });
          } else {
            return res.ok({
              error: ' Please check the username and password'
            }, 400);
          }
        }
      });

    }
  },

  adddetails: function(req, res) {

    var name = req.body.name;
    var mID = req.body.mID;
    var mlsID = req.body.mlsID;



    Requests.create({
      "mortgageID": mID,
      "mlsID": mlsID,
      "name": name
    }).exec(function(err) {
      if (err) {
        console.log("error", err);
      }
      Requests.find({
        "mortgageID": mID,
        "mlsID": mlsID,
        "name": name
      }).exec(function(err, result) {
        console.log(result);
        if (result.length <= 0) {
          return res.ok({
            error: 'Some error occured'
          }, 500);
          res.json({
            result: false
          });
        }
        return res.ok({
          result: 'Application submitted succesfully'
        });
      });
    });
  },

  submitreport: async function(req, res) {

    var requestUpdated = await Requests.updateOne({
      "mortgageID": req.body.mID,
      "mlsID": req.body.mlsid
    }).set({
      "value": req.body.value,
      "status": "Evaluated"
    })

    if (requestUpdated) {
      var data = {
        "mort_id": requestUpdated.mortgageID,
        "mlsid": requestUpdated.mlsID,
        "name": requestUpdated.name,
        "appraisal_value": requestUpdated.value
      };
      console.log(data);
      var ins_url = "https://prod-28.canadacentral.logic.azure.com:443/workflows/a31048ca9ec743e79b43d5a8ee8930bb/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=KJxYnu05yHpR7jehOdYT9RjT-eHaOVvZVwwtDVPUICk";
      request.post(ins_url, {
        json: data
      }, async function(err, response, body) {
        var _startTime = new Date();
        await Logger.create({
          IP: -1,
          requestUrl: response.request.href,
          requestBody: JSON.stringify(response.request.body),
          method: response.req.method,
          requestHeaders: JSON.stringify(response.request.headers),
          responseTime: new Date() - _startTime + ' ms',
          responseCode: response.statusCode,
          responseBody: JSON.stringify({
            body
          }),
          appSource: 'RE Portal'
        }).exec(function(err, result) {
          if (err) {
            console.log('Some error occured ' + err);
          }
        });

        if (response.statusCode != 200 || response.statusCode != 201) {

          return res.ok({
            result: "Internal error while invoking internal call"
          }, 500);
        }

        res.ok({
          result: 'Application updated succesfully'
        });
      })

    } else {
      console.log("error", err);
      return res.ok({
        result: "Bad Client"
      }, 400);
    }

  }

};