// hvae to use the fetch API on client side JS file
// don't work in node

const fb = document.getElementById('fb');

document.addEventListener('submit', (e) => {
    e.preventDefault();
    const address = document.getElementById('address');

    console.log(address.value);
    
    fetch(`http://localhost:3000/forecast?address=${address.value}`)
        .then( (res) => {
            res.json().then( (data) => {
                if (data.error) {
                    fb.innerHTML = data.error;
                } else {
                    fb.innerHTML = data.forecast;
                }
            });
        });
});
