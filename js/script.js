/************************* To receive all photos from Flickr API ********************************/

 function getPhotos()
 {
    var script = document.createElement("script");
    var textInput=document.getElementById("searchBox").value;
    script.type = "text/javascript";
    script.src="https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=efda484f087e884b69fa13cb65fc307e&tags="+textInput+"&format=json&jsoncallback=DisplayPhotos";
    document.getElementsByTagName("head")[0].appendChild(script);      
 }

 /************************* To display all the received photos from Flickr API ********************************/

 function DisplayPhotos(rsp) {   
   
   var checkVal= document.getElementById("searchBox").value;
   if(checkVal=="")
   {
 	alert("Please Enter Search Text.");
   }
   else{
 		removeElementsByClass('flickrImageClass');
 		removeElementsByClass('imgDiv');
 		document.getElementById("galleryContainer").style.border="";
 		document.getElementById("allImagesContainer").style.border= "5px solid gold";  
 		document.getElementById("viewGalleryButton").style.display = "block"; 
 	  
 		window.rsp = rsp; 
 	    var thumbDiv=document.getElementById("allImagesContainer");
 	    for (var i=0; i < rsp.photos.photo.length; i++)
 	    {
 	      photo = rsp.photos.photo[i];
 	      var thumbimageDiv = document.createElement("div");    	    
 	      var thumbImage = document.createElement("img");
 	      thumbImage.style="width:5% height:5%";
 	      thumbImage.src = "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_" + "t.jpg";;
 	      thumbImage.className="imageClass";
 	      thumbImage.id="photoNumber"+i;       
 	      thumbimageDiv.className="imgDiv";    
 	      thumbimageDiv.appendChild(thumbImage);
 	      thumbDiv.appendChild(thumbimageDiv);
 	    }    
    }
   }


  
 
/************************* To create Flickr Gallery ********************************/

function showGallery(){
	removeElementsByClass('flickrImageClass');
	var elems = document.getElementsByClassName("selected");
	if(elems.length==0)
		document.getElementById("galleryContainer").style.border= "";
	for (var i = 0; i < elems.length; i++) 
	{
		document.getElementById("galleryContainer").style.border= "5px solid gold";
		var flickrDiv=document.getElementById("galleryContainer");
		var flkcrimageDiv = document.createElement("div");	
		var flickrImage = document.createElement("img");
		flickrImage.src=elems[i].src;	
		flickrImage.className="flickrImageClass";
		flickrImage.id="flickrImage"+i;      
		flkcrimageDiv.appendChild(flickrImage);
		flickrDiv.appendChild(flkcrimageDiv);
	}
}



/*************************** To add event listener **********************************/
 
  document.addEventListener('click', function(e) {
  var elemId = e.target.id;
  
  if(elemId.startsWith('photoNumber')){	
	var check=document.getElementById(elemId).classList.contains("selected");	
	if(check)		 
		 document.getElementById(e.target.id).classList.remove("selected");	
	 else    
	 document.getElementById(e.target.id).classList.add("selected");
    
  }
  	 
  
  if(elemId.startsWith('flickrImage')){	  
	 enlargeImage(elemId);
  }
  
 }, false);
  
  function onEnterKey(event)
  {   
	   if (event.keyCode == 13)
	      document.getElementById('clickMe').click();
  }
 

 /****************************** To remove childs from Parent Div ****************************************/

function removeElementsByClass(className){
    var elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

/****************************** To enlarge image ****************************************/

function enlargeImage(elemId){
	
	var imageDiv = document.getElementById('largeImage');
	var img = document.getElementById(elemId);
	var largeImg = document.getElementById("img01");
	img.onclick = function(){
		imageDiv.style.display = "block";
		largeImg.src = img.src;	 
	}
	
	var span = document.getElementsByClassName("close")[0];	
	span.onclick = function() { 
		imageDiv.style.display = "none";
	}	
}