import React, { useEffect, useState, useContext } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as Chartjs,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import axios from 'axios';
import { CustomerContext } from '../../context/context';

Chartjs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);

export default function Graph() {

    const [customers, setCustomers] = useState([]);
    const [transactions, setTransactions] = useState([]);

    const { selectedCustomerName } = useContext(CustomerContext);

    useEffect(() => {
        async function getData() {
            try {
                const myData = await axios.get("https://mohamednabil720.github.io/task/db.json")
                const customersResponse = await myData.data.customers;
                const transactionsResponse = await myData.data.transactions

                setCustomers(customersResponse);
                setTransactions(transactionsResponse);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        }

        getData();
    }, []);

    const mergedData = transactions.map(transaction => {
        const customer = customers.find(c => c.id == transaction.customer_id);

        return {
            ...transaction,
            customerName: customer ? customer.name : 'Unknown'
        };
    });

    const selectedCustomerTransactions = mergedData.filter(data => data.customerName === selectedCustomerName);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
    }
    console.log(selectedCustomerTransactions);

    const totalAmount = selectedCustomerTransactions.reduce((acc, obj) => acc + obj.amount, 0)


    return (
        <div>

            <div className=" text-center">
                <h4>  {totalAmount ? `Total Amount for ${selectedCustomerName}: ${totalAmount}` : 'No name selected'} </h4>
            </div>

            <div className='card container my-5 w-50'>
                <Line
                    options={options}
                    data={{
                        labels: selectedCustomerTransactions.map((data) => data.date),
                        datasets: [
                            {
                                label: 'Transactions',
                                data: selectedCustomerTransactions.map((data) => data.amount),
                                backgroundColor: "#064FF0",
                                borderColor: "#064FF0",
                            }
                        ]
                    }}
                />
            </div>
        </div >
    );
}
