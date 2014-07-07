<?php
    if(!empty($_GET))
    {
    	include('myconf.php');
    	
        if (isset($conn) && $conn)
        {
            if(!empty($_GET) && isset($_GET['add'])) 
            {
                $newitem = $_GET['add'];
                if ($newitem != "")
                {
                    $result = null;
                    $xmlUrl = "http://gdata.youtube.com/feeds/api/videos/".$newitem;
                    
                    try
                    {
	                    if (($xmlStr = @file_get_contents($xmlUrl))) {
		                    $xmlObj = simplexml_load_string($xmlStr);
		                    $arrXml = get_object_vars($xmlObj);
		                    $title = $arrXml['title'];
		
		                    $query = "SELECT MAX(score) FROM entries";
		                    $results = mysql_query($query); 
		                    $scorerows = mysql_fetch_row($results);
		                    $maxscore = $scorerows[0] + 1; 
		                    
		                    $query = "INSERT INTO entries (url, score, title) VALUES ('$newitem', '$maxscore', '$title')";
		                    $result = mysql_query($query);
	                    }
                    }
                    catch (Exception $e)
                    {
                    	$result = null;
                    }
               
		            if ($result)
		            {
		            	echo
						"   		 <a class=\"thumbnail-container\">
							        <div class=\"edit-mode-border\">
							            <div class=\"edit-bar\">
							                <!--div class=\"pin\" title=\"Keep on this page\"></div-->
							                <textarea class=\"spacer\" rows=\"1\" readonly=\"readonly\">$title</textarea>
							                <div class=\"remove\" title=\"Remove\" id></div>
							            </div>
							            <span class=\"thumbnail-wrapper\" style=\"background-image: url(https://img.youtube.com/vi/$newitem/1.jpg); \">
							                <span class=\"thumbnail\" id=\"$newitem\"></span>
							            </span>
							        </div>
							        </a>
						";
               		}
               		return ;
                }
            }
        }
    }
?>
