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
const TableList = (props) => {
  let {table, time} = props;
  return (
    
    <Col lg={2} md={3} sm={4} xs={6} className="p-3  text-center" style={{overflow: "hidden"}} >
      <Card className="text-center">
      <Card.Header>{table.status == 'O' ? `${time}` : `00:00:00`}</Card.Header>
      <Card.Body className="p-0">
        <button
          onClick={(e)=>{
            e.preventDefault();
            props.onSelectButton(table)
          }}
          className={`btn btn-squared-default-plain ${getcolor(table.status)} btn-success text-center`} 
          style={squareMd} 
        >
          <h1>{table.nomor}</h1>
        </button>
      </Card.Body>
      <Card.Footer className="text-muted">Tipe Meja : {table.type}</Card.Footer>
    </Card>
    </Col>
  );
};

export default TableList;
