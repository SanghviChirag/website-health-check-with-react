import React, { Component } from "react";
import axios from "axios";
import { Card, Header, Form, Input, Button } from "semantic-ui-react";

let endpoint = "http://34.239.125.132:8080";

class WebsiteChecker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      URL: "",
      checkInterval: "",
      websites: [],
      websiteStatus: [],
    };
  }

  componentDidMount() {
    this.getWebsites();
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSubmit = () => {
    let { URL, checkInterval } = this.state;
    
    if (URL && checkInterval && parseInt(checkInterval)) {
      axios
        .post(
          endpoint + "/register",
          {
            websites: [
              {
                URL: URL,
                checkInterval: parseInt(checkInterval),
                method: "GET",
                expectedStatusCode: 200
              }
            ],
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(res => {
          this.getWebsites();
          this.setState({
            URL: "",
            checkInterval: ""
          });
          console.log(res);
        });
    }else{
      alert("URL or Interval is missing. Also Make sure Interval is numeric value.");
    }
    
  };

  getWebsites = () => {
    axios.get(endpoint + "/websites").then(res => {
      console.log(res);
      if (res.data) {
        this.setState({
          websites: res.data.map(item => {
            console.log(item)

            return (
              <Card key={item.ID} fluid>
                <Card.Content>
                  <Card.Header>
                    <div style={{ wordWrap: "break-word", textAlign: "left" }}>Website: { item.URL }</div>
                    <div style={{ wordWrap: "break-word", textAlign: "right" }}>Interval (in sec): { item.CheckInterval }</div>
                  </Card.Header>
                </Card.Content>
                <Card.Meta textAlign="right">
                  <Button color="blue" onClick={() => {this.getWebsiteStatus(item.ID)}}>Show Status</Button>
                </Card.Meta>
              </Card>
            );
          })
        });
      } else {
        this.setState({
          websites: []
        });
      }

    });
  };

  getWebsiteStatus = (webId) => {

    axios.get(endpoint + "/website/" + webId).then(res => {
      console.log(res);
      if (res.data) {
        this.setState({
          websiteStatus: res.data.map(item => {
            console.log(item)
            
            let color = "red";
            if (item.IsSuccess) {
              color = "green";
            }

            let dateobj = new Date(Date.parse(item.WebsiteCheckDateTime))
            return (
              <Card.Meta>
                <div style={{ wordWrap: "break-word", textAlign: "left", color: color }}>
                  { dateobj.toDateString() } { dateobj.toTimeString() }
                </div>
              </Card.Meta>    
            );
          })
        });
      } else {
        this.setState({
          websites: []
        });
      }

    });
  };

  render() {
    return (
      <div>
        <div className="row">
          <Header className="header" as="h2">
            Website Health Checker
          </Header>
        </div>
        <div className="row">
          <Form onSubmit={this.onSubmit}>
            <Input
              type="text"
              name="URL"
              onChange={this.onChange}
              value={this.state.URL}
              fluid
              placeholder="Enter URL"
              className="col-50"
            />
            <Input
              type="text"
              name="checkInterval"
              onChange={this.onChange}
              value={this.state.checkInterval}
              fluid
              placeholder="Interval"
            />
            <Button color="blue">Register Website</Button>
          </Form>
        </div>
        <hr></hr>
        <div className="row">
          <Card.Group>{this.state.websites}</Card.Group>
        </div>
        <hr></hr>
        <div className="row">
          <Card.Group>
          <Card key="website-status" fluid style={{ display: (this.state.websiteStatus.length? "block": "none") }}>
            <Card.Content>
              {this.state.websiteStatus}
            </Card.Content>
          </Card>
          </Card.Group>
        </div>
      </div>
    );
  }
}

export default WebsiteChecker;
