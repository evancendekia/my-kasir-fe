import React, { Component, useState, useEffect } from "react";
import { Row, Col, Container, Card, Accordion } from "react-bootstrap";
import { TableList, DashboardSide, WaitingList, LineChart, StackedChart } from "../../components";
import { API_URL } from "../../utils/constants";
import axios from "axios";
import swal from "sweetalert";


import withFixedColumns from "react-table-hoc-fixed-columns";
import ReactTable from "react-table";
import "react-table/react-table.css";
import 'react-table-hoc-fixed-columns/lib/styles.css' // important: this line must be placed after react-table css import


const ReactTableFixedColumns = withFixedColumns(ReactTable);

const locale = 'en';

export default class Chart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidMount() {



  }

  render() {
    const { selectedTable } = this.state;
    return (
        <div style={{maxHeight: "100%", overflow: "hidden", margin: "auto"}}>
          {/* <Container fluid> */}
            <Row >
              <Col className="mt-3 " xs={12} >
              <Accordion defaultActiveKey={["0","1"]}>
                <Accordion.Item eventKey="0">
                  <Accordion.Header ><b>BILLING</b></Accordion.Header>
                  <Accordion.Body >
                    <LineChart />
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header><b>RESTO</b></Accordion.Header>
                  <Accordion.Body>
                    <StackedChart />
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              </Col>
            </Row>
          {/* </Container> */}
        </div>
    );
  }
}
