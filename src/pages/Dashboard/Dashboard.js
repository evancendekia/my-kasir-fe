import React, { Component, useState, useEffect } from "react";
import { Row, Col, Container } from "reactstrap";
import { TableList, DashboardSide, WaitingList } from "../../components";
import { API_URL } from "../../utils/constants";
import axios from "axios";
import swal from "sweetalert";

import withFixedColumns from "react-table-hoc-fixed-columns";
import ReactTable from "react-table";
import "react-table/react-table.css";
import 'react-table-hoc-fixed-columns/lib/styles.css' // important: this line must be placed after react-table css import


const ReactTableFixedColumns = withFixedColumns(ReactTable);

const locale = 'en';

export default class Dashboard extends Component {
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
      waitingListData : [
        {time_in: '13.28', name: 'Ade', time: '20.00', play_mode: '2 Jam', table_no: 'Meja 1', contact_person: 'ig (@testtest)'},
        {time_in: '19.00', name: 'Ari', time: '21.00', play_mode: '3 Jam', table_no: 'Meja 35', contact_person: 'Lokasi'},
        {time_in: '18.00', name: 'Agus', time: '21.30', play_mode: '1 Jam', table_no: 'Meja 69', contact_person: 'WA (08681xxxxx)'},
        // {firstName: 'b', lastName: 'test', email: 'test@mail.com'}
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
    const { waitingListData, columns, time, timeDiff, selectedTable } = this.state;
    return (
        <div style={{maxHeight: "100%", overflow: "hidden", margin: "auto"}}>
          {/* <Container fluid> */}
            <Row >
              <Col className="mt-3 " >
                <h4>
                  <strong >Waiting List</strong>
                </h4>
                <hr />
                <Row className="overflow-auto" style={{overflowY: "scroll", maxHeight: "80vh", margin: "auto"}}>
                  <ReactTableFixedColumns
                    data={waitingListData}
                    columns={columns}
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
                </Row>
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
