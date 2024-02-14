import React, { Component, useState, useEffect } from "react";
import { faPlus, faEdit, faTrash, faTools } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TableList, DashboardSide, WaitingList } from "../../components";
import { API_URL } from "../../utils/constants";
import axios from "axios";
import swal from "sweetalert";
import { Accordion, Tab, Tabs, Card, Table, Badge, Button, Row, Col, Form} from "react-bootstrap";
import * as generalHelper from "../../helpers/generalHelpers"

import withFixedColumns from "react-table-hoc-fixed-columns";
import ReactTable from "react-table";
import "react-table/react-table.css";
import 'react-table-hoc-fixed-columns/lib/styles.css' // important: this line must be placed after react-table css import


const ReactTableFixedColumns = withFixedColumns(ReactTable);

const locale = 'en';

export default class Setting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      categoriYangDipilih: "Makanan",
      keranjangs: [],
      tables:[], 
      tablesType:[],
      tablesGrouped:{},
      packages: [],
      currentDateTime: new Date(),
      time: new Date().toLocaleTimeString(locale, { hour: 'numeric', hour12: false, minute: 'numeric', second: 'numeric' }),
      timeDiff : '',
      selectedTable: {},
      waitingListData : [
        {time_in: '13.28', name: 'Ade', time: '20.00', play_mode: '2 Jam', table_no: 'Meja 1', contact_person: 'ig (@testtest)'},
        {time_in: '19.00', name: 'Ari', time: '21.00', play_mode: '3 Jam', table_no: 'Meja 35', contact_person: 'Lokasi'},
        {time_in: '18.00', name: 'Agus', time: '21.30', play_mode: '1 Jam', table_no: 'Meja 69', contact_person: 'WA (08681xxxxx)'},
        // {firstName: 'b', lastName: 'test', email: 'test@mail.com'}
      ],
      colourOptions: [
        { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
        { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
        { value: 'purple', label: 'Purple', color: '#5243AA' },
        { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
        { value: 'orange', label: 'Orange', color: '#FF8B00' },
        { value: 'yellow', label: 'Yellow', color: '#FFC400' },
        { value: 'green', label: 'Green', color: '#36B37E' },
        { value: 'forest', label: 'Forest', color: '#00875A' },
        { value: 'slate', label: 'Slate', color: '#253858' },
        { value: 'silver', label: 'Silver', color: '#666666' },
      ],
      columns : [
        {
          Header: 'Masuk',
          accessor: 'time_in',
          className: 'text-center border-bottom border-start',
        },
        {
          Header: 'Nama',
          accessor: 'name',
          className: 'text-center border-bottom border-start',
        },
        {
          Header: 'Booking',
          // fixed: 'left',
          columns: [
            {
              Header: 'Jam',
              accessor: 'time',
              className: 'text-center border-bottom border-start',
            },
            {
              Header: 'Main',
              accessor: 'play_mode',
              className: 'text-center border-bottom border-start',
            },
            {
              Header: 'Meja',
              accessor: 'table_no',
              className: 'text-center border-bottom border-start',
            },
          ]
        },
        {
          Header: 'Contac Person',
          accessor: 'contact_person',
          className: 'text-center border-bottom border-start border-end',
        },
      ]
    };
    this.onSelectTable = this.onSelectTable.bind(this);
  }

  componentDidMount () {

    setInterval(()=>{
      var today = new Date();
      const dataTime = today.toLocaleTimeString(locale, { hour: 'numeric', hour12: false, minute: 'numeric', second: 'numeric' });
      
      this.setState({ time : dataTime, currentDateTime: today });
    }, 1000 )

    axios
    .get(API_URL + "type" )
    .then((res) => {
      const tablesType = res.data;
      this.setState({ tablesType });  
    })
    .catch((error) => {
      console.log("Error yaa ", error);
    });
    
    axios
    .get(API_URL + "meja" )
    .then((res) => {
      const tables = res.data;
      this.setState({ tables });
    })
    .catch((error) => {
      console.log("Error yaa ", error);
    });
    
    axios
    .get(API_URL + "paket" )
    .then((res) => {
      const packages = res.data;
      this.setState({ packages });
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
    const { tablesType, colourOptions, tables, tablesGrouped, packages } = this.state;
    return (
        <div style={{maxHeight: "100%", overflow: "hidden", margin: "auto"}} className="mt-4">
          <Accordion defaultActiveKey={['3']} alwaysOpen>
            <Accordion.Item eventKey="1">
              <Accordion.Header><FontAwesomeIcon className="mx-2" icon={faTools} /> Akun</Accordion.Header>
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
            <Accordion.Item eventKey="2">
              <Accordion.Header><FontAwesomeIcon className="mx-2" icon={faTools} /> Paket</Accordion.Header>
              <Accordion.Body>
              <Card>
                      <Card.Header>
                        <div className="d-flex justify-content-between">
                          <div className="fw-bold">Data Paket</div>
                          <div>
                            <Button variant="success" className="btn btn-sm"><FontAwesomeIcon size="sm" icon={faPlus} /> Tambah</Button>
                          </div>
                        </div>
                      </Card.Header>
                      <Card.Body className="p-0">
                        <Table bordered striped responsive style={{ zIndex: 9999, overflow: "visible"}}  className="m-0">
                          <thead>
                            <tr className="text-center">
                              <th>No</th>
                              <th>Nama Paket</th>
                              <th>Harga</th>
                              <th>Menu</th>
                              <th>Batas Order</th>
                              <th>Meja</th>
                              <th>Waktu</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {packages.map((pack, index) => {
                              return (
                                <tr>
                                  <td className="text-center">{index+1}</td>
                                  <td className="text-center">{pack.packet_name}</td>
                                  <td className="text-end">{generalHelper.FormatIDR(pack.price)}</td>
                                  <td className="text-center"></td>
                                  <td className="text-center">{pack.order_time_limit}</td>
                                  <td className="text-center"></td>
                                  <td className="text-center">{pack.time_duration_h + ' Jam ' +(pack.time_duration_m > 0 ? pack.time_duration_m + ' Menit': '')}</td>
                                  <td className="text-center">
                                    <Button variant="primary" className="btn btn-sm mx-1"><FontAwesomeIcon size="sm" icon={faEdit} /> Ubah</Button>
                                    <Button variant="danger" className="btn btn-sm mx-1"><FontAwesomeIcon size="sm" icon={faTrash} /> Hapus</Button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </Table>
                      </Card.Body>
                    </Card>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header><FontAwesomeIcon className="mx-2" icon={faTools} /> Meja</Accordion.Header>
              <Accordion.Body>
                <Tabs
                  defaultActiveKey="general"
                  id="uncontrolled-tab-example"
                  className="mb-3"
                >
                  <Tab eventKey="jenis" title="Jenis Meja" >
                    <Card>
                      <Card.Header>
                        <div className="d-flex justify-content-between">
                          <div className="fw-bold">Data Jenis Meja</div>
                          <div>
                            <Button variant="success" className="btn btn-sm"><FontAwesomeIcon size="sm" icon={faPlus} /> Tambah</Button>
                          </div>
                        </div>
                      </Card.Header>
                      <Card.Body className="p-0">
                        <Table bordered striped responsive style={{ zIndex: 9999, overflow: "visible"}}  className="m-0">
                          <thead>
                            <tr className="text-center">
                              <th>No</th>
                              <th>Jenis Meja</th>
                              <th>Harga Reguler</th>
                              <th>Harga Personal</th>
                              <th>Waktu Minimum</th>
                              <th>Jumlah Meja</th>
                              <th>Nomor Meja</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {tablesType.map((type, index) => {
                              return (
                                <tr>
                                  <td className="text-center">{index+1}</td>
                                  <td className="text-center">{type.table_type}</td>
                                  <td className="text-end">{generalHelper.FormatIDR(type.price)}</td>
                                  <td className="text-end">{generalHelper.FormatIDR(type.personal_price)}</td>
                                  <td className="text-center">{type.personal_time_minimum} Menit</td>
                                  <td className="text-center">{tables.filter(function (item) {return item.type == type.table_type}).length}</td>
                                  <td style={{width: "30vw"}}>
                                    {tables.filter(function (item) {return item.type == type.table_type}).map((table) => {
                                      return(<Badge bg="secondary mx-1">Meja {table.nomor}</Badge>)
                                    })}
                                  </td>
                                  <td className="text-center">
                                    <Button variant="primary" className="btn btn-sm mx-1"><FontAwesomeIcon size="sm" icon={faEdit} /> Ubah</Button>
                                    <Button variant="danger" className="btn btn-sm mx-1"><FontAwesomeIcon size="sm" icon={faTrash} /> Hapus</Button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </Table>
                      </Card.Body>
                    </Card>
                  </Tab>
                  <Tab eventKey="data" title="Data Meja">
                    <Card>
                      <Card.Header>
                        <div className="d-flex justify-content-between">
                          <div className="fw-bold">Data Seluruh Meja</div>
                          <div>
                            <Button variant="success" className="btn btn-sm"><FontAwesomeIcon size="sm" icon={faPlus} /> Tambah</Button>
                          </div>
                        </div>
                      </Card.Header>
                      <Card.Body className="p-0">
                        <Table bordered striped responsive style={{ zIndex: 9999, overflow: "visible"}} className="m-0">
                          <thead>
                            <tr className="text-center">
                              <th style={{width: "7vw"}}>#</th>
                              <th>No Meja</th>
                              <th>Jenis Meja</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {tables.map((table, index) => {
                              return (
                                <tr>
                                  <td className="text-center">{index+1}</td>
                                  <td className="text-center">Meja {table.nomor}</td>
                                  <td className="text-center">{table.type}</td>
                                  <td className="text-center">
                                    <Button variant="primary" className="btn btn-sm mx-1"><FontAwesomeIcon size="sm" icon={faEdit} /> Ubah</Button>
                                    <Button variant="danger" className="btn btn-sm mx-1"><FontAwesomeIcon size="sm" icon={faTrash} /> Hapus</Button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </Table>
                      </Card.Body>
                    </Card>
                  </Tab>
                  <Tab eventKey="general" title="Pengaturan Umum">
                    <Card>
                      <Card.Header>
                        <div className="d-flex justify-content-between">
                          <div className="fw-bold">Pengaturan Umum</div>
                          <div>
                            {/* <Button variant="success" className="btn btn-sm"><FontAwesomeIcon size="sm" icon={faPlus} /> Tambah</Button> */}
                          </div>
                        </div>
                      </Card.Header>
                      <Card.Body className="">
                        <Form.Group as={Row} className="mb-0" controlId="formPlaintextEmail">
                          <Form.Label column sm="2">
                            Alarm
                          </Form.Label>
                          <Col sm="10"  >
                            <Row className="border rounded">
                              <Col>
                                <Form.Check key={5} type={'checkbox'} id={`default-checkbox-5`} label='5 Menit' />
                              </Col>
                              <Col>
                                <Form.Check key={10} type={'checkbox'} id={`default-checkbox-10`} label='10 Menit' />
                              </Col>
                              <Col>
                                <Form.Check key={15} type={'checkbox'} id={`default-checkbox-15`} label='15 Menit' />
                              </Col>
                              <Col>
                                <Form.Check key={20} type={'checkbox'} id={`default-checkbox-20`} label='20 Menit' />
                              </Col>
                            </Row>
                          </Col>
                        </Form.Group>
                      </Card.Body>
                    </Card>
                  </Tab>
                </Tabs>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header><FontAwesomeIcon className="mx-2" icon={faTools} /> Resto</Accordion.Header>
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
        </div>
    );
  }
}
