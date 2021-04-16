const router = require('express').Router()
const BudgetController = require('../controllers/budget')

router.post('/budgets', BudgetController.addData)

router.get('/incomes', BudgetController.findAllIncomes)

router.get('/expenses', BudgetController.findAllExpenses)

router.get('/budgets/:id', BudgetController.findDataById)

router.put('/budgets/:id', BudgetController.updateData)

router.delete('/budgets/:id', BudgetController.deleteData)

module.exports = router