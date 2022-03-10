import React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import ReactDOM from "react-dom"
import CurrencyInput from "react-currency-input-field"
import "./index.css"
import "app.css"
import moment from "moment"

const bob = require("../build/public/products.json")

const App = () => {
    const [usingdata, setusingdata] = useState("Automobile Loan")
    const [currentrules, setcurrentrules] = useState(bob)
    const [name, setname] = useState("bob")
    const [month, setmonth] = useState(12)
    const [money, setmoney] = useState(25000)
    const [total, settotal] = useState(0)
    const [monthlypay, setmonthlypay] = useState(0)
    const [date, setdate] = useState("")
    const choice = (change) => {
        setusingdata(change)
    }
    const handleChangemonth = (event) => {
        setmonth(event.target.value)
    }
    const handleChangemoney = (event) => {
        setmoney(event.target.value)
    }
    console.log("this is the dummy data ====>", bob)
    useEffect(() => {
        console.log(usingdata)
        const one = bob.filter((rule) => rule.name === usingdata)
        if (one[0].name !== currentrules[0].name) {
            setcurrentrules(one)
        }
        console.log(">>>>", currentrules)
        setdate(Number(month) + Number(new Date().getMonth()))
        console.log(date)
        setname(currentrules[0].name)
        setmonthlypay(total / month)
        settotal(Number(money) + Number(Number(money) * Number(currentrules[0].interest)) / 100)
        console.log(name)
        // console.log(Number(currentrules.interest))
    })

    // const [Products, setProducts] = useState(bob)
    // // const bob = {
    // //     method: "GET",
    // //     headers: { "Content-Type": "application/json" },
    // //     mode: "cors",
    // //     cache: "default",
    // // }
    // // const myrequest = new Request("../build/products.json", bob)
    // const data = () => {
    //     console.log("bob")
    //     console.log(bob)
    //     // axios
    //     //     .get(myrequest)
    //     //     .then((response) => {
    //     //         return response.json()
    //     //     })
    //     //     .then((data) => {
    //     //         console.log(data.id)
    //     //     })
    //     //     .catch((error) => {
    //     //         console.log(error)
    //     //     })

    /////// here i didn't find the way that you want for date in moment.js so ill od my own function

    const converttime = (month) => {
        const months = {
            Jan: "1",
            Feb: "2",
            Mar: "3",
            Apr: "4",
            May: "5",
            Jun: "6",
            Jul: "7",
            Aug: "8",
            Sep: "9",
            Oct: "10",
            Nov: "11",
            Dec: "12",
        }
        var monthsleft = month
        var years = 0
        if (month >= 12) {
            monthsleft -= 12
            years++
        }
        for (const key in months) {
            if (months[key] == monthsleft) {
                return key + " " + (new Date().getFullYear() + 1)
            }
        }
    }

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div id="bigbox">
                <div className="types">
                    <img
                        onClick={() => choice("Automobile Loan")}
                        className="image1"
                        src="travel.png"
                        alt="Automobile Loan"
                    />
                    <img
                        onClick={() => choice("Housing Loan")}
                        className="image2"
                        src="house.png"
                        alt="Housing Loan"
                    />
                    <img
                        onClick={() => choice("Cash Loan")}
                        className="image3"
                        src="dollar.png"
                        alt="Cash Loan"
                    />
                </div>
                <div className="inputs">
                    <div id="amount">
                        <label htmlFor="Loan amount">Loan amount</label>
                        <div className="dd">
                            <CurrencyInput
                                allowDecimals
                                decimalsLimit="2"
                                disableAbbreviations
                                defaultValue={Number(currentrules[0].max_amount)}
                                className="amountinput"
                                min={Number(currentrules[0].min_amount)}
                                max={Number(currentrules[0].max_amount)}
                                onChange={handleChangemoney}></CurrencyInput>
                            <input id="dollarsign"></input>
                        </div>
                    </div>
                    <div id="months">
                        <label id="fix" htmlFor="Number of Months">
                            Number of Months
                        </label>
                        <div className="dd">
                            <button onClick={() => setmonth(month - 1)} id="leftarrow"></button>
                            <button onClick={() => setmonth(month + 1)} id="rightarrow"></button>
                            <input
                                onChange={handleChangemonth}
                                type="number"
                                placeholder="12"
                                value={month}
                                id="monthsinput"></input>
                        </div>
                    </div>
                </div>
                <div id="monthlypay">
                    <div id="split">
                        <h2>Monthly amount</h2>
                        <h1>{Math.round(monthlypay)}</h1>
                    </div>
                    <div id="desc">
                        <p>
                            You’re planning {month} monthly deposits to reach your ${money} goal by{" "}
                            {converttime(month)}. The total amount loaned will be ${total}.
                        </p>
                    </div>
                    <button type="submit" id="applay">
                        Apply Now
                    </button>
                </div>
            </div>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById("root"))
