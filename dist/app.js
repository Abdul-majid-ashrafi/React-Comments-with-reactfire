"use strict";

var config = {
  apiKey: "AIzaSyCXs2qMUazezjisKUS2ICNAKbasCkJdGDQ",
  authDomain: "react-sample-17caa.firebaseapp.com",
  databaseURL: "https://react-sample-17caa.firebaseio.com"
};
firebase.initializeApp(config);

var CommentList = React.createClass({
  displayName: "CommentList",

  render: function render() {
    var commentNodes = this.props.data.map(function (comment, index) {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "table",
          null,
          React.createElement(
            "tr",
            null,
            React.createElement(
              "h3",
              null,
              React.createElement(
                "a",
                { href: "javascript:void(0)" },
                comment.author
              )
            ),
            React.createElement("br", null),
            React.createElement(
              "td",
              null,
              comment.text
            )
          )
        )
      );
    });
    return React.createElement(
      "div",
      { className: "commentList" },
      commentNodes
    );
  }
});

var CommentForm = React.createClass({
  displayName: "CommentForm",

  handleSubmit: function handleSubmit(event) {
    event.preventDefault();
    this.props.onCommentSubmit({
      author: this.refs.author.value.trim(),
      text: this.refs.text.value.trim()
    });
    this.refs.author.value = '';
    this.refs.text.value = '';
  },
  render: function render() {
    return React.createElement(
      "form",
      { className: "form-group", onSubmit: this.handleSubmit },
      React.createElement("input", { type: "text", placeholder: "Your name", ref: "author", "class": "form-control" }),
      React.createElement("input", { type: "text", placeholder: "Say something...", ref: "text", "class": "form-control" }),
      React.createElement("input", { type: "submit", value: "Post" })
    );
  }
});

var CommentBox = React.createClass({
  displayName: "CommentBox",

  mixins: [ReactFireMixin],
  handleCommentSubmit: function handleCommentSubmit(comment) {
    this.firebaseRefs['data'].push(comment);
  },
  componentWillMount: function componentWillMount() {
    this.bindAsArray(firebase.database().ref('commentsBox'), 'data');
    // Here we bind the component to Firebase and it handles all data updates,
    // no need to poll as in the React example.
  },
  render: function render() {
    return React.createElement(
      "div",
      { className: "commentBox" },
      React.createElement(
        "h1",
        null,
        "Comments"
      ),
      React.createElement(CommentList, { data: this.state.data }),
      React.createElement(CommentForm, { onCommentSubmit: this.handleCommentSubmit })
    );
  }
});
ReactDOM.render(React.createElement(CommentBox, null), document.getElementById('root'));