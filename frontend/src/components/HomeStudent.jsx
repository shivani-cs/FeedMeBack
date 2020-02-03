import React, { useState, Component } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Table from "react-bootstrap/Table";
import NavBar from "./leftbar";
import Button from "react-bootstrap/Button";
import { Route } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import swal from "sweetalert";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";

class HomeStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
      jobid: "",
      position: " ",
      report: "",
      status: "awaited",
      date: new Date(),
      startDate: new Date(),
      selectedFile: null
    };
    this.handleSchedule = this.handleSchedule.bind(this);
    this.setStartDate = this.setStartDate.bind(this);
    this.printResponse = this.printResponse.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }
  componentDidMount() {
    console.log("component did mount");
    let email = this.state.email;
    console.log("email is..", email);
    let data = {
      email: email
    };
    let url = "http://ec2-54-67-61-55.us-west-1.compute.amazonaws.com/getcandidate";
    axios
      .post(url, data)
      .then(response => {
        console.log("response is..........", response.data);
        this.setState({
          jobid: response.data.jobid,
          position: response.data.position,
          status: response.data.status,
          email: response.data.email
        });
      })
      .catch(err => console.log(err));
  }
  setStartDate = date => {
    this.setState({
      date: date,
      startDate: date
    });
  };
  handleSchedule = () => {
    //console.log("date is ", this.state.date);
    let date = this.state.date;
    let email = this.state.email;
    //console.log("file is is ", this.state.selectedFile);
    const data = new FormData();
    data.append("file", this.state.selectedFile);
    //console.log("data is..", data);
    let temp = {
      email: email,
      date: date,
      data: data
    };
    console.log("sending....", temp);
    let url = "http://ec2-54-67-61-55.us-west-1.compute.amazonaws.com/schedule";
    axios
      .post(url, temp)
      .then(response => {
        console.log("response is ", response.data);
        swal("Interview Scheduled!", "", "success");
      })
      .catch(err => console.log(err));
    swal("Interview Scheduled !", "", "success");
  };
  onChangeHandler = event => {
    console.log(event.target.files[0]);
    this.setState({
      selectedFile: event.target.files[0]
    });
    //console.log("file is..", this.state.selectedFile);
  };
  handleReport(e) {
    console.log("inside handle status");
    console.log("the orfer id passed is ", e.target.id);

    let email = e.target.id;
    let url = "http://ec2-3-18-220-46.us-east-2.compute.amazonaws.com/api/feedback/nlgReportDownload";
    let data = {
      //email:email ,
      email: email,
      from: "candidate"
    };
    axios(url, {
      method: "POST",
      data: data,
      responseType: "blob" //Force to receive data in a Blob Format
    })
      .then(response => {
        //Create a Blob from the PDF Stream
        const file = new Blob([response.data], { type: "application/pdf" });
        //Build a URL from the file
        const fileURL = URL.createObjectURL(file);
        //Open the URL on new Window
        window.open(fileURL);
      })
      .catch(error => {
        console.log(error);
      });
  }
  printResponse(status) {
    //const [startDate] = useState(null);
    if (status == "awaited" || status == "pending") {
      return (
        <Table bordered>
          <tr>
            <td style={item}>Your Email : {this.state.email}</td>
          </tr>
          <tr>
            <td style={item}>Your Status : {status}</td>
          </tr>
          

          <tr>
            {" "}
            <td style={item}>
              Schedule Date :
              <DatePicker
                value={this.state.date}
                selected={this.state.startDate}
                onChange={date => this.setStartDate(date)}
                minDate={new Date()}
                showDisabledMonthNavigation
              />
            </td>
          </tr>

          <tr>
            <td style={item}>
              Upload Resume :<br />
              <input
                type="file"
                style={item}
                name="file"
                onChange={this.onChangeHandler}
              />
            </td>
          </tr>
          <tr>
            <td>
              <Button variant="light" style={btn} onClick={this.handleSchedule}>
                Schedule Interview
              </Button>
            </td>
          </tr>
        </Table>
      );
    } else {
      if (status == "scheduled")
        return (
          <Table bordered>
            <tr>
              <td style={item}>Your Interview has been scheduled!! </td>
            </tr>
            <tr>
              <td style={item}>
                Come back later to check your Feedback Report!!{" "}
              </td>
            </tr>
            <tr>
              <td style={item}>All the BEST!! </td>
            </tr>
          </Table>
        );
      else {
        if (status == "completed") {
          return (
            <Table bordered>
              <tr>
                <td style={item}>Your Email : {this.state.email}</td>
              </tr>
              <tr>
                <td style={item}>Your Status : {status}</td>
              </tr>
              
              <tr>
                <td style={item}>Position : {this.state.position}</td>
              </tr>
              <tr>
                <td style={item}>
                  <ButtonToolbar>
                    <Button
                      style={{ marginRight: "auto" }}
                      variant="light"
                      style={btn}
                      id={this.state.email}
                      onClick={this.handleReport}
                    >
                      Download Feedback report!
                    </Button>
                  </ButtonToolbar>
                </td>
              </tr>
            </Table>
          );
        }
      }
    }
  }
  render() {
    /*  let response = {
      name: "Kanika Khanna",
      status: "completed",
      company: "IBM"
    };*/
    let display;
    let status = this.state.status;
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
            <td width="400"></td>
            <td style={para} width="700">
              {this.printResponse(status)}
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
export default HomeStudent;
