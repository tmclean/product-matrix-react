window.ProductFilterBar = React.createClass({
	
	extractUniqueOSList: function(){

		var list = [];

		_.each( this.props.products, function( product ){

			_.each( product.installers, function( installer ){

				if( !_.contains( list, installer.os ) ){
					list.push( installer.os );
				}

			}, this);

		}, this);

		return list;
	},

	extractUniqueArchList: function(){

		var list = [];

		_.each( this.props.products, function( product ){

			_.each( product.installers, function( installer ){

				if( !_.contains( list, installer.arch ) ){
					list.push( installer.arch );
				}

			}, this);

		}, this);

		return list;
	},

	extractUniqueProductNames: function(){

		var list = [];

		_.each( this.props.products, function( product ){

			if( !_.contains( list, product.name ) ){
				list.push( product.name );
			}

		}, this);

		return list;
	},

	onFilterChange: function(){

		var productNames = [];
		var osList = [];
		var archList = [];

		$("input[name='productNameFilter']:checked").map( function( i, chk ){ 
			productNames.push( chk.value ) 
		});

		$("input[name='osFilter']:checked").map( function( i, chk ){ 
			osList.push( chk.value ) 
		});

		$("input[name='archFilter']:checked").map( function( i, chk ){ 
			archList.push( chk.value ) 
		});

		var filter = {};

		if( productNames.length > 0 ){
			filter.productNames = productNames;
		}

		if( osList.length > 0 ){
			filter.osList = osList;
		}

		if( archList.length > 0 ){
			filter.archList = archList;
		}

		this.props.filterCallback( filter );
	},

	render: function(){

		var uniqueProductNames = this.extractUniqueProductNames().sort();
		var uniqueOSList       = this.extractUniqueOSList().sort();
		var uniqueArchList     = this.extractUniqueArchList().sort();

		return (
			<form>
				<fieldset>
					<div className="form-group">
						<label>Product Name</label>
						{
							uniqueProductNames.map( function( name, i ){ 
								return (
									<div className="checkbox" key={i}>
										<label>
											<input type="checkbox" name="productNameFilter" value={name} onChange={this.onFilterChange}/>&nbsp;{name}
										</label>
									</div>
								); 
							}, this)
						}
					</div>
				</fieldset>
				<fieldset>
					<div className="form-group">
						<label>OS</label>
						{
							uniqueOSList.map( function( os, i ){ 
								return (
									<div className="checkbox" key={i}>
										<label>
											<input type="checkbox" name="osFilter" value={os} onChange={this.onFilterChange}/>&nbsp;{os}
										</label>
									</div>
								); 
							}, this)
						}
					</div>
				</fieldset>
				<fieldset>
					<div className="form-group">
						<label>Architecture</label>
						{
							uniqueArchList.map( function( arch, i ){ 
								return (
									<div className="checkbox" key={i}>
										<label>
											<input type="checkbox" name="archFilter" value={arch} onChange={this.onFilterChange}/>&nbsp;{arch}
										</label>
									</div>
								); 
							}, this)
						}
					</div>
				</fieldset>
			</form>
		);
	}
});