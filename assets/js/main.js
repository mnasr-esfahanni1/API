console.log("test");
const header = document.getElementById("header")
 let Progresswidth=0;


document.addEventListener('DOMContentLoaded', () => {
    const selectedCity = document.getElementById('location_city').value;
    getWeather(selectedCity);
    Progresswidth=0;
});
  
  document.getElementById('submit').addEventListener('click', () => {
    const selectedCity = document.getElementById('location_city').value;
    Progresswidth =0;
    getWeather(selectedCity);
        if(selectedCity === 'Paris' ){
        header.style.backgroundImage = "url(assets/images/Paris.png)";
    }
    else if(selectedCity === 'New York'){
        header.style.backgroundImage = "url(assets/images/NewYork.png)";

    }
    else if(selectedCity === 'London'){
        header.style.backgroundImage = "url(assets/images/Londan.png)";

    }
    else if(selectedCity === 'Toronto'){
        header.style.backgroundImage = "url(assets/images/Toornto.png)";

    }
    else if(selectedCity === 'Tehran'){
        header.style.backgroundImage = "url(assets/images/Tehran.png)";

    }

  });

  async function getWeather(city){
    try{
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=0696c4053e4248b180e33947231310&q=${city}&aqi=no`);
        const data = await response.json();


        console.log(data);
        console.log(data.current.condition.code);


        // location
        const location = document.getElementById(`locationName`);
        location.innerHTML= ` ${data.location.name}  ,&nbsp  ${data.location.region} `

        const temp = document.getElementById(`temp`);
        temp.innerHTML= `${data.current.temp_c} &deg  &nbsp &nbsp`


        //feels like
        const feelslike = document.getElementById(`FillsLike_info`);
        feelslike.innerHTML= `${data.current.feelslike_c} &deg `

        //Time
        const TimeName = document.getElementById("Date");
        TimeName.innerHTML= `${data.location.localtime}   `

        // Condition
        const weatherIcon = document.getElementById(`condition`);
         weatherIcon.innerHTML= `<h1> ${data.current.condition.text}</h1> <img src="${data.current.condition.icon}"> `


        // Humidity
        let Humidity = document.getElementById("number_humidity");
        let counter = 0;
        setInterval(()=>{
            if(counter=== data.current.humidity){
                clearInterval;
            }
            else{
                counter +=1;
                Humidity.innerHTML =`${counter} %`
            }
        },20);
        let myNumber = (282.6 - (282.6 * (data.current.humidity / 100)));
        console.log(myNumber);
        console.log(data.current.humidity);
        const circle1 =document.getElementById("circle")
        const keyframe = [
         
                { strokeDashoffset: myNumber }
            
        ]

        const keyframeEffect = new KeyframeEffect(circle1, keyframe, {
            duration: 2000, // animation duration in milliseconds
            easing: 'linear', // easing function
            fill: 'forwards'
          });
          const animation = new Animation(keyframeEffect);

          // Play the animation
          animation.play();

        // Wind 
        const Wind = document.getElementById('Wind_k');
        Wind.innerHTML = `<h1>${data.current.wind_kph} </h1><div> <h6>KM/H</h6>  <h6> Wind</h6> </div>`;

        const Wind_gust = document.getElementById('Wind_Gusts');
        Wind_gust.innerHTML = `<h1>${data.current.gust_kph} </h1><div><h6>KPH</h6><h6>Gust</h6></div>`;

        // visibility
        const Visibility_info = document.getElementById("Visibility_info");

        if (data.current.vis_km >= 10){

            Visibility_info.innerHTML= `${data.current.vis_km} <h1>Excellent Visibility</h1>`

        }else if (3< data.current.vis_km < 6){

            Visibility_info.innerHTML= `${data.current.vis_km} <h1>Good Visibility</h1>`

        }else if (1 < data.current.vis_km < 3){

            Visibility_info.innerHTML= `${data.current.vis_km} <h1>Moderate Visibility</h1>`

        }
        else if ( data.current.vis_km < 1){

            Visibility_info.innerHTML= `${data.current.vis_km} <h1>Poor Visibility</h1>`

        }

        // Perception_info
        const Perception_info = document.getElementById("Perception_info");
        Perception_info.innerHTML= `${data.current.precip_mm}  mm `


        const progress_done = document.getElementById("progress_done");
        progress_done.innerHTML = `${data.current.uv}`
        Progresswidth = ( (300 / 11) * data.current.uv );

        console.log(Progresswidth);
        progress_done.style.width = `0px`
        progress_done.style.width = `${Progresswidth}px`
        let stuatus = document.getElementById("stuatus");
            
        
        if (0 < data.current.uv &&  data.current.uv< 2){
            stuatus.innerHTML=`Low`;
        }
        else if ( 2 < data.current.uv &&  data.current.uv< 5){
            stuatus.innerHTML=`Moderate`;
        }
        else if (6 < data.current.uv &&  data.current.uv< 7){
            stuatus.innerHTML=`High`;
        }
        else if (8 < data.current.uv &&  data.current.uv< 10){
            stuatus.innerHTML=`Very High`;
        }
        else if (11 < data.current.uv ){
            stuatus.innerHTML=`Extreme`;
        }
        else{
            console.log("nothing")
        }

        
        

 
    }catch(error ){
        console.log(`😞  Noop! ${error}`)

    }


};
