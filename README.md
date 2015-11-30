# webcam.js
Easy to use jquery plugin for interfacing with a web camera using HTML5 Web Api. Designed to be simple, flexible and effective without getting in your way. 

webcam.js provides the following
* snapshot the current frame in the webcam
* playing/pausing the webcam stream
* graceful error handling

To declare your interface to a webcam you have three options when it comes to declaring it in your html

1.)
```
  <div webcam></div>
```

2.) 
```
 <div class="webcam"></div>
```

3.)
```
<webcam></webcam>
```

Once you have it declared in your html you have two options when it comes to starting the plugin up.

1.)
```
 $(document).webcam(); // search the entire document for webcam elements
```

2.) 
```
  $("#mywebcam").webcam(); // specifically target element
```


Note: THE USER MUST ALLOW THE SCRIPT TO ACCESS THE WEB CAM. This prompt is automatically brought up as soon as we start interfacing with the webcam.
Note: In the event of any error or blockage, webcam.js will automatically append a message inside the webcam element with a predefined error message. This message has a class of "webcam-message"


Snapshotting the current frame of the webcam ( using jquery )
```
  var imageData = $("#mywebcam").webcam("snapshot");
  $("#outputImage").attr("src", imageData);
```

Pausing the webcam stream
```
 $("#mywebcam").webcam("pause");
```

Playing the webcam stream
```
 $("#mywebcam").webcam("play");
```