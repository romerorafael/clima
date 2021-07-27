document.querySelector('.busca').addEventListener('submit', async(e) =>{
    //impedir que o buscar atualize a página
    e.preventDefault();

    //Recuperar a info digitada
    let input = document.querySelector('#searchInput').value;

    if(input !== ''){
        clearInfos();
        showInfos('Carregando...');

        //Requisição ao API da OpneWeatherMap -> usando apenas o nome da cidade.
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=d68ae98080166b20d565fffdc5cc6dc3&units=metric&lang=pt_br`;

        let result = await fetch(url); //Faz a requisição
        let json = await result.json(); // Transforma a resposta em json

        if(json.cod === 200){
            showWeather({
                name: json.name,
                country : json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg,
                feelsLike: json.main.feels_like,
                humidity: json.main.humidity
            })   ;
        }else{
            clearInfos();
            showInfos('Cidade não encontrada.');
        }
        console.log(json);
    }else{

    }
})

function showInfos(msg){
    document.querySelector('.aviso').innerHTML = msg;
}

function  showWeather(json){
    showInfos('');
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>Km/h</span>`;
    document.querySelector('.umidadeInfo').innerHTML = `${json.humidity} <sup>%</sup>`;
    document.querySelector('.tempSense').innerHTML = `${json.feelsLike} <sup>ºC</sup>`;



    document.querySelector('.temp img').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}.png`);
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;

    document.querySelector('.resultado').style.display = 'block';

}

function clearInfos(){
    document.querySelector('.resultado').style.display = 'none';
}