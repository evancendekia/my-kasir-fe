import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { ListMenuCategory, ListMenu, Order } from "../../components";
import { API_URL } from "../../utils/constants";
import axios from "axios";
import swal from "sweetalert";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      categoriYangDipilih: 0,
      keranjangs: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "menus?_expand=menuType"+ (this.state.categoriYangDipilih > 0 ? "&menuTypeId=" + this.state.categoriYangDipilih :'&_sort=menuTypeId&_order=asc'))
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });

    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const keranjangs = res.data;
        this.setState({ keranjangs });
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });
  }

  componentDidUpdate(prevState) {
    if(this.state.keranjangs !== prevState.keranjangs) {
      // axios
      // .get(API_URL + "keranjangs")
      // .then((res) => {
      //   const keranjangs = res.data;
      //   this.setState({ keranjangs });
      // })
      // .catch((error) => {
      //   console.log("Error yaa ", error);
      // });
    }
  }

  changeCategory = (value) => {
    console.log('value',value)
    this.setState({
      categoriYangDipilih: value,
      menus: [],
    });

    axios
      .get(API_URL + "menus?_expand=menuType"+ (this.state.categoriYangDipilih > 0 ? "&menuTypeId=" + value :'&_sort=menuTypeId&_order=asc'))
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });
  };

  updateKeranjang = () =>{
    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const keranjangs = res.data;
        this.setState({ keranjangs });
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });
  }

  masukKeranjang = async (value) => {
    axios
      .get(API_URL + "keranjangs?product.id=" + value.id)
      .then((res) => {
        if (res.data.length === 0) {
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };

          axios
            .post(API_URL + "keranjangs", keranjang)
            .then((res) => {
              swal({
                title: "Sukses Masuk Keranjang",
                text: "Sukses Masuk Keranjang " + keranjang.product.nama,
                icon: "success",
                button: false,
                timer: 1500,
              });
              this.updateKeranjang();
            })
            .catch((error) => {
              console.log("Error yaa ", error);
            });
        } else {
          const keranjang = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value,
          };

          axios
            .put(API_URL + "keranjangs/" + res.data[0].id, keranjang)
            .then((res) => {
              swal({
                title: "Sukses Masuk Keranjang",
                text: "Sukses Masuk Keranjang " + keranjang.product.nama,
                icon: "success",
                button: false,
                timer: 1500,
              });
              this.updateKeranjang();
            })
            .catch((error) => {
              console.log("Error yaa ", error);
            });
        }

      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });
  };

  render() {
    const { menus, categoriYangDipilih, keranjangs } = this.state;
    return (
        <div className="mt-3" style={{maxHeight: "100%", overflow: "hidden"}}>
          <Container fluid>
            <Row>
              <ListMenuCategory
                changeCategory={this.changeCategory}
                categoriYangDipilih={categoriYangDipilih}
              />
              <Col className="mt-3">
                <h4>
                  <strong>Daftar Produk</strong>
                </h4>
                <hr />
                <Row className="overflow-auto menu" style={{overflowY: "scroll", maxHeight: "80vh"}}>
                  {menus &&
                    menus.map((menu) => (
                      <ListMenu
                        key={menu.id}
                        menu={menu}
                        masukKeranjang={this.masukKeranjang}
                      />
                    ))}
                </Row>
              </Col>
              <Order keranjangs={keranjangs} {...this.props}/>
            </Row>
          </Container>
        </div>
    );
  }
}
