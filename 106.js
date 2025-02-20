// Fetch data from data.json and display in html
fetch('./data.json')
    .then(res => res.json())
    .then(data => {
        console.log(data);
    });
