<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html lang="en">

<head>
    <title>ICUP</title>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <link rel="stylesheet" type="text/css" href="style/default.css">
    <link rel="stylesheet" type="text/css" href="style/jquery-ui.custom.css">
    <script type="text/javascript" src="js/jquery-dev.js"></script>
    <script type="text/javascript" src="js/jquery-ui.js"></script>
    <script type="text/javascript" src="js/jquery-color.js"></script>
    <script type="text/javascript" src="js/main.js"></script>
</head>

<body>
<div id="header">
  <div id="inner-header">
    <a id="logo" href="/">
        <img src="resources/images/icup_logo.png" alt="icup logo">
    </a>
    <div id="menu" class="ui-corner-all">
        <a class="ui-corner-all" href="?new=1">Newest</a>
        <a class="ui-corner-all" href="?top=1">Top</a>
        <a class="ui-corner-all" id="bacon" href="http://www.youtube.com/user/EpicMealTime" target="_blank">BACON!</a>
        <a class="ui-corner-all" href="http://www.youtube.com" target="_blank">Youtube</a>
        <a class="ui-corner-all" href="resources/radio.pls">Radio</a>
        <div id="video_form">
            <form id="add_video_form"  action="/">
                <input type="search" placeholder="Youtube Video ID" name="add" id="searchfield"/>
                <input type="submit" value="Add" class="ui-corner-all"></input>
            </form>
            <span id="inputBackground"></span>
        </div>
        <span class="clear"></span>
    </div>
  </div>
</div>
<div id="contents">
    <ul id="thumbnails">
<?php
        include('myconf.php');

        if (isset($conn) && $conn)
        {
            $query = "SELECT * FROM entries ORDER BY id DESC";

            if (!empty($_GET) && isset($_GET['top']))
            {
               $query = "SELECT * FROM entries ORDER BY score DESC";
            }
            if (!empty($_GET) && isset($_GET['new']))
            {
               $query = "SELECT * FROM entries ORDER BY id DESC";
            }

            $results = mysql_query($query);

            if  ($results)
            {
                while ($entry = mysql_fetch_row($results))
                {
                    echo
"        <a class=\"thumbnail-container\">
        <div class=\"edit-mode-border\">
            <div class=\"edit-bar\">
                <!--div class=\"pin\" title=\"Keep on this page\"></div-->
                <textarea class=\"spacer\" rows=\"1\" readonly=\"readonly\">${entry[1]}</textarea>
                <div class=\"remove\" title=\"Remove\" id></div>
            </div>
            <span class=\"thumbnail-wrapper\" style=\"background-image: url(https://img.youtube.com/vi/${entry[2]}/1.jpg); \">
                <span class=\"thumbnail\" id=\"{$entry[2]}\"></span>
            </span>
        </div>
        </a>
";
                }
            }
        }
?>
        <a class="clear"></a>
    </ul>
</div>
<div id="footer">
	<div id="inner-footer">
		<span>
		icup.fr: <a href="http://www.facebook.com/l.CeD.l" target="_blank"/>Ced</a> & <a href="http://www.facebook.com/kikoolol" target="_blank">Jojo</a>
		</span>
	</div>
</div>
</body>

<div id="dialog-modal" title="Error">
	<p>Couln't add the video. Please verify the ID or the video already exists.</p>
</div>

</html>
