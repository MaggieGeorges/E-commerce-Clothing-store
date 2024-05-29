import { displayCartItems } from './cart.js';
import { displayData } from './data.json';

const iconQtyAction = document.querySelector('.header__icon');

//fetch all data
function fetchData() {
  fetch('../data.json')
    .then((data) => data.json())
    .then((response) => displayData(response))
    .catch((err) => console.error(err.message));
}

function getLocalStorage(description) {
  return localStorage.getItem(description)
    ? JSON.parse(localStorage.getItem(description))
    : undefined;
}

function setLocalStorage(description, article) {
  localStorage.setItem(description, JSON.stringify(article));
  if (description === 'currentCart') displayCartItems(article);
}

iconQtyAction.addEventListener('click', handlePageView);

function handlePageView() {
  const allProductsApp = document.querySelector('.allProductsApp');
  const shoppingCartApp = document.querySelector('.shoppingCartApp');
  allProductsApp.style.display = 'none';
  shoppingCartApp.style.display = 'block';
}

function getUserDetails() {
  return JSON.parse(localStorage.getItem('userDetails'));
}

// Function to simulate user login
function loginUser(userId, username) {
  const userDetails = { id: userId, username: username };
  localStorage.setItem('userDetails', JSON.stringify(userDetails));
  console.log('User logged in:', userDetails);
}

//Starting the app loading all data
fetchData();

export { getLocalStorage, setLocalStorage };
