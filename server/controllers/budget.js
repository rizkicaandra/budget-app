const { response } = require('express');
const { Budget } = require('../models/index')

class BudgetController {

  static addData(req, res, next){
    let { name, category, amount} = req.body
    
    let newData = {
      name,
      category,
      amount
    }
    
    Budget.create(newData)
    .then( response => {
      res.status(201).json(response.dataValues)
    })
    .catch( err => {
      next(err)
    })  
  }

  static findAllIncomes(req, res, next){
    Budget.findAll({
      where:{
        category: 'income'
      }
    })
    .then( response => {
      res.status(200).json(response)
    })
    .catch( err => {
      next(err)
    })
  }

  static findAllExpenses(req, res, next){
    Budget.findAll({
      where:{
        category: 'expenses'
      }
    })
    .then( response => {
      res.status(200).json(response)
    })
    .catch( err => {
      next(err)
    })
  }

  static findDataById(req, res, next){
    let { id } = req.params

    Budget.findByPk(id)
    .then( response => {
      if(!response){
        throw { 
          name: "customError", 
          message: "error not found",
          stats: 404 
        }
      } else {
        res.status(200).json(response)
      }
    })
    .catch( err => {
      next(err)
    })
  }

  static updateData(req, res, next){
    let { id } = req.params
    let { name, category, amount } = req.body

    let editData = {
      name,
      category,
      amount
    }

    Budget.update(editData, {
      where:{
        id
      },
      returning: true
    })
    .then( response => {
      if(!response){
        throw { 
          name: "customError", 
          message: "error not found",
          stats: 404 
        }
      } else {
        res.status(200).json(response[1][0])
      }
    })
    .catch( err => {
      next(err)
    })
  }

  static deleteData(req, res, next){
    let { id } = req.params

    Budget.destroy({
      where:{
        id
      }
    })
    .then( response => {
      if(!response){
        throw { 
          name: "customError", 
          message: "error not found",
          stats: 404 
        }
      } else {
        res.status(200).json({ message: "Data succes to delete"})
      }
    })
    .catch( err => {
      next(err)
    })
  }

  static getBalance(req, res, next){
    let balance = 0
    let income = 0
    let expenses = 0

    Budget.findAll({
      where:{
        category: 'income'
      }
    })
    .then(res => {
      res.forEach(element => {
        income += element.amount
      });

      return Budget.findAll({
        where:{
          category: 'expenses'
        }
      })
    })
    .then( exp => {
      exp.forEach(data => {
        expenses += data.amount
      });

      balance = income - expenses

      res.status(200).json({ balance })
    })
    .catch( err => {
      next(err)
    })
  }
}

module.exports = BudgetController