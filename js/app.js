var config = {
  apiKey: "AIzaSyCXs2qMUazezjisKUS2ICNAKbasCkJdGDQ",
  authDomain: "react-sample-17caa.firebaseapp.com",
  databaseURL: "https://react-sample-17caa.firebaseio.com",
};
firebase.initializeApp(config);

var CommentList = React.createClass({
  render: function () {
    var commentNodes = this.props.data.map(function (comment, index) {
      return <div>
        <div className='list-group-item'>
        <a href="javascript:void(0)">{comment.author}</a>
        <span className='list-group-item'>{comment.text}</span>
        </div>
      </div>
    });
    return <div className='commentList'>{commentNodes}</div>;
  }
});

var CommentForm = React.createClass({
  handleSubmit: function (event) {
    event.preventDefault();
    this.props.onCommentSubmit({
      author: this.refs.author.value.trim(),
      text: this.refs.text.value.trim()
    });
    this.refs.author.value = '';
    this.refs.text.value = '';
  },
  render: function () {
    return (
      <form className='form-group' onSubmit={this.handleSubmit}>
        <input type='text' placeholder='Your name' ref='author' class="form-control" />
        <input type='text' placeholder='Say something...' ref='text' class="form-control" />
        <input type='submit' value='Post' />
      </form>
    );
  }
});


var CommentBox = React.createClass({
  mixins: [ReactFireMixin],
  handleCommentSubmit: function (comment) {
    this.firebaseRefs['data'].push(comment);
  },
  componentWillMount: function () {
    this.bindAsArray(firebase.database().ref('commentsBox'), 'data');
    // Here we bind the component to Firebase and it handles all data updates,
    // no need to poll as in the React example.
  },
  render: function () {
    return (
      <div className='commentBox'>
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});
ReactDOM.render(
  <CommentBox />,
  document.getElementById('content')
);
