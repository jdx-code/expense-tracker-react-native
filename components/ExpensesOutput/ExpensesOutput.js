import { StyleSheet, View } from "react-native"
import ExpensesSummary from "./ExpensesSummary"
import ExpensesList from "./ExpensesList"
import { GlobalStyles } from "../../constants/styles"

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'A pair of shoes',
    amount: 55.90,
    date: new Date('2021-12-19')
  },
  {
    id: 'e2',
    description: 'A pair of trousers',
    amount: 87.65,
    date: new Date('2022-01-05')
  },
  {
    id: 'e3',
    description: 'Some bananas',
    amount: 5.99,
    date: new Date('2021-12-01')
  },
  {
    id: 'e4',
    description: 'A book',
    amount: 14.99,
    date: new Date('2022-02-19')
  },  
  {
    id: 'e5',
    description: 'Another book',
    amount: 18.50,
    date: new Date('2022-02-20')
  },  
]

const ExpensesOutput = ({ expenses, expensesPeriod }) => {
  return (
    <View style={styles.container}>
        <ExpensesSummary
          expenses={DUMMY_EXPENSES}
          periodName={expensesPeriod} />
        <ExpensesList 
          expenses={DUMMY_EXPENSES} 
        />
    </View>
  )
}

export default ExpensesOutput

const styles = StyleSheet.create({
  container : {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700
  }
})