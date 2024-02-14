import React, { Component, useState, useEffect } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TableList, DashboardSide, WaitingList } from "../../components";
import { API_URL } from "../../utils/constants";
import axios from "axios";
import swal from "sweetalert";
import { Accordion, Tab, Tabs, Card, Table, Badge, Button } from "react-bootstrap";
import Select from 'react-select';

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
    .get(API_URL + "jenis" )
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
    const { tablesType, colourOptions, tables, tablesGrouped } = this.state;
    return (
        <div style={{maxHeight: "100%", overflow: "hidden", margin: "auto"}} className="mt-4">
          <Accordion defaultActiveKey={['3']} alwaysOpen>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Akun</Accordion.Header>
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
              <Accordion.Header>Paket</Accordion.Header>
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
            <Accordion.Item eventKey="3">
              <Accordion.Header>Meja</Accordion.Header>
              <Accordion.Body>
                <Tabs
                  defaultActiveKey="jenis"
                  id="uncontrolled-tab-example"
                  className="mb-3"
                >
                  <Tab eventKey="jenis" title="Jenis Meja" >
                  <Card>
                    <Card.Body className="border-1">
                      <Table striped responsive style={{ zIndex: 9999, overflow: "visible"}}>
                        <thead>
                          <tr className="text-center">
                            <th>No</th>
                            <th>Jenis Meja</th>
                            <th>Harga</th>
                            <th>Nomor Meja</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tablesType.map((type, index) => {
                            return (
                              <tr>
                                <td className="text-center">{index+1}</td>
                                <td className="text-center">{type.jenis_meja}</td>
                                <td className="text-end">{type.harga}</td>
                                <td xs={4}style={{width: "50vw"}}>
                                  {tables.filter(function (item) {return item.type == type.jenis_meja}).map((table, index) => {
                                    return(<Badge bg="secondary mx-1">Meja {table.nomor}</Badge>)
                                  })}
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
                          <div className="fw-bold">Data seluruh meja</div>
                          <div>
                            <Button variant="success" className="btn btn-sm"><FontAwesomeIcon size="sm" icon={faPlus} /> Add</Button>
                          </div>
                        </div>
                      </Card.Header>
                      <Card.Body className="border-1">
                        <Table striped responsive style={{ zIndex: 9999, overflow: "visible"}}>
                          <thead>
                            <tr className="text-center">
                              <th>No</th>
                              <th>Jenis Meja</th>
                              <th>Harga</th>
                              <th>Nomor Meja</th>
                            </tr>
                          </thead>
                          <tbody>
                            {tablesType.map((type, index) => {
                              return (
                                <tr>
                                  <td className="text-center">{index+1}</td>
                                  <td className="text-center">{type.jenis_meja}</td>
                                  <td className="text-end">{type.harga}</td>
                                  <td xs={4}style={{width: "50vw"}}>
                                    {tables.filter(function (item) {return item.type == type.jenis_meja}).map((table, index) => {
                                      return(<Badge bg="secondary mx-1">Meja {table.nomor}</Badge>)
                                    })}
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
            <Accordion.Item eventKey="4">
              <Accordion.Header>Beep on/off</Accordion.Header>
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
            <Accordion.Item eventKey="5">
              <Accordion.Header>Resto</Accordion.Header>
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
