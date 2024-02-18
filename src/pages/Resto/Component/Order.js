import React, { Component } from "react";
import { Badge, Card, Col, ListGroup, Row, Button} from "react-bootstrap";
import { numberWithCommas } from "../../../utils/utils";
import ModalKeranjang from "./ModalKeranjang";
import TotalBayar from "./TotalBayar";
import { API_URL } from "../../../utils/constants";
import axios from "axios";
import swal from "sweetalert";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Order extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      keranjangDetail: false,
      jumlah: 0,
      keterangan: "",
      totalHarga: 0,
    };
  }

  handleShow = (menuKeranjang) => {
    this.setState({
      showModal: true,
      keranjangDetail: menuKeranjang,
      jumlah: menuKeranjang.jumlah,
      keterangan: menuKeranjang.keterangan,
      totalHarga: menuKeranjang.total_harga,
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };

  tambah = () => {
    this.setState({
      jumlah: this.state.jumlah + 1,
      totalHarga:
        this.state.keranjangDetail.product.harga * (this.state.jumlah + 1),
    });
  };

  kurang = () => {
    if (this.state.jumlah !== 1) {
      this.setState({
        jumlah: this.state.jumlah - 1,
        totalHarga:
          this.state.keranjangDetail.product.harga * (this.state.jumlah - 1),
      });
    }
  };

  changeHandler = (event) => {
    this.setState({
      keterangan: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.handleClose();

    const data = {
      jumlah: this.state.jumlah,
      total_harga: this.state.totalHarga,
      product: this.state.keranjangDetail.product,
      keterangan: this.state.keterangan,
    };

    axios
      .put(API_URL + "keranjangs/" + this.state.keranjangDetail.id, data)
      .then((res) => {
        swal({
          title: "Update Pesanan!",
          text: "Sukses Update Pesanan " + data.product.nama,
          icon: "success",
          button: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });
  };

  hapusPesanan = (id) => {
    this.handleClose();

    axios
      .delete(API_URL + "keranjangs/" + id)
      .then((res) => {
        swal({
          title: "Hapus Pesanan!",
          text:
            "Sukses Hapus Pesanan " + this.state.keranjangDetail.product.nama,
          icon: "error",
          button: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });
  };

  render() {
    const { keranjangs } = this.props;
    return (
      <Col md={3} className="mt-3 px-3">
        <h4>
          <strong>Pesanan</strong>
        </h4>
        <hr />
        {keranjangs.length !== 0 && (
          <Card className="hasil" style={{height: "80vh"}}>
            
            <Card.Body>

              <ListGroup variant="flush">
                {keranjangs.map((menuKeranjang) => (
                  <ListGroup.Item
                    key={menuKeranjang.id}
                    onClick={() => this.handleShow(menuKeranjang)}
                  >
                    <Row>
                      <Col xs={2}>
                        <h4>
                          <Badge pill variant="success">
                            {menuKeranjang.jumlah}
                          </Badge>
                        </h4>
                      </Col>
                      <Col>
                        <h5>{menuKeranjang.product.name}</h5>
                        <p>Rp. {numberWithCommas(menuKeranjang.product.harga)}</p>
                      </Col>
                      <Col>
                        <strong className="float-right">
                          Rp. {numberWithCommas(menuKeranjang.total_harga)}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}

                <ModalKeranjang
                  handleClose={this.handleClose}
                  {...this.state}
                  tambah={this.tambah}
                  kurang={this.kurang}
                  changeHandler={this.changeHandler}
                  handleSubmit={this.handleSubmit}
                  hapusPesanan={this.hapusPesanan}
                />
              </ListGroup>
            </Card.Body>
            <Card.Footer className="m-0 p-1">
							<div className="d-flex justify-content-between">
								<Button variant="primary" className="m-1" style={{display: "block", width: "100%"}}>
                  <FontAwesomeIcon icon={faShoppingCart} /> <strong>BAYAR</strong>
                </Button>
							</div>
            </Card.Footer>
          </Card>
          
        )}
      </Col>
    );
  }
}
