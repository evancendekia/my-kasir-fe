import React from "react";
import { Col, Card } from "react-bootstrap";
import { numberWithCommas } from "../../../utils/utils";

const ListMenu = ({ menu, masukKeranjang }) => {
  return (
    <Col md={3} xs={6} className="mb-4">
      <Card className="shadow" onClick={() => masukKeranjang(menu)}>
        <Card.Img
          variant="top"
          src={
            "assets/images/default/" +
            menu.gambar
          }
        />
        <Card.Body>
          <div>{menu.name}</div>
          <div>Rp. {numberWithCommas(menu.harga)}</div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ListMenu;
