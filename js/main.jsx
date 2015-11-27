$(function(){
	$.getJSON( "/data/productInfo.json", function( data ){
		ReactDOM.render( <App data={data}/>, $( '#app' )[0] );
	});
});