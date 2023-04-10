            // untuk menampilkan hasil fetch data API ke tampilan web
            function disp(res) {
                const e = res['errors']['country'];
                // jika tidak ada error pada saat fetch, menampilkan data hasil fetch
                if (typeof e === "undefined") {
                    document.getElementById('error').innerHTML = "";
                    document.getElementById('active-cases').innerText = res['response'][0]['cases']['active'];
                    document.getElementById('new-cases').innerText = res['response'][0]['cases']['new'];
                    document.getElementById('recovered-cases').innerText = res['response'][0]['cases']['recovered'];
                    document.getElementById('total-cases').innerText = res['response'][0]['cases']['total'];
                    document.getElementById('total-deaths').innerText = res['response'][0]['deaths']['total'];
                    document.getElementById('total-tests').innerText = res['response'][0]['tests']['total'];
                } 
                // jika ada error pada saat fetch
                else {
                    document.getElementById('error').innerHTML = "<h4 class='text-danger mt-3'>"+ e +"</h4>";
                    document.getElementById('active-cases').innerText = "0";
                    document.getElementById('new-cases').innerText = "0";
                    document.getElementById('recovered-cases').innerText = "0";
                    document.getElementById('total-cases').innerText = "0";
                    document.getElementById('total-deaths').innerText = "0";
                    document.getElementById('total-tests').innerText = "0";
                }
            };
            // variabel options berisi detail dari request menggunakan metode GET
            // header terdiri dari alamat server API (host) dan Key didapat saat login ke situs rapidAPI
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': 'a91a9b9713msh7736c127317d9f6p1c7b47jsn2702923c3e0a',
                    'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
                }
            };
            // untuk fetch data dari API
            function getdata() {
                const country = document.getElementById('input').value;
                // melakukan fetch ke API dan memanggil fungsi disp() untuk menampilkan hasil data
                fetch('https://covid-193.p.rapidapi.com/statistics?country=' + country, options).then(response => response.json()).then(response => disp(response)).catch(err => console.error(err));
            }
            // tampilan default ketika web dibuka akan menampilkan data covid di indonesia
            document.getElementById('input').value = "indonesia";
            getdata();
