<!-- <link rel="stylesheet" type="text/css" href="assets/css/media-view.css"> -->
<div id="dbwp5_wrap_content">
	<div id="dbwp5_content" class="content"></div>
</div>
<script type="text/template" id="dbwp5-wp-items">
	<% _.each(data, function(val) { %>  
		<div class="item">
			<a href="" title="">
				<img src="<%= val.thumb %>" align="<%= val.title %>">
			</a>
		</div> 
	<% }); %>
</script>