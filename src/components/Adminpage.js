import React from 'react'
import { useState , useEffect} from 'react'
import { fetchData } from './utils'

const Adminpage = () => {
    const [details ,  SetDetails] =  useState(null)
    const [listData , setListData] =  useState(null)
  
useEffect(()=>{
    setListData(fetchData)
},[])


const  handleClick= (id)=>{
let filter = listData.filter((n)=> n.id === id)
SetDetails(filter)
}


const searchInput = (e)=>{
    e.preventDefault();
    const {value} = e.target
    if (value === ''){
        setListData(fetchData);
        return;
    } else {
        let filterList =  listData.filter((n)=>{
            return (
                n.firstName.toLowerCase().includes(value.toLowerCase()) ||
                n.lastName.toLowerCase().includes(value.toLowerCase())
              );
        })
        setListData(filterList)
    }

}
    
    return (
        <main>
            <div id="table-section">

                <form >
                    <input type="text" placeholder="Enter something" name="search-box" id="search-box"  onChange={(e)=>searchInput(e)}/>
                </form>

                <div id="table-wrapper">

                    <div id="table-headers">
                        <table>
                            <thead>
                                <tr>
                                    <th className="column1">Id</th>
                                    <th className="column2">FirstName</th>
                                    <th className="column3">LastName</th>
                                    <th className="column4">Email</th>
                                    <th className="column5">Phone</th>
                                </tr>
                            </thead>
                        </table>
                    </div>

                    <div id="table-data" >
                        <table>
                            <tbody id="table-body" className="table">
        { listData && listData.map((elm , index) => {
                                    // console.log(elm)
                                    return <tr className="data-row" key={index}
                                     onClick={(e)=>handleClick(elm.id)}
                                    style={{background : details && details[0].id === elm.id ? 'skyblue' : 'white'  }}
                                    
                                    >
                                        <td className="column1">{elm.id}</td>
                                        <td className="column2">{elm.firstName}</td>
                                        <td className="column3">{elm.lastName}</td>
                                        <td className="column4">{elm.email}</td>
                                        <td className="column5">{elm.phone}</td>
                                    </tr>
                                }) }  

                            </tbody>
                        </table>
                    </div>

                </div>

            </div>



            <div id="info-wrapper">
                <h1>Details</h1>
                <p>Click on a table item to get detailed information</p>
                <div id="info-content">
                    {details && details.map((elm , index) => {
                        // console.log(details[0].id)
                        return <div key={index} >
                            <div>
                                <b>User selected:</b>{elm.firstName} {elm.lastName}</div>
                            <div>
                                <b>Description: </b>
                                <textarea cols="50" rows="5" value = {elm.description} readOnly>
                                    {elm.description}
                                </textarea>
                            </div>
                            <div><b>Address:</b>{elm.address.streetAddres}</div>
                            <div><b>City:</b> {elm.address.city}</div>
                            <div><b>State:</b>{elm.address.state}</div>
                            <div><b>Zip:</b> {elm.address.zip}</div>
                        </div>

                    })}
                </div>
            </div>



        </main>



    )
}

export default Adminpage