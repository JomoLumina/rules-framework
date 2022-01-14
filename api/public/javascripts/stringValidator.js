function isWordBlackListed(word, listOfWords){
    return listOfWords.includes(word);
}

function isAlphaNumeric(input){
    var inputRegex = /^[a-zA-Z0-9._-]/;
    return inputRegex.test(input); 
}

function hasRepeatedLetters(input){
    var emailPattern = /(.)\1{2,}/;
    return emailPattern.test(input); 
}

function hasSpaces(input){
    var inputRegex = /\s/g
    return inputRegex.test(input); 
}

function hasDuplicates(input, list){
    return list.includes(input);
}

module.exports = {
    isWordBlackListed,
    isAlphaNumeric,
    hasDuplicates,
    hasRepeatedLetters,
    hasSpaces
};