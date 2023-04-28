function ajaxCallBack(url,rezultat){
    $.ajax({
        url: "data/" + url,
        method: "get",
        dataType: "json",
        success: rezultat,
        error: function(xhr, exception){
            if (xhr.status === 0) {
                return ('Niste povezani.\nMolim vas proverite internet konekciju.');
            } else if (xhr.status == 400) {
                return ('Server je razumeo zahtev, ali sadrzaj zahteva je neispravan.');
            } else if (xhr.status == 403) {
                return (`Ne moze se pristupiti zabranjenom resursu.`);
            } else if (xhr.status == 404) {
                location.href = '404.html';
            } else if (xhr.status == 500) {
                return ('Interna greska servera [500].');
            } else if (xhr.status == 503) {
                return ('Servis nedostupan.');
            } else if (exception === 'parsererror') {
                return ('Zahtevani JSON analiza nije uspela.');
            } else if (exception === 'timeout') {
                return ('Time out greska.');
            } else if (exception === 'abort') {
                return ('Ajax zahtev je prekinut.');
            } else {
                return ('Neuhvacena greska.\n' + xhr.responseText);
            }
        }
    })
}
ajaxCallBack("navigacija.json", function(podaci){
    ispisNavigacije(podaci, ".header_agileits nav ul");
    ispisNavigacije(podaci, ".sign-grds ul");

})
function dodajULS(naziv, vrednost){
    localStorage.setItem(naziv, JSON.stringify(vrednost));
}
function dohvatiIzLS(naziv){
    return JSON.parse(localStorage.getItem(naziv));
}
function obrisiIzLS(naziv){
    localStorage.removeItem(naziv);
}
function ispisNavigacije(niz, selektor){
    let html = "";
    for(let i of niz){
        html += `<li><a href="${i.href}">${i.naziv}</a></li>`;
    }
    $(selektor).html(html);
    if(selektor == ".sign-grds ul"){
        $(selektor).append(`<li><a href="sitemap.xml" class="red-link">Sitemap</a></li>`);
        $(selektor).append(`<li><a href="dokumentacija.pdf" class="red-link">Dokumentacija</a></li>`);

    }
}
$("#trigger-overlay").click(function(){
    $(this).parent().toggleClass("otvoren");
});
$(".overlay-close").click(function(){
    $(".mobile-nav-button").toggleClass("otvoren");
});
let footerMedia = [
    {
        "link": "https://www.facebook.com/",
        "ikonica": "fa fa-facebook",
        "klasa": "facebook"
    },
    {
        "link": "https://twitter.com/",
        "ikonica": "fa fa-twitter",
        "klasa": "twitter"
    },
    {
        "link": "https://www.instagram.com/",
        "ikonica": "fa fa-instagram",
        "klasa": "instagram"
    },
    {
        "link": "https://www.linkedin.com/",
        "ikonica": "fa fa-linkedin",
        "klasa": "pinterest"
    }
];
function ispisFooterMedia(){
    let html = "";
    for(let i of footerMedia){
        html += `<li>
                    <a href="${i.link}" class="${i.klasa}">
                        <div class="front"><i class="${i.ikonica}" aria-hidden="true"></i></div>
                        <div class="back"><i class="${i.ikonica}" aria-hidden="true"></i></div>
                    </a>
                </li>`;
    }
    $(".footer-social").html(html);
};
ispisFooterMedia();
function ispisPopustaProizvoda(popust){
    if(popust != null){
        return `<span class="product-new-top">- ${popust.procenat}%</span>`;
    }
    return "";
}
function ispisCeneProizvoda(cena, stranica){
    if(stranica == "prodavnica"){
        if(cena.staraCena != null){
            return `
            <span class="money aktivnaCena">${cena.aktivnaCena} RSD</span>
            <span class="money staraCena"><del>${cena.staraCena} RSD</del></span>`;
        }
        return `<span class="money aktivnaCena">${cena.aktivnaCena} RSD</span>`;
    }
    if(stranica == "singl"){
        if(cena.staraCena != null){
            return `
            <p><span class="item_price">${cena.aktivnaCena} RSD</span>
            <del>${cena.staraCena} RSD</del>
        </p>`;
        }
        return `<p><span class="item_price">${cena.aktivnaCena} RSD</span></p>`;
      
    }
    

}
function ispisOceneProizvoda(ocena){
    let html = "";
    for(let i = 0; i < 5; i++){
        if(i < ocena){
            html += `<li><i class="fa fa-star" aria-hidden="true"></i></li>`;
        }
        else{
            html += `<li><i class="fa fa-star-o" aria-hidden="true"></i></li>`;
        }
    }
    return html;
}
function ispisProizvoda(proizvodi){
    let html = "";
    for(let p of proizvodi){
        html += `
        <div class="col-lg-4 col-md-6 product-men">
            <div class="product-shoe-info shoe">
                <div class="men-pro-item">
                    <div class="men-thumb-item">
                        <img src="images/${p.slika.src}" alt="${p.slika.alt}">
                        <div class="men-cart-pro">
                            <div class="inner-men-cart-pro">
                                <a href="single.html" class="link-product-add-cart" data-id="${p.id}">Više informacija</a>
                            </div>
                        </div>
                        ${ispisPopustaProizvoda(p.popust)}
                    </div>
                    <div class="item-info-product">
                        <h4>
                            <a href="single.html" class="imeProizvoda" data-id="${p.id}">${p.naziv}</a>
                        </h4>
                        <div class="info-product-price">
                            <div class="grid_meta">
                                <div class="product_price">
                                    <div class="grid-price ">
                                    ${ispisCeneProizvoda(p.cena,"prodavnica")}	
                                    </div>
                                </div>
                                <ul class="stars">
                                ${ispisOceneProizvoda(p.ocena)}								
                                </ul>
                            </div>
                            <div class="shoe single-item hvr-outline-out">
                                <form action="" method="">
                                    <button type="button" data-id="${p.id}" class="shoe-cart pshoe-cart dodajProizvod"><i class="fa fa-cart-plus" aria-hidden="true"></i></button>
                                    <a href="#" data-toggle="modal" data-target="#myModal1"></a>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    };
    $("#proizvodiOkvir").html(html);
    otvoriSinglProizvod();
    $(".dodajProizvod").on("click",function(){
        dodajProizvodUKorpu($(this).data("id"),1);
    });
}
let slajderi = [
    {
        "klasa": "banner-top2",
        "naslov": "Nike",
        "opis": "Vidite kako se dobro osećaju."
    },
    {
        "klasa": "banner-top3",
        "naslov": "Štikle",
        "opis": "Za sve šetnje života."
    },
    {
        "klasa": "banner-top",
        "naslov": "Patike",
        "opis": "Udobnost na prvom mestu."
    },
    {
        "klasa": "banner-top1",
        "naslov": "Adidas",
        "opis": "Neprikosnoven u svetu patika."
    }
];
function ispisSlajdera(){
    let html = "";
    for(let i of slajderi){
        html += `<li>
                    <div class="${i.klasa}">
                        <div class="banner-info-wthree">
                            <h3>${i.naslov}</h3>
                            <p>${i.opis}</p>
                        </div>
                    </div>
                </li>`;
    }
    $("#slider4").html(html);
}
function ispisTopSlajdera(){
    let html = "";
    for(let i = 0; i < 2;i++)
    {
        if(i == 0){
            html += `<div class="item active"><div class="row">`;
        }
        else{
            html += `<div class="item"><div class="row">`;
        }
        for(let i = 1; i < 5; i++){
            html += `
            <div class="col-md-3 col-sm-3 col-xs-3 slidering">
                <div class="thumbnail"><img src="images/g${i}.jpg" alt="Image" style="max-width:100%;"></div>
            </div>
            `;
        }
        html += `</div></div>`;
    }
    $('.carousel-inner').html(html);
}
function stampajZvezdiceSidebar(){
    let html = "";
    for(let i = 0; i < 6; i++){
        html += `<li><a href="#" class="rejting" data-rejting=${i}>`;
        for(let j = 0; j < 5; j++){
            if(i == 0){
                html += `<i class="fa fa-star-o" aria-hidden="true"></i>`;
                continue;
            }
            else if(j < i){
                    html += `<i class="fa fa-star" aria-hidden="true"></i>`;
            }
            else{
                html += `<i class="fa fa-star-o" aria-hidden="true"></i>`;
            }
        }
        if(i == 0){
        html += `<span>Bez ocene</span></a></li>`;
        }
        else{
            html += `<span>${i}.0</span></a></li>`;
        }
    }
    $(".customer-rev ul").html(html);
}
function ispisiKategroijeSidebar(kategorije){
    let html = "";
    for(let k of kategorije){
        html += `
        <li>
        <input type="checkbox" class="kategorije" value="${k.id}">
        <span class="span">${k.naziv}</span>
        </li>
   `;
    }
    $("#kategorijeSidebar").html(html);
    $(".kategorije").on("change",function(){
        promeniIzgledProizvoda();
    });
}
function ispisiBrendoveSidebar(brendovi){
    let html = "";
    for(let b of brendovi){
        html += `
        <li>
        <input type="checkbox" class="brendovi" value="${b.id}">
        <span class="span">${b.naziv}</span>
        </li>
   `;
    }
    $("#brendoviSidebar").html(html);
    $(".brendovi").on("change",function(){
        promeniIzgledProizvoda();
    });
}
function otvoriSinglProizvod(){
    $(".link-product-add-cart").on("click", function(e){
        dodajULS("singlProizvod", {id : $(this).data("id")});
    });
    $(".imeProizvoda").on("click", function(e){
        dodajULS("singlProizvod", {id : $(this).data("id")});
    });
}
let link = window.location.pathname;
function ispisiNazivKategorijeProizvoda(id){
    let kategorijeLS = dohvatiIzLS("kategorije");
    let kategorija = kategorijeLS.find(k => k.id == id);
    return kategorija.naziv;
}
function ispisiSinglProizvod(proizvod){
    let html = "";
    console.log(proizvod);
    html = `
    <div class="col-md-4 single-right-left ">
				<div class="grid images_3_of_2" id="slikaProizvoda">
						<img src="images/${proizvod.slika.src}" class="img-responsive"> </div>	
				</div>
			</div>
			<div class="col-md-8 single-right-left simpleCart_shelfItem">
				<h3>${proizvod.naziv}</h3>
				${ispisCeneProizvoda(proizvod.cena,"singl")}
				<div class="rating1">
					<ul class="stars">
						${ispisOceneProizvoda(proizvod.ocena)}
					</ul>
				</div>
				<div class="occasional">
					<h5>Kategorija:</h5>
					<p id="katNaziv">${ispisiNazivKategorijeProizvoda(proizvod.kategorijaID)}</p>			
					<div class="clearfix"> </div>
				</div>
                <div class="color-quality">
					<div class="color-quality-right">
						<h5>Količina :</h5>
						<input type="number" id="quantity" name="quantity" min="1" max="99" value="1">
					</div>
				</div>
				<div class="occasion-cart">
					<div class="shoe single-item single_page_b">
						<form action="" method="">
							<input type="button" name="submit" value="Dodaj u korpu" data-id="${proizvod.id}" class="button add dodajProizvodSingl">
						</form>

					</div>
				</div>		
			</div>
			<div class="clearfix"></div>
            <div class="responsive_tabs">
            <div id="horizontalTab" style="display: block; width: 100%; margin: 0px;">
                <ul class="resp-tabs-list">
                    <li class="resp-tab-item resp-tab-active" aria-controls="tab_item-0" role="tab">Opis:</li>
                </ul>
                <div class="resp-tabs-container">
                    <!--/tab_one-->
                    <h2 class="resp-accordion resp-tab-active" role="tab" aria-controls="tab_item-0">Opis</h2><div class="tab1 resp-tab-content resp-tab-content-active" style="display:block" aria-labelledby="tab_item-0">

                        <div class="single_page">
                            <h6>${proizvod.naziv}</h6>
                            <p>${proizvod.opis}</p>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        ${ispisiPovezaneProizvode(proizvod)}
    `;
    $("#singlOkvir").html(html);
    document.title = "TOP OBUĆA | " + proizvod.naziv;
    document.querySelector('meta[name="description"]').setAttribute("content", proizvod.opis);
    otvoriSinglProizvod();
    $(".dodajProizvodSingl").on("click",function(){
        dodajProizvodUKorpu($(this).data("id"),Number($("#quantity").val()));
    });
    $(".dodajProizvod").on("click",function(){
        dodajProizvodUKorpu($(this).data("id"),1);
    });
    // dodajProizvodUKorpu("dodajProizvodSingl");
    // dodajProizvodUKorpu("dodajProizvod"); 
}
var tajmer1 = null;
var tajmer2 = null;
function startujTimer(){
    tajmer1 = window.setTimeout(function(){
        $(".sadrzaj").each(function(){
            $(this).addClass("idiGore");
            $(this).css('opacity','0');
        });
    },2500);
    tajmer2 = window.setTimeout(function(){
        $("#modal").html("");
        $("#modal").css('display','none');
    },3000);
}
function prikaziModal(rezultat){
    clearTimeout(tajmer1);
    clearTimeout(tajmer2);
    startujTimer();
    let html = $("#modal").html();
    $("#modal").removeClass("idiGore");
    $("#modal").css('opacity','1');
    if(rezultat == "dodato"){
        html +=`
            <div class="sadrzaj">
                <p class="sadrzajTekst">Uspešno ste dodali proizvod u korpu!</p>
                <i class="fa fa-check dodato"></i>
            </div>
            `;
    };
    if(rezultat == "nije dodato"){
        html +=`
            <div class="sadrzaj">
                <p class="sadrzajTekst">Proizvod je već u korpi!</p>
                <i class="fa fa-times nijeDodato"></i>
		    </div>`;
    };
    $("#modal").html(html);
    setTimeout(function(){
        $("#modal").css('display','block');
    },200);
   
};
function dodajProizvodUKorpu(id,kolicina){
            let korpa = dohvatiIzLS("korpa");
            if(korpa == null){
                let proizvod = [];
                proizvod[0] = {
                    id : id,
                    kolicina : kolicina
                }
                dodajULS("korpa",proizvod);
                prikaziModal("dodato");
            }
            else{
                let proizvod = korpa.find(p => p.id == id);
                console.log(proizvod);
                if(proizvod){
                    prikaziModal("nije dodato")
                    return;
                }   
                korpa.push({
                    id : id,
                    kolicina : kolicina
                });
                dodajULS("korpa",korpa);
                prikaziModal("dodato");
            }
};
function ispisiPovezaneProizvode(proizvod){
    let proizvodiLS = dohvatiIzLS("sviProizvodi");
    let povezaniProizvodi = proizvodiLS.filter(p => p.kategorijaID == proizvod.kategorijaID && p.id != proizvod.id && p.polID == proizvod.polID);
    let html = "";
    html += ` <div class="new_arrivals">
    <h3>Povezani proizvodi</h3>`;
    for(let p of povezaniProizvodi){
        html += `
				<div class="col-md-3 product-men women_two">
                    <div class="product-shoe-info shoe">
                        <div class="men-pro-item">
                            <div class="men-thumb-item">
                                <img src="images/${p.slika.src}" alt="${p.slika.alt}">
                                <div class="men-cart-pro">
                                    <div class="inner-men-cart-pro">
                                        <a href="single.html" class="link-product-add-cart" data-id="${p.id}">Više informacija</a>
                                    </div>
                                </div>
                                ${ispisPopustaProizvoda(p.popust)}
                            </div>
                            <div class="item-info-product">
                                <h4>
                                    <a href="single.html" class="imeProizvoda" data-id="${p.id}">${p.naziv}</a>
                                </h4>
                                <div class="info-product-price">
                                    <div class="grid_meta">
                                        <div class="product_price">
                                            <div class="grid-price ">
                                            ${ispisCeneProizvoda(p.cena,"prodavnica")}	
                                            </div>
                                        </div>
                                        <ul class="stars">
                                        ${ispisOceneProizvoda(p.ocena)}								
                                        </ul>
                                    </div>
                                    <div class="shoe single-item hvr-outline-out">
                                        <form action="#" method="post">
                                            <input type="hidden" name="cmd" value="_cart">
                                            <input type="hidden" name="add" value="1">
                                            <input type="hidden" name="shoe_item" value="Bella Toes">
                                            <input type="hidden" name="amount" value="675.00">
                                            <button type="button" data-id="${p.id}" class="shoe-cart pshoe-cart dodajProizvod"><i class="fa fa-cart-plus" aria-hidden="true"></i></button>

                                            <a href="#" data-toggle="modal" data-target="#myModal1"></a>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
				</div>	
        `;
    }
    html += `<div class="clearfix"></div>
    </div>`;
    return html;
} 
function ispisiVrednostCene(){
    let vrednost = $("#rangCene").val();
    $("#vrednostCene").html(vrednost + " RSD");
}
function promeniIzgledProizvoda(){
   let proizvodiLS = JSON.parse(localStorage.getItem("sviProizvodi"));

   proizvodiLS = filtrirajProizvode(proizvodiLS, "kategorije");
   proizvodiLS = filtrirajProizvode(proizvodiLS, "brendovi");
   proizvodiLS = filtrirajProizvode(proizvodiLS, "cena");
   proizvodiLS = filtrirajProizvode(proizvodiLS, "popust");
   proizvodiLS = filtrirajProizvode(proizvodiLS, "rejting");
   proizvodiLS = pretraziProizvode(proizvodiLS);
   proizvodiLS = sortirajProizvode(proizvodiLS);
   if(proizvodiLS.length == 0){
     $("#proizvodiOkvir").html("<h2>Nema rezultata pretrage.</h2>");
   }
   else{
    ispisProizvoda(proizvodiLS);
    //OVde idu f-je za dodavanje singla u LS i za korpu
   }

  
}
function filtrirajProizvode(proizvodi, tip){
    let filtriraniProizvodi = [];
    let izabrani = 0;
    let izabraniNiz = [];
    if(tip == "kategorije"){
        $(".kategorije:checked").each(function(){
            izabraniNiz.push(Number($(this).val()));
        });
        if(izabraniNiz.length != 0){
            filtriraniProizvodi = proizvodi.filter(p => izabraniNiz.includes(p.kategorijaID));
        }
        else{
            filtriraniProizvodi = proizvodi;
        }
    }
    else if(tip == "brendovi"){
        $(".brendovi:checked").each(function(){
            izabraniNiz.push(Number($(this).val()));
        });
        if(izabraniNiz.length != 0){
            filtriraniProizvodi = proizvodi.filter(p => izabraniNiz.includes(p.brendID));
        }
        else{
            filtriraniProizvodi = proizvodi;
        }
    }
    else if(tip == "cena"){
        izabrani = $("#rangCene").val();
        filtriraniProizvodi = proizvodi.filter(p => p.cena.aktivnaCena <= izabrani);
    }
    else if(tip == "popust"){
        izabrani = $(".popustRadio:checked").val();
        if(izabrani != null){
            izabrani = Number(izabrani);
            filtriraniProizvodi = proizvodi.filter(p => p.popust != null);
            filtriraniProizvodi = filtriraniProizvodi.filter(p => p.popust.procenat >= izabrani);
        }
        else{
            filtriraniProizvodi = proizvodi;
        }     
    }
    else if(tip == "rejting"){
        izabrani = ($(".aktivan").data("rejting"));
        if(izabrani != null){
            if(izabrani == 0){
                filtriraniProizvodi = proizvodi.filter(p => p.ocena == null);
            }
            else{ 
                izabrani = Number(izabrani);
                // filtriraniProizvodi = proizvodi.filter(p => p.rejting != null);
                filtriraniProizvodi = proizvodi.filter(p => p.ocena == izabrani);
            }
        }
        else{
            filtriraniProizvodi = proizvodi;
        }       
    }
    return filtriraniProizvodi;
}
function sortirajProizvode(proizvodi){
    let izabrani = $("#sortiranje").val();
    let sortiraniProizvodi = [];
    if(izabrani == "podrazumevano"){
        sortiraniProizvodi = proizvodi;
    }
    else if(izabrani == "cena-asc"){
        sortiraniProizvodi = proizvodi.sort(function(a,b){
            return a.cena.aktivnaCena - b.cena.aktivnaCena;
        });
    }
    else if(izabrani == "cena-desc"){
        sortiraniProizvodi = proizvodi.sort(function(a,b){
            return b.cena.aktivnaCena - a.cena.aktivnaCena;
        });
    }
    else if(izabrani == "naziv-asc"){
        sortiraniProizvodi = proizvodi.sort(function(a,b){
            if(a.naziv < b.naziv) { return -1; }
            if(a.naziv > b.naziv) { return 1; }
            return 0;
        });
    }
    else if(izabrani == "naziv-desc"){
        sortiraniProizvodi = proizvodi.sort(function(a,b){
            if(a.naziv > b.naziv) { return -1; }
            if(a.naziv < b.naziv) { return 1; }
            return 0;
        });
    }
    else if(izabrani == "noviji"){
        sortiraniProizvodi = proizvodi.sort(function(a,b){
            return new Date(b.datumObjave) - new Date(a.datumObjave);
        });
    }
    return sortiraniProizvodi;
}
function pretraziProizvode(proizvodi){
    let vrednost = $("#pretraga").val().toLowerCase();
    let filtriraniProizvodi = [];
    if(vrednost != ""){
    filtriraniProizvodi = proizvodi.filter(p => p.naziv.toLowerCase().includes(vrednost));
    }
    else{
        filtriraniProizvodi = proizvodi;
    }
    return filtriraniProizvodi;
}
function BrojProizvodaUKorpi(broj){
    if(broj == 1){
        $("#brojProizvodaKorpa").html(`${broj} proizvod`);
    }
    else{
        $("#brojProizvodaKorpa").html(`${broj} proizvoda`);
    }
}
function ispisiProizvodeUKorpi(){
    let korpa = dohvatiIzLS("korpa");
    let proizvodi = dohvatiIzLS("sviProizvodi");
    let ispis = "";
    if(korpa == null || korpa.length == 0){
        $("#korpaOkvir").css("text-align", "center")
        $("#korpaOkvir").html(`
        <h1 id="praznaKorpa">Vaša korpa je prazna.</h1>
        <a href="shop.html" id="idiUProdavnicu">Nazad u prodavnicu</a>`);
    }
    else{
        BrojProizvodaUKorpi(korpa.length);
        for(let i=0;i<korpa.length;i++){
            for(let p=0;p<proizvodi.length;p++){
                if(korpa[i].id == proizvodi[p].id){
                    ispis += `
                    <tr class="rem${i}">
                        <td class="invert">${i+1}</td>
                        <td class="invert-image"><img src="images/${proizvodi[p].slika.src}" alt="images/${proizvodi[p].slika.alt}" class="img-responsive"></td>
                        <td class="invert">${proizvodi[p].naziv}</td>
                        <td class="invert cenaProizvoda" data-id=${proizvodi[p].id}>${proizvodi[p].cena.aktivnaCena} RSD</td>
                        <td class="invert">
                            <div class="quantity">
                                <div class="quantity-select">
                                    <div class="entry value-minus smanjiKolicinu" data-id=${proizvodi[p].id}>&nbsp;</div>
                                    <div class="entry value"><span>${korpa[i].kolicina}</span></div>
                                    <div class="entry value-plus active povecajKolicinu" data-id=${proizvodi[p].id}>&nbsp;</div>
                                </div>
                            </div>
                        </td>
                        <td class="invert ukupnaCenaProizvoda" data-id=${proizvodi[p].id}>${proizvodi[p].cena.aktivnaCena * korpa[i].kolicina} RSD</td>
                        <td class="invert">
                            <div class="rem">
                                <a href="#" class="ukloniProizvod" data-id=${proizvodi[p].id}>Ukloni</a>
                            </div>

                        </td>
                    </tr>
                    `;
                }
            }
        }
    }
    $(".timetable_sub tbody").html(ispis);
    $(".ukloniProizvod").on("click",function(){
        ukloniProizvodIzKorpe($(this).data("id"));
    });
    promeniKolicinuProizvoda();
}
function promeniKolicinuProizvoda(){
    $(".povecajKolicinu").on("click",function(){
        let kolicina = $(this).parent().children(1).children(0).html();
        let kolicinaBR = parseInt(kolicina);
        let cenaProizvoda = $(".cenaProizvoda[data-id="+$(this).data("id")+"]").html();
        let pozicijaRSD = cenaProizvoda.indexOf("R");
        let cena = cenaProizvoda.substring(0,pozicijaRSD-1);
        let cenaBR = parseInt(cena);
        kolicinaBR += 1;
        $(this).parent().children(1).children(0).html(kolicinaBR);
        $(".ukupnaCenaProizvoda[data-id="+$(this).data("id")+"]").html(kolicinaBR * cenaBR + " RSD");
        izracunajUkupnuCenu();
        let korpa = dohvatiIzLS("korpa");
        for(let i=0;i<korpa.length;i++){
            if(korpa[i].id == $(this).data("id")){
                korpa[i].kolicina++;
            }
        }
        dodajULS("korpa",korpa);
    });
    $(".smanjiKolicinu").on("click",function(){
        let kolicina = $(this).parent().children(1).children(0).html();
        let kolicinaBR = parseInt(kolicina);
        let cenaProizvoda = $(".cenaProizvoda[data-id="+$(this).data("id")+"]").html();
        let pozicijaRSD = cenaProizvoda.indexOf("R");
        let cena = cenaProizvoda.substring(0,pozicijaRSD-1);
        let cenaBR = parseInt(cena);
        if(kolicinaBR > 1){
            kolicinaBR -= 1;
        }
        $(this).parent().children(1).children(0).html(kolicinaBR);
        $(".ukupnaCenaProizvoda[data-id="+$(this).data("id")+"]").html(kolicinaBR * cenaBR + " RSD");
        izracunajUkupnuCenu();
        let korpa = dohvatiIzLS("korpa");
        for(let i=0;i<korpa.length;i++){
            if(korpa[i].id == $(this).data("id")){
                korpa[i].kolicina = kolicinaBR;
            }
        }
        dodajULS("korpa",korpa);
    });
}
function izracunajUkupnuCenu(){
    let ukupnaCena = 0;
    $(".ukupnaCenaProizvoda").each(function(){
        let cenaProizvoda = $(this).html();
        let pozicijaRSD = cenaProizvoda.indexOf("R");
        let cena = parseInt(cenaProizvoda.substring(0,pozicijaRSD-1));
        ukupnaCena += cena;
    });
    $("#ukupnaCena span").html(ukupnaCena + " RSD");
}
function ukloniProizvodIzKorpe(id){
    let korpa = dohvatiIzLS("korpa");
    korpa = korpa.filter(p => p.id != id);
    dodajULS("korpa",korpa);
    ispisiProizvodeUKorpi();
    izracunajUkupnuCenu();
}
if(link.includes("index.html")){
    ispisSlajdera();
     ispisTopSlajdera();
}
if(link.includes("shop.html")){
     ajaxCallBack("proizvodi.json", function(podaci){
         dodajULS("sviProizvodi",podaci);
         ispisProizvoda(podaci);
     });
     ajaxCallBack("kategorije.json", function(podaci){
         ispisiKategroijeSidebar(podaci);
         dodajULS("kategorije",podaci);
     });
     ajaxCallBack("brendovi.json", function(podaci){
         ispisiBrendoveSidebar(podaci);
     });
     stampajZvezdiceSidebar();
     
     $(".popustRadio").on("change",function(){
         promeniIzgledProizvoda();
     });
     $("#rangCene").on("input",function(){
         ispisiVrednostCene();
     });
     $("#rangCene").on("change",function(){
         promeniIzgledProizvoda();
     });
     $(".rejting").on("click",function(e){
         e.preventDefault();
         $(".rejting").removeClass("aktivan");
         $(this).addClass("aktivan");
         promeniIzgledProizvoda();
     });
     $("#pretraga").keyup(function(){
         promeniIzgledProizvoda();
     });
     $("#sortiranje").on("change",function(){
         promeniIzgledProizvoda();
     });
}
if(link.includes("single.html")){
     window.onload = function(){
     let proizvodID = dohvatiIzLS("singlProizvod").id;
     let proizvodi = dohvatiIzLS("sviProizvodi");
     let proizvod = proizvodi.find(p => p.id == proizvodID);
     $("#imeProizvodaCrumb").html(proizvod.naziv);
     ispisiSinglProizvod(proizvod);
     }
}
function validacija(ime){
    let imePrezimeRegex = /^[A-ZČĆŽŠĐ][a-zčćžšđ]{2,14}(\s[A-ZČĆŽŠĐ][a-zčćžšđ]{2,14})+$/;
    let emailRegex = /^[a-z][a-z0-9\.\_]{2,}@[a-z]{2,}(\.[a-z]{2,})+$/;
    let telefonRegex = /^(\+381|0)[6-9][0-9]{7,8}$/;
    let ulicabrojRegex = /^[A-ZČĆŽŠĐ][a-zčćžšđ]{2,}(\s[A-ZČĆŽŠĐ][a-zčćžšđ]{2,})*\s[1-9]{1}[0-9]*$/;
    let postanskiBrojRegex = /^[0-9]{5}$/;
    let gradRegex = /^[A-ZČĆŽŠĐ][a-zčćžšđ]{2,}(\s[A-ZČĆŽŠĐa-zčćžšđ]{3,})*$/;
    let imePrezime = $("#imePrezime").val();
    let email = $("#email").val();
    let telefon = $("#telefon").val();
    let ulicaIBroj = $("#ulicabroj").val();
    let postanskiBroj = $("#postanskibroj").val();
    let grad = $("#grad").val();
    if($("input[name="+ime+"]").val() == ""){
        $($("input[name="+ime+"]")).css("border","1px solid red");
        let poruka = "Polje ne sme biti prazno.";
        let element = document.createElement("p");
        element.innerHTML = poruka;
        element.classList.add("greska");
        $("input[name="+ime+"]").after(element);
        return false;
    }
    else{
        if(ime == "ImePrezime"){
            if(!imePrezimeRegex.test(imePrezime)){
                ispisiGresku("imePrezime","Ime i prezime moraju da počinju velikim slovom i da sadrže samo slova. Primer: Jovan Antić");
                return false;
            }
            else{
                $("#imePrezime").next().remove();
                $("#imePrezime").css("border","1px solid #00ff00");
                return true;
            }
        }
        else if(ime == "Email"){
            if(!emailRegex.test(email)){
                ispisiGresku("email","Email nije u dobrom formatu. Primer: jovanantic@gmail.com");
                return false;
            }
            else{
                $("#email").next().remove();
                $("#email").css("border","1px solid #00ff00");
                return true;
            }
        }
        else if(ime == "Telefon"){
            if(!telefonRegex.test(telefon)){
                ispisiGresku("telefon","Telefon nije u dobrom formatu. Primer: 0641234567 ili +381641234567");
                return false;
            }
            else{
                $("#telefon").next().remove();
                $("#telefon").css("border","1px solid #00ff00");
                return true;
            }
        }
        else if(ime == "UlicaBroj"){
            if(!ulicabrojRegex.test(ulicaIBroj)){
                ispisiGresku("ulicabroj","Ulica mora da počne velikim slovom i da sadrže samo slova i broj na kraju. Primer: Kralja Petra I Karađorđevića 1");
                return false;
            }
            else{
                $("#ulicabroj").next().remove();
                $("#ulicabroj").css("border","1px solid #00ff00");
                return true;
            }
        }
        else if(ime == "PostanskiBroj"){
            if(!postanskiBrojRegex.test(postanskiBroj)){
                ispisiGresku("postanskibroj","Poštanski broj mora da sadrži 5 cifara. Primer: 11000");
                return false;
            }
            else{
                $("#postanskibroj").next().remove();
                $("#postanskibroj").css("border","1px solid #00ff00");
                return true;
            }
        }
        else if(ime == "Grad"){
            if(!gradRegex.test(grad)){
                ispisiGresku("grad","Grad mora da počne velikim slovom i da sadrži samo slova. Primer: Beograd");
                return false;
            }
            else{
                $("#grad").next().remove();
                $("#grad").css("border","1px solid #00ff00");
                return true;
            }
        }
    }
}
function ispisiGresku(selektor,poruka){
    $(`#${selektor}`).css("border","1px solid red");
    let element = document.createElement("p");
    element.innerHTML = poruka;
    element.classList.add("greska");
    $(`#${selektor}`).after(element);
}
if(link.includes("checkout.html")){
    $(document).ready(function(){
        ispisiProizvodeUKorpi();
        izracunajUkupnuCenu();
        $("#obrisiSve").on("click",function(){
            obrisiIzLS("korpa");
            $("#korpaOkvir").css("text-align", "center")
            $("#korpaOkvir").html(`
            <h1 id="praznaKorpa">Vaša korpa je prazna.</h1>
            <a href="shop.html" id="idiUProdavnicu">Nazad u prodavnicu</a>`);
        });
        $(".controls input").on("blur",function(){
            $(this).next().remove();
            validacija($(this).attr("name"));
        });
        $("#potvrdiPorudzbinu").on("click",function(e){
            e.preventDefault();
            $(".greska").remove();
            if(!$(".radioPlacanje").is(":checked")){

                let poruka = "Morate obeležiti bar jednu opciju.";
                let element = document.createElement("p");
                element.innerHTML = poruka;
                element.classList.add("greska");
                $("#placanje").after(element);
            }
            else{
                $("#placanje").next(".greska").remove();
            } 
            $(".controls input").each(function(){
                validacija($(this).attr("name"));
            });
            if(!$(".greska").length){
                $("#korpaOkvir").css("text-align", "center")
                $("#korpaOkvir").html(`
                <h1 id="poruceno">Uspešno ste poručili Vaše proizvode. Očekujte isporuku u roku od 2-3 dana.</h1>
                <a href="shop.html" id="idiUProdavnicu">Nazad u prodavnicu</a>`);
                obrisiIzLS("korpa");
            }
        });
    });
    
}
if(link.includes("contact.html")){
    $("#potvrdiPoruku").on("click",function(e){
        e.preventDefault();
        let imePrezimeRegex = /^[A-ZČĆŽŠĐ][a-zčćžšđ]{2,14}(\s[A-ZČĆŽŠĐ][a-zčćžšđ]{2,14})+$/;
        let emailRegex = /^[a-z][a-z0-9\.\_]{2,}@[a-z]{2,}(\.[a-z]{2,})+$/;
        let telefonRegex = /^(\+381|0)[6-9][0-9]{7,8}$/;
        let predmetPorukeRegex = /^[A-ZČĆŽŠĐ][a-zčćžšđ]{2,14}(\s([A-ZČĆŽŠĐ])*([a-zčćžšđ])*)*$/;
        let imePrezime = $("#imeprezime").val();
        let email = $("#email").val();
        let telefon = $("#telefon").val();
        let predmetPoruke = $("#predmet").val();
        let poruka = $("#poruka").val();
        let uspesno = true;
        $(".greska").remove();
        if(!imePrezimeRegex.test(imePrezime)){
            ispisiGresku("imeprezime","Ime i prezime moraju da počnu velikim slovom i da sadrže samo slova. Primer: Jovan Antić");
            uspesno = false;
        }
        else{
            $("#imeprezime").next(".greska").remove();
            $("#imeprezime").css("border","1px solid #00ff00");
        }
        if(!emailRegex.test(email)){
            ispisiGresku("email","Email nije u dobrom formatu. Primer: jovanantic@gmail.com");
            uspesno = false;
        }
        else{
            $("#email").next(".greska").remove();
            $("#email").css("border","1px solid #00ff00");
        }
        if(!telefonRegex.test(telefon)){
            ispisiGresku("telefon","Telefon mora da počne sa +381 ili 0. Primer: +381611111111");
            uspesno = false;
        }
        else{
            $("#telefon").next(".greska").remove();
            $("#telefon").css("border","1px solid #00ff00");
        }
        if(!predmetPorukeRegex.test(predmetPoruke)){
            ispisiGresku("predmet","Predmet poruke mora da počne velikim slovom i da sadrži samo slova. Primer: Pitanje");
            uspesno = false;
        }
        else{
            $("#predmet").next(".greska").remove();
            $("#predmet").css("border","1px solid #00ff00");
        }
        if(poruka.length < 10){
            ispisiGresku("poruka","Poruka mora imati minimum 10 karaktera.");
            uspesno = false;
        }
        else{
            $("#poruka").next(".greska").remove();
            $("#poruka").css("border","1px solid #00ff00");
        }
        if(uspesno){
            $(".contact_left_grid input").val("");
            $(".contact_left_grid input").each(function(){
                $(this).css("border","1px solid #ddd");
            });
            $("textarea").val("Poruka");
            $("textarea").css("border","1px solid #ddd");
            $("#uspehPoruka").html("Uspešno ste poslali poruku.");
            $("#uspehPoruka").css("display","block");
            setTimeout(function(){
                $("#uspehPoruka").css("display","none");
            },3000);
        }
            
    });
}
if(link.includes("about.html") || link.includes("contact.html") || link.includes("index.html")){
    validacijaNewsletter();
}
function validacijaNewsletter(){
    $("#potvrdiNews").on("click",function(e){
        e.preventDefault();
        let emailRegex = /^[a-z][a-z0-9\.\_]{2,}@[a-z]{2,}(\.[a-z]{2,})+$/;
        let email = $("#emailNews").val();
        if(!emailRegex.test(email)){
            $(".greska").remove();
            let element = document.createElement("p");
            element.innerHTML = "Email nije u dobrom formatu. Primer: jovanantic@gmail.com";
            element.classList.add("greska");
            $(`#newsletter form`).after(element);
        }
        else{
            $("#newsletter form").next(".greska").html("Uspešno ste se prijavili na newsletter.");
            $("#emailNews").css("border","1px solid #00ff00");
            $("#newsletter form").next(".greska").css("color","1px solid #00ff00");
            setTimeout(function(){
                $("#newsletter form").next(".greska").html("");
                $("#emailNews").val("");
                $("#emailNews").css("border","1px solid #ddd");
                $("#newsletter form").next(".greska").css("color","red");
            },3000);
        }
    });
}