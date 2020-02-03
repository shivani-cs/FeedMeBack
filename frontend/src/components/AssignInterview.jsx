import React, { Component } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Table from "react-bootstrap/Table";
import NavBar from "./leftbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Route } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-router-dom";
import swal from "sweetalert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class AssignInterview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
      company: localStorage.getItem("company"),
      candidatesemail: "",
      intervieweremail: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    console.log("inside handlesubmit");
    var url = "http://ec2-54-67-61-55.us-west-1.compute.amazonaws.com/assignInterviewer";

    if (this.state.candidatesemail == "" || this.state.intervieweremail == "") {
      swal("All Details required!", "", "warning");
    } else {
      var self = this;
      var data = {
        intervieweremail: this.state.intervieweremail,
        email: this.state.candidatesemail,
        adminemail: this.state.email
      };
      //console.log("after set state");
      //console.log(data);
      axios
        .post(url, data)
        .then(response => {
          console.log("response is..........", response.data);
          swal("Interview Assigned!", "", "success");
        })
        .catch(err => console.log(err));
    }
  }
  render() {
    let redirectVar = null;
     if (localStorage.getItem("name") == null) {
              redirectVar = <Redirect to="/" />;
            }
    return (
      <div>
        {redirectVar}
        <NavBar />
        <br />
        <br />
        <br />
        <br />
        <Table borderless>
          <tr>
            <td>
              <ListGroup variant="flush" style={group}>
                <ListGroup.Item action href="./homeAdmin">
                  <p style={para}> Home </p>
                </ListGroup.Item>
                <ListGroup.Item action href="./scheduleInterview">
                  <p style={para}> Schedule Interview </p>
                </ListGroup.Item>
                <ListGroup.Item action href="./assignInterview">
                  <p style={para}> Assign Interview </p>
                </ListGroup.Item>
              </ListGroup>
            </td>
            <td width="700">
              <div className="w-55  p-3 mt-2">
                <Form>
                  <Form.Group as={Row} controlId="intervieweremail">
                    <Form.Label column sm="2">
                      Interviewer's Email
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        type="text"
                        name="intervieweremail"
                        onChange={this.handleChange}
                        defaultValue={this.state.intervieweremail}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="candidatesemail">
                    <Form.Label column sm="2">
                      Candidate's Email
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        type="text"
                        name="candidatesemail"
                        onChange={this.handleChange}
                        defaultValue={this.state.candidatesemail}
                      />
                    </Col>
                  </Form.Group>

                  <br></br>
                  <a href="./homeAdmin">
                    <Button
                      variant="light"
                      style={btn}
                      onClick={this.handleSubmit}
                    >
                      Submit
                    </Button>
                  </a>
                </Form>
              </div>
            </td>
            <td width={300}></td>
          </tr>
        </Table>
      </div>
    );
  }
}
const group = {
  width: 320,
  height: 700
};
const para = {
  fontfamily: "Arial, Helvetica, sans-serif",
  fontSize: 30,
  textAlign: "center",
  padding: 10,
  margin: 10,
  display: "inline-block",
  verticalAllign: "middle"
};
const btn = {
  color: "#bd0d39",
  fontFamily: "Arial, Helvetica, sans-serif",
  fontStyle: "normal"
};
export default AssignInterview;
