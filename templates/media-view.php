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
<script type="text/template" id="designit-wordpress5-plugin_login_tmpl">
<div id="designit-wordpress5-plugin" class="designbold-wrapper">
    <a href="javascript:" id="designbold_login" onclick="DBWP5.designbold_login()" class="login center_horizontally_vertically"><span class="db-text">
    Login</span></a>
</div>
</script>
<script type="text/template" id="designit-wordpress5-plugin_main_tmpl">
    <div id="designit-wordpress5-plugin" class="designbold-wrapper"><h1>Đăng nhập thành công</h1></div>
</script>

