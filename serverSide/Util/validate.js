module.exports.validateRegister = (
    username, 
    email,
    password, 
    confirmPassowrd
    ) => {
    
        const errors = {};

        if(username.trim() === ''){
            errors.username = 'Username is required'
        };

        if(email.trim() === ''){
            errors.email = 'Email is required'
        } else {
            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if(!email.match(re)){
                errors.email = 'Email is not valid';
            }
        };

        if(password.trim() === ''){
            errors.password = 'Password is required';
        } else if(password !== confirmPassowrd){
            errors.password = 'Password must match';
        };

        return {
            errors,
            valid: Object.keys(errors) < 1
        }
};

module.exports.validateLogin = (username, password) => {
    const errors = {};

    if(username.trim() === ''){
        errors.username = 'Username is required'
    };

    if(password.trim() === ''){
        errors.password = 'Password is required';
    };

    return {
        errors,
        valid: Object.keys(errors) < 1
    }
}