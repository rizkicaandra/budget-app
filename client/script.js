const baseUrl = 'http://localhost:3000/'

const modal = document.getElementById("myModal");
const btn = document.getElementById("myBtn");
const span = document.getElementsByClassName("close")[0];
const addData = document.getElementById("addNewData")
const editForm = document.getElementById("editForm")
btn.onclick = function () {
  modal.style.display = "block";
  editForm.style.display = "none";
  addData.style.display = "block";
};
span.onclick = function () {
  modal.style.display = "none";
  nameData.style.color = "#495057";
  nameData.style.border = "1px solid gray";
  nameData.placeholder = "";
  amountData.style.color = "#495057";
  amountData.style.border = "1px solid gray";
  amountData.placeholder = "";
  categoryData.style.color = "#495057";
  categoryData.style.border = "1px solid gray";
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

let totalIncome = document.getElementById("incomeAmount")
let totalExpenses = document.getElementById("expensesAmount")
let balance = document.getElementById("balanceAmount")
let tmpIncome = 0
let tmpExpense = 0
let tmpBalance = 0

const incomeData = document.getElementById("displayIncome")
const logoIncome = document.getElementById("logoIncome")
const expensesData = document.getElementById("displayExpenses")
const logoExpenses = document.getElementById("logoExpenses")

const incmValue = document.getElementById("incmValue");
const expValue = document.getElementById("expValue")

const addForm = document.getElementById("addForm")
let nameData = document.getElementById("name");
let amountData = document.getElementById("amount");
let categoryData = document.getElementById("category");

const saveEdit = document.getElementById("saveEdit")
let editedId = null
let nameEdit = document.getElementById("nameEdit");
let amountEdit = document.getElementById("amountEdit");
let categoryEdit = document.getElementById("categoryEdit");

logoIncome.addEventListener("click", getIncomeData)
logoExpenses.addEventListener("click", getExpensesData)

// fetch income total
fetch(baseUrl + 'incomes')
  .then( res => res.json() )
  .then( data => {
    data.forEach(income => {
      tmpIncome += Number(income.amount)
    })
    totalIncome.innerHTML = tmpIncome
  })

// fetch expense total
fetch(baseUrl + 'expenses')
  .then( res => res.json() )
  .then( data => {
    data.forEach(expenses => {
      tmpExpense += Number(expenses.amount)
    })
    totalExpenses.innerHTML = tmpExpense
  })

// get all income data
function getIncomeData() {
  incmValue.innerHTML = null
  tmpIncome = 0
  fetch(baseUrl + 'incomes')
  .then( res => res.json() )
  .then( data => {
    data.forEach(income => {
      incmValue.innerHTML += `
      <div class="expValue" id="${income.id}">
        <div class="exp"><p>${income.name}</p></div>
        <div class="exp"><p> <span>Rp </span> ${income.amount}</p></div>
        <div class="exp"><p> ${income.category}</p></div>
        <div id="edite_delete">
          <p>
            <button id="${income.id}" onclick="editDataDetail(${income.id})"> <img src="image/edit.svg" width="15" alt=""  /></button> 
            <button id="${income.id}" onclick="delDataDetail(${income.id}, '${income.category}')"><img src="image/trash.svg" width="15" alt="" /></button>
          </p>
        </div>
      </div>
      `
      tmpIncome += Number(income.amount)
    });
    totalIncome.innerHTML = tmpIncome
  })
  incomeData.style.display = "block";
  expensesData.style.display = "none";
}

// get all expenses data
function getExpensesData() {
  expValue.innerHTML = null
  tmpExpense = 0
  fetch(baseUrl + 'expenses')
  .then( res => res.json())
  .then( data => {
    data.forEach(expenses => {
      expValue.innerHTML += `
      <div class="expValue" id="${expenses.id}">
        <div class="exp"><p>${expenses.name}</p></div>
        <div class="exp"><p> <span>Rp </span> ${expenses.amount}</p></div>
        <div class="exp"><p> ${expenses.category}</p></div>
        <div id="edite_delete">
          <p>
            <button id="${expenses.id}" onclick="editDataDetail(${expenses.id})"> <img src="image/edit.svg" width="15" alt=""  /></button> 
            <button id="${expenses.id}" onclick="delDataDetail(${expenses.id}, '${expenses.category}')"><img src="image/trash.svg" width="15" alt="" /></button>
          </p>
        </div>
      </div>
      `
      tmpExpense += Number(expenses.amount)
    });
    totalExpenses.innerHTML = tmpExpense
  })
  expensesData.style.display = "block";
  incomeData.style.display = "none";
}

// add new data
function addNewData(name, amount, category) {
  if (!name.length) {
    nameData.style.border = "1px solid #b80c09";
    nameData.placeholder = "input can not be empty";
    nameData.style.color = "#b80c09";
  } 
  
  if (!amount.length){
    amountData.style.border = "1px solid #b80c09";
    amountData.placeholder = "input can not be empty";
    amountData.style.color = "#b80c09";
  } 
  
  if (!category.length) {
    categoryData.style.border = "1px solid #b80c09";
    categoryData.style.color = "#b80c09";
  } else {
    fetch(baseUrl + 'budgets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        category,
        amount: Number(amount)
      }),
    })
    .then(res => res.json())
    .then(data => {
      modal.style.display = "none";
      if(category == 'income'){
        getIncomeData()
      } else {
        getExpensesData()
      }
    })
    .catch( err => {
      console.log(err);
    })

    nameData.value = "";
    amountData.value = "";
    categoryData.value = "";
  }
}

// Display detail Data
function editDataDetail(id) {
  fetch(baseUrl + 'budgets/' + id)
  .then( res => res.json())
  .then( data => {
    editedId = data.id
    nameEdit.value = data.name
    categoryEdit.value = data.category
    amountEdit.value = data.amount
    modal.style.display = "block";
    addData.style.display = "none";
    editForm.style.display = "block";
  })
}

// sumbit edit data
function editData(id, name, amount, category){
  if (!name.length) {
    nameData.style.border = "1px solid #b80c09";
    nameData.placeholder = "input can not be empty";
    nameData.style.color = "#b80c09";
  } 
  
  if (!amount.length){
    amountData.style.border = "1px solid #b80c09";
    amountData.placeholder = "input can not be empty";
    amountData.style.color = "#b80c09";
  } 
  
  if (!category.length) {
    categoryData.style.border = "1px solid #b80c09";
    categoryData.style.color = "#b80c09";
  } else {
    fetch(baseUrl + 'budgets/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        category,
        amount: Number(amount)
      })
    })
    .then(res => res.json())
    .then(data => {
      modal.style.display = "none";
      if(category == 'income'){
        getIncomeData()
      } else {
        getExpensesData()
      }
    })
    .catch( err => {
      console.log(err);
    })

    nameEdit.value = ""
    categoryEdit.value = ""
    amountEdit.value = ""
  }
}

//delete data
function delDataDetail(dataId, category){
  fetch(baseUrl + `budgets/${dataId}`, {
    method: 'DELETE'
  })
  .then(res => res.json())
  .then(data => {
    if(category == 'income'){
      getIncomeData()
    } else {
      getExpensesData()
    }
  })
}

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addNewData(nameData.value, amountData.value, categoryData.value);
});

saveEdit.addEventListener("submit", (e) => {
  e.preventDefault();
  editData(editedId,nameEdit.value, amountEdit.value, categoryEdit.value)
});