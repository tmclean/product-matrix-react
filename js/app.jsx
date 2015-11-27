window.App = React.createClass({

	getInitialState: function(){
		return { filter: {} };
	},

	handleFilterUpdate: function( filter ){
		this.setState({ filter: filter });
	},

	testInstallerByArchList: function( installer, archList ){

		var isMatch = false;

		if( archList && archList.length > 0 )
		{
			archList.map( function( arch ){

				if( installer.arch === arch ){
					isMatch = true;
				}
			});
		}
		else
		{
			isMatch = true;
		}

		return isMatch;
	},

	filterProducts: function( products, filter ){

		console.log( products );

		var filteredProducts = products;

		if( filter.productNames && filter.productNames.length > 0 ){

			filteredProducts = filteredProducts.filter( function( product ){
				
				var isMatch = false;

				filter.productNames.map( function( name ){
					if( product.name === name ){
						isMatch = true;
					}
				});

				return isMatch;
			});
		}

		filteredProducts = filteredProducts.filter( function( product ){

			var isMatch = false;
			
			product.installers.map(function( installer ){

				if( filter.osList && filter.osList.length > 0 ){

					filter.osList.map( function( os ){

						if( installer.os === os && !isMatch ){

							isMatch = this.testInstallerByArchList( installer, filter.archList );
						}

					}, this );
				}
				else if( !isMatch ){

					isMatch = this.testInstallerByArchList( installer, filter.archList );
				}

			}, this );
			
			return isMatch;

		}, this);

		return filteredProducts;
	},

	render: function(){
		
		var filter = this.state.filter;

		var origProducts = this.props.data.products;

		var filteredProducts = this.filterProducts( origProducts, filter );

		filteredProducts.sort( function( a, b ){
			return a.name.localeCompare( b.name );
		});

		return (
			<div className="row-fluid">
				<div className="col-md-2">
					<ProductFilterBar products={origProducts} filterCallback={this.handleFilterUpdate}/>
				</div>
				<div className="col-md-10">
					<ProductTable products={filteredProducts} filter={filter}/>
				</div>
			</div>
		);
	}
});