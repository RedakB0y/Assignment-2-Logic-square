let total = [];
let temp;

function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
};

async function fetch_api(e) {
    let cafesdata;
    let placedata;
    const res = await fetch('https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/cafes.json');
    const res1 = await fetch('https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/places.json');

    cafesdata = await res.json();
    placedata = await res1.json();

    cafesdata.cafes.forEach(element => {
        if (element.name.includes(e) || element.name.includes(toTitleCase(e))) {
            placedata.places.filter((elm) => {
                if (element.location_id === elm.id) {
                    temp = {
                        "name": element.name,
                        ...elm,
                    }
                    let { id, ...rest } = temp;
                    total.push(rest);
                }
            })

        }
    });
    ShowTable(total);
    total = [];
}

fetch_api("");

function findCaliforniaCafes(searchdata) {
    fetch_api(searchdata);
}

function ShowTable(elm) {
    let Table = "";
    elm.map((data, index) => {
        Table += `<tr>
    <td>${++index}</td>
    <td>${data.name}</td>
    <td>${data.locality}</td>
    <td>${data.postal_code}</td>
    <td>${data.lat}</td>
    <td>${data.long}</td>
    </tr > `
    })
    document.getElementById("table_body").innerHTML = Table;
}


