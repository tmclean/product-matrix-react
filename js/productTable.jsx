window.ProductTable = React.createClass({

	render: function(){

		return (
			<table className="table table-condensed">
				<thead>
					<tr>
						<th>Product Name</th>
						<th>Links</th>
						<th>Release Date</th>
						<th>Release Version</th>
						<th>Development Version</th>
						<th>Installers</th>
					</tr>
				</thead>
				<tbody>
					{this.props.products.map( function( product, i ){
						return (
							<Product product={product} key={i} filter={this.props.filter}/>
						); 
					}, this)}
				</tbody>
			</table>
		);
	}
});