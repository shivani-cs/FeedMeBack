import React, { Component } from "react";
import FontAwesome from 'react-fontawesome'
import Dropdown from './DropDown.jsx'
import Table from "react-bootstrap/Table";
import axios from "axios";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBNavLink,
  MDBIcon
} from "mdbreact";
import "mdbreact/dist/css/mdb.css";
import { BrowserRouter as Router } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import GoogleLogin from 'react-google-login';
import "mdbreact/dist/css/mdb.css";

let p = "";
class Login extends Component {
  constructor(props) {
    super(props);
    p = props;
    this.state = {
      
    listOpen: false,
    title : "",
    headerTitle: this.props.title,
    company: "",
      collapse: false,
      isSignedIn: false,
      role: [
          {
              id: 0,
              title: 'Admin',
              selected: false,
              key: 'role'
          },
          {
            id: 1,
            title: 'Interviewer',
            selected: false,
            key: 'role'
          },
          {
            id: 2,
            title: 'Student',
            selected: false,
            key: 'role'
          }
        ],
      gender: [
          {
              id: 0,
              title: 'male',
              selected: false,
              key: 'gender'
          },
          {
            id: 1,
            title: 'female',
            selected: false,
            key: 'gender'
          }
        ],
    };
    this.onClick = this.onClick.bind(this);

  }
  onClick() {
    this.setState({
      collapse: !this.state.collapse
    });
  }

  onSuccess() {
    this.setState({
      isSignedIn: true
    })
  }

  handleClickOutside(){
    this.setState({
      listOpen: false
    })
  }

  login(response) {
    console.log("Google Response: "+JSON.stringify(response));
    console.log(localStorage.getItem('company'));
    console.log("Gender: "+localStorage.getItem('gender'));
    console.log(response);
    let data = {
      name: response.profileObj.name,
      email: response.profileObj.email,
      usertype: this.state.title.toLowerCase(),
      company: localStorage.getItem('company'),
      gender: localStorage.getItem('gender')
    }
    console.log(data);
    let url = "http://ec2-54-67-61-55.us-west-1.compute.amazonaws.com/login";
     axios
      .post(url, data)
      .then(response => {
        console.log("response is..........", response.data);
        localStorage.setItem("name",data.name);
        localStorage.setItem("email",data.email);
        localStorage.setItem("company",data.company);
        localStorage.setItem("usertype",data.usertype.toLowerCase());
        console.log()
        if(data.usertype == "admin")
          p.history.push("/homeAdmin");
        else if(data.usertype == "interviewer")
          p.history.push("/homeInterviewer");
        else if(data.usertype == "student")
          p.history.push("/homeStudent");
      })
      .catch(err => console.log(err));
  }

  resetThenSet = (id, key) => {
    let temp = JSON.parse(JSON.stringify(this.state[key]))
    temp.forEach(item => item.selected = false);
    temp[id].selected = true;
    this.setState({
      [key]: temp,
      title: temp[id].title
    });
  }

  resetGender = (id, key) => {
    let temp = JSON.parse(JSON.stringify(this.state[key]))
    temp.forEach(item => item.selected = false);
    temp[id].selected = true;
    this.setState({
      [key]: temp
    });
    localStorage.setItem('gender',temp[id].title);
  }

  handleChange = (name) => {
    this.setState({
      gender: name.target.value
    });
    localStorage.setItem('gender',name.target.value);
  }

  render() {
    const{list} = this.props
    const{listOpen, headerTitle} = this.state
    const responseGoogle = (response) => {
      if(!response.error)
      this.login(response)
    }
    const bgPink = { backgroundColor: "#e91e63" };
    const container = { height: 1300 };
      
    let drop = '';
    if(this.state.title == "Admin")
      drop = true;
    else
      drop = false;
    return (
      <div>
        <Router>
          <header>
            <MDBNavbar style={bgPink} dark expand="md" scrolling fixed="top">
              <MDBNavbarBrand href="/">
                <strong>Feed-Me-Back</strong>
              </MDBNavbarBrand>
              <MDBNavbarToggler onClick={this.onClick} />
              <MDBCollapse isOpen={this.state.collapse} navbar>
                <MDBNavbarNav right>
                  <MDBNavItem>
                    <a href="./" style={space}>
                      Features
                    </a>
                    {"    "}
                  </MDBNavItem>
                  <MDBNavItem>
                    <a href="./integration" style={space}>
                      Integration
                    </a>
                  </MDBNavItem>{" "}
                  <MDBNavItem>
                    <a href="./login" style={space}>
                      Login
                    </a>
                  </MDBNavItem>
                </MDBNavbarNav>
              </MDBCollapse>
            </MDBNavbar>
          </header>
        </Router>

        <table>
          <tr>
            <td>
              <img
                src={require("./login1.jpg")}
                width={1000}
                class="rounded"
                alt="avatar"
              />
            </td>
            <td style={{background:"#f9f9f9",padding:"10px"}}>
              <h3 style={{fontSize:"1.10rem"}}>Log In to schedule an interview and get feedbacks</h3>
              <form>
                <Dropdown
                  title="Login as"
                  list={this.state.role}
                  resetThenSet={this.resetThenSet}
                />

                <Dropdown
                  title="Gender"
                  list={this.state.gender}
                  resetThenSet={this.resetGender}
                />

                {drop ? <Results /> : null}

                <div className="App" style={{marginTop:"10px"}}>
                  <GoogleLogin

                    clientId="873380339585-lp7se9eau76buen9oa0787e285tpr42k.apps.googleusercontent.com"
                    scope="https://www.googleapis.com/auth/userinfo.profile"
                    buttonText="LOGIN WITH GOOGLE"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                  />
                </div>
                
              </form>
            </td>
          </tr>
        </table>
      </div>
    );
  }
  
  
}
class Results extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      company : ""
    }
  }

    render() {
        const list = this.props
        return (
            <div className="company"><input type="text" value={this.state.company} placeholder="Company" type="text" name="company" onChange={this.handleChange} noValidate/> </div>
        );
    }

    handleChange = (name) => {
      this.setState({
        company: name.target.value
      });
      localStorage.setItem('company',name.target.value);
    }
};
var space = {
  padding: 20,
  color: "#ffffff"
};
export default Login;
