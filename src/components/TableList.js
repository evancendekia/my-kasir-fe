import React, { useState, useEffect } from "react";
import { Col, Card } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const squareMd = {
  maxHeight: "100% !important",
  height: "100px !important",
  textAlign: "center",
  padding: "0px",
  fontSize: "12px",
  textAlign: "center",
  padding: "auto",
  paddingTop: "5vh",
  paddingBottom: "5vh"
}
const getcolor = (status)=>{
  switch(status){
    case "A" :  return 'btn-success';
                break;
    case "O" :  return 'btn-danger';
                break;
    case "B" :  return 'btn-warning';
                break;
    case "F" :  return 'btn-info';
                break;
  }
}
const TableList = ({table, time}) => {
  

  // useEffect(() => {
  //     const timer = setInterval(() => { // Creates an interval which will update the current data every minute
  //     // This will trigger a rerender every component that uses the useDate hook.
  //     var today = new Date();
  //     const dataTime = today.toLocaleTimeString(locale, { hour: 'numeric', hour12: false, minute: 'numeric', second: 'numeric' });
  //     console.log('dataTime',dataTime)
  //     setTime(dataTime);
  //   }, 60 * 1000);
  //   return () => {
  //     clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
  //   }
  // }, []);
  // const day = today.toLocaleDateString(locale, { weekday: 'long' });
  // const date = `${day}, ${today.getDate()} ${today.toLocaleDateString(locale, { month: 'long' })}\n\n`;

  // const hour = today.getHours();
  // const wish = `Good ${(hour < 12 && 'Morning') || (hour < 17 && 'Afternoon') || 'Evening'}, `;

  

  // const d = new Date();
  // let minutes = d.getMinutes();
  // let hours = d.getHours();
  // let seconds = d.getSeconds();
  return (
    
    <Col lg={2} md={3} sm={4} xs={6} className="p-3  text-center" style={{overflow: "hidden"}} >
      <Card className="text-center">
      <Card.Header>{table.status == 'O' ? `${time}` : `00:00:00`}</Card.Header>
      <Card.Body className="p-0">
        <button href="#" className={`btn btn-squared-default-plain ${getcolor(table.status)} btn-success text-center`} style={squareMd} >
          <h1>{table.nomor}</h1>
        </button>
      </Card.Body>
      <Card.Footer className="text-muted">Tipe Meja : {table.type}</Card.Footer>
    </Card>
    </Col>
  );
};

export default TableList;
