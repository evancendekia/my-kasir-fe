import React, { Component, useState, useEffect } from "react";
import { faPlus, faEdit, faTrash, faTools, faBan, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TableList, DashboardSide, WaitingList } from "../../components";
import { API_URL } from "../../utils/constants";
import axios from "axios";
import swal from "sweetalert";
import { Accordion, Tab, Tabs, Card, Table, Badge, Button, Row, Col, Form, Nav, InputGroup} from "react-bootstrap";
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
      accountTypes:[],
      accounts:[],
      packages: [],
      menuTypes: [],
      menus: [],
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
    .get(API_URL + "types" )
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
      this.setState({ tables: tables });
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

    axios
    .get(API_URL + "accountTypes" )
    .then((res) => {
      const accountTypes = res.data;
      this.setState({ accountTypes });
    })
    .catch((error) => {
      console.log("Error yaa ", error);
    });

    axios
    .get(API_URL + "accounts" )
    .then((res) => {
      const accounts = res.data;
      this.setState({ accounts });
    })
    .catch((error) => {
      console.log("Error yaa ", error);
    });

    axios
    .get(API_URL + "menuTypes" )
    .then((res) => {
      const menuTypes = res.data;
      this.setState({ menuTypes });
    })
    .catch((error) => {
      console.log("Error yaa ", error);
    });

    axios
    .get(API_URL + "menus?_expand=menuType" )
    .then((res) => {
      const menus = res.data;
      this.setState({ menus });
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


  render() {
    const { tablesType, tables, packages, accountTypes, accounts, menuTypes, menus } = this.state;
    return (
        <div style={{maxHeight: "100%", overflow: "hidden", margin: "auto"}} className="mt-4">
          <Accordion defaultActiveKey={['4']} alwaysOpen>
            <Accordion.Item eventKey="1">
              <Accordion.Header><FontAwesomeIcon className="mx-2" icon={faTools} /><b>AKUN</b></Accordion.Header>
              <Accordion.Body>
                <Tabs
                  defaultActiveKey="data"
                  id="uncontrolled-tab-example"
                  className="mb-3"
                >
                  <Tab eventKey="data" title="Data Akun" >
                    <Card>
                      <Card.Header>
                        <div className="d-flex justify-content-between">
                          <div className="fw-bold">Data Akun</div>
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
                              <th>Nama</th>
                              <th>Email</th>
                              <th>Jenis Akun</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {accounts.map((acc, index) => {
                              return (
                                <tr>
                                  <td className="text-center">{index+1}</td>
                                  <td className="text-center">{acc.name}</td>
                                  <td className="text-center">{acc.email}</td>
                                  <td className="text-center">{accountTypes.filter(function (item) {return item.id == acc.accountTypeId})[0].name}</td>
                                  <td className="text-center">{acc.status}</td>
                                  <td className="text-center"> { acc.status == 'Aktif' ? <Button variant="danger" className="btn btn-sm mx-1"><FontAwesomeIcon size="sm" icon={faBan} /> Nonaktifkan</Button> : <Button variant="success" className="btn btn-sm mx-1"><FontAwesomeIcon size="sm" icon={faCheckCircle} /> Aktifkan</Button>}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </Table>
                      </Card.Body>
                    </Card>
                  </Tab>
                  <Tab eventKey="jenis" title="Jenis Akun">
                    <Card>
                      <Card.Header>
                        <div className="d-flex justify-content-between">
                          <div className="fw-bold">Data Jenis Akun</div>
                          {/* <div>
                            <Button variant="success" className="btn btn-sm"><FontAwesomeIcon size="sm" icon={faPlus} /> Tambah</Button>
                          </div> */}
                        </div>
                      </Card.Header>
                      <Card.Body className="p-0">
                        <Table bordered striped responsive style={{ zIndex: 9999, overflow: "visible"}} className="m-0">
                          <thead>
                            <tr className="text-center">
                              <th style={{width: "7vw"}}>#</th>
                              <th>Jenis Akun</th>
                              <th>Meja</th>
                              <th>Resto</th>
                              <th>Waiting List</th>
                              <th>Laporan</th>
                              <th>Pengaturan</th>
                              <th>Statistik</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {accountTypes.map((accType, index) => {
                              return (
                                <tr>
                                  <td className="text-center">{index+1}</td>
                                  <td className="text-center">{accType.name}</td>
                                  <td className="text-center"><Badge bg={accType.table_access === 2 ? 'success' : (accType.table_access === 1 ? 'info' : "danger") + " mx-1"}>{accType.table_access === 2 ? 'View & Edit' : (accType.table_access === 1 ? 'View Only' : "No Access")}</Badge></td>
                                  <td className="text-center"><Badge bg={accType.resto_access === 2 ? 'success' : (accType.resto_access === 1 ? 'info' : "danger") + " mx-1"}>{accType.resto_access === 2 ? 'View & Edit' : (accType.resto_access === 1 ? 'View Only' : "No Access")}</Badge></td>
                                  <td className="text-center"><Badge bg={accType.waiting_list_access === 2 ? 'success' : (accType.waiting_list_access === 1 ? 'info' : "danger") + " mx-1"}>{accType.waiting_list_access === 2 ? 'View & Edit' : (accType.waiting_list_access === 1 ? 'View Only' : "No Access")}</Badge></td>
                                  <td className="text-center"><Badge bg={accType.report_access === 2 ? 'success' : (accType.report_access === 1 ? 'info' : "danger") + " mx-1"}>{accType.report_access === 2 ? 'View & Edit' : (accType.report_access === 1 ? 'View Only' : "No Access")}</Badge></td>
                                  <td className="text-center"><Badge bg={accType.setting_access === 2 ? 'success' : (accType.setting_access === 1 ? 'info' : "danger") + " mx-1"}>{accType.setting_access === 2 ? 'View & Edit' : (accType.setting_access === 1 ? 'View Only' : "No Access")}</Badge></td>
                                  <td className="text-center"><Badge bg={accType.stat_access === 2 ? 'success' : (accType.stat_access === 1 ? 'info' : "danger") + " mx-1"}>{accType.stat_access === 2 ? 'View & Edit' : (accType.stat_access === 1 ? 'View Only' : "No Access")}</Badge></td>
                                  <td className="text-center">
                                    <Button variant="primary" className="btn btn-sm mx-1"><FontAwesomeIcon size="sm" icon={faEdit} /> Ubah</Button>
                                    {/* <Button variant="danger" className="btn btn-sm mx-1"><FontAwesomeIcon size="sm" icon={faTrash} /> Hapus</Button> */}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </Table>
                      </Card.Body>
                    </Card>
                  </Tab>
                </Tabs>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header><FontAwesomeIcon className="mx-2" icon={faTools} /><b>PAKET</b></Accordion.Header>
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
              <Accordion.Header><FontAwesomeIcon className="mx-2" icon={faTools} /><b>MEJA</b></Accordion.Header>
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
                                  <td className="text-center">{tables.filter(function (item) {return item.typeId == type.id}).length}</td>
                                  <td style={{width: "30vw"}}>
                                    {tables.filter(function (item) {return item.typeId == type.id}).map((table) => {
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
              <Accordion.Header><FontAwesomeIcon className="mx-2" icon={faTools} /><b>RESTO</b></Accordion.Header>
              <Accordion.Body>
              <Tabs
                  defaultActiveKey="data"
                  id="uncontrolled-tab-example"
                  className="mb-3"
                >
                  <Tab eventKey="data" title="Data Menu" >
                    <Card>
                      <Card.Header>
                        <div className="d-flex justify-content-between">
                          <div className="fw-bold">Data Menu</div>
                          <div>
                            <Button variant="success" className="btn btn-sm"><FontAwesomeIcon size="sm" icon={faPlus} /> Tambah</Button>
                          </div>
                        </div>
                      </Card.Header>
                      <Card.Body className="">
                        
                            <Tab.Container id="left-tabs-example" defaultActiveKey="Rokok">
                              <Row>
                                <Col sm={3}>
                                  <Nav variant="pills" className="flex-column">
                                    {
                                      menuTypes.map((menuType)=>{
                                        return (
                                          <Nav.Item className="border rounded">
                                            <Nav.Link eventKey={menuType.name}>{menuType.name}</Nav.Link>
                                          </Nav.Item>
                                        )
                                      })
                                    }
                                  </Nav>
                                </Col>
                                <Col sm={9}>
                                  <Tab.Content>
                                    {
                                      menuTypes.map((data)=>{
                                        return (
                                          
                                          <Tab.Pane eventKey={data.name}>
                                            <Table bordered striped responsive style={{ zIndex: 9999, overflow: "visible"}}  className="m-0">
                                              <thead>
                                                <tr className="text-center">
                                                  <th style={{width: "7vw"}}>#</th>
                                                  <th>Nama Barang</th>
                                                  <th>Jenis</th>
                                                  <th>Stok</th>
                                                  <th>Action</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                {
                                                  menus.filter(function (item) {return item.menuTypeId == data.id}).map((item, index)=>{
                                                    return(
                                                      <tr>
                                                        <td className="text-center">{index+1}</td>
                                                        <td className="text-center">{item.name}</td>
                                                        <td className="text-center">{item.menuType.name}</td>
                                                        <td className="text-center">{item.stock}</td>
                                                        <td className="text-center">
                                                          <Button variant="primary" className="btn btn-sm mx-1"><FontAwesomeIcon size="sm" icon={faEdit} /> Ubah</Button>
                                                          {/* <Button variant="danger" className="btn btn-sm mx-1"><FontAwesomeIcon size="sm" icon={faTrash} /> Hapus</Button> */}
                                                        </td>
                                                      </tr>
                                                    )
                                                  })
                                                }
                                              </tbody>
                                            </Table>
                                          </Tab.Pane>
                                        )
                                      })
                                    }
                                  </Tab.Content>
                                </Col>
                              </Row>
                            </Tab.Container>
                      </Card.Body>
                    </Card>
                  </Tab>
                  <Tab eventKey="jenis" title="Jenis Menu">
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
                              <th>Jenis Menu</th>
                              <th>Jumlah Produk</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {menuTypes.map((menuType, index) => {
                              return (
                                <tr>
                                  <td className="text-center">{index+1}</td>
                                  <td className="text-center">{menuType.name}</td>
                                  <td className="text-center">{menus.filter(function (item) {return item.menuTypeId == menuType.id}).length}</td>
                                  <td className="text-center">
                                    <Button variant="primary" className="btn btn-sm mx-1"><FontAwesomeIcon size="sm" icon={faEdit} /> Ubah</Button>
                                    {/* <Button variant="danger" className="btn btn-sm mx-1"><FontAwesomeIcon size="sm" icon={faTrash} /> Hapus</Button> */}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </Table>
                      </Card.Body>
                    </Card>
                  </Tab>
                  <Tab eventKey="ppn" title="Pengaturan PPN">
                    <Card>
                      <Card.Header>
                        <div className="d-flex justify-content-between">
                          <div className="fw-bold">Pengaturan PPN</div>
                          <div>
                            {/* <Button variant="success" className="btn btn-sm"><FontAwesomeIcon size="sm" icon={faPlus} /> Tambah</Button> */}
                          </div>
                        </div>
                      </Card.Header>
                      <Card.Body className="">
                        <Form.Group as={Row} className="mb-0" controlId="formPlaintextEmail">
                          <Form.Label column sm="2">
                            PPN
                          </Form.Label>
                          <Col sm="2"  >
                            <InputGroup className="mb-3">
                              {/* <InputGroup.Text>$</InputGroup.Text> */}
                              <Form.Control defaultValue="10" />
                              <InputGroup.Text>%</InputGroup.Text>
                            </InputGroup>
                          </Col>
                        </Form.Group>
                      </Card.Body>
                    </Card>
                  </Tab>
                </Tabs>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
    );
  }
}
