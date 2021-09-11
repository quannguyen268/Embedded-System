<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<link rel="stylesheet" href="resources/dist/css/qlttdn.css">
<script src="resources/model/chi_nhanh/ajax_chi_nhanh.js"></script>
<script src="resources/model/tai_khoan/ajax_tai_khoan.js"></script>
<script src="resources/model/upload_file/ajax_upload_file.js"></script>
<script src="resources/pages/quan_ly_thong_tin/ajax_thong_tin_tai_khoan.js"></script>
<!-- Modal -->
<div class="modal fade in" id="modal-remove">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Xác nhận thao tác</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-xs-12" id="text-confirm">
                        Bạn có chắc chắn xóa nhân viên này không ?
                    </div>
                </div>
            </div>
            <div class="modal-footer text-right">
                <button type="button" class="btn btn-danger mgr-10" data-dismiss="modal" id="confirm-yes">Đồng ý xóa</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">Không xóa</button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>


<div class="modal fade in" id="modal-change">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Xác nhận thao tác</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-xs-12" id="text-change">
                        Bạn có chắc chắn khóa nhân viên này không ?
                    </div>
                </div>
            </div>
            <div class="modal-footer text-right">
                <button type="button" class="btn btn-danger mgr-10" data-dismiss="modal" id="change-yes">Đồng ý khóa</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">Không khóa</button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>

