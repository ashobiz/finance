import React, {useRef} from 'react'

export default function Form({handleSubmit, detail, handleType, amount, date, error}) {
    return (
        <div className="form">
          <form onSubmit={handleSubmit}>
            <input 
              name="detail"
              type="text"
              placeholder="Detail..."
              ref={detail}
            /> 
            <br />
            <input type="radio" id="income" name="type" value="i" onClick={handleType}/>
            <label for="income">Income</label>
            <input type="radio" id="expense" name="type" value="e" onClick={handleType}/>
            <label for="expense">Expense</label>
            <br />
            <input 
              name="amount" 
              type="text"
              placeholder="Amount..."
              ref={amount}
            />
            <br />
            <input 
              name="date"
              type="date"
              ref={date}
            />
            <br />
            <input 
              type="submit"
            />
            <br />
            {error.length > 0 ? (<div className="error">{error}</div>) : ''}
          </form>
        </div> 
    )
}
