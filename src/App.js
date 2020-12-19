import React, {useState, useEffect, useRef} from 'react';
import List from './components/List'
import Form from './components/Form'

function App() {

  const [total, setTotal] = useState(0)
  const [income, setIncome] = useState(0)
  const [expense, setExpense] = useState(0)
  const [error, setError] = useState('')
  const [finance, setFinance] = useState([
      { 
        detail : "Rent", 
        type : "i",
        amount : 7500,
        date : "2020-12-12"
      },
      { 
        detail : "Movies", 
        type : "e",
        amount : -500,
        date : "2020-12-05"
      },
      { 
        detail : "Restaurent", 
        type : "e",
        amount : 1500,
        date : "2020-12-1"
      },
    ]);
  const [sortedFin, setSortedFin] = useState([]);
  const [type, setType] = useState('')

  const detail = useRef('');
  const amount = useRef('');
  const date = useRef('');

  // Sorting the list according to date
  useEffect(() => {
    let sorted = [...finance]
    sorted.sort((a,b) => {
      let first = a.date.split("-")
      let second = b.date.split("-")
      return first[2]-second[2];
    });
    setSortedFin(sorted)
  }, [finance])

  // Find total, income and expense

  useEffect(() => {
    let calc = [...finance]
    let income=0, expense=0, total=0;
    for(let i = 0; i<calc.length; i++){
      if(calc[i].amount>=0){
        income = income + calc[i].amount
      }else{
        expense = expense + calc[i].amount
      }
    }
    total = income+expense;
    setIncome(income);
    setExpense(expense);
    setTotal(total);

  }, [finance])

  // Form submit

  const handleSubmit = (e) => {
    e.preventDefault();

    // All fields are mandatory

    if(detail.current.value.length<=0 || type.length<=0 || amount.current.value.length<=0 || date.current.value.length<=0){
      setError("All fields are mandatory.")
      return;
    }else if(isNaN(amount.current.value)){
      setError("Amount should be in number.")
      console.log("hello")
      return;
    }else{
      // Convert string into integer
      let propAmt = parseInt(Math.abs(amount.current.value));
  
      if(type === "e"){
        propAmt = -propAmt;
      }
      setFinance([...finance, {
        detail: detail.current.value,    
        type: type,  
        amount: propAmt,      
        date: date.current.value
      }])
      detail.current.value = ''
      amount.current.value = ''
      date.current.value = ''
      setError('')
    }
    

  }

  // Input type (Income or Expense)

  const handleType = (e) => {
    setType(e.target.value);
  }

  // Delete item

  const handleDelete = (i) => {
    let arr = [...finance]
    setFinance(arr.filter((item, index) => item != arr[i]))
  }

  return (
    <div className="app">
      <div className="container">        
        <h1>Income Expense Calculator</h1>
        
        <Form handleSubmit={handleSubmit} detail={detail} handleType={handleType} amount={amount} date={date} error={error}/>
        

        <div className="total">
          <h3>
            <span>Total Balance <b>${total}</b></span> 
            <span>Income <b>${income}</b></span>
            <span>Expense <b>${Math.abs(expense)}</b></span>
          </h3>
        </div>

        <List sortedFin={sortedFin} handleDelete={handleDelete}/>
      </div>
    </div>
  );
}

export default App;
