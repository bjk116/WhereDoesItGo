var income=0, deductions=0, filingStatusSelected='';
var incomeTax;
var incomeString;
var deductionString;

var exampleBreakdown = {
	'Defense':.60,
	'Education':.20,
	'Welfase':.10,
}

var realUSBreakdown = {
	//
}

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

function checkInput(input){
	console.log(typeof(input));
	if (typeof(input)==='number') {
		return true; //input in form is acceptable
	} else {
		return false; //input in form is string, etc.
	}
}

function returnTaxBreakdown(taxPaid, departmentBreakdown) {
	console.log('returnTaxBd');
	//basically loop through department breakdown, spit out department name + taxPaid * department%
	//return 2-D loop [ [department1, $320], [department2, $423], etc ] 
}


function errorCheck(status, inc, ded) {
	console.log('Running error check');
	//return false if there is an error in the data, otherwise return true
	if(status==='') {
		$('#errorMessage').html('Please select your filing status');
		return false;
	} else if (income.length==0) {
		console.log('income is not a number');
		$('#errorMessage').html('Please enter a number for income');
		return false;	
	} else if (income < 0) {
		$('#errorMessage').html('Please enter a POSITIVE number for income');
		return false;
	} else if (deductions.length==0) {
		console.log('deductions is not a number');
		$('#errorMessage').html('Please enter a number for deductions');
		return false;	
	} else if (deductions < 0) {
		$('#errorMessage').html('Please enter deductions as a POSITIVE number');
		return false;	
	} else {
		$('#errorMessage').html('');
		return true;
	}
}

function runTheNumbers() {
	income = $('#incomeInput').val();
	deductions = $('#deductionsInput').val();

	if (errorCheck(filingStatusSelected, income, deductions)==false) {
		//error Check has error messages built in, no need to do anything here
	} else {
		var taxable;
		var taxRate;
		//everything entered correctly, filing status income deductions
		//turn income/deductions into numbers
		income=parseFloat(income);
		deductions=parseFloat(deductions);
		taxable=income-deductions;
		//calculate actual tax paid
		incomeTax=calculateTax(income-deductions, filingStatusSelected);
		//calculate income Tax %
		taxRate=incomeTax/(income-deductions);
		console.log(taxRate);
		taxRate=taxRate*100;
		console.log(taxRate);
		taxRate=taxRate.toFixed(2);
		console.log(taxRate);
		taxRate='%'+taxRate;
		console.log(taxRate);
		//prepare income, deductions, taxes for presentation
		incomeString='$'+formatMoney(income);
		deductionString=formatMoney(deductions);
		taxable=formatMoney(taxable);
		incomeTaxString='$'+formatMoney(incomeTax);
		//fill in ID's
		$('#incomeResult').html(incomeString);
		$('#deductionsResult').html(deductionString);
		$('#taxableResult').html(taxable);
		$('#incomeTaxesResult').html(incomeTaxString);
		$('#taxPResult').html(taxRate);
		//present basic findings, turn on visiblity
		presentResults();
	}
}

//Courtesy of http://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-money-in-javascript
function formatMoney(n, c, d, t){
var n = n, 
    c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "," : t, 
    s = n < 0 ? "-" : "", 
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };

//shows Results page
function presentResults() {
	$('.results-visibility').css('opacity','1');
}

$(document).ready( function() {
	console.log('Doc is ready!');
	//Getting Filing STatus
	$("input:radio[name=filingStatus]").click(function() {
    filingStatusSelected= $(this).val();
   	console.log(filingStatusSelected);
	});
	//Get numbers
	$('#runResults').on('click', runTheNumbers);
});