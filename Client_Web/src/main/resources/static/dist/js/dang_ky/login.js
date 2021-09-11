
function ajaxLogin(data){
    return ajaxPost(  "v1/public/user/login",data);
}

function findByTaiKhoan(taiKhoan) {
    return ajaxGet(`v1/public/user/find-nguoi-dung-by-tai-khoan?tai-khoan=${taiKhoan}`,1);
}

async function findNguoiDungPhongBanByNhanVienId(id=0){
    return ajaxGet(`v1/admin/nguoi-dung-phong-ban-chuc-vu-vai-tro/find-by-nguoi-dung-id?nguoi-dung-id=${id}`)
}

$(document).ready(function () {

    $('#btn-login').click(function (e) {
        e.preventDefault();
        console.log("login");
        onSubmit(e);
    });

    $('#btn-login-fb').click(function (e) {
        e.preventDefault();
        let urlFb=urlApi+"login-facebook";
        document.location.assign(urlFb);
        alert("Tính năng này chưa được hỗ trợ");
    });

    $( "#btn-quen-mat-khau" ).click(function(e) {
        e.preventDefault();
        console.log("quen mat khau");
        location.href=  "tim-tai-khoan";
    });


    $('#btn-login-gg').click(function(e){
        e.preventDefault();
        let urlGg=urlApi+"login-google";
        document.location.assign(urlGg);
        alert("Tính năng này chưa được hỗ trợ");
    })


    $( "#btn-dang-ky" ).click(function(e) {
        e.preventDefault();
        console.log("dang ky");
        location.href=  "dang-ky";
    });
});

function onSubmit(event){
    var username=$('#username').val();
    var password=$('#password').val();
    if(username===null || password===null){
        alterWarning("vui lòng nhập đầy đủ username và password!");
        return;
    }
    else if(password.length<8){
        alterWarning("password nhập thiếu kí tự");
        return;
    }

    let LoginForm={
        username:username,
        password:password
    }
    console.log(LoginForm);
    findByTaiKhoan(username).then((rs2)=>{
        window.sessionStorage.setItem("id",rs2.data.id);
        window.sessionStorage.setItem("taiKhoan",rs2.data.taiKhoan);
        window.sessionStorage.setItem("email",rs2.data.email);
        console.log(rs2);
        console.log("a2a");
    })
var check=0;
    ajaxLogin(LoginForm).then((rs)=>{
        if(rs.message=="login success"){
            current =  window.sessionStorage.getItem("current_page");
            if(current != null){
                location.replace(current);
            }else {
                location.replace("http://localhost:8080/tong-quan");
            }
            window.sessionStorage.setItem("token",rs.data);
            document.cookie = `token=${rs.data}`;
            check=1;
        }
        else {
            alterWarning("Đăng nhập thất bại");
        }
    }).catch(er=>{
        console.log(er);
        $('.login-box-msg').html('Username hoặc Password không đúng, vui lòng kiểm tra lại');
        $('.login-box-msg').css('color','red');
    })



}

function errMess(jqXHR, textStatus, errorThrown) {
    console.log('jqXHR:');
    console.log(jqXHR);
    console.log('textStatus:');
    console.log(textStatus);
    console.log('errorThrown:');
    console.log(errorThrown);
}


