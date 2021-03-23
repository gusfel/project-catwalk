const express = require('express');
const axios = require('axios')
const key = require('../../config.js')



module.exports = {

getData: (req,res)=>{
  let options = {
    url: 'http://localhost:2000/qa/questions?product_id=' + req.query.id+'&count=69',
    method: 'GET',
    headers: {
      'User-Agent': 'request',
      'Authorization': key
    }
  }
  axios(options).then(response => {res.send(response.data) } )
},

helpQ: (req,res)=>{
  let options = {
    url: 'http://localhost:2000/qa/questions/'+ req.body.body+'/helpful' ,
    method: 'put',
    // headers: {
    //   'User-Agent': 'request',
    //   'Authorization': key
    // }
}
axios(options).then(console.log('worked'))
},

helpA: (req,res)=>{
  console.log(req)
  let options = {
    url: `http://localhost:2000/qa/answers/${req.body.body}/helpful` ,
    method: 'put',
    // headers: {
    //   'User-Agent': 'request',
    //   'Authorization': key
    // }
}
axios(options).then(console.log('worked'))

},

addAnswer:(req,res)=>{
  console.log(req.body)
  let options = {
    url: 'http://localhost:2000/qa/questions/'+ req.body.question_id+'/answers' ,
    method: 'post',
    data: req.body.obj,
    headers: {
      'Authorization': key
    }
}
 axios(options).then((response)=>{response.data}).catch((err)=>{console.log(err)})

},

addQuestion: (req,res)=>{
  console.log(req.body)
  let options = {
    url: 'http://localhost:2000/qa/questions' ,
    method: 'post',
    data: req.body,
    headers: {
      'Authorization': key
    }
}
 axios(options).then((response)=>{console.log('here')}).catch((err)=>{console.log(err)})
},
ReoportQ: (req,res)=>{

  let options = {
    url: 'http://localhost:2000/qa/questions/'+ req.body.question_id+'/report' ,
    method: 'put',
    headers: {
      'Authorization': key
    }
}
 axios(options)

},
ReoportA:  (req,res)=>{
  let options = {
    url: 'http://localhost:2000/qa/answers/'+ req.body.answers_id+'/report' ,
    method: 'put',
    headers: {
      'Authorization': key
    }
}
 axios(options)

}

}