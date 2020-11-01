import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Table, Pagination } from 'react-bootstrap';


function Sales(props) {
    const [sales, setSales] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    function getData(page) {
        return new Promise(function (resolve, reject) {
            fetch(`https://serene-springs-84117.herokuapp.com/api/sales?page=${page}&perPage=10`)
                .then(res => res.json())
                .then(sales => {
                    if (sales) {
                        resolve(sales);
                    }
                })
        });
    }

    useEffect(() => {
        getData(currentPage).then(result => {
            if (result) {
                setSales(result);
            }
        });
    }, []);
    
    function previousPage() {
        if (currentPage > 1) {
            getData(currentPage - 1)
            .then(sales => {
                if (sales) {
                    setSales(sales);
                    setCurrentPage(currentPage - 1);
                }
            });
        }
    }

    function nextPage() {
        getData(currentPage + 1)
        .then(sales => {
            if (sales) {
                setSales(sales);
                setCurrentPage(currentPage + 1);
            }
        });
    }
   

    if (sales.length > 0) {
        return (
            <div>
                    <Table hover>
                        <thead>
                            <tr>
                                <th>Customer</th>
                                <th>Store Location</th>
                                <th>Number of Items</th>
                                <th>Sale Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sales.map((sales) => (
                                <tr key={sales._id} onClick={() => {props.history.push(`/Sale/${sales._id}`)}}>
                                    <td>{sales.customer.email}</td>
                                    <td>{sales.storeLocation}</td>
                                    <td>{sales.items.length}</td>
                                    <td>{new Date(sales.saleDate).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Pagination>
                        <Pagination.Prev onClick={previousPage} />
                        <Pagination.Item>{currentPage}</Pagination.Item>
                        <Pagination.Next onClick={nextPage} />
                    </Pagination>
                </div>
            );
        } 
        else
        {
            return null; 
        }
}
export default withRouter(Sales);