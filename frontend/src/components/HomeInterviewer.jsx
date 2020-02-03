import React, { Component } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Table from "react-bootstrap/Table";
import NavBar from "./leftbar";
import Button from "react-bootstrap/Button";
import { Route } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

class HomeInterviewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
      company: localStorage.getItem("company"),
      candidates: []
    };
  }

  componentDidMount() {
    
    console.log("component did mount");
    let email = this.state.email;
    console.log("email is..", email);
    let data = {
      email: email
    };
    let url = "http://ec2-54-67-61-55.us-west-1.compute.amazonaws.com/getInterviewerDetails";
    axios
      .post(url, data)
      .then(response => {
        console.log("response is..........", response.data);
        this.setState({
          candidates: response.data.candidates
        });
      })
      .catch(err => console.log(err));
  }

  showButton(candidates) {
    if(candidates.status == "scheduled"){
      return (
        <tr>
          <td width="900" style={item1}>
            <Link
              to={{
                pathname: "/getquestions",
                state: { result: candidates }
              }}
            >
            <Button
              variant="light"
              style={btn}
              id={candidates.email}
              //onClick={this.handleUpdate}
              >
              Fill Review Form
            </Button>
            </Link>
          </td>
        </tr>
      );
    }
  }

  render() {
    console.log("inside render......", this.state.candidates [0]);
    // let response = {
    //   candidates: [
    //     {
    //       email: "shraddha@gmail.com",
    //       name: "Shraddha",
    //       status: "completed",
    //       jobid: "123"
    //     },
    //     {
    //       email: "kanika@gmail.com",
    //       name: "Kanika",
    //       status: "scheduled",
    //       jobid: "1234"
    //     }
    //   ]
    // };
    let details_candidates = this.state.candidates.map(candidates => {

      return (
        <Table bordered width="900">
          <tr>
            <td width="80%" class="font-weight-bold" style={item}>
              Candidate Name: {candidates.name}
            </td>
          </tr>
          <tr>
            <td width="900" style={item1}>
              Job ID: {candidates.jobid}
            </td>
          </tr>
          <tr>
            <td width="900" class="font-weight-bold" style={item1}>
              Candidate Interview Status: {candidates.status}
            </td>
          </tr>
          
            {this.showButton(candidates)}
          
        </Table>
      )}
    );
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
                <ListGroup.Item action href="./homeInterviewer">
                  <p style={para}> Home </p>
                </ListGroup.Item>
              </ListGroup>
            </td>
            <td style={para} width="700">
              {details_candidates}
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
  fontSize: 25,
  fontfamily: "Arial, Helvetica, sans-serif"
};
const item1 = {
  textAlign: "left",
  fontSize: 18,
  fontfamily: "Arial, Helvetica, sans-serif"
};
export default HomeInterviewer;
