import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
function Products() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.log("Error",err);
      });

    console.log("rendered")
  }, []);

  console.log(data);

 
  return (
   
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4,auto)",
        gap: "16px",
        margin:"auto",
        width:"auto",
        marginLeft:"50px",
        marginRight:"50px",
        marginTop:"50px"
      }}
    >
      
      {data.map((item, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ccc",
            padding: "16px",
            textAlign: "center",
            display:"flex",
            justifyContent:"center",
            flexDirection:"column",
            alignItems:"center",
            gap:"10px",
            borderRadius:"20px",
            backgroundColor:"#fadceb"

          }}
        >
          <img src={item.image} style={{width:"50%"}}/>
          <br/>
          {item.title}
          <br/>
          <br/>
         <h3> RS-{item.price} /-</h3>
        </div>
      
      ))}
      
    </div>
  
  );
 
}
export default Products;
