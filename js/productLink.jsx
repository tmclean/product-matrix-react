window.ProductLink = React.createClass({
	render: function(){
		return (
			<a href={this.props.link.url}>{this.props.link.name}</a>
		);
	}
});