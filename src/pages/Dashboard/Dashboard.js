import React, { Component, useState, useEffect } from "react";
import { Row, Col, Container } from "reactstrap";
import { TableList, DashboardSide, WaitingList } from "../../components";
import { API_URL } from "../../utils/constants";
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
      currentDateTime: new Date(),
      time: new Date().toLocaleTimeString(locale, { hour: 'numeric', hour12: false, minute: 'numeric', second: 'numeric' }),
      timeDiff : '',
      selectedTable: {}
    };
    this.onSelectTable = this.onSelectTable.bind(this);
  }

  componentDidMount() {

    setInterval(()=>{
      var today = new Date();
      const dataTime = today.toLocaleTimeString(locale, { hour: 'numeric', hour12: false, minute: 'numeric', second: 'numeric' });
      
      this.setState({ time : dataTime, currentDateTime: today });
    }, 1000 )

    axios
    .get(API_URL + "meja" )
    .then((res) => {
      const tables = res.data;
      this.setState({ tables });
    })
    .catch((error) => {
      console.log("Error yaa ", error);
    });


  }
  componentWillUnmount() {
    clearInterval(this.inter);
  }

  onSelectTable(table){
    this.setState({ selectedTable: table });
  }

  randomDate() {
    var date = new Date();
    // var hour = 10 + Math.random() * (24 - 10) | 0;
    var newDate = date.setHours(22);
    console.log('newDate', newDate)
    var timeDiff = newDate.getTime() - date.getTime();
    console.log('timeDiff',timeDiff)
    // return date;
  }

  render() {
    const { menus, categoriYangDipilih, keranjangs, tables, time, timeDiff, selectedTable } = this.state;
    return (
        <div style={{maxHeight: "100%", overflow: "hidden"}}>
          {/* <Container fluid> */}
            <Row>
              <Col className="mt-3" >
                <h4>
                  <strong >Waiting List</strong>
                </h4>
                <hr />
                {/* <Row className="overflow-auto" style={{overflowY: "scroll", maxHeight: "80vh"}}>
                  {tables &&
                    tables.map((table, index) => (
                      <TableList
                        key={index}
                        table={table}
                        time={time}
                        onSelectButton={this.onSelectTable}
                      />
                    ))}
                </Row> */}
              </Col>
              <DashboardSide 
                // time={time}
                timeDiff={timeDiff}
                selectedTable={selectedTable}
              />
            </Row>
          {/* </Container> */}
        </div>
    );
  }
}
