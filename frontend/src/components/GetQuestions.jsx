import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import NavBar from "./leftbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Route } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-router-dom";
import swal from "sweetalert";
import ListGroup from "react-bootstrap/ListGroup";

class GetQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: [],
      answers: [],
      email: "",
      selectedOption : "1",
      radio:[],
      j:0
    };
  }
  componentDidMount() {
    const { result } = this.props.location.state;
    console.log("passed value is ", result);
    let currentComponent = this;
    currentComponent.setState({
      //pname: result.pname,
      //desc: result.desc,
      //skills: result.skills,
      //jobid: result.jobid
    });
    let email = result.email;
    this.state.email = email;
    let data = {
      email: email,
      intervieweremail: localStorage.getItem("email")
    };
    //console.log("jobid is ", jobid);
    let url = "http://ec2-54-67-61-55.us-west-1.compute.amazonaws.com/getQuestions";
     axios
      .post(url, data)
      .then(response => {
        console.log("response is..........", response.data);
        this.setState({
          skills: response.data.result[0].skills
        });
        
      })
      .catch(err => console.log(err));
    // let response = {
    //   skills:["Java","MongoDB","Kafka","React"]
    // };
    // this.setState({
    //   skills: this.state.skills.concat(response.skills)
    // });
    
  }

  updateAnswers(skills, value){
    let answers = this.state.answers;
    let i = -1;
    let flag = 0;
    let an = this.state.answers.map(answers => {
      i = i+1;
      if(answers.skills == skills){
        this.state.answers[i].value = value;
        flag = 1;
      }
    });
    let data={}
    if(flag == 0){
      let data = {
        skills:skills,
        value: value
      }
      this.state.answers.push(data);
    }
    console.log(this.state.answers)
  }

  onInputChange = (e) => {
    let change = this.state.radio;
    let checked = false;
    let nexState = change.map(change => {
      if (change.skills !== e.target.name) return change;
      return {
        ...change,
        options: change.options.map(opt => {
          checked = opt.value === Number(e.target.value);
          if(checked == true){
            console.log(e.target.name)
            console.log(e.target.value)
            this.updateAnswers(e.target.name, e.target.value);
          }
          return {
            ...opt,
            selected: checked
          }

        })
      }
    });
    this.setState({ radio: nexState })
    console.log(this.state.radio);
  }

  submitForm = (changeEvent) => {
    let url = "http://ec2-54-67-61-55.us-west-1.compute.amazonaws.com/SubmitAnswers";
    let data = {
      email: this.state.email,
      answers: this.state.answers
    }
    console.log(data)
    axios
      .post(url, data)
      .then(response => {
        console.log("response is..........", response.data);
        swal("Answers Submitted", "", "success");
      })
      .catch(err => console.log(err));
  }

  render() {
    let skills = this.state.skills;
    let redirectVar = null;
    
    let radio = []
    let i=1;
    let options

    if(this.state.j==0 && this.state.skills.length != 0){
      this.state.skills.push('Communication Skills');
        this.state.skills.push('Fit for the team');
        this.state.skills.push('Company Knowledge');
        this.state.j = 1;

    }

    let questions_answers = this.state.skills.map(skills => {
      
      options = []
      i = 1;
      while(i < 6){
          let data={
            value: i
          };
        options.push(data);
        i=i+1
      }
      let merge = {
        skills: skills,
        options: options
      }
      radio.push(merge);
    });
    console.log(radio);
    this.state.radio = radio;
    
    return (
      <div>
        {" "}
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
        <Table bordered>
          <tr>
            <td width="100%">Please rate the candidate on the basis of following skills:
            <br/>Rate from 1-5
            <br/>1 -> Not applicable
            <br/>2 -> Does not meet requirement
            <br/>3 -> Can Learn with Training
            <br/>4 -> Meets Requirements
            <br/>5 -> Exceeds Expectations</td>
          </tr>
          <tr>
            <th>Skills</th>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
          </tr>
        
        {
          radio.length < 1 ? "Loading..." :
            <Table style={{display: "table-row-group"}}>
              {radio.map((card, idx) => (
                <tr>
                  <td>
                  {card.skills}
                  </td>
                  
                  {
                    card.options.map((lo, idx) => {
                        return <td> <input
                        key={idx}
                        type="radio"
                        name={card.skills}
                        value={lo.value}
                        onChange={this.onInputChange}/></td>
                    })
                  }
                  
                </tr>
              ))
              }
              
            </Table>
        }
        <div style={{width: "150%",}}>
        <Button
                  variant="light"
                  style={btn}
                  onClick={this.submitForm}
                >
                  Submit Form
                </Button></div>
                </Table>
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
const para = {
  fontfamily: "Arial, Helvetica, sans-serif",
  fontSize: 30,
  textAlign: "center",
  padding: 10,
  margin: 10,
  display: "inline-block",
  verticalAllign: "middle"
};
const para1 = {
  fontfamily: "Arial, Helvetica, sans-serif",
  fontSize: 20,
  textAlign: "center",
  padding: 10,
  margin: 10,

  verticalAllign: "middle"
};
const tabletext = {
  textAlign: 'right', 
  alignSelf: 'stretch'
};
const btn = {
  color: "#bd0d39",
  fontFamily: "Arial, Helvetica, sans-serif",
  fontStyle: "normal"
};
export default GetQuestions;