const express = require('express');
const router = express.Router({mergeParams: true});
const {localQuery} = require('../local_query');
const { Table } = require('../models/table.model');
const {each} = require('lodash');
const data = require('../database/data.json');
router.get('/', localQuery, (request, response, next) => {
  const params =  request.params;
  let sort = params.sort
  let search = params.search
  if(sort && Object.keys(sort).length > 0){
    sort = Object.entries(sort).map(([key, value]) => [key, (value === 'desc' ? -1 : 1)]);
  }
  let query = Table.find().sort(sort)
  let builder = []

  if(search && Object.keys(search).length > 0){
    each(Object.keys(search), (field) => {
      let op = search[field];
      if(op.lte) {
        builder.push({[field]: { '$lte': op.lte }});
      }
      if(op.gte) {
        builder.push({[field]: { '$gte': op.gte }});
      }
    });
  }
  if(builder.length > 0) {
    query = query.and(builder);
  }
  query.then(entries => {
    response.status(200).json(entries);
  }).catch((error) =>{
    response.status(422).json(error);
  });
})

router.get('/dump', localQuery, async (request, response, next) => {
  await Table.deleteMany({});
  const count = await Table.countDocuments();
  if(count === 0) {
    Table.insertMany(data,(error, records) => {
      if(error){
        response.json(error);
      } else {
        response.json(records);
      }
    })
  } else {
    response.json('Not dumpes')
  }
})

module.exports = router;