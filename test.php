<?php


$data = array("name" => "Robot", "msg" => "Hello everyone, I'm talking to you via PHP script! ", "room" => "Room Manarola");                                                                    
$data_string = json_encode($data);
                                                                               
                                                                                                                     
$ch = curl_init('http://localhost:8080/send/helloFromPhp');                                                                      
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");                                                                     
curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);                                                                  
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);                                                                      
curl_setopt($ch, CURLOPT_HTTPHEADER, array(                                                                          
    'Content-Type: application/json',                                                                                
    'Content-Length: ' . strlen($data_string))                                                                       
);                                                                                                                   
          

// grab URL and pass it to the browser
curl_exec($ch);

// close cURL resource, and free up system resources
curl_close($ch);

?>