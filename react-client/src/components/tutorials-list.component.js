import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import { Link } from "react-router-dom";
import "./Tutorial.css";
import DeleteIcon from '@material-ui/icons/Delete';
export default class TutorialsList extends Component {
  constructor(props) {
    super(props);
    this.retrieveTutorials = this.retrieveTutorials.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);
    this.deleteTutorial = this.deleteTutorial.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.saveTutorial = this.saveTutorial.bind(this);
    this.newTutorial = this.newTutorial.bind(this);




    this.state = {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      id: "",
      title: "",
      isTaskCompleted: null,
      showMe: false

    };
  }

  componentDidMount() {
    this.retrieveTutorials();
  }


  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }



  saveTutorial() {
    var data = {
      title: this.state.title,
      id: this.state.id
    };

    TutorialDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          isTaskCompleted: response.data.isTaskCompleted,
          submitted: true
        });
        this.refreshList();
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    this.refreshList();
  }




  updatePublished(status) {
    var data = {
      id: this.state.currentTutorial.id,
      title: this.state.currentTutorial.title,
      isTaskCompleted: this.currentTutorial.isTaskCompleted
    };

    TutorialDataService.update(this.state.currentTutorial.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentTutorial: {
            ...prevState.currentTutorial,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }






  newTutorial() {
    this.setState({
      id: null,
      title: "",
      submitted: false
    });
  }

  deleteTutorial(tutorial, index)  {
    TutorialDataService.delete(tutorial.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/tutorials');
        //The history. push() function belongs to react-router-dom and used to move from the current page to another one. 

        this.refreshList();
      })
      .catch(e => {
        console.log(e);
        this.refreshList();
      });
    this.refreshList();
  }


  operation() {
    this.setState({
      showMe: !this.state.showMe
    })
  }

  retrieveTutorials() {
    TutorialDataService.getAll()
      .then(response => {
        this.setState({
          tutorials: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveTutorials();
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });
  }

  setActiveTutorial(tutorial, index) {
    this.setState({
      currentTutorial: tutorial,
      currentIndex: index
    });


    var data = {
      id: tutorial.id,
      title: tutorial.title,
      isTaskCompleted: !tutorial.isTaskCompleted
    };

    TutorialDataService.update(tutorial.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentTutorial: {
            ...prevState.currentTutorial,
          }
        }));
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
        this.refreshList();
      });
    this.refreshList();
  }


  demo() {
    alert("dfdsf")
  }

  render() {
    const { tutorials, currentTutorial, currentIndex } = this.state;

    return (

      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <div className="container">
              <div className="submit-form">
                {this.state.submitted ? (
                  <div>

                    <button onClick={() => this.newTutorial()} className="btn btn-primary">+</button> Add a task

                  </div>
                ) : (
                  <div>
                    <button onClick={() => this.operation()} className="btn btn-primary">+</button> Add a task

                    <br />
                    <br />
                    {this.state.showMe ?
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          id="title"
                          required
                          value={this.state.title}
                          onChange={this.onChangeTitle}
                          name="title"
                        />

                        <br />
                        <button onClick={this.saveTutorial} className="btn btn-success">
                          Submit
                </button>
                      </div>
                      : null}



                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">

          <ul className="list-group">
            {tutorials &&
              tutorials.map((tutorial, index) => (
                <li>
                  <br />
                  <br />

                  <input type="checkbox" className="strikethrough" value="0" defaultChecked={tutorial.isTaskCompleted} onClick={() => this.setActiveTutorial(tutorial, index)}
                    key={index} />
                  {tutorial.isTaskCompleted ?
                    <span >
                      {tutorial.title}</span>
                    : <span>
                      {tutorial.title}</span>
                  }
                  
                  <DeleteIcon onClick={() => this.deleteTutorial(tutorial, index)} />
                </li>
              ))}
          </ul>


        </div>

      </div>
    );
  }
}
