<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<script src="resources/pages/thong_tin_header/ajax_header.js"></script>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>MpecLab</title>
    <meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>
    <link rel="shortcut icon" type="image/png" href="resources/dist/img/Logo.png"/>
    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
    <title><tiles:insertAttribute name="title"/></title>
    <%@include file="../library/library_css.jsp" %>
    <script src="resources/dist/js/ajax/ajax_main.js"></script>
</head>

<body class="skin-blue">

<!-- Main Js -->
<%@include file="../library/library_js.jsp" %>

<div class="logo">
    <div class="logo-wp">
        <a class="logo-img" href="/danh-sach-hang-hoa">
            <img id="logo" src="./dist/img/Logo.png" height="100" alt="">
        </a>
        <div class="logo-ct">
            <span style="font-size: 40px;">Phần mềm quản lí bán hàng</span>
            <span id="name-company" style="font-size: 28px;">Nhà hàng Đức Quý</span>
        </div>
    </div>
</div>

<div class="wrapper">
    <tiles:insertAttribute name="header"/>
    <tiles:insertAttribute name="body"/>
    <tiles:insertAttribute name="footer"/>
</div>

</body>

</html>