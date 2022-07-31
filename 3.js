'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
	owner: 'Jonas Schmedtmann',
	movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
	interestRate: 1.2, // %
	pin: 1111,
};

const account2 = {
	owner: 'Jessica Davis',
	movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
	interestRate: 1.5,
	pin: 2222,
};

const account3 = {
	owner: 'Steven Thomas Williams',
	movements: [200, -200, 340, -300, -20, 50, 400, -460],
	interestRate: 1.7,
	pin: 3333,
};

const account4 = {
	owner: 'Sarah Smith',
	movements: [430, 1000, 700, 50, 90],
	interestRate: 1,
	pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
	['USD', 'United States dollar'],
	['EUR', 'Euro'],
	['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

const displayMovements = function (movements) {
	containerMovements.innerHTML = '';

	movements.forEach(function (mov, i) {
		const type = mov > 0 ? 'deposit' : 'withdrawal';
		const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${mov}</div>
  </div>`;

		containerMovements.insertAdjacentHTML('afterbegin', html);
	});
};

const calcDisplayBalance = function (movements) {
	const balance = movements.reduce((acc, cur) => acc + cur, 0);

	labelBalance.textContent = `${balance} EUR`;
};

const createUser = function (accs) {
	accs.forEach(function (acc) {
		acc.username = acc.owner
			.toLowerCase()
			.split(' ')
			.map(user => user[0])
			.join('');
	});
};
createUser(accounts);

const calcDisplaySummary = function (acc) {
	const incomes = acc.movements
		.filter(mov => mov > 0)
		.reduce((acc, cur) => acc + cur, 0);
	labelSumIn.textContent = `${incomes} EUR`;

	const outcomes = acc.movements
		.filter(mov => mov < 0)
		.reduce((acc, cur) => acc + cur, 0);
	labelSumOut.textContent = `${Math.abs(outcomes)} EUR`;

	const intrest = acc.movements
		.filter(mov => mov > 0)
		.map(deposit => (deposit * 1.2) / 100)
		.filter(mov => mov >= 1)
		.reduce((acc, cur) => acc + cur, 0);
	labelSumInterest.textContent = `${intrest} EUR`;
};

//////////////////////////////
let currentAccount;

btnLogin.addEventListener('click', function (e) {
	e.preventDefault();

	currentAccount = accounts.find(
		acc => acc.username === inputLoginUsername.value
	);
	console.log(currentAccount);

	if (currentAccount?.pin === Number(inputLoginPin.value)) {
		// DISPLAY UI AND MESSAGE
		console.log(`login`);
		labelWelcome.textContent = `Welcome back, ${
			currentAccount.owner.split(' ')[0]
		}`;
		containerApp.style.opacity = 100;
		// CLEAR INPUTFIELD
		inputLoginUsername.value = inputLoginPin.value = '';
		inputLoginPin.blur();
		displayMovements(currentAccount.movements);
		calcDisplayBalance(currentAccount.movements);
		calcDisplaySummary(currentAccount);
	}
});

/*

const deposit = movements.filter(mov => mov > 0);
const withdrawal = movements.filter(mov => mov < 0);

let total = 0;

for (let mov of movements) {
  total += mov;
}

console.log(total);

// const totalDeposit = deposit.reduce(function (acc, val, i, arr) {
//   return acc + val;
// }, 0);

// const totalDeposit = deposit.reduce((acc, val) => acc + val, 0);

// console.log(deposit);
// console.log(totalDeposit);
// console.log(withdrawal);
// 

const euroToUsd = 1.1;
const movementsUsd = movements.map(mov => mov * euroToUsd);

const movementsDescription = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: you ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )} in your bank account`
);

console.log(movementsDescription);
console.log(movements);
console.log(movementsUsd);
// let arr = [4, 5, 8, 3, 7, 5, 3];
// console.log(arr.splice(-1));

// let arr2 = ['e', 't', 'h', 'u'];
// console.log(arr2.reverse());

// for (let [i, amount] of movements.entries()) {
//   console.log(`Movement ${i + 1}: you have ${amount} in your account`);
// }

// for (let i = 0; i < movements.length; i++) {
//   console.log(`you have ${movements[i]} in your account`);
// }
/** 

const checkDogs = function (dogsJulia, dogsKate) {
  const arr = dogsJulia.slice(1, -2);
  const combined = dogsKate.concat(arr);
  console.log(combined);
  combined.forEach(function (dog, i) {
    if (dog >= 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy `);
    }
  });
};

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

*/

// const calAverageHumanAge = function (ages) {
//   const humanYears = ages
//     .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
//     .filter(age => age > 18)
//     .reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
//   return humanYears;
// };

// console.log(calAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
// console.log(calAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

// for (const account of accounts)
//   if (account.owner === 'Jessica Davis') console.log(account);
