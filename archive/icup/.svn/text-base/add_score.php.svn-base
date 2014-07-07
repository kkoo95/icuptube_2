<?php
   include ('myconf.php');
   	
   if(!empty($_GET))
   {		
        if (isset($_GET['add_score'])) {
            $item = $_GET['add_score'];
            
            if ($item != "" && strlen($item) < 15)
            {
               $query = "UPDATE entries SET score = score + 1 WHERE url = '$item'";
               
               $result = mysql_query($query);
               
               if (!$result) {
                    $message  = 'Invalid query: ' . mysql_error() . "\n";
                    $message .= 'Whole query: ' . $query;
                    die($message);
               }

               }
            }
        
    }	

?>