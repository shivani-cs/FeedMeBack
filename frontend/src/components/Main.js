import React, { Component } from "react";
import { Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import Topbar from "./Topbar";
import Integration from "./Integration";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import HomeStudent from "./HomeStudent";
import HomeAdmin from "./HomeAdmin";
import AssignInterview from "./AssignInterview";
import ScheduleInterview from "./ScheduleInterview";
import ViewCandidates from "./ViewCandidates";
import HomeInterviewer from "./HomeInterviewer";
import GetQuestions from "./GetQuestions";

import { BrowserRouter as Router } from "react-router-dom";

class Main extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" exact component={LandingPage} />
        <Route path="/integration" exact component={Integration} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/home" exact component={Home} />
        <Route path="/homeStudent" exact component={HomeStudent} />
        <Route path="/homeInterviewer" exact component={HomeInterviewer} />
        <Route path="/homeAdmin" exact component={HomeAdmin} />
        <Route path="/assignInterview" exact component={AssignInterview} />
        <Route path="/scheduleInterview" exact component={ScheduleInterview} />
        <Route path="/viewcandidates" exact component={ViewCandidates} />
        <Route path="/getquestions" exact component={GetQuestions} />
      </div>
    );
  }
}
//Export The Main Component
export default Main;
