/* Where we are putting the cards */
const $main = document.querySelector('main');

/* Finding the input elements and putting them into variables */
const $sortInputs = document.querySelectorAll('input[name=sort]')
const $riskInputs = document.querySelectorAll('input[name=project]')

/* The variable to store the data */
let data;

/* Function to sort the data */
function sort(e) {
	if (this.value === 'down') {
		data.sort((a, b) => a.date > b.date ? -1 : 1);
	} else {
		data.sort((a, b) => a.date > b.date ? 1 : -1);
	}

	bindData(data)
}

/* Function to filter the data */
function filter(e) {
	let filteredData;
	if (this.value === 'all') {
		filteredData = data;
	} else {
		filteredData = data.filter(item => item.projectType === this.value)
	}
	bindData(filteredData);
}

/* Function to bind a card */
function bindItem(item) {
	/* Creating a new div element */
	const div = document.createElement('div');

	/* Injecting data into the template of our card */
	const card = `
					<img src='${item.images}'>
					<h3>${item.projectName}</h3>
					<h4>${item.date}</h4>
					<p>${item.desc}</p>
					<a href='${item.links}'>Learn More</a>`;

	/* Injecting the template into our div*/
	div.innerHTML = card;

	/* Adding the card to the main element */
	$main.appendChild(div);
}

/* Function to bind all the cards to the data */
function bindData(data) {

	/* Clearing out the contents in the main section */
	$main.innerHTML = '';

	/* Looping through each card and binding it to html */
	data.forEach(bindItem);

}

async function fetchData() {
	/* Making the request for `data.json` */
	const response = await fetch('Utils/products.json');

	/* Converting the data into a `Javascript Object` */
	const json = await response.json();

	/* Storing the data into our variable */
	data = json;

	/* Calling Bind Data */
	bindData(data)
}

/* Looping through each element and adding a click event listener */
$sortInputs.forEach(input => input.addEventListener('click', sort));
$riskInputs.forEach(input => input.addEventListener('click', filter));

fetchData();