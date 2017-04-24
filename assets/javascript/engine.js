//get income
	//if not number, give error alert

function runResults(){
	console.log('Woo, running!');
	$('userResults').append('clicked!');
}

$('#runResults').on('click', runResults());
$('#userResults').on('click', runResults());

function calculateTax(income, filingStatus) {
	switch(filingStatus) {
		case 'single':
			if (income <= 9225) {
				return income*.10;
			} else if (income <= 37250) {
				return 922.50 + (income - 9225) * .15;
			} else if (income <= 90750) {
				return 5156.25 + (income - 37450) * .25;
			} else if (income <= 189300) {
				return 18481.25 + (income - 90750) * .28;
			} else if (income <= 411500) {
				return 46075.25 + (income - 189300) * .33;
			} else if (income <= 413200) {
				return 119401.25 + (income - 411500) * .35;
			} else if (income > 413200) {
				return 119996.25 + (income - 413200) * .396;
			} else {
				return -1;//to indicate some type of error happened
			}
			break;
		case 'married':
			if (income <= 18450) {
				return income*.10;
			} else if (income <= 74900) {
				return 1845 + (income - 18450) * .15;
			} else if (income <= 151200) {
				return 10312.50 + (income - 74900) * .25;
			} else if (income <= 230450) {
				return 29387.50 + (income - 151200) * .28;
			} else if (income <= 411500) {
				return 51577.50 + (income - 230450) * .33;
			} else if (income <= 464850) {
				return 111324 + (income - 411500) * .35;
			} else if (income > 464851) {
				return 129996.50 + (income - 464850) * .396;
			} else {
				return -1;//to indicate some type of error happened
			}
			break;
		case 'headOfHousehold':
			if (income <= 13150) {
				return income*.10;
			} else if (income <= 50200) {
				return 1315 + (income - 13150) * .15;
			} else if (income <= 129600) {
				return 6872.50 + (income - 50200) * .25;
			} else if (income <= 209850) {
				return 26722.50 + (income - 129600) * .28;
			} else if (income <= 411500) {
				return 49192.50 + (income - 209850) * .33;
			} else if (income <= 439000) {
				return 115737 + (income - 411500) * .35;
			} else if (income > 439000) {
				return 125362 + (income - 439000) * .396;
			} else {
				return -1;//to indicate some type of error happened
			}
			break;
	}
}