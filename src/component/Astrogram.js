import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import{ faSpaceShuttle} from '@fortawesome/free-solid-svg-icons';


export default class Astrogram extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    title: "Planets",
    explanation: "",
    url: "",
    mediaType: "",
    query: "",
    photos: []
  };

  componentDidMount() {
    this.loadDefault();
  }

  searchPhotos() {
    const newArr = [];
    console.log(this.state.query)
    if(this.state.query === "")
      this.setState({title: "?"})
    else
      this.setState({title: this.state.query.toUpperCase()})

    fetch(
      "https://images-api.nasa.gov/search?q=" +
        this.state.query +
        "&media_type=image"
    )
      .then((response) => response.json())
      .then((data) => {
        for (let i = 0; i < data.collection.items.length; i++) {
          newArr.push(data.collection.items[i].links[0]);
        }
        this.setState({ photos: newArr });
        console.log(this.state.photos);
      });
  }

  loadDefault() {
    const newArr = [];
    fetch("https://images-api.nasa.gov/search?q=" + this.state.title + "&media_type=image")
      .then((response) => response.json())
           .then((data) => {
        for (let i = 0; i < 30; i++) {
          newArr.push(data.collection.items[i].links[0]);

                }
        this.setState({ photos: newArr });
        console.log(this.state.photos);
      });
  }

  handleChange = (event) => {
    this.setState({ query: event.target.value });

  };

  handleSubmit = (event) => {
    this.searchPhotos();
 
    event.preventDefault();
  };
  handleVideo() {}

  handleImage() {}

  render() {
    return (
      <div>
        <header className="banner">
          <h1 className="alignleft logo">ASTROGRAM</h1>

          <h1 className="aligncenter">Discover the Cosmos!</h1>
        </header>

        <div className="searchbox">
          <form onSubmit={this.handleSubmit}>
            <label>
              Discover
            
              <input
                type="text"
                value={this.state.query}
                onChange={this.handleChange}
                placeholder="Discover..."
                
              />
              
            </label>
            
            <button type="submit"><i className="fa fa-space-shuttle fa-2x"></i></button>
          
           
            
           
          </form>
          
        </div>

        <div className="title">
          <h1>{this.state.title}</h1>
     
        </div>

        <div className="searchResults">
          {this.state.photos.map((item, idx) => (
            <img src={item.href} alt="image" key={idx}></img>
          ))}
          );
        </div>

 
        <footer>
          <h2>
            {" "}
            Image Source - NASA Image and Video Library API{" "}
          </h2>
          <a href={"https://images.nasa.gov/docs/images.nasa.gov_api_docs.pdf"} target={"_blank"}>
            Nasa API
          </a>
        <br></br>
            <h2 className="fa fa-copyright"> JonShawTech</h2>

        </footer>
      </div>
    );
  }
}
