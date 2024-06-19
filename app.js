
const contactForm = document.getElementById('contact-form');
const emailInput = document.getElementById('email');
const countryInput = document.getElementById('country');
const zipInput = document.getElementById('zip-code');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');

contactForm.addEventListener('submit', function (event) {
    event.preventDefault();
    if (validateForm()) {
        console.log('Form submitted successfully');
        // contactForm.submit(); // Uncomment this line to allow actual submission
    } else {
        console.log('Form validation failed');
    }
});

function validateForm() {
    let isValid = true;

    if (!validateEmail()) isValid = false;
    if (!validateCountry()) isValid = false;
    if (!validateZipCode()) isValid = false;
    if (!validatePassword()) isValid = false;
    if (!validateConfirmPassword()) isValid = false;

    return isValid;
}

function validateEmail() {
    const emailError = document.getElementById('email-error');
    if (emailInput.validity.valueMissing) {
        emailError.textContent = 'Email is required.';
        emailError.style.display = 'block';
        return false;
    } else if (!emailInput.validity.valid) {
        emailError.textContent = 'Please enter a valid email address.';
        emailError.style.display = 'block';
        return false;
    } else {
        emailError.textContent = '';
        emailError.style.display = 'none';
        return true;
    }
}

function validateCountry() {
    const countryError = document.getElementById('country-error');
    if (countryInput.validity.valueMissing) {
        countryError.textContent = 'Please select a country.';
        countryError.style.display = 'block';
        return false;
    } else {
        countryError.textContent = '';
        countryError.style.display = 'none';
        return true;
    }
}

function validateZipCode() {
    const zipError = document.getElementById('zip-error');
    const country = countryInput.value;
    const zip = zipInput.value.trim();
    const constraints = {
        CH: [/^(CH-)?\d{4}$/, "Switzerland ZIPs must have exactly 4 digits: e.g. CH-1950 or 1950"],
        FR: [/^(F-)?\d{5}$/, "France ZIPs must have exactly 5 digits: e.g. F-75012 or 75012"],
        DE: [/^(D-)?\d{5}$/, "Germany ZIPs must have exactly 5 digits: e.g. D-12345 or 12345"],
        NL: [/^(NL-)?\d{4}\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$/, "Netherlands ZIPs must have exactly 4 digits, followed by 2 letters except SA, SD and SS"],
        DK: [/^(DK-)?\d{4}$/, "Denmark ZIPs are 4 digits. E.g. DK-8000 (DK- is optional)"]
    };

    if (constraints[country]) {
        const [pattern, errorMessage] = constraints[country];
        if (!pattern.test(zip)) {
            zipError.textContent = errorMessage;
            zipError.style.display = 'block';
            return false;
        } else {
            zipError.textContent = '';
            zipError.style.display = 'none';
            return true;
        }
    } else {
        zipError.textContent = 'Invalid country code';
        zipError.style.display = 'block';
        return false;
    }
}

function validatePassword() {
    const passwordError = document.getElementById('password-error');
    if (passwordInput.validity.valueMissing) {
        passwordError.textContent = 'Password is required.';
        passwordError.style.display = 'block';
        return false;
    } else if (passwordInput.value.length < 8) {
        passwordError.textContent = 'Password must be at least 8 characters long.';
        passwordError.style.display = 'block';
        return false;
    } else {
        passwordError.textContent = '';
        passwordError.style.display = 'none';
        return true;
    }
}

function validateConfirmPassword() {
    const confirmPasswordError = document.getElementById('confirm-password-error');
    if (confirmPasswordInput.validity.valueMissing) {
        confirmPasswordError.textContent = 'Confirm password is required.';
        confirmPasswordError.style.display = 'block';
        return false;
    } else if (confirmPasswordInput.value !== passwordInput.value) {
        confirmPasswordError.textContent = 'Passwords must match.';
        confirmPasswordError.style.display = 'block';
        return false;
    } else {
        confirmPasswordError.textContent = '';
        confirmPasswordError.style.display = 'none';
        return true;
    }
}

