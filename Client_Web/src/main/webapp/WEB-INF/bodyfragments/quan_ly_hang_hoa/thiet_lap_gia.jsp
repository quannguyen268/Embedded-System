<%--
  Created by IntelliJ IDEA.
  User: hiepnguyen
  Date: 6/13/20
  Time: 3:19 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<link rel="stylesheet" href="resources/dist/css/qlttdn.css">
<script src="resources/pages/quan_ly_hang_hoa/ajax_thiet_lap_gia.js"></script>
<script src="resources/model/chi_nhanh/ajax_chi_nhanh.js"></script>
<script src="resources/model/hang_hoa/ajax_thiet_lap_gia.js" type="text/javascript"></script>

<link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6/css/select2.min.css" rel="stylesheet" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6/js/select2.min.js"></script>

<!--Confirm Modal -->
<div class="modal fade" id="confirmModal" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Xác nhận</h4>
            </div>
            <div class="modal-body">
                <p>Giá bán sản phẩm nhỏ hơn giá nhập. Bạn có chắc chắn không?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal" id="refuse-btn">Không</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" id="confirm-btn" style="width: 60px;">Có</button>
            </div>
        </div>

    </div>
</div>


<!--Confirm Modal 2-->
<div class="modal fade" id="confirmModal2" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Xác nhận</h4>
            </div>
            <div class="modal-body">
                <p>Bạn có muốn cập nhập giá sản phẩm không?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal" id="refuse-btn2">Không</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" id="confirm-btn2" style="width: 60px;">Có</button>
            </div>
        </div>

    </div>
</div>

<!-- Modal -->
<div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog modal-lg">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Thêm giá bán hàng hóa mới</h4>
            </div>
            <div class="modal-body">
                <%--tim kiem hang hoa--%>
                <div class="container my-4">
                    <form class="col-md-4">
                        <div>
                            <label>Hàng hóa</label>
                        </div>
                        <select class="form-control select2 select-hang-hoa" id="search-hang-hoa" placeholder="Chọn hàng hóa">
                            <option></option>
                        </select>
                    </form>
                    <div class="col-md-4">
                        <div>
                            <label>Đơn vị</label>
                        </div>
                        <select class = "select2 select-don-vi" id="search-don-vi">
                            <option></option>
                            <option value="-1">Hộp</option>
                            <option value="-2">Gói</option>
                            <option value="-3">Chai</option>
                            <option value="-4">Thùng</option>
                            <option value="-5">Vỉ</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                        <div>
                            <label>Giá bán</label>
                        </div>
                        <input type="number" id="giaBanInput" name="gia_ban" style="width: 50px;height: 35px; border:1px solid #CDCCD5">
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" >Đóng</button>
                <button type="button" class="btn btn-primary" id="btn-upload" >Lưu</button>
            </div>
        </div>
    </div>
</div>

<!--Sub Modal -->
<div class="modal fade" id="subModal" role="dialog">
    <div class="modal-dialog modal-lg">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Thêm đơn vị hàng hóa mới</h4>
            </div>
            <div class="modal-body">
                <%--tim kiem hang hoa--%>
                <div class="container my-4">
                    <div class="col-md-3">
                        <div>
                            <label>Hàng hóa</label>
                        </div>
                        <div>
                            <span id="ten-hang-hoa-moi"></span>
                        </div>
                    </div>
                    <form class="col-md-3 ">
                        <div>
                            <label>Đơn vị</label>
                        </div>
                        <select class="form-control select2 select-hang-hoa" id="search-don-vi-co-ban" placeholder="Chọn đơn vị">
                            <option></option>
                            <option value="1">Hộp</option>
                            <option value="2">Chai</option>
                            <option value="3">Thùng</option>
                            <option value="4">Vỉ</option>
                            <option value="5">Gói</option>
                        </select>
                    </form>
                    <div class="col-md-3">
                        <div>
                            <label>Tỷ lệ</label>
                        </div>
                        <input class="form-control" type="number" min="0" value="1" id="tyLe">
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" >Đóng</button>
                <button type="button" class="btn btn-primary" id="btn-upload-don-vi" >Lưu</button>
            </div>
        </div>
    </div>
</div>

<!-- Main content -->
<section class="content">
    <div class="buifmaop">
        <div class="buifmaoptitle">
            <span class="page-title">Danh sách thiết lập giá</span>
        </div>
        <div class="buifmaopct">
            <div class="row">
                <div class="col-md-5">
                    <div class="caifop1li">
                        <label for="bimo2">Thuộc chi nhánh</label>
                        <select class="js-example-basic-single" name="state" id="bimo2">
                            <option value=0>Tất cả</option>
                            <option value=1>Cocacola</option>
                            <option value=2>Pepsi</option>
                            <option value=3>Fanta</option>
                        </select>
                    </div>
                </div>

                <div class="col-md-5">
                    <div class="caifop1li form-group">
                        <label for="bimo1">Nhập thông tin tìm kiếm</label>
                        <input type="text" class="form-control" id="bimo1">
                    </div>
                </div>

                <div class="col-md-2">
                    <label style="opacity: 0">btn</label>
                    <button class="btn btn-primary" id="btn-1" style="display: block">Tìm Kiếm</button>
                </div>
            </div>
        </div>
    </div>
    <div class="buifmaoptb table-responsive">
        <table class="table table-hover table-condensed table-striped">
            <tbody id="table-hang-hoa">
            <tr>
                <th>STT</th>
                <th>Mã hàng</th>
                <th>Tên hàng</th>
                <th>Đơn vị</th>
                <th>Giá nhập gần nhất</th>
                <th>Giá bán</th>
            </tr>
            <td>1</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            </tr>
            <tr>
                <td>2</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>3</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>4</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>5</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>6</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>7</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>8</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>9</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>10</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            </tbody>
        </table>
        <div class="page-link">
            <button type="button" class="btn btn-info" id="btn-them" data-toggle="modal" data-target="#myModal"><i class="fas fa-plus-circle"></i></button>
        </div>
    </div>

    <div class="receivepagi">
        <div class="pagi" id="pagination1">
            <div class="paginationjs">
            </div>
        </div>
    </div>
</section>
<!-- /.content -->
<script>
    $(document).ready(function () {
        $('.js-example-basic-single').select2({ width: 'resolve' });
        $('.js-example-basic-multiple').select2({ width: 'resolve' });
        $("#selUser").select2();
    });
</script>

<script>
    $('.select').select2({
        placeholder: "Chọn hàng hóa",
        allowClear: true,
        maximumInputLength: 10,
        minimumResultsForSearch : 5
    });

    $('.select-don-vi').select2({
        placeholder: "Chọn đơn vị",
        allowClear: true,
        minimumResultsForSearch : 5
    });
</script>

<style>
    .select2-container .select2-selection--single{
        height:34px !important;
    }
    .select2-container--default .select2-selection--single{
        border: 1px solid #ccc !important;
        border-radius: 0px !important;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    .giaBan {
        width: 70px;
        border:none;
        border-bottom: 1px solid #9D9C9C;
        padding: 5px 10px;
        outline: none;
    }
</style>



