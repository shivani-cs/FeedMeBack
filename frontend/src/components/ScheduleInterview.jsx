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
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

class ScheduleInterview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
      company: localStorage.getItem("company"),
      candidatename: "",
      candidateemail: "",
      positions: [],
      jobposition: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectPosition = this.selectPosition.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  selectPosition = e => {
    this.setState({
      jobposition: e.value
    });
  };
  componentDidMount() {
    //console.log("component did mount");
    let email = this.state.email;
    //console.log("email is..", email);
    let data = {
      email: email
    };
    let url = "http://ec2-54-67-61-55.us-west-1.compute.amazonaws.com/getPositionDetails";
    axios
      .get(url)
      .then(response => {
        console.log("response is..........", response.data);
        this.setState({
          positions: response.data.positions
        });
      })
      .catch(err => console.log(err));
  }
  handleSubmit(event) {
    event.preventDefault();
    //console.log("inside handlesubmit");
    var url = "http://ec2-54-67-61-55.us-west-1.compute.amazonaws.com/scheduleInterview";

    if (this.state.candidateemail == "" || this.state.candidatename == "") {
      swal("All Details required!", "", "warning");
    } else {
      var self = this;
      var data = {
        position: this.state.jobposition,
        email: this.state.candidateemail,
        name: this.state.candidatename,
        adminemail: this.state.email
      };
      //console.log("after set state");
      console.log(data);
      axios
        .post(url, data)
        .then(response => {
          console.log("response is..........", response.data);
          swal("Interview Scheduled!", "", "success");
        })
        .catch(err => console.log(err));
        swal("Interview Scheduled!", "", "success");
    }
  }
  render() {
    let positiond = [];
    /*let response = {
      positions: [
        {
          pname: "Hiring manager",
          desc: "Hii i am a manager",
          skills: ["c", "c++"],
          jobid: "123"
        },
        {
          pname: "Hiring manager1",
          desc: "Hii i am a new manager",
          skills: ["c", "c++", "python"],
          jobid: "1234"
        }
      ]
    };*/
    let details_positions = this.state.positions.map(positions => {
      //console.log("new position is ", positions.pname);
      positiond.push(positions.name);
    });
    //console.log("positiond is ", positiond);
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
                  <Dropdown
                    options={positiond}
                    onChange={this.selectPosition}
                    value={this.state.jobposition}
                    placeholder="Job Positions : "
                  />
                  <br />
                  <Form.Group as={Row} controlId="candidateemail">
                    <Form.Label column sm="2">
                      Candidate's Email
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        type="text"
                        name="candidateemail"
                        onChange={this.handleChange}
                        defaultValue={this.state.candidateemail}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="candidatename">
                    <Form.Label column sm="2">
                      Candidate's Name
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        type="text"
                        name="candidatename"
                        onChange={this.handleChange}
                        defaultValue={this.state.candidatename}
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
export default ScheduleInterview;
