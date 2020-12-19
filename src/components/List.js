import React from 'react'

export default function List({sortedFin, handleDelete}) {
    return (
        <div className="list">
          <table>
            <thead>
              <tr>
                <td>Detail</td>
                <td>Income / Expense</td>
                <td>Date</td>
              </tr> 
            </thead>
            <tbody>
              {
                sortedFin.map((res,i) => {
                  return (
                    <tr key={Math.random()}>
                      <td>{res.detail}</td>
                      <td>{res.amount<0 ? (<span className="red">${Math.abs(res.amount)}</span>) : (<span>${Math.abs(res.amount)}</span>)}</td>
                      <td>{res.date}</td>
                      <td><span onClick={() => handleDelete(i)}>X</span></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
    )
}
