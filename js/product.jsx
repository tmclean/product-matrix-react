window.Product = React.createClass({
	render: function(){
		return (
			<tr>
				<th>{this.props.product.name}</th>
				<td>
					<ProductLinkList links={this.props.product.generalLinks}/>
				</td>
				<td>
					{this.props.product.release.date}
				</td>
				<td>
					<ProductLink link={this.props.product.release}/>
				</td>
				<td>
					<ProductLink link={this.props.product.development}/>
				</td>
				<td>
					<ProductInstallersTable installers={this.props.product.installers} filter={this.props.filter}/>
				</td>
			</tr>
		);
	}
});