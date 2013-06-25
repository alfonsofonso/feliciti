/**
 * Created by JetBrains WebStorm.
 * User: alfonso
 * Date: 17/06/13
 * Time: 19:03
 * To change this template use File | Settings | File Templates.
 */
var map;
var comentario="B)";
var feliz=true;
var posicion;
var infoW;


function detectBrowser() {
    var useragent = navigator.userAgent;
    var mapdiv = document.getElementById("map-canvas");

    if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 ) {
        mapdiv.style.width = '100%';
        mapdiv.style.height = '100%';
    } else {
        mapdiv.style.width = '100%';
        mapdiv.style.height = '100%';
    }

}

function atras(){
    $("#containerHappy").css("display","block");
    $("#containerUngry").css("display","block");
    $("#map-canvas").css("display","none");
    map=null;
    $("#por").val("why?");
    $("#backButton").css("display","none");

}

function soyFeliz(e){
    console.log("soyFeliz");
    feliz=true;
    $("#containerHappy").css("display","none");
    $("#containerUngry").css("display","none");
    porquee();
}

function soyInfeliz(e){
    console.log("soy infeliz"+e.target);
    feliz=false;
    $("#containerHappy").css("display","none");
    $("#containerUngry").css("display","none");

    porquee();
}

function porquee(){
    console.log("porque");
    $("#por-que").css("display","block");

}


    function initialize(){
        console.log("init");
        detectBrowser();
        $("#containerHappy").click(soyFeliz);
        $("#containerUngry").click(soyInfeliz);
        $("#map-canvas").css("height","100%");

    }


function ponSmiley(c,p,h){

    var infoWindowOptions = {  content: c   };

    var  infoWindow = new google.maps.InfoWindow(infoWindowOptions);


    if(h){
        var imagen = 'imgs/smiley.png';
    }else {
        var imagen = 'imgs/sadey.png';
    }
    var markerOptions = {
        position: new google.maps.LatLng(p.jb,p.kb),
        icon:imagen,
        map: map
    };
    var m = new google.maps.Marker(markerOptions);
    m.setMap(map);

    google.maps.event.addListener(m,'click',function(e){
       if(infoW){ infoW.close();}
        infoWindow.open(map, m);
        infoW=infoWindow;
    });
}




function parseado(){


    var todos = Parse.Object.extend("TestObject");
    var query = new Parse.Query(todos);
    query.lim
    query.descending('createdAt');

    query.find({
        success: function(results) {

           for(var i=0;i<results.length;i++){
               var object = results[i];
               console.log(object.id + ' - ' + object.get('feliz'));
                ponSmiley(object.get("coment"),object.get("posicion"),object.get("feliz"));

           }
        },
        error: function(error) {
            console.log("error: "+error);
        }
    });

}


    function initParse(){
        Parse.initialize("SpjyTJKJcryw6lyZJ96RhEjfKnrqrQyDhIGiabYD", "SYYpzfkxHJkx3rCO5Fb35GGfAFgVx1MyhBIxwzwJ");

        var TestObject = Parse.Object.extend("TestObject");
        var testObject = new TestObject();

        testObject.save(
            {prueba: navigator.userAgent,coment:comentario,posicion:posicion,feliz:feliz},
            {success: parseado(), error: function(model, error) {console.log("conexion fallida");alert("fallida")} });


    }

function limpia(){
    $("#por").val("");
}


function mapea() {
    console.log("mapeando");
      //detectBrowser();
    comentario= $("#por").val();
    console.log("comment: "+comentario);
    $("#por-que").css("display","none");
    $("#backButton").css("display","block");
    $("#map-canvas").css("display","block");

    var mapOptions = {
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    if(navigator.geolocation) {

        console.log("Browser Si");

        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = new google.maps.LatLng(position.coords.latitude,
                position.coords.longitude);

            var infoWindowOptions = {
                content: comentario
            };

            var infoWindow = new google.maps.InfoWindow(infoWindowOptions);

            
            map.setCenter(pos);
            if(feliz){
                var imagen = 'imgs/smiley.png';
            }else {
                var imagen = 'imgs/sadey.png';
            }
            var markerOptions = {
                position: pos,
                icon:imagen,
                animation:google.maps.Animation.BOUNCE,
                map: map
            };
            var marker = new google.maps.Marker(markerOptions);
            marker.setMap(map);

            google.maps.event.addListener(marker,'click',function(e){
               if(infoW){ infoW.close();}
                infoWindow.open(map, marker);
                infoW=infoWindow;
            });
            posicion=pos;
           // initParse();
            google.maps.event.addListenerOnce(map, 'idle',initParse );


        }, function() {
            handleNoGeolocation(true);
        });
    } else {
        console.log("Browser doesn't support Geolocation");
        handleNoGeolocation(false);
    };

    function handleNoGeolocation(errorFlag) {
        console.log("fail");
        if (errorFlag) {
            var content = 'Error: The Geolocation service failed.';
        } else {
            var content = 'Error: Your browser doesn\'t support geolocation.';
        }

        var options = {
            map: map,
            position: new google.maps.LatLng(41.38, 2.17),
            content: content
        };

       // var infowindow = new google.maps.InfoWindow(options);
        map.setCenter(options.position);
    }

    ///////////////////////////////////////////////////////////////////     COOKIES  /////////////////
    function setCookie(c_name,value,exdays)
    {
        var exdate=new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
        document.cookie=c_name + "=" + c_value;
    }

    function getCookie(c_name)
    {
        var c_value = document.cookie;
        var c_start = c_value.indexOf(" " + c_name + "=");
        if (c_start == -1)
        {
            c_start = c_value.indexOf(c_name + "=");
        }
        if (c_start == -1)
        {
            c_value = null;
        }
        else
        {
            c_start = c_value.indexOf("=", c_start) + 1;
            var c_end = c_value.indexOf(";", c_start);
            if (c_end == -1)
            {
                c_end = c_value.length;
            }
            c_value = unescape(c_value.substring(c_start,c_end));
        }
        return c_value;
    }
    function checkCookie()
    {
        var username=getCookie("username");
        if (username!=null && username!="")
        {
            alert("Welcome again " + username);
        }
        else
        {
            username=prompt("Please enter your name:","");
            if (username!=null && username!="")
            {
                setCookie("username",username,365);
            }
        }
    }
}
//41.38,2.17 ----- bcn

google.maps.event.addDomListener(window, 'load', initialize);
