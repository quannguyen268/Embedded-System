<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Title</title>
    <meta charset="utf-8">
    <meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="resources/dist/css/dang_nhap/dang_nhap.css" type="text/css">
    <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <script src="resources/plugins/jQuery/jQuery-2.1.3.min.js"></script>
    <link rel="stylesheet" href="resources/plugins/select2/css/select2.min.css">
    <link rel="stylesheet" href="resources/plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css">
    <script src="resources/plugins/select2/js/select2.full.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.8/js/select2.min.js" defer></script>
    <script src="resources/plugins/bs-custom-file-input/bs-custom-file-input.js"></script>
</head>
<body>

<div class="login-form">
    <form >
        <h2 class="text-center">Đăng nhập</h2>
        <div class="form-group">
            <span class="mp-3">Tài khoản</span>
            <input type="text" class="form-control" placeholder="Username" required="required" id="username">
            <span class=""></span>
        </div>

        <div class="form-group">
            <span>Mật khẩu</span>
            <input type="password" class="form-control" placeholder="Password" required="required" id="password">
        </div>

        <div class="clearfix">
            <label class="pull-left checkbox-inline"><input type="checkbox"> Remember me</label>
            <a href="" id="btn-quen-mat-khau" class="pull-right">Quên mật khẩu?</a>
        </div>

        <div class="form-group">
            <button type="button" class="btn btn-primary btn-block" id="btn-login">Đăng nhập</button>
        </div>

        <div class="txt1 text-center p-t-54 p-b-20">
                <span>
                   Hoặc đăng nhập sử dụng
                </span>
        </div>

        <div class="flex-c-m">
            <a href="#" class="login100-social-item bg1">
                <i class="fa fa-facebook"></i>
            </a>

            <a href="#" class="login100-social-item bg2">
                <i class="fa fa-twitter"></i>
            </a>

            <a href="#" class="login100-social-item bg3">
                <i class="fa fa-google"></i>
            </a>
        </div>

        <div class="w-full text-center p-t-55">
                <span class="txt2">
                Bạn chưa có tài khoản
                </span>
            <a href="" id="btn-dang-ky" class="txt2 bo1">
                Đăng kí
            </a>
        </div>
    </form>

</div>
<!-- Optional JavaScript -->

<script src="resources/dist/js/dang_ky/login.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/notify/0.4.2/notify.js"></script>
<script src="resources/plugins/jQuery/jQuery-2.1.3.min.js"></script>
<script src="http://code.jquery.com/ui/1.11.2/jquery-ui.min.js" type="text/javascript"></script>
<script src="resources/dist/js/ajax/ajax_main.js"></script>


</body>
</html>