import { createContext, useReducer } from "react";

// const DUMMY_EXPENSES = [
//   {
//     id: 'e1',
//     description: 'A pair of shoes',
//     amount: 55.90,
//     date: new Date('2021-12-19')
//   },
//   {
//     id: 'e2',
//     description: 'A pair of trousers',
//     amount: 87.65,
//     date: new Date('2022-01-05')
//   },
//   {
//     id: 'e3',
//     description: 'Some bananas',
//     amount: 5.99,
//     date: new Date('2021-12-01')
//   },
//   {
//     id: 'e4',
//     description: 'A book',
//     amount: 14.99,
//     date: new Date('2022-02-19')
//   },  
//   {
//     id: 'e5',
//     description: 'Another book',
//     amount: 18.50,
//     date: new Date('2022-02-20')
//   },  
//   {
//     id: 'e6',
//     description: 'Some apples',
//     amount: 7.42,
//     date: new Date('2022-03-09')
//   },
//   {
//     id: 'e7',
//     description: 'A suit',
//     amount: 75.00,
//     date: new Date('2021-12-22')
//   },  
//   {
//     id: 'e8',
//     description: 'A pen',
//     amount: 2.99,
//     date: new Date('2022-01-14')
//   },  
//   {
//     id: 'e9',
//     description: 'Coke',
//     amount: 10.99,
//     date: new Date('2022-03-11')
//   },    
// ]

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({description, amount, date}) => {},
  setExpenses: (expenses) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, {description, amount, date}) => {},
})

function expensesReducer(state, action){
  switch (action.type) {
    case 'ADD':
      const id = new Date().toString() + Math.random().toString()
      return [{ ...action.payload, id: id }, ...state]
    
    case 'SET':
      return action.payload  

    case 'UPDATE':
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      )
      const updatableExpense = state[updatableExpenseIndex]
      const updatedItem = { ...updatableExpense, ...action.payload.data }
      const updatedExpenses = [...state]
      updatedExpenses[updatableExpenseIndex] = updatedItem
      return updatedExpenses

    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload)

    default:
      return state
  }
}

function ExpensesContextProvider({children}) {

  const [expensesState, dispatch] = useReducer(expensesReducer, [])

  function addExpense(expenseData) {
    dispatch({ type: 'ADD', payload: expenseData })
  }

  function setExpenses(expenses) {
    dispatch({ type: 'SET', payload: expenses })
  }

  function deleteExpense(id){
    dispatch({ type: 'DELETE', payload: id })
  }

  function updateExpense(id, expenseData){
    dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } })
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    setExpenses: setExpenses,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense
  }

  return (
    <ExpensesContext.Provider value={value}>
        {children}
    </ExpensesContext.Provider>
  )
}

export default ExpensesContextProvider