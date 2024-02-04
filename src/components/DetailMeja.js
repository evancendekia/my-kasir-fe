import React, { Component } from "react";
import { Badge, Card, Col, ListGroup, Row, Button, Form } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import ModalKeranjang from "./ModalKeranjang";
import TotalBayar from "./TotalBayar";
import { API_URL } from "../utils/constants";
import axios from "axios";
import swal from "sweetalert";
import Select from 'react-select'

export default class DetailMeja extends Component {
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
  }

  onChangeGameType = (value) =>{
    this.setState({ selectedGameType: value});
    console.log('value', value)
  }
  onChangePaket = (value) =>{
    this.setState({ selectedPaket: value});
    console.log('value', value)
  }

  

  render() {
    // const detail = {
    //     height: "100vh"
    // }
    // const { keranjangs } = this.props;
    return (
      <Col md={3} className="mt-3 mr-0 pr-4">
        <h4>
          <strong>Detil Meja</strong>
        </h4>
        <hr />
          <Card className="overflow-auto hasil" style={{height: "80vh"}} >
            <Card.Body >
                
                {/* <Row className="border m-0 mb-2" > */}
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
                {/* </Row> */}
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
            <Card.Footer className="m-0 p-1">
                <div className="d-flex justify-content-between">
                    <Button variant="danger" className="m-1" style={{display: "block", width: "100%"}}>Batal</Button>
                    <Button variant="success" className="m-1" style={{display: "block", width: "100%"}}>Simpan</Button>
                </div>
            </Card.Footer>
          </Card>
      </Col>
    );
  }
}
