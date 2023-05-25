// fungsi untuk menampilkan hasil fetch data API ke tampilan web
function disp(res) {
    const e = res['errors']['country'];
    // jika tidak ada error pada saat fetch, menampilkan data hasil fetch ke interface web
    if (typeof e === "undefined") {
        document.getElementById('error').innerHTML = "";
        document.getElementById('active-cases').innerText = res['response'][0]['cases']['active'] == null ? "0":res['response'][0]['cases']['active'];
        document.getElementById('new-cases').innerText = res['response'][0]['cases']['new'] == null ? "0" : res['response'][0]['cases']['new'];
        document.getElementById('recovered-cases').innerText = res['response'][0]['cases']['recovered'] == null ? "0" : res['response'][0]['cases']['recovered'];
        document.getElementById('total-cases').innerText = res['response'][0]['cases']['total'] == null ? "0" : res['response'][0]['cases']['total'];
        document.getElementById('total-deaths').innerText = res['response'][0]['deaths']['total'] == "" ? "0" : res['response'][0]['deaths']['total'];
        document.getElementById('total-tests').innerText = res['response'][0]['tests']['total'] == null ? "0" : res['response'][0]['tests']['total'];
    }
    // jika ada error pada saat fetch 
    else {
        document.getElementById('error').innerHTML = "<h4 class='text-danger mt-3'>" + e + "</h4>";
        document.getElementById('active-cases').innerText = "0";
        document.getElementById('new-cases').innerText = "0";
        document.getElementById('recovered-cases').innerText = "0";
        document.getElementById('total-cases').innerText = "0";
        document.getElementById('total-deaths').innerText = "0";
        document.getElementById('total-tests').innerText = "0";
    }
};
// variabel options yang berisi detail dari request yang menggunakan metode GET
// header terdiri dari alamat server API (host) dan Key yang didapat pada saat login di situs rapidAPI
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'a91a9b9713msh7736c127317d9f6p1c7b47jsn2702923c3e0a',
        'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
    }
};
// fungsi untuk mengambil / fetch data dari API
function getdata() {
    const country = document.getElementById('selectCountry').value;
    // melakukan fetch ke API dan memanggil fungsi disp() untuk menampilkan data hasil fetching
    fetch('https://covid-193.p.rapidapi.com/statistics?country=' + country, options).then(response => response.json()).then(response => disp(response)).catch(err => console.error(err));
}
// fungsi untuk mendapatkan daftar negara yang datanya tersedia di API
function getCountry() {
    const response = fetch('https://covid-193.p.rapidapi.com/countries', options).then(response => response.json()).then(response => updateSelectBox(response)).catch(err => console.error(err));
}
// fungsi untuk melakukan pengisian daftar negara pada select box
function updateSelectBox(res) {
    res['response'].forEach((i) => {
        var x = document.getElementById("selectCountry");
        var option = document.createElement("option");
        option.text = i;
        option.value = i;
        x.add(option);
    });
}
// ambil daftar negara
getCountry();
// menampilkan data default ketika web dibuka akan menampilkan data covid di indonesia
getdata();
