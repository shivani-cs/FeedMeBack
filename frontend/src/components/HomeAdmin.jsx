import React, { Component } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Table from "react-bootstrap/Table";
import NavBar from "./leftbar";
import Button from "react-bootstrap/Button";
import { Route } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
class HomeAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
      company: localStorage.getItem("company"),
      positions: []
    };
  }
  componentDidMount() {
    console.log("component did mount");
    let email = this.state.email;
    console.log("email is..", email);
    let data = {
      email: email
    };
    let url = "http://ec2-54-67-61-55.us-west-1.compute.amazonaws.com/getPositionDetails";
    axios
      .get(url, data)
      .then(response => {
        console.log("response is..........", response.data);
        this.setState({
          positions: response.data.positions
        });
      })
      .catch(err => console.log(err));
  }

  printSkills(skills) {
    console.log("skills are ", skills);
    return skills.map(d => {
      return (
        <td width="100" style={item1}>
          {d}
        </td>
      );
      //<th key={d.item_id}>{d.price}</th>;
    });
  }

  render() {
    console.log("inside render......", this.state.positions[0]);
    //let details_positions = this.state.positions;
    // console.log("details_position is", details_positions);
    /* let response = {
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
      return (
        <Table bordered width="1200">
          <tr>
            <td style={item} width="10%">
              Position Name:
            </td>
            <td width="90%" style={item1}>
              {" "}
              {positions.name}
            </td>
          </tr>
          <tr>
            <td style={item1} width="10%">
              Position Description:
            </td>
            <td width="90%" style={item1}>
              {" "}
              {positions.desc}
            </td>
          </tr>
          <tr>
            <td style={item1}>Skills:</td>
            {this.printSkills(positions.skills)}
          </tr>

          <tr>
            <td width="900" style={item1}>
              Job ID: {positions.jobid}
            </td>
          </tr>
          <tr>
            <td width="900" style={item1}>
              <Link
                to={{
                  pathname: "/viewcandidates",
                  state: { result: positions }
                }}
              >
                <Button
                  variant="light"
                  style={btn}
                  id={positions.jobid}
                  //onClick={this.handleUpdate}
                >
                  Get Candidates
                </Button>
              </Link>
            </td>
          </tr>
        </Table>
      );
    });
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
            <td style={para} width="700">
              {details_positions}
            </td>
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
const btn = {
  color: "#bd0d39",

  fontFamily: "Arial, Helvetica, sans-serif",
  fontStyle: "normal"
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
const item = {
  textAlign: "left",
  fontSize: 15,
  fontfamily: "Arial, Helvetica, sans-serif"
};
const item1 = {
  textAlign: "left",
  fontSize: 10,
  fontfamily: "Arial, Helvetica, sans-serif"
};
export default HomeAdmin;
