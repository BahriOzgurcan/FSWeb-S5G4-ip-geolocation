//axios import buraya gelecek
import axios from "axios";

var benimIP;


// ------------ değiştirmeyin --------------
// licensed to Ergineer 2022
require("babel-core/register");
require("babel-polyfill");
async function ipAdresimiAl() {
	await axios({
		method: 'get',
		url: 'https://apis.ergineer.com/ipadresim',
	})
		.then(function (response) {
			return response.data
		})
		.then(function (a) {
			benimIP = a
		});
}
// ------------ değiştirmeyin --------------


/*
	ADIM 1: axios kullanarak, aşağıdaki URL'ye GET sorgusu atacağız
	(tag içindeki yere kendi ipnizi yazarak URL'yi oluşturun):
	https://apis.ergineer.com/ipgeoapi/<ipniz>
	
	NOT: Bilgisayarın IP adresini öğrenmek için: https://apis.ergineer.com/ipadresim 
	ADIM 5'e gelene kadar fonksiyonunuzu test etmek için ip nizi URL'ye manuel olarak ekleyebilirsiniz.
*/

/*
	ADIM 2: Geri döndürülen verileri inceleyin, bu sizin ip bilgileriniz! Bileşen fonksiyonunuzu geliştirmek içindeki bu veri yapısını
	iyice anlamanız gerekmektedir.
	
*/
/*
	ADIM 3: Argümanı sadece 1 nesne kabül eden bir fonksiyon oluşturun.
	DOM metotlarını ve özelliklerini kullanarak, şunları gerçekleştirin:
	
	<div class="card">
	<img src={ülke bayrağı url} />
	<div class="card-info">
		<h3 class="ip">{ip adresi}</h3>
		<p class="ulke">{ülke bilgisi (ülke kodu)}</p>
		<p>Enlem: {enlem} Boylam: {boylam}</p>
		<p>Şehir: {şehir}</p>
		<p>Saat dilimi: {saat dilimi}</p>
		<p>Para birimi: {para birimi}</p>
		<p>ISP: {isp}</p>
	</div>
	</div>
*/

/*
	ADIM 4: API'den alınan verileri kullanarak ADIM 3'te verilen yapıda bir kart oluşturun ve 
	bu kartı DOM olarak .cards elementinin içine ekleyin. 
*/

/*
	ADIM 5: Manuel olarak eklediğiniz IP adresini dinamiğe dönüştürün. 
	Sayfanın en üstünde ---değiştirmeyin--- etiketleri arasında yer alan asenkron ipAdresimiAl() fonksiyonuna 
	sorgu atarak bilgisayarınız IP adresini dinamik olarak aldıracaksınız. Bu fonksiyon asenkron olarak çağırıldığında `benimIP` değişkenine 
	bilgisayarınızın IP adresini atayacaktır. 
	Örnek dinamik URL kullanımı: var url = "https://apis.ergineer.com/ipgeoapi/"+benimIP; 
*/



//kodlar buraya gelecek

ipAdresimiAl().then(() => {


	const apiPromise = axios.get("https://apis.ergineer.com/ipgeoapi/" + benimIP);


	const weatherCard = (dataFromApi) => {


		const divCard = document.createElement("div");
		const imgCard = document.createElement("img");
		const divInfo = document.createElement("div");
		const h3Card = document.createElement("h3");
		const pCountry = document.createElement("p");
		const pLocation = document.createElement("p");
		const pCity = document.createElement("p");
		const pTimezone = document.createElement("p");
		const pCurrency = document.createElement("p");
		const pISP = document.createElement("p");

		divCard.append(imgCard);
		divCard.append(divInfo);
		divInfo.append(h3Card);
		divInfo.append(pCountry);
		divInfo.append(pLocation);
		divInfo.append(pCity);
		divInfo.append(pTimezone);
		divInfo.append(pCurrency);
		divInfo.append(pISP);


		divCard.classList.add("card");
		imgCard.setAttribute("src", `https://flagcdn.com/w320/${dataFromApi["ülkeKodu"].toLowerCase()}.png`);
		// imgCard.setAttribute("src", dataFromApi["ülkebayrağı"]);
		divInfo.classList.add("card-info");
		h3Card.className = "ip";
		h3Card.textContent = benimIP;
		pCountry.className = "ulke";
		pCountry.textContent = `${dataFromApi["ülke"]} (${dataFromApi["ülkeKodu"]})`;
		pLocation.textContent = `Enlem: ${dataFromApi.enlem}  Boylam: ${dataFromApi.boylam} `;
		pCity.textContent = `Şehir: ${dataFromApi["bölgeAdı"]} `;
		pTimezone.textContent = `Saat dilimi: ${dataFromApi.saatdilimi} `;
		pCurrency.textContent = `Para birimi: ${dataFromApi.parabirimi}`;
		pISP.textContent = `ISP: ${dataFromApi.isp}`;

		// console.log(dataFromApi);
		return divCard;
	};

	// console.log(weatherCard());

	apiPromise.then((response) => {
		console.log(response.data)
		document.querySelector(".cards").append(weatherCard(response.data));
	});

});