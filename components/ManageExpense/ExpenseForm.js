import { StyleSheet, Text, View } from "react-native"
import Input from "./Input"
import { useState } from "react"
import Button from "../UI/Button"

function ExpenseForm({ submitButtonLabel, onCancel, onSubmit }) {

    const [inputValues, setInputValues] = useState({
        amount: '',
        date: '',
        description: ''
    })

    function inputChangedHandler(inputIdentifier, enteredValue) {
        setInputValues((currentInputValues) => {
            return {
                ...currentInputValues,
                [inputIdentifier]: enteredValue
            }
        })
    }

    function submitHandler() {
        const expenseData = {
            amount: +inputValues.amount, // The + automatically converts the data to Number.
            date: new Date(inputValues.date), 
            description: inputValues.description
        }

        onSubmit(expenseData)
    }

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your expense</Text>
            <View style={styles.inputsRow}>
                <Input 
                    style={styles.rowInput}
                    label="Amount" 
                    textInputConfig={{
                        keyboardType: 'decimal-pad',
                        onChangeText: inputChangedHandler.bind(this, 'amount'),
                        value: inputValues.amount
                    }}
                />
                <Input 
                    style={styles.rowInput}
                    label="Date" 
                    textInputConfig={{
                        placeholder: 'YYYY-MM-DD',
                        maxLength: 10,
                        onChangeText: inputChangedHandler.bind(this, 'date'),
                        value: inputValues.date
                    }}                
                />
            </View>
            
            <Input label="Description" 
                textInputConfig={{
                    multiline: true, // values: true|false, default is false
                    // autoCorrect: false // values: true|false, default is true
                    // autoCapitalize: none // values: charaters|words|sentences|none, default is sentences.
                    onChangeText: inputChangedHandler.bind(this, 'description'),
                    value: inputValues.description
                }}
            />

            <View style={styles.buttons}>
                <Button style={styles.button} mode="flat" onPress={onCancel}>
                    Cancel
                </Button>

                <Button style={styles.button} onPress={submitHandler}>
                    {submitButtonLabel}
                </Button>
            </View>

        </View>
    ) 
}

export default ExpenseForm

const styles = StyleSheet.create({
    form: {
        marginTop: 40
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 24,
        textAlign: 'center'
    },
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowInput: {
        flex: 1
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    }
})