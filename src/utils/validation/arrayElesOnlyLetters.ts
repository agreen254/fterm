// code adapted from:
// https://www.w3resource.com/javascript/form/all-letters-field.php#:~:text=You%20can%20write%20a%20JavaScript,HTML%20form%20contains%20only%20letters.&text=To%20get%20a%20string%20contains,%2F%20which%20allows%20only%20letters
const letters = /^[A-Za-z]+$/;

function containsOnlyLetters(text: string) {
  return !!text.match(letters);
}

function arrayElesOnlyLetters(text: string[]) {
  return text.filter((entry) => !containsOnlyLetters(entry));
}

export default arrayElesOnlyLetters;
