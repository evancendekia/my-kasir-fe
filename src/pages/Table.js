import React, { Component, useState, useEffect } from "react";
import { Row, Col, Container } from "reactstrap";
import { ListCategories, TableList, DetailMeja } from "../components";
import { API_URL } from "../utils/constants";
import axios from "axios";
import swal from "sweetalert";

const locale = 'en';

export default class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      categoriYangDipilih: "Makanan",
      keranjangs: [],
      tables:[], 
      time: new Date().toLocaleTimeString(locale, { hour: 'numeric', hour12: false, minute: 'numeric', second: 'numeric' })
    };
  }

  componentDidMount() {

    setInterval(()=>{
      var today = new Date();
      const dataTime = today.toLocaleTimeString(locale, { hour: 'numeric', hour12: false, minute: 'numeric', second: 'numeric' });
      
      this.setState({ time : dataTime });
      // console.log('time',this.state.time)
    }, 1000 )


    const tables = [
      {
        "id": 1,
        "nomor": 1,
        "type": "VIP",
        "status": "A" 
      },{
        "id": 2,
        "nomor": 2,
        "type": "VIP",
        "status": "A" 
      },{
        "id": 3,
        "nomor": 3,
        "type": "VIP",
        "status": "O" 
      },{
        "id": 4,
        "nomor": 4,
        "type": "Reguler",
        "status": "A" 
      },{
        "id": 5,
        "nomor": 5,
        "type": "Reguler",
        "status": "O" 
      },{
        "id": 6,
        "nomor": 6,
        "type": "Reguler",
        "status": "A" 
      },{
        "id": 7,
        "nomor": 7,
        "type": "Reguler",
        "status": "A" 
      },{
        "id": 8,
        "nomor": 8,
        "type": "Reguler",
        "status": "O" 
      },{
        "id": 9,
        "nomor": 9,
        "type": "Reguler",
        "status": "B" 
      },{
        "id": 10,
        "nomor": 10,
        "type": "Reguler",
        "status": "O" 
      },{
        "id": 11,
        "nomor": 11,
        "type": "Reguler",
        "status": "O" 
      },{
        "id": 12,
        "nomor": 12,
        "type": "Reguler",
        "status": "F" 
      },{
        "id": 13,
        "nomor": 13,
        "type": "Reguler",
        "status": "A" 
      },{
        "id": 14,
        "nomor": 14,
        "type": "Reguler",
        "status": "A" 
      },{
        "id": 15,
        "nomor": 15,
        "type": "Reguler",
        "status": "O" 
      },{
        "id": 16,
        "nomor": 16,
        "type": "Reguler",
        "status": "A" 
      },{
        "id": 17,
        "nomor": 17,
        "type": "Reguler",
        "status": "O" 
      },{
        "id": 18,
        "nomor": 18,
        "type": "Reguler",
        "status": "A" 
      },{
        "id": 19,
        "nomor": 19,
        "type": "Reguler",
        "status": "A" 
      },{
        "id": 20,
        "nomor": 20,
        "type": "Reguler",
        "status": "O" 
      },{
        "id": 21,
        "nomor": 21,
        "type": "Reguler",
        "status": "B" 
      },{
        "id": 22,
        "nomor": 22,
        "type": "Reguler",
        "status": "O" 
      },{
        "id": 23,
        "nomor": 24,
        "type": "Reguler",
        "status": "O" 
      },{
        "id": 25,
        "nomor": 26,
        "type": "Reguler",
        "status": "F" 
      }
    ];
    this.setState({ tables });
    // axios
    // .get(API_URL + "meja" )
    // .then((res) => {
    //   const tables = res.data;
    //   this.setState({ tables });
    // })
    // .catch((error) => {
    //   console.log("Error yaa ", error);
    // });

  }
  getTimeNow(){
    
    
    // return function cleanup() {
    //     clearInterval(timer)
    // }
  }
  componentDidUpdate(prevState) {
      
  }
  componentWillUnmount() {
    clearInterval(this.inter);
  }

  render() {
    const { menus, categoriYangDipilih, keranjangs, tables, time } = this.state;
    return (
        <div className="mt-3" style={{maxHeight: "100%", overflow: "hidden"}}>
          {/* <Container fluid> */}
            <Row>
              <Col className="mt-3" >
                <h4>
                  <strong>Daftar Meja</strong>
                </h4>
                <hr />
                <Row className="overflow-auto" style={{overflowY: "scroll", maxHeight: "80vh"}}>
                  {tables &&
                    tables.map((table, index) => (
                      <TableList
                        key={index}
                        table={table}
                        time={time}
                      />
                    ))}
                </Row>
              </Col>
              <DetailMeja {...this.props}/>
            </Row>
          {/* </Container> */}
        </div>
    );
  }
}
