const _ = require('lodash');

module.exports = {
  home(req,res){
    return res.view('home');
  },
  addShow(req,res){
    if(!_.isString(req.query.showName) || !_.isString(req.query.showDescription) || !_.isString(req.query.showStartTime))
      return res.status(400).send({message:'Some parameter missing'});

    var showName = decodeURIComponent(req.query.showName);
    var showDescription = decodeURIComponent(req.query.showDescription);
    var showStartTime = decodeURIComponent(req.query.showStartTime);

    Data.findOne({showName}).exec((err,show)=>{
      if(err)
        return res.status(400).send({err});
      if(show === undefined){
        Data.create({showName,showDescription,showStartTime}).exec((err,result)=>{
          if(err)
            return res.status(400).send({err});
          return res.status(200).send({ok:'ok'});
        });
      }
      else {
        return res.status(200).send({ok:'ok'});
      }
    });
  },
  viewShows(req,res){
    Data.find().exec((err,shows)=>{
      let view = true;
      let error=null;
      if(err){
        view=false;
        error = err;
      }
      else if(shows.length<1)
        error='No show found';
      else
        view = true;
      return res.view('showsView',{
        view,error,shows
      });
    });
  },
  deleteShow(req,res){
    if(!_.isString(req.query.show))
      return res.status(400).send({message:'Please send a valid name'});

      var showName = req.query.show;
      Data.destroy({showName}).exec((err,shows)=>{
        if(err)
          return res.status(400).send({err});
        return res.status(200).send({ok:'ok'});
      });
  },
  updateShow(req,res){
    if(!_.isString(req.body.id) || !_.isString(req.body.showName) || !_.isString(req.body.showDescription) || !_.isString(req.body.showStartTime))
      return res.status(400).send({message:'Some parameter missing'});

    var id = req.body.id;
    var showName = req.body.showName;
    var showDescription = req.body.showDescription;
    var showStartTime = req.body.showStartTime;
    Data.update({id},{id,showName,showDescription,showStartTime}).exec((err,update)=>{
      if(err)
        return res.status(400).send({err});
      return res.ok();
    });
  }

};
