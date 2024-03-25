const express = require('express');

function configReqBody(app) {    
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
}

module.exports = configReqBody;