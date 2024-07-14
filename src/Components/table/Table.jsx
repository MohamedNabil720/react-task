
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CustomerContext } from '../../context/context';

export default function Table() {

    const [customers, setCustomers] = useState([]);
    const [transactions, setTransactions] = useState([]);

    const { selectedCustomerName, setSelectedCustomerName } = useContext(CustomerContext);

    const [searchName, setSearchName] = useState('');
    const [searchAmount, setSearchAmount] = useState('');

    useEffect(() => {
        async function getData() {
            try {

                const myData = await axios.get("https://mohamednabil720.github.io/task/db.json")
                const customersResponse = await myData.data.customers;
                const transactionsResponse = await myData.data.transactions

                setCustomers(customersResponse);
                setTransactions(transactionsResponse);
            } catch (error) {
                console.error(error);
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

    const handleCustomerClick = (customerName) => {
        setSelectedCustomerName(customerName);
    };

    const filteredData = mergedData.filter(data => {

        const nameMatch = data.customerName.toLowerCase().includes(searchName.toLowerCase());
        const amountMatch = data.amount.toString().includes(searchAmount);

        return nameMatch && amountMatch;
    });



    return (

        <div className='mt-5 container'>

            <div className='d-flex justify-content-between mb-3 '>

                <input
                    className='form-control w-25'
                    name='name'
                    type="text"
                    placeholder='Search with name'
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                />

                <input
                    className='form-control w-25'
                    name='amount'
                    type="text"
                    placeholder='Search with amount'
                    value={searchAmount}
                    onChange={(e) => setSearchAmount(e.target.value)}
                />
            </div>

            {filteredData.length > 0 ? (
                <table className="table table-bordered">
                    <thead className='text-center'>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Date</th>
                            <th scope="col">Amount</th>
                        </tr>
                    </thead>

                    <tbody className='text-center'>

                        {filteredData.map((data, index) => (
                            <tr key={index}>
                                <td>
                                    <button
                                        className={`btn ${selectedCustomerName === data.customerName ? 'text-danger' : ''}`}
                                        onClick={() => handleCustomerClick(data.customerName)}
                                    >
                                        {data.customerName}
                                    </button>
                                </td>
                                <td>{data.date}</td>
                                <td>{data.amount}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>

            ) : (
                <div className='text-center mt-4'>
                    <p>No results found.</p>
                </div>
            )}
        </div>
    );

}
