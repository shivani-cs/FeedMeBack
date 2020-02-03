import React, { Component } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBNavLink,
  MDBContainer,
  MDBMask,
  MDBView
} from "mdbreact";
import { BrowserRouter as Router } from "react-router-dom";
import "mdbreact/dist/css/mdb.css";
class Calender extends Component {
  render() {
    return (
      <div>
        <MDBContainer className="text-center my-5">
          <table>
            <tr>
              <td width="50%" style={item}>
                <h2>Give Feedback</h2>
                <br />
                <h4>
                  Give performance feedback report at the end of the interview
                  to know what went good or wrong with the interview process.
                </h4>
              </td>
              <td width="50%">
                <img src={require("./feedback.png")} />
              </td>
            </tr>
            <br />
          </table>
          <table>
            <tr>
              <td width="50%">
                <img src={require("./calender.png")} />
              </td>
              <td width="50%" style={item}>
                <h2>Appointment scheduling made easy</h2>
                <br />
                <h4>
                  Dump old appointments books and excel sheets. With our online
                  calendar, easily reschedule and cancel appointments. Switch to
                  a modern way of appointment scheduling.
                </h4>
              </td>
            </tr>
          </table>
          <br />
          <table>
            <tr>
              <td width="50%" style={item}>
                <h2>Notify Clients</h2>
                <br />
                <h4>
                  Tired of no-shows and decreasing revenue? Send automated
                  reminders to your clients. Say bye-bye to missed appointments.
                </h4>
              </td>
              <td width="50%">
                <img src={require("./bell.png")} />
              </td>
            </tr>
          </table>
          <br />
          <table>
            <tr>
              <td width="50%">
                <img src={require("./location.png")} />
              </td>
              <td width="50%" style={item}>
                <h2>Multiple Location Access</h2>
                <br />
                <h4>
                  Keep track of what's happening at your business miles away.
                  Manage all your business activities from anywhere in the
                  world.
                </h4>
              </td>
            </tr>
          </table>
        </MDBContainer>
      </div>
    );
  }
}
const item = {
  fontfamily: "Courier New"
};
export default Calender;
