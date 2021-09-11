function CustomValidation(input) {
    this.invalidities = [];
    this.validityChecks = [];

    //add reference to the input node
    this.inputNode = input;

    //trigger method to attach the listener
    this.registerListener();
}

CustomValidation.prototype = {
    addInvalidity: function(message) {
        this.invalidities.push(message);
    },
    getInvalidities: function() {
        return this.invalidities.join('. \n');
    },
    checkValidity: function(input) {
        for ( var i = 0; i < this.validityChecks.length; i++ ) {

            var isInvalid = this.validityChecks[i].isInvalid(input);
            if (isInvalid) {
                this.addInvalidity(this.validityChecks[i].invalidityMessage);
            }

            var requirementElement = this.validityChecks[i].element;

            if (requirementElement) {
                if (isInvalid) {
                    requirementElement.classList.add('invalid');
                    requirementElement.classList.remove('valid');
                } else {
                    requirementElement.classList.remove('invalid');
                    requirementElement.classList.add('valid');
                }

            } // end if requirementElement
        } // end for
    },
    checkInput: function() { // checkInput now encapsulated

        this.inputNode.CustomValidation.invalidities = [];
        this.checkValidity(this.inputNode);

        if ( this.inputNode.CustomValidation.invalidities.length === 0 && this.inputNode.value !== '' ) {
            this.inputNode.setCustomValidity('');
        } else {
            var message = this.inputNode.CustomValidation.getInvalidities();
            this.inputNode.setCustomValidity(message);
        }
    },
    registerListener: function() { //register the listener here

        var CustomValidation = this;

        this.inputNode.addEventListener('keyup', function() {
            CustomValidation.checkInput();
        });


    }

};



/* ----------------------------
	Validity Checks
	The arrays of validity checks for each input
	Comprised of three things
		1. isInvalid() - the function to determine if the input fulfills a particular requirement
		2. invalidityMessage - the error message to display if the field is invalid
		3. element - The element that states the requirement
---------------------------- */

var usernameValidityChecks = [
    {
        isInvalid: function(input) {
            return input.value.length < 3;
        },
        invalidityMessage: 'This input needs to be at least 3 characters',
        element: document.querySelector('label[for="username"] .input-requirements li:nth-child(1)')
    },
    {
        isInvalid: function(input) {
            var illegalCharacters = input.value.match(/[^a-zA-Z0-9]/g);
            return illegalCharacters ? true : false;
        },
        invalidityMessage: 'Only letters and numbers are allowed',
        element: document.querySelector('label[for="username"] .input-requirements li:nth-child(2)')
    }
];

var passwordValidityChecks = [
    {
        isInvalid: function(input) {
            return input.value.length < 8 | input.value.length > 100;
        },
        invalidityMessage: 'This input needs to be between 8 and 100 characters',
        element: document.querySelector('label[for="password"] .input-requirements li:nth-child(1)')
    },
    {
        isInvalid: function(input) {
            return !input.value.match(/[0-9]/g);
        },
        invalidityMessage: 'At least 1 number is required',
        element: document.querySelector('label[for="password"] .input-requirements li:nth-child(2)')
    },
    {
        isInvalid: function(input) {
            return !input.value.match(/[a-z]/g);
        },
        invalidityMessage: 'At least 1 lowercase letter is required',
        element: document.querySelector('label[for="password"] .input-requirements li:nth-child(3)')
    },
    {
        isInvalid: function(input) {
            return !input.value.match(/[A-Z]/g);
        },
        invalidityMessage: 'At least 1 uppercase letter is required',
        element: document.querySelector('label[for="password"] .input-requirements li:nth-child(4)')
    },
    {
        isInvalid: function(input) {
            return !input.value.match(/[\!\@\#\$\%\^\&\*]/g);
        },
        invalidityMessage: 'You need one of the required special characters',
        element: document.querySelector('label[for="password"] .input-requirements li:nth-child(5)')
    }
];

var passwordRepeatValidityChecks = [
    {
        isInvalid: function() {
            return passwordRepeatInput.value != passwordInput.value;
        },
        invalidityMessage: 'This password needs to match the first one'
    }
];


/* ----------------------------
	Setup CustomValidation
	Setup the CustomValidation prototype for each input
	Also sets which array of validity checks to use for that input
---------------------------- */

var usernameInput = document.getElementById('username');
var passwordInput = document.getElementById('password');
var passwordRepeatInput = document.getElementById('password_repeat');

usernameInput.CustomValidation = new CustomValidation(usernameInput);
usernameInput.CustomValidation.validityChecks = usernameValidityChecks;

passwordInput.CustomValidation = new CustomValidation(passwordInput);
passwordInput.CustomValidation.validityChecks = passwordValidityChecks;

passwordRepeatInput.CustomValidation = new CustomValidation(passwordRepeatInput);
passwordRepeatInput.CustomValidation.validityChecks = passwordRepeatValidityChecks;




/* ----------------------------
	Event Listeners
---------------------------- */

var inputs = document.querySelectorAll('input:not([type="submit"])');


function validate() {
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].CustomValidation.checkInput();

    }
};

async function dangKy(registerForm) {
    return ajaxPost(`v1/public/user/dang-ky`,registerForm,1);
};


$(function () {
    $( "#btn-dieu-khoan" ).click(function(e) {
        e.preventDefault();
        location.href= "dieu-khoan";
    });

    $( "#btn-chinh-sach" ).click(function(e) {
        e.preventDefault();
        location.href= "chinh-sach";
    });

    dangKyTaiKhoan();
    clickDangNhap();
});

function dangKyTaiKhoan() {
    $("#submit").click(function () {
        var email = $("#email").val();
        var userName = $("#username").val();
        var passWord = $("#password").val();

        var registerForm = {
            userName: userName,
            passWord: passWord,
            email: email
        }
        console.log(registerForm);
        if (regexUsername(userName) && regexEmail(email)) {
            console.log("vao day");
            dangKy(registerForm).then(rs=> {
                console.log(rs.message );
                console.log(rs.message === "register success" );
                if (rs.message === "register success") {
                    location.href= "dang-nhap";
                    console.log("1");
                    alert("Đăng ký thành công");
                }
                else {
                    console.log("2");
                    alert("Đăng ký thất bại");
                }
            })
        }
        else {
            alert("bạn cần nhập đúng định dạng");
        }
    })
}

function clickDangNhap() {
    $("#btn-dang-nhap").click(function (e) {
        e.preventDefault();
        console.log("dang nhap");
        location.href =  "dang-nhap";
    });
}




