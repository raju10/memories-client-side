import React from "react";
const likes = 0;
const dislikes = 0;
const btnStyle = {
  margin: "40px",
  border: "5px solid pink",
  background: "red",
};
const btnDefault = {};

class LikeDislike extends React.Component {
  constructor(props) {
    super(props);

    this.likeHandler = this.likeHandler.bind(this);

    this.dislikeHandler = this.dislikeHandler.bind(this);

    this.state = {
      likeCount: likes,
      dislikeCount: dislikes,
    };
  }

  render() {
    return (
      <div>
        <div>{this.props.headerProp}</div>

        <div>
          <span>
            <button
              style={this.state.likeCount !== likes ? btnStyle : btnDefault}
              onClick={this.likeHandler}
            >
              Like
            </button>{" "}
            {this.state.likeCount}
          </span>

          {/* <span>
            <button
              style={
                this.state.dislikeCount !== dislikes ? btnStyle : btnDefault
              }
              onClick={this.dislikeHandler}
            >
              Dislike
            </button>{" "}
            {this.state.dislikeCount}
          </span> */}
        </div>
      </div>
    );
  }

  likeHandler() {
    if (this.state.likeCount === likes) {
      this.setState((state) => ({
        likeCount: state.likeCount + 1,
        dislikeCount: dislikes,
      }));
    }
  }

  dislikeHandler() {
    if (this.state.dislikeCount === dislikes) {
      this.setState((state) => ({
        dislikeCount: state.dislikeCount + 1,
        likeCount: likes,
      }));
    }
  }
}

LikeDislike.defaultProps = {
  headerProp: "Header Section",

  contentProp: "Content area",
};

export default LikeDislike;
