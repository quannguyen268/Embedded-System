<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<script src="resources/pages/thong_tin_header/ajax_header.js"></script>
<script src="resources/model/nhan_vien/ajax_nhan_vien.js"></script>

<header class="main-header">
    <!-- Logo -->
    <a href="#" class="logo"><b id="name-title">Đức Quý </b></a>
    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top" role="navigation">
        <!-- Sidebar toggle button-->
        <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
            <span class="sr-only">Toggle navigation</span>
        </a>
    </nav>
</header>
<!-- Left side column. contains the logo and sidebar -->
<aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
        <!-- Sidebar user panel -->
        <div class="user-panel" style="margin-top:-20px;">
            <div class="pull-left image">
<%--                <img id="avatar" src="./dist/img/imgquy.png" class="img-circle" alt="User Image" />--%>
                <img id="avatar" class="img-circle" alt="User Image" />
            </div>
            <div class="pull-left info">
                <p id="name-emp" style="font-size: 16px;">Nguyễn Đức Quý</p>
                <a href="#"><i class="fa fa-circle text-success"></i> <span id="role" style="font-size: 14px;">Nhân viên</span></a>
            </div>
        </div>
        <!-- search form -->
        <!-- <form action="#" method="get" class="sidebar-form">
            <div class="input-group">
                <input type="text" name="q" class="form-control" placeholder="Search..." />
                <span class="input-group-btn">
                    <button type='submit' name='search' id='search-btn' class="btn btn-flat"><i
                            class="fa fa-search"></i></button>
                </span>
            </div>
        </form> -->
        <!-- /.search form -->
        <!-- sidebar menu: : style can be found in sidebar.less -->
        <ul class="sidebar-menu">
            <li class="active">

                <a href="tong-quan">
                    <i class="fa fa-dashboard"></i> <span>Tổng quan</span>
                </a>
            </li>

            <li class="treeview">
                <a href="#">
                    <i class="fa fa-reddit-square"></i>
                    <span>Quản lý hàng hóa</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">
                    <li><a href="danh-sach-hang-hoa"><i class="fa fa-circle-o"></i> Danh sách hàng hóa</a></li>
                    <li><a href="danh-muc-hang-hoa"><i class="fa fa-circle-o"></i> Danh mục</a></li>
                    <li><a href="thiet-lap-gia"><i class="fa fa-circle-o"></i>Thiết lập giá</a></li>
                </ul>
            </li>


            <li class="treeview">
                <a href="#">
                    <i class="fa fa-address-card"></i>
                    <span>Quản lý bán hàng</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">
                    <li><a href="danh-sach-hoa-don"><i class="fa fa-circle-o"></i> Danh sách hóa đơn</a></li>


                </ul>
            </li>

            <li class="treeview">
                <a href="#">
                    <i class="fa fa-pie-chart"></i>
                    <span>Quản lý giao dịch</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">
                    <li><a href="danh-sach-nhap-hang"><i class="fa fa-circle-o"></i> Nhập hàng</a></li>
                    <li><a href="danh-sach-hoa-don-de-tra"><i class="fa fa-circle-o"></i> Trả hàng cho khách</a></li>
                    <li><a href="danh-sach-phieu-nhap-de-tra"><i class="fa fa-circle-o"></i> Trả hàng cho nhà cung cấp</a></li>

                </ul>
            </li>

            <li class="treeview">
                <a href="#">
                    <i class="fa fa-handshake-o"></i>
                    <span>Quản lý đối tác</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">
                    <li><a href="danh-sach-khach-hang"><i class="fa fa-circle-o"></i>Khách hàng</a></li>
                    <li><a href="danh-sach-nha-cung-cap"><i class="fa fa-circle-o"></i>Nhà cung cấp</a></li>

                </ul>
            </li>

            <li class="treeview">
                <a href="#">
                    <i class="fa fa-user-circle"></i>
                    <span>Quản lý nhân viên</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">
                    <li><a href="thong-tin-nhan-vien"><i class="fa fa-circle-o"></i>Nhân viên</a></li>
                    <li><a href="hinh-anh-vi-pham"><i class="fa fa-circle-o"></i>Chấm công</a></li>
                    <li><a href="hinh-anh-vi-pham"><i class="fa fa-circle-o"></i>Bảng tính lương</a></li>

                </ul>
            </li>


            <li class="treeview">
                <a href="#">
                    <i class="fa fa-files-o"></i>
                    <span>Quản lý doanh nghiệp</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">
                    <li><a href="thong-tin-cong-ty"><i class="fa fa-circle-o"></i> Thông tin công ty</a></li>
                    <li><a href="quan-ly-chi-nhanh"><i class="fa fa-circle-o"></i> Danh sách chi nhánh</a></li>
                </ul>
            </li>

            <li class="treeview">
                <a href="#">
                    <i class="fa fa-chart-area"></i>
                    <span>Thống kê, báo cáo</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">
                    <li><a href="danh-sach-tra-khach"><i class="fa fa-circle-o"></i> Danh sách đã trả hàng khách</a></li>

                </ul>
            </li>


            <li class="treeview">
                <a href="#">
                    <i class="fa fa-bell"></i> <span>Thông báo, báo cáo</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">
                    <li><a href="gui-thong-bao"><i class="fa fa-circle-o"></i> Gửi thông báo</a></li>
                    <li><a href="nhan-bao-cao"><i class="fa fa-circle-o"></i> Nhận báo cáo</a></li>
                </ul>
            </li>
            <li class="treeview">
                <a href="chat">
                    <i class="fa fa-edit"></i> <span>Phòng chat</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
            </li>
            <li class="treeview">
                <a href="#">
                    <i class="fa fa-bell"></i> <span>Tài kh</span>
                    <i class="fa fa-angle-left pull-right"></i>oản
                </a>
                <ul class="treeview-menu">
                    <li><a href="tai-khoan"><i class="fa fa-circle-o"></i>Tài khoản</a></li>
                    <li><a href="dang-xuat"><i class="fa fa-circle-o"></i>Đăng xuất</a></li>
                </ul>
            </li>
        </ul>
    </section>
    <!-- /.sidebar -->
</aside>
<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="noti">
        <div class="notileft">
            <span>Thông báo</span>
        </div>
        <%--        <marquee id="marq" scrollamount="10" direction="left" loop="infinite" scrolldelay="0" behavior="scroll"--%>
        <%--                 onmouseover="this.stop()" onmouseout="this.start()" class="notiright">--%>
        <%--                        <span>- Doanh nghiệp A bị mất kết nối</span>--%>
        <%--                        <span>- Doanh nghiệp A bị mất kết nối</span>--%>
        <%--                        <span>- Doanh nghiệp A bị mất kết nối</span>--%>
        <%--                        <span>- Doanh nghiệp A bị mất kết nối</span>--%>
        <%--                        <span>- Doanh nghiệp A bị mất kết nối</span>--%>
        <%--        </marquee>--%>
    </section>

<!-- Right side column. Contains the navbar and content of the page -->