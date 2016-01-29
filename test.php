<?php


$data = array("name" => "Robot", "msg" => "Hi guys, I'm a PHP bot !", "room" => "Room Manarola");                                                                    
$data_string = json_encode($data);
                                                                               
                                                                                                                     
$ch = curl_init('http://localhost:8080/send/helloFromPhp');                                                                      
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");                                                                     
curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);                                                                  
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);                                                                      
curl_setopt($ch, CURLOPT_HTTPHEADER, array(                                                                          
    'Content-Type: application/json',                                                                                
    'Content-Length: ' . strlen($data_string))                                                                       
);       

// small improvements suggested by unhold1799@gmail.com
curl_setopt($ch, CURLOPT_TIMEOUT, 1);                                                                                                            
         

// grab URL and pass it to the browser
echo curl_exec($ch)."\n";

// close cURL resource, and free up system resources
curl_close($ch);

?>