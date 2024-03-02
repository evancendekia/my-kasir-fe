import React, { Component } from "react";
import { Badge, Card, Col, ListGroup, Row, Button, Form, Tab, Tabs, Table   } from "react-bootstrap";
import { numberWithCommas } from "../../../utils/utils";
import ModalKeranjang from "../../../components/ModalKeranjang";
import TotalBayar from "../../../components/TotalBayar";
import { API_URL } from "../../../utils/constants";
import axios from "axios";
import swal from "sweetalert";
import Select from 'react-select'

export default class Filter extends Component {
	constructor(props) {
		super(props);

		this.state = {
				showModal: false,
				keranjangDetail: false,
				jumlah: 0,
				keterangan: "",
				totalHarga: 0,
				gameTypeOptions : [
						{ value: 'reguler', label: 'Reguler' },
						{ value: 'lossTimer', label: 'Loss Timer' },
						{ value: 'paket', label: 'Paket' }
				],
				selectedGameType : null,
				paketOptions : [
						{ value: 'paket1', label: 'Paket 1' },
						{ value: 'paket2', label: 'Paket 2' },
						{ value: 'paket3', label: 'Paket 3' }
				],
				selectedPaket : null,
				caddy : [
						{id: 1, name: 'Name 1'},
						{id: 2, name: 'Name 2'},
						{id: 3, name: 'Name 3'},
						{id: 4, name: 'Name 4'},
						{id: 5, name: 'Name 5'}
				]
		};
		
		this.getcolor = this.getcolor.bind(this);
    this.getTimeLeft = this.getTimeLeft.bind(this);
		// this.randomDate = this.randomDate.bind(this);
	}

  getTimeLeft(add){
    // this.randomDate();
    var date = new Date();
    var hour    = date.getHours();
    var newDate = new Date(2025, 2, 24, (hour+1), (10+add),13); //2025-02-05 22:10:13
    // console.log('newDate', newDate)

    var seconds = Math.floor((newDate - (date))/1000);
    var minutes = Math.floor(seconds/60);
    var hours = Math.floor(minutes/60);
    var days = Math.floor(hours/24);

    hours = hours-(days*24);
    minutes = minutes-(days*24*60)-(hours*60);
    seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);
    return `${hours}:${minutes}:${seconds}`;

  }

  
	getcolor = (status)=>{
		switch(status){
		case "A" :  return 'bg-success text-white';
								break;
		case "O" :  return 'bg-danger text-white';
								break;
		case "B" :  return 'bg-warning text-dark';
								break;
		case "F" :  return 'bg-info text-dark';
								break;
		}
	}

  render() {
    const { timeDiff } = this.props;
    return (
      <Col md={3} className="mt-3 px-3">
        <h4>
          <strong>Filter</strong>
        </h4>
        <hr />
          <Card className="">
            {/* <Card.Header className={`fw-bold ${this.getcolor(selectedTable.status)}`}>Meja : {selectedTable && selectedTable.nomor != null ? selectedTable.nomor : 'Pilih meja...'}</Card.Header> */}
            <Card.Body className="border-1">
							<Form>
								<Form.Group className="mb-3">
									<Form.Label htmlFor="dateStart">Tanggal Mulai</Form.Label>
									<Form.Control id="dateStart"  type="date" />
								</Form.Group>
								<Form.Group className="mb-3">
									<Form.Label htmlFor="dateTo">Tanggal Akhir</Form.Label>
									<Form.Control id="dateStart" type="date" />
								</Form.Group>
							</Form>
						</Card.Body>
						<Card.Footer className="m-0 p-1">
							<div className="d-flex justify-content-between">
								<Button variant="primary" className="m-1" style={{display: "block", width: "100%"}}>Terapkan</Button>
								{/* <Button variant="success" className="m-1" style={{display: "block", width: "100%"}}></Button> */}
							</div>
            </Card.Footer>
          </Card>
      </Col>
    );
  }
}
