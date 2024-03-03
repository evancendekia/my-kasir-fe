import React, { Component, useState, useEffect } from "react";
import { Row, Col, Container, Accordion, Form, InputGroup } from "react-bootstrap";
import { TableList, DashboardSide, Filter } from "../../components";
import { API_URL } from "../../utils/constants";
import axios from "axios";
import swal from "sweetalert";
import * as generalHelper from "../../helpers/generalHelpers"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faCoffee,
  faCheese,
  faArrowRight
} from "@fortawesome/free-solid-svg-icons";


import withFixedColumns from "react-table-hoc-fixed-columns";
import ReactTable from "react-table";
import "react-table/react-table.css";
import 'react-table-hoc-fixed-columns/lib/styles.css' // important: this line must be placed after react-table css import


const ReactTableFixedColumns = withFixedColumns(ReactTable);

const locale = 'en';

export default class Report extends Component {
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
      selectedTable: {},
      BillingData : [
        {no: 1, faktur_no: 'B-1235913', start: '20.00', finish: '22.00', billing: 40000, resto: 15000, ppn: 1500, mode: 'paket',duration:'2 Jam',cashier:'rosidi',waiter:'fulan'},
        {no: 2, faktur_no: 'B-1235914', start: '20.00', finish: '22.00', billing: 40000, resto: 15000, ppn: 1500, mode: 'paket',duration:'2 Jam',cashier:'rosidi',waiter:'fulan'},
        {no: 3, faktur_no: 'B-1235915', start: '20.00', finish: '22.00', billing: 40000, resto: 15000, ppn: 1500, mode: 'paket',duration:'2 Jam',cashier:'rosidi',waiter:'fulan'}
        // {firstName: 'b', lastName: 'test', email: 'test@mail.com'}
      ],
      RestoData : [
        {no: 1, faktur_no: 'B-1235913', time: '20.00', order: 'Es Teh', quantity: 1, price: 6000, ppn: 600, sub_total_price: 6600},
        {no: 2, faktur_no: 'B-1235914', time: '20.10', order: 'Es Teh', quantity: 2, price: 6000, ppn: 1200, sub_total_price: 13200},
        {no: 3, faktur_no: 'B-1235915', time: '20.23', order: 'Le Mineral', quantity: 1, price: 5000, ppn: 500, sub_total_price: 5500}
        // {firstName: 'b', lastName: 'test', email: 'test@mail.com'}
      ],
      columnsBilling : [
        {
          Header: 'No',
          accessor: 'no',
          className: 'text-center border-bottom border-start',
        },
        {
          Header: 'No Faktur',
          accessor: 'faktur_no',
          className: 'text-center border-bottom border-start',
        },
        {
          Header: 'Mulai',
          accessor: 'start',
          className: 'text-center border-bottom border-start',
        },
        {
          Header: 'Selesai',
          accessor: 'finish',
          className: 'text-center border-bottom border-start',
          Footer: row => {
            return <div style={{textAlign: "right"}}><b>Total</b></div>;
          }
        },
        {
          Header: 'Billing',
          accessor: 'billing',
          className: 'text-center border-bottom border-start',
          Cell: row => {
            return (<div style={{textAlign: "right"}}>{generalHelper.FormatIDR(row.value )}</div>);
          },
          Footer: row => {
            const billing = row.data
              .map((d) => d['billing'])
              .reduce((a, b) => a + b, 0);
            const total = generalHelper.FormatIDR(billing);
            return <div style={{textAlign: "right"}}><b>{total}</b></div>;
          }
        },
        {
          Header: 'Resto',
          accessor: 'resto',
          className: 'text-center border-bottom border-start border-end',
          Cell: row => {
            return (<div style={{textAlign: "right"}}>{generalHelper.FormatIDR(row.value )}</div>);
          },
          Footer: row => {
            const resto = row.data
              .map((d) => d['resto'])
              .reduce((a, b) => a + b, 0);
            const total = generalHelper.FormatIDR(resto);
            return <div style={{textAlign: "right"}}><b>{total}</b></div>;
          }
        },
        {
          Header: 'PPN',
          accessor: 'ppn',
          className: 'text-center border-bottom border-start border-end',
          Cell: row => {
            return (<div style={{textAlign: "right"}}>{generalHelper.FormatIDR(row.value )}</div>);
          },
          Footer: row => {
            const ppn = row.data
              .map((d) => d['ppn'])
              .reduce((a, b) => a + b, 0);
            const total = generalHelper.FormatIDR(ppn);
            return <div style={{textAlign: "right"}}><b>{total}</b></div>;
          }
        },
        {
          Header: 'Mode',
          accessor: 'mode',
          className: 'text-center border-bottom border-start border-end',
        },
        {
          Header: 'Durasi',
          accessor: 'duration',
          className: 'text-center border-bottom border-start border-end',
        },
        {
          Header: 'Kasir',
          accessor: 'cashier',
          className: 'text-center border-bottom border-start border-end',
        },
        {
          Header: 'Waiter',
          accessor: 'waiter',
          className: 'text-center border-bottom border-start border-end',
        }
      ],
      columnsResto : [
        {
          Header: 'No',
          accessor: 'no',
          className: 'text-center border-bottom border-start',
        },
        {
          Header: 'No Faktur',
          accessor: 'faktur_no',
          className: 'text-center border-bottom border-start',
        },
        {
          Header: 'Waktu',
          accessor: 'time',
          className: 'text-center border-bottom border-start',
        },
        {
          Header: 'Nama Barang',
          accessor: 'order',
          className: 'text-center border-bottom border-start',
        },
        {
          Header: 'Jumlah',
          accessor: 'quantity',
          className: 'text-center border-bottom border-start',
        },
        {
          Header: 'Harga',
          accessor: 'price',
          className: 'text-center border-bottom border-start',
          Cell: row => {
            return (<div style={{textAlign: "right"}}>{generalHelper.FormatIDR(row.value )}</div>);
          }
        },
        {
          Header: 'PPN',
          accessor: 'ppn',
          className: 'text-center border-bottom border-start border-end',
          Cell: row => {
            return (<div style={{textAlign: "right"}}>{generalHelper.FormatIDR(row.value )}</div>);
          }
        },
        {
          Header: 'Sub Total',
          accessor: 'sub_total_price',
          className: 'text-center border-bottom border-start',
          Cell: row => {
            return (<div style={{textAlign: "right"}}>{generalHelper.FormatIDR(row.value )}</div>);
          }
        }
      ]
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
    const { BillingData, columnsBilling, RestoData, columnsResto } = this.state;
    return (
        <div style={{maxHeight: "100%", overflow: "hidden", margin: "auto"}}>
          <Row >
            <Col className="mt-3 " >
              <h4>
                <strong >Laporan</strong>
              </h4>
              <hr />
              <Row className="overflow-auto" style={{overflowY: "scroll", maxHeight: "80vh", margin: "auto"}}>
                <Accordion defaultActiveKey="1" alwaysOpen>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header><b>BILLING</b></Accordion.Header>
                    <Accordion.Body>
                      <ReactTableFixedColumns
                        data={BillingData}
                        columns={columnsBilling}
                        showPagination={false}
                        pageSize={10}
                        // data={TableData}
                        // columns={columnsTable}
                        // style={{
                        //     height: height ? height : "350px"
                        // }}
                        // pageSize={rowMinimum != undefined ? (TableData.length < rowMinimum ? rowMinimum : TableData.length) : TableData.length}
                        // showPagination={false}
                        // sortable={false}
                        // loading={loadingClaimsDetail}
                        className="-striped -highlight mt-0 mx-0 px-0 rounded"
                        // getTdProps={getTdProps}
                      />
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header><b>RESTO</b></Accordion.Header>
                    <Accordion.Body>
                      <ReactTableFixedColumns
                        data={RestoData}
                        columns={columnsResto}
                        showPagination={false}
                        pageSize={10}
                        // data={TableData}
                        // columns={columnsTable}
                        // style={{
                        //     height: height ? height : "350px"
                        // }}
                        // pageSize={rowMinimum != undefined ? (TableData.length < rowMinimum ? rowMinimum : TableData.length) : TableData.length}
                        // showPagination={false}
                        // sortable={false}
                        // loading={loadingClaimsDetail}
                        className="-striped -highlight mt-0 mx-0 px-0 rounded"
                        // getTdProps={getTdProps}
                      />
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="3">
                    <Accordion.Header><b>RINGKASAN</b></Accordion.Header>
                    <Accordion.Body>
                      <Form.Group as={Row} className="mb-0" controlId="formPlaintextEmail">
                        <Row>
                          <Form.Label column sm="2">
                            Total Billing
                          </Form.Label>
                          <Col sm="2"  >
                            <InputGroup className="mb-1">
                              <InputGroup.Text>Rp</InputGroup.Text>
                              <Form.Control defaultValue={generalHelper.FormatMoney(1200000)} />
                            </InputGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Form.Label column sm="2">
                            Total Resto
                          </Form.Label>
                          <Col sm="2"  >
                            <InputGroup className="mb-1">
                              <InputGroup.Text>Rp</InputGroup.Text>
                              <Form.Control defaultValue={generalHelper.FormatMoney(1500000)} />
                            </InputGroup>
                          </Col>
                        </Row>
                        <Row>
                          {/* <Form.Label column sm="1">
                          </Form.Label> */}
                          <Form.Label column sm="2">
                            <FontAwesomeIcon icon={faArrowRight} className="me-2" />
                            Makanan
                          </Form.Label>
                          <Col sm="2" className="ms-5">
                            <InputGroup className="mb-1">
                              <InputGroup.Text>Rp</InputGroup.Text>
                              <Form.Control defaultValue={generalHelper.FormatMoney(500000)} />
                            </InputGroup>
                          </Col>
                        </Row>
                        <Row>
                          {/* <Form.Label column sm="1">
                          </Form.Label> */}
                          <Form.Label column sm="2">
                            <FontAwesomeIcon icon={faArrowRight} className="me-2" />
                            Minuman
                          </Form.Label>
                          <Col sm="2" className="ms-5">
                            <InputGroup className="mb-1">
                              <InputGroup.Text>Rp</InputGroup.Text>
                              <Form.Control defaultValue={generalHelper.FormatMoney(350000)} />
                            </InputGroup>
                          </Col>
                        </Row>
                        <Row>
                          {/* <Form.Label column sm="1">
                          </Form.Label> */}
                          <Form.Label column sm="2">
                            <FontAwesomeIcon icon={faArrowRight} className="me-2" />
                            Rokok
                          </Form.Label>
                          <Col sm="2" className="ms-5">
                            <InputGroup className="mb-1">
                              <InputGroup.Text>Rp</InputGroup.Text>
                              <Form.Control defaultValue={generalHelper.FormatMoney(400000)} />
                            </InputGroup>
                          </Col>
                        </Row>
                        <Row>
                          {/* <Form.Label column sm="1">
                          </Form.Label> */}
                          <Form.Label column sm="2">
                            <FontAwesomeIcon icon={faArrowRight} className="me-2" />
                            Lain-lain
                          </Form.Label>
                          <Col sm="2" className="ms-5">
                            <InputGroup className="mb-1">
                              <InputGroup.Text>Rp</InputGroup.Text>
                              <Form.Control defaultValue={generalHelper.FormatMoney(150000)} />
                            </InputGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Form.Label column sm="2">
                            Total PPN
                          </Form.Label>
                          <Col sm="2"  >
                            <InputGroup className="mb-1">
                              <InputGroup.Text>Rp</InputGroup.Text>
                              <Form.Control defaultValue={generalHelper.FormatMoney(130000)} />
                            </InputGroup>
                          </Col>
                        </Row>
                        </Form.Group>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="4">
                    <Accordion.Header><b>FAKTUR</b></Accordion.Header>
                    <Accordion.Body>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                      minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                      aliquip ex ea commodo consequat. Duis aute irure dolor in
                      reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                      pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                      culpa qui officia deserunt mollit anim id est laborum.
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Row>
            </Col>
            <Filter 

            />
          </Row>
        </div>
    );
  }
}
