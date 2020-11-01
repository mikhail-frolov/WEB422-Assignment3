import React, { useEffect, useState } from 'react';
import { ListGroup, ListGroupItem, Table } from 'react-bootstrap';


function Sale(props) {
  
    const [sale, setSale] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://serene-springs-84117.herokuapp.com/api/sales/${props.id}`)
            .then(res => res.json())
            .then(sale => {
             
                if (sale) {
             
                    if (sale._id) {
                        props.viewedSale(sale._id);
                    }
             
                    setSale(sale);

                    setLoading(false);
             
                } else {
              setLoading(false);
                }
            })
        }, [props.id]);

    function itemTotal(items){
        let total = 0;
        for(let i =0; i < items.length; i++){
            total += items[i].price * items[i].quantity;
        } 
        return total;
    }

    if (loading) {
        return null;
    } else {
        if (sale._id) {
            return (<div>
                    <h1>Sale: {sale._id}</h1>
                    <h2>Customer</h2>

                    <ListGroup>
                        <ListGroupItem><strong>email:</strong> {sale.customer.email} </ListGroupItem>
                        <ListGroupItem><strong>age:</strong> {sale.customer.age}</ListGroupItem>
                        <ListGroupItem><strong>satisfaction:</strong> {sale.customer.satisfaction} </ListGroupItem>
                    </ListGroup>

            <h2> Items: ${itemTotal(sale.items).toFixed(2)}</h2>
                   
                    <Table>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
            
                    {sale.items.map((item, id) =>
                            <tr key={id}>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>${item.price}</td>
                            </tr>
                           )}
            
                        </tbody>
                    </Table>
                </div>);
        } else {
            return <div><h1>Unable to find Sale</h1><p>id: {props.id}</p></div>;
        }
    }
}

export default Sale;