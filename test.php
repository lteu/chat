<?php


$data = array("name" => "Hagrid", "age" => "36");                                                                    
$data_string = json_encode($data);


// $ch = curl_init();

// // set URL and other appropriate options
// curl_setopt($ch, CURLOPT_URL, "http://localhost:8080/send/helloFromPhp!");
// curl_setopt($ch, CURLOPT_HEADER, 0);
// curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");                                                                     
// curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);   
// curl_setopt($ch, CURLOPT_HTTPHEADER, array(                                                                          
//     'Content-Type: application/json',                                                                                
//     'Content-Length: ' . strlen($data_string))                                                                       
// );     


$data = array("name" => "Hagrid", "age" => "36");                                                                    
$data_string = json_encode($data);                                                                                   
                                                                                                                     
$ch = curl_init('http://localhost:8080/send/helloFromPhp!');                                                                      
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