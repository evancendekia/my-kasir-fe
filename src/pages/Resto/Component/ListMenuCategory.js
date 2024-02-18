import React, { Component } from "react";
import { Col, ListGroup } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../../../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faCoffee,
  faCheese,
} from "@fortawesome/free-solid-svg-icons";

const Icon = ({ name }) => {
  if (name === "Makanan")
    return <FontAwesomeIcon icon={faUtensils} className="mr-2" />;
  if (name === "Minuman") return <FontAwesomeIcon icon={faCoffee} />;
  if (name === "Cemilan")
    return <FontAwesomeIcon icon={faCheese} className="mr-2" />;

  return <FontAwesomeIcon icon={faUtensils} className="mr-2" />;
};

export default class ListMenuCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    // axios
    //   .get(API_URL + "categories")
    //   .then((res) => {
    //     const categories = res.data;
    //     console.log('categories',categories)
    //     this.setState({ categories });
    //   })
    //   .catch((error) => {
    //     console.log("Error yaa ", error);
    //   });

    axios
      .get(API_URL + "menuTypes")
      .then((res) => {
        const categories = res.data;
        console.log('categories',categories)
        this.setState({ categories });
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });
    
  }

  render() {
    const { categories } = this.state;
    const { changeCategory, categoriYangDipilih } = this.props;
    return (
      <Col md={2} className="mt-3">
        <h4>
          <strong>Daftar Kategori</strong>
        </h4>
        <hr />
        <ListGroup>
          {categories &&
            categories.map((category) => {
              return(
                <ListGroup.Item
                  key={category.id}
                  onClick={() => changeCategory(category.id)}
                  className={categoriYangDipilih === category.id && "category-aktif"}
                  style={{cursor: 'pointer'}}
                >
                  <h5>
                    {/* <Icon name={category.name} /> {category.name} */}
                    {category.name}
                  </h5>
                </ListGroup.Item>
              )
          })}
        </ListGroup>
      </Col>
    );
  }
}