<!-- Content Wrapper. Contains page content select-1 -->
<section class="content">
<div class="buifmaop">
    <div class="buifmaoptitle">
        <span class="page-title">Danh sách nhân viên</span>
    </div>
    <div class="buifmaopct">
        <div class="row">


            <div class="col-md-5">
                <div class="caifop1li">
                    <label for="select-1">Thuộc chi nhánh</label>
                    <select class="js-example-basic-single" name="state" id="select-1">
                        <option value=0>Tất cả</option>
                        <option value=1>Cocacola</option>
                        <option value=2>Pepsi</option>
                        <option value=3>Fanta</option>
                    </select>
                </div>
            </div>

            <div class="col-md-5">
                <div class="caifop1li form-group">
                    <label for="input-text-1">Nhập thông tin tìm kiếm</label>
                    <input type="text" class="form-control" id="input-text-1">
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
        <table class="table table-hover">

                <tr>
                    <th >STT</th>
                    <th>Mã nhân viên</th>
                    <th>Tên nhân viên/Nhóm</th>
                    <th>Trạng thái</th>
                    <th>Chức năng</th>
                    <th>QR Code</th>
                </tr>
            <tbody id="data-table">

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

                <tr id="click-load-data">
                    <td colspan="10"><i class="fas fa-arrow-circle-down"></i></td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="page-link">
        <a ><i class="fas fa-plus-circle them-moi-tk"></i></a>
    </div>
    <style>
        .form-group {
            margin-bottom: 10px !important;
            padding-bottom: 2px !important;
        }
    </style>


    <div class="row mb-3">
        <div class="col-12 text-center">
            <h4 id="1" class="m-0 text-dark">Thông tin chi tiết nhân viên</h4>
        </div>
    </div>

                    <div class="row mb-3">
                        <div class="col-md-6">
                            <div class="form-group row mb-3">
                                <label class="col-md-4 col-form-label">Mã nhân viên</label>
                                <div class="col-md-8">
                                    <input type="text" class="form-control" id="input-text-2" placeholder="Nhập mã nhân viên" disabled>
                                    <span class="invalid-feedback"></span>
                                </div>
                            </div>
                            <div class="form-group row mb-3">
                                <label class="col-md-4 col-form-label">Họ và tên</label>
                                <div class="col-md-8">
                                    <input type="text" class="form-control" id="input-text-3" placeholder="Nhập họ và tên">
                                    <span class="invalid-feedback"></span>
                                </div>
                            </div>
                            <div class="form-group row mb-3">
                                <label class="col-md-4 col-form-label">nhân viên (*)</label>
                                <div class="col-md-8">
                                    <input type="text" class="form-control" id="input-text-4" placeholder="Nhập nhân viên" disabled>
                                    <span class="invalid-feedback"></span>
                                </div>
                            </div>
                            <div class="form-group row mb-3" id="show-mat-khau" style="display: none">
                                <label class="col-md-4 col-form-label">Mật khẩu (*)</label>
                                <div class="col-md-8">
                                    <input type="password" class="form-control" id="input-text-5"  placeholder="Nhập Mật khẩu" >
                                    <span class="invalid-feedback"></span>
                                </div>
                            </div>


                            <div class="form-group row mb-3">
                                <label class="col-md-4 col-form-label">Email (*)</label>
                                <div class="col-md-8">
                                    <input type="text" class="form-control" id="input-text-6" placeholder="Nhập email" required="true" disabled>
                                    <span class="invalid-feedback"></span>
                                </div>
                            </div>


                            <div class="form-group row mb-3">
                                <label class="col-md-4 col-form-label">Số điện thoại (*)</label>
                                <div class="col-md-8">
                                    <input type="text" class="form-control" id="input-text-7" placeholder="Nhập số điện thoại" required="true" >
                                    <span class="invalid-feedback"></span>
                                </div>
                            </div>


                            <div class="form-group row mb-3">
                                <label class="col-md-4 col-form-label">Địa chỉ</label>
                                <div class="col-md-8">
                                    <input type="text" class="form-control" id="input-text-8" placeholder="Nhập địa chỉ" required="true">
                                    <span class="invalid-feedback"></span>
                                </div>
                            </div>

                            <div class="form-group row mb-3">
                                <label class="col-md-4 col-form-label">Giới tính</label>
                                <div class="col-md-8" id="radio-1">
                                    <input class="col-mb-4" type="radio" name="gender" value="1" id="gTNam">
                                    <label  class="mr-5 mb-0">Nam</label>
                                    <input class="col-mb-4" type="radio" name="gender" value="0" id="gTNu">
                                    <label class="mb-0">Nữ</label>
                                    <span class="invalid-feedback"></span>
                                </div>
                            </div>

                            <div class="form-group row mb-3"  >
                                <label class="col-md-4 col-form-label">Qr Code</label>
                                <div class="col-md-8" id="qrcode"></div>
                            </div>
                        </div>


                        <div class="col-md-6">
                            <div class="form-group row mb-3">
                                <label class="col-md-4 col-form-label">Nhóm nhân viên</label>
                                <div class="col-md-8">
                                    <select class="form-control"  id="select-3">
                                        <option value="">Guest</option>
                                        <option value="">Administrator</option>
                                        <option value="">User</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row mb-3">
                                <label class="col-md-4 col-form-label">Ngày sinh</label>
                                <div class="col-md-8">
                                    <input type="date" class="form-control" id="input-date-1" value="2016-05-26" placeholder="Nhập ngày sinh">
                                    <span class="invalid-feedback"></span>
                                </div>
                            </div>



                            <div class="form-group row mb-3">
                                <label class="col-md-4 col-form-label">Thời gian khởi tạo</label>
                                <div class="col-md-8">
                                    <input type="date" class="form-control" id="input-date-2" placeholder="Nhập thời gian khởi tạo">
                                    <span class="invalid-feedback"></span>
                                </div>
                            </div>

                            <div class="form-group row mb-3">
                                <label class="col-md-4 col-form-label">Thời gian kích hoạt</label>
                                <div class="col-md-8">
                                    <input type="date" class="form-control"  id="input-date-3" placeholder="Nhập thời gian kích hoạt">
                                    <span class="invalid-feedback"></span>
                                </div>
                            </div>

                            <div class="form-group row mb-3">
                                <label class="col-md-4 col-form-label">Thời gian hết  hạn</label>
                                <div class="col-md-8">
                                    <input type="date" class="form-control"  id="input-date-4" placeholder="Nhập thời gian hết hạn">
                                    <span class="invalid-feedback"></span>
                                </div>
                            </div>

                            <div class="form-group row mb-3">
                                <label class="col-md-4 col-form-label">Trạng thái</label>
                                <div class="col-md-8">
                                    <input class="col-mb-4" type="radio" name="status" value="0" id="kichHoat">
                                    <label  class="mr-5 mb-0">Kích hoạt</label>
                                    <input class="col-mb-4" type="radio" name="status" value="1" id="khoa">
                                    <label class="mb-0">Khóa</label>
                                    <span class="invalid-feedback"></span>
                                </div>
                            </div>

                            <div class="form-group row mb-3">
                                <label class="col-md-4 col-form-label">Ảnh đại diện</label>
                                <div class="col-md-8">
                                    <form class="custom-file" id="form-file">
                                        <input type="file" class="custom-file-input form-control" id="customFile-1" name="files">
                                        <label class="custom-file-label">Ảnh dại diện</label>

                                        <span class="invalid-feedback"></span>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="row text-center">
                        <button class="btn btn-success mr-1 show-them-moi" id="btn-3" style="display: none">Thêm mới</button>
                        <button class="btn btn-danger mr-1" id="btn-4" style="display: none">Cập nhập</button>
                        <button class="btn btn-warning mr-1 them-moi" id="btn-2">Làm mới</button>
                        <%--                        <button type="button" class="btn btn-secondary m-1" id="btn-5" data-toggle="modal" data-target="#modal-remove">Xóa</button>--%>
                    </div>
                </div>
            </div>
        </div><!-- /.container-fluid -->

    <!-- /.content -->

<!-- /.content-wrapper -->
</section>
</div>
<script>
    $(document).ready(function () {
        $('.js-example-basic-single').select2({ width: 'resolve' });
        $('.js-example-basic-multiple').select2({ width: 'resolve' });
    });
</script>
