import React, { Component } from "react";
import { Badge, Card, Col, ListGroup, Row, Button, Form, Tab, Tabs, Table   } from "react-bootstrap";
import { numberWithCommas } from "../../../utils/utils";
import ModalKeranjang from "../../../components/ModalKeranjang";
import TotalBayar from "../../../components/TotalBayar";
import { API_URL } from "../../../utils/constants";
import axios from "axios";
import swal from "sweetalert";
import Select from 'react-select'

export default class DashboardSide extends Component {
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
          <strong>Segera selesai</strong>
        </h4>
        <hr />
          <Card className="hasil" style={{height: "80vh"}} >
            {/* <Card.Header className={`fw-bold ${this.getcolor(selectedTable.status)}`}>Meja : {selectedTable && selectedTable.nomor != null ? selectedTable.nomor : 'Pilih meja...'}</Card.Header> */}
            <Card.Body className="border-1 p-0">
										<Table striped bordered >
											<thead>
												<tr className="text-center">
													<th>Meja</th>
													<th>Sisa Waktu</th>
													<th>Jam Selesai</th>
												</tr>
											</thead>
											<tbody  className="text-center">
												<tr>
													<td>1</td>
													<td>{this.getTimeLeft(1)}</td>
													<td>08.00</td>
												</tr>
												<tr>
													<td>5</td>
													<td>{this.getTimeLeft(5)}</td>
													<td className="text-center">08.31</td>
												</tr>
												<tr>
													<td>7</td>
													<td>{this.getTimeLeft(7)}</td>
													<td>08.39</td>
												</tr>
												<tr>
													<td>2</td>
													<td>{this.getTimeLeft(12)}</td>
													<td>09.01</td>
												</tr>
												<tr>
													<td>4</td>
													<td>{this.getTimeLeft(32)}</td>
													<td>09.21</td>
												</tr>
											</tbody>
										</Table>
										{/* <div className="d-flex justify-content-between">
											<Button variant="success" className="m-1" style={{display: "block", width: "100%"}}>Tambah Pesanan</Button>
										</div> */}
										</Card.Body>
						{/* { selectedTable && selectedTable.status == 'O' ?
							<Card.Body className="overflow-auto">
								<Card className="mb-2" >
									<Card.Header className="text-center">Info</Card.Header>
									<Card.Body >
										<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
											<Form.Label column sm="4">
												No Nota
											</Form.Label>
											<Col sm="8">
												<Form.Control readOnly defaultValue="90969-M-9" />
											</Col>
										</Form.Group>
										<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
											<Form.Label column sm="4">
												Pelayan
											</Form.Label>
											<Col sm="8">
												<Form.Control readOnly defaultValue="James Bond" />
											</Col>
										</Form.Group>
										<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
											<Form.Label column sm="4">
												Main
											</Form.Label>
											<Col sm="8">
												<Form.Control readOnly defaultValue="Reguler 2 jam" />
											</Col>
										</Form.Group>
										<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
											<Form.Label column sm="4">
												Waktu Mulai
											</Form.Label>
											<Col sm="8">
												<Form.Control readOnly defaultValue="08.37" />
											</Col>
										</Form.Group>
									</Card.Body>
								</Card>
								<Card className="" >
									
								<Tabs
									defaultActiveKey="resto"
									id="fill-tab-example"
									className="mb-1"
									fill
								>
									<Tab eventKey="billing" title="Billing">
										<Card.Body className="border-1">
										<Table striped responsive style={{whiteSpace: 'nowrap'}}>
											<thead>
												<tr className="text-center">
													<th>Jml</th>
													<th>Pesanan</th>
													<th>Harga</th>
													<th>Total</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td className="text-center">1</td>
													<td>Paket Reguler 2 jam</td>
													<td className="text-end">Rp 30.000</td>
													<td className="text-end">Rp 30.000</td>
												</tr>
												<tr>
													<td className="text-center">1</td>
													<td>Indomie</td>
													<td className="text-end">Rp 15.000</td>
													<td className="text-end">Rp 15.000</td>
												</tr>
												<tr>
													<td className="text-center">5</td>
													<td>Es Teh</td>
													<td className="text-end">Rp 6.000</td>
													<td className="text-end">Rp 30.000</td>
												</tr>
												<tr>
													<td className="text-center">7</td>
													<td>Le Mineral</td>
													<td className="text-end">Rp 5.000</td>
													<td className="text-end">Rp 35.000</td>
												</tr>
												<tr>
													<td className="text-center">2</td>
													<td>Fanta</td>
													<td className="text-end">Rp 10.000</td>
													<td className="text-end">Rp 20.000</td>
												</tr>
												<tr>
													<td colSpan={3} className="text-end fw-bold">Total Akhir</td>
													<td className="text-end fw-bold">Rp 130.000</td>
												</tr>
											</tbody>
										</Table>
										</Card.Body>
									</Tab>
									<Tab eventKey="resto" title="Resto">
										<Card.Body className="border-1">
										<Table striped>
											<thead>
												<tr className="text-center">
													<th>Jml</th>
													<th>Pesanan</th>
													<th>Waktu Pesan</th>
													<th>Opsi</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td className="text-center">1</td>
													<td>Indomie</td>
													<td className="text-center">08.00</td>
													<td></td>
												</tr>
												<tr>
													<td className="text-center">5</td>
													<td>Es Teh</td>
													<td className="text-center">08.31</td>
													<td></td>
												</tr>
												<tr>
													<td className="text-center">7</td>
													<td>Le Mineral</td>
													<td className="text-center">08.39</td>
													<td></td>
												</tr>
												<tr>
													<td className="text-center">2</td>
													<td>Fanta</td>
													<td className="text-center">09.01</td>
													<td></td>
												</tr>
											</tbody>
										</Table>
										<div className="d-flex justify-content-between">
											<Button variant="success" className="m-1" style={{display: "block", width: "100%"}}>Tambah Pesanan</Button>
										</div>
										</Card.Body>
									</Tab>
								</Tabs>
								</Card>
							</Card.Body>
						:
							<Card.Body >
								<Card className="mb-2" >
									<Card.Header className="text-center">Caddy</Card.Header>
									<Card.Body >
										<Row >
											{this.state.caddy &&
												this.state.caddy.map((item,index) => (
												<Col xs={6} >
													<Form.Check
														key={index+1}
														type={'checkbox'}
														id={`default-checkbox-${index+1}`}
														label={item.name}
													/>
												</Col>
											))}
										</Row>
									</Card.Body>
								</Card>
								<Row className="mb-2">
									<Col>
										<Select
											placeholder="Pilih salah satu.."
											value={this.state.selectedGameType}
											onChange={this.onChangeGameType}
											options={this.state.gameTypeOptions}
										/>
									</Col>
								</Row>
								<Row>
									<Col>
										<Select
											placeholder="Pilih paket.."
											value={this.state.selectedPaket}
											onChange={this.onChangePaket}
											options={this.state.paketOptions}
										/>
									</Col>
								</Row>
							</Card.Body>
							
						}
             */}
            {/* <Card.Footer className="m-0 p-1">
						{ selectedTable && selectedTable.status == 'O' ? 
							// <div className="d-flex justify-content-between">
								<Row className="p-0 m-0">
									<Col xs={4} className="m-0 px-1">
										<Button variant="secondary" className="m-1" col={4} style={{display: "block", width: "100%"}}>Close</Button>
									</Col>
									<Col xs={8} className="m-0 px-1">
										<Button variant="success" className="m-1" col={8} style={{display: "block", width: "100%"}}>Selesai Main</Button>
									</Col>
								</Row>
							// </div>
						:
							<div className="d-flex justify-content-between">
								<Button variant="danger" className="m-1" style={{display: "block", width: "100%"}}>Batal</Button>
								<Button variant="success" className="m-1" style={{display: "block", width: "100%"}}>Simpan</Button>
							</div>
						}
            </Card.Footer> */}
          </Card>
      </Col>
    );
  }
}
