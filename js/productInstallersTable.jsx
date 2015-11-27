window.ProductInstallersTable = React.createClass({

	getDependenciesHeader: function(){

		var hasDeps = false;
		
		this.props.installers.map(function( installer, i ){
			if( !hasDeps ){
				hasDeps = installer.dependencies && installer.dependencies.length > 0;
			}
		});

		if( hasDeps ){
			return <th>Dependencies</th>
		}
	},

	getDependenciesLinkList: function( installer ){

		if( installer.dependencies && installer.dependencies.length > 0 ){
			return (
				<td>
					<ProductLinkList links={installer.dependencies}/>
				</td>
			);
		}
	},

	render: function(){

		var filter = this.props.filter;

		var filteredInstallers = this.props.installers;

		if( filter.osList && filter.osList.length > 0 )
		{
			filteredInstallers = filteredInstallers.filter( function( installer ){
				
				var isMatch = false;
				
				filter.osList.map( function( os ){
					if( installer.os === os ){
						isMatch = true;
					}
				});

				return isMatch;
			});
		}

		if( filter.archList && filter.archList.length > 0 )
		{
			filteredInstallers = filteredInstallers.filter( function( installer ){

				var isMatch = false;

				filter.archList.map( function( arch ){
					if( installer.arch === arch ){
						isMatch = true;
					}
				});

				return isMatch;
			});
		}

		return (
			<table className="table table-condensed">
				<thead>
					<tr>
						<th>OS (Arch)</th>
						{this.getDependenciesHeader()}
					</tr>
				</thead>
				<tbody>
					{
						filteredInstallers.map( function( installer, i ){
							return (
								<tr key={i}>
									<td>
										<a href={installer.url}>{installer.os} ({installer.arch})</a>
									</td>
									{this.getDependenciesLinkList( installer )}
								</tr>
							);
						}, this)
					}
				</tbody>
			</table>
		);
	}
});