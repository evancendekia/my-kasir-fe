import React from "react";
import { numberWithCommas } from "../../../utils/utils";
import * as generalHelper from "../../../helpers/generalHelpers"
import { Card, Button, Row, Col, Form, InputGroup, Modal} from "react-bootstrap";

const ModaljenisMeja = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton style={{backgroundColor :"dark"}}>
        <Modal.Title id="contained-modal-title-vcenter">
          { props.action == 'edit' ? "Ubah Data Jenis Meja" : "Tambah Jenis Meja" }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col sm={12}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Jenis Meja</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Jenis Meja"
                  value={props.dataJenisMeja.table_type}
                  autoFocus
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Label>Harga Reguler</Form.Label>
                <InputGroup>
                  <InputGroup.Text>Rp</InputGroup.Text>
                  <Form.Control 
                    type="text"
                    placeholder="50.000" 
                    value={props.dataJenisMeja.price != null ? generalHelper.FormatIDR(props.dataJenisMeja.price) : null}
                    autoFocus
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                <Form.Label>Harga Personal</Form.Label>
                <InputGroup>
                  <InputGroup.Text>Rp</InputGroup.Text>
                  <Form.Control 
                    type="text"
                    placeholder="65.000" 
                    value={props.dataJenisMeja.personal_price != null ? generalHelper.FormatIDR(props.dataJenisMeja.personal_price) : null}
                    autoFocus
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
              <Form.Label>Waktu Minimum</Form.Label>
              <InputGroup>
                <Form.Control 
                  type="text"
                  placeholder="30" 
                  value={props.dataJenisMeja.personal_time_minimum}
                  autoFocus
                />
                <InputGroup.Text>Menit</InputGroup.Text>
              </InputGroup>
            </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {props.action == 'edit' 
        ? (<Button>Save</Button>) 
        : (<Button variant="success">Submit</Button>)
        }
        {/* <Button onClick={props.onHide}>Close</Button> */}
      </Modal.Footer>
    </Modal>
  );
};

export default ModaljenisMeja;
