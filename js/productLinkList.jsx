window.ProductLinkList = React.createClass({
	render: function(){
		return (
			<ul className="list-unstyled">
				{
					this.props.links.map( function( link, i ){
						return (
							<li key={i}>
								<ProductLink link={link}/>
							</li>
						);
					})
				}
			</ul>
		);
	}
});