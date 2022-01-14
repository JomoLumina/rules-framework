var data = require('../../data/data.json');
var messages = require('../../utils/messages.json');
var validator = require('./stringValidator.js');

function isEmailValid(email){
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email); 
}

function validateAllRules(email){
    if(!email){
        return {
            valid: false,
            reason: messages.EMAIL_NOT_PROVIDED
        }
    }
    var arrEmail = email.split('@');
    var user = arrEmail[0]
    var domain = arrEmail[1]
    console.log(user,email);
    if(validator.hasSpaces(email)){
        return {
            valid: false,
            reason: messages.EMAIL_HAS_SPACES
        }
    }
    else if(validator.hasRepeatedLetters(email)){
        return {
            valid: false,
            reason: messages.EMAIL_HAS_REPEATS
        }
    }
    else if(!validator.isAlphaNumeric(email)){
        return {
            valid: false,
            reason: messages.EMAIL_IS_NOT_ALPHANUMERIC
        }
    }
    else if(user && validator.isWordBlackListed(user, data.blacklist.words)){
        //check if user is blacklisted
        return {
            valid: false,
            reason: messages.USER_IS_BLACKLISTED
        }
    }
    else if(domain && validator.isWordBlackListed(domain, data.blacklist.domains)){
        //check if domain is blacklisted
        return {
            valid: false,
            reason: messages.DOMAIN_IS_BLACKLISTED
        }
    }
    else if(!isEmailValid(email)){
        return {
            valid: false,
            reason: messages.EMAIL_NOT_VALID
        }
    }else{
        return {
            valid: true
        }
    }
}

function validateAllListedEmails(){
    var emails = data.emails;
    var output = [];
    emails.forEach((email) => {
        var results = validateAllRules(email);
        if(output.some(element => element.email === email)){
            results = {
                valid: false,
                reason: messages.DUPLICATE_EMAIL
            }
        }
        output.push({
            email: email,
            ...results
        })
    });
    return output;
}

module.exports = {
    validateAllListedEmails
};
