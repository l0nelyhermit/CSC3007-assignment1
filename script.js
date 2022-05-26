var dataInput = [];
var timeInput = "";

$(document).ready(function(){
async function fetchData(){
    const url = 'https://api.data.gov.sg/v1/environment/psi'
    const response = await fetch (url);
    const data = await response.json();
    timeInput = new Date(data.items[0].update_timestamp).toLocaleString("en-US",{day:'numeric',year:'numeric',month:'numeric',hour: '2-digit', minute:'2-digit'})
    for (const[key,value]of Object.entries(data.items[0].readings)){
        dataInput.push({
            metric: key,
            national: value.national,
            central:value.central,
            west:value.west,
            east:value.east,
            north:value.north,
            south:value.south
        })
    }

    $('#tabledata').DataTable({
        'data':dataInput,
        "iDisplayLength": 12,
        "bLengthChange": false,
        'columns':[
            {data:'metric'},
            {data:'national'},
            {data:'central'},
            {data:'west'},
            {data:'east'},
            {data:'north'},
            {data:'south'}
        ]
    });

    $('#subtitle').append(`<strong>\xa0${timeInput}<strong>`)
}

fetchData();

})