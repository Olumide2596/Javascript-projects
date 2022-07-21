'use strict';

const gallery = document.querySelectorAll('.gallery');
const back = document.querySelector('.go-back');
// click function

for (const gal of gallery) {
	gal.addEventListener('click', () => {
		removeActive();
		gal.classList.add('active');
	});
}

const removeActive = function () {
	for (const gal of gallery) {
		gal.classList.remove('active');
	}
};

// back.addEventListener('click', () => {
// 	back.history.back();
// });
