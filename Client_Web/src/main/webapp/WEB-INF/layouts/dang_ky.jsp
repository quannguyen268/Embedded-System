<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Realtime Form Validation</title>

    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <link href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="resources/dist/css/dang_ky/dang_ky.css" type="text/css">
    <link rel="stylesheet" href="resources/dist/css/dang_ky/form_hack.css" type="text/css">
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>

    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

    <link rel="stylesheet" href="resources/plugins/select2/css/select2.min.css">
    <link rel="stylesheet" href="resources/plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css">
    <script src="resources/plugins/select2/js/select2.full.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.8/js/select2.min.js" defer></script>
    <script src="resources/plugins/bs-custom-file-input/bs-custom-file-input.js"></script>
</head>
<body>

<div class="container">
    <div class="registration" id="registration">
        <div class="title">
            <h1>Đăng ký</h1>
            <span class="text">Nhanh chóng và dễ dàng</span>
        </div>

        <label for="username">

            <input type="text" id="username" minlength="3" placeholder="Tên tài khoản" required>

            <ul class="input-requirements">
                <li>At least 3 characters long</li>
                <li>Must only contain letters and numbers (no special characters)</li>
            </ul>
        </label>

        <label for="password">

            <input type="password" id="password" maxlength="100" minlength="8" required placeholder="Nhập mật khẩu">

            <ul class="input-requirements">
                <li>At least 8 characters long (and less than 100 characters)</li>
                <li>Contains at least 1 number</li>
                <li>Contains at least 1 lowercase letter</li>
                <li>Contains at least 1 uppercase letter</li>
                <li>Contains a special character (e.g. @ !)</li>
            </ul>
        </label>

        <label for="password_repeat">
            <input type="password" id="password_repeat" maxlength="100" minlength="8" required placeholder="Nhập lại mật khẩu">
        </label>

        <label for="password_repeat">
            <input type="email" placeholder="email" id="email" required>
        </label>


        <div class="text2">
            <small class="text ">Bằng cách nhấp vào Đăng ký,bạn đồng ý với <a class="" href=""><ins id="btn-dieu-khoan">Điều khoản</ins></a> ,<a href=""><ins id="btn-chinh-sach">Chính sách dữ liệu</ins> </a> của chúng tôi bạn có thể nhận được
                thông báo của chúng tôi qua SMS và hủy nhận bất kì lúc nào <br> </small>

        </div>
        <br>

        <input type="submit" id="submit">
        <div class="text">Bạn đã có tài khoản? <a href="/">Đăng nhập</a></div>
    </div>


</div>
<script src="resources/dist/js/dang_ky/dang_ky.js"></script>
<script src="resources/dist/js/ajax/ajax_main.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
</body>
</html>


