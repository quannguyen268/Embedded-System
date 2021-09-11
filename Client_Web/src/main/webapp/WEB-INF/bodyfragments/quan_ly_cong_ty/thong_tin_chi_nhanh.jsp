<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<script src="dist/js/ajax/pages/quan_ly_cong_ty/ajax_chi_nhanh.js"></script>
<script src = "dist/js/ajax/model/chi_nhanh/model-chi-nhanh.js"></script>
<link rel="stylesheet" href="resources/dist/css/qlttdn.css">
<!-- Modal -->
<!--remove Branch-->
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
                        Bạn có chắc chắn muốn xóa chi nhánh này không ?
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
<!--upload Branch-->
<div class="modal fade" id="modal-1" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Thêm chi nhánh</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-group row">
                    <label class="col-sm-6">Địa chỉ</label>
                    <input type="text" class="form-control col-sm-6" id="input-text-addressBranch" placeholder="Nhập đại chỉ">
                </div>
                <div class="form-group row">
                    <label class="col-sm-6"> Trạng thái kết nối</label>
                    <select class="form-control col-sm-6" id="connectiveStatusSelect">
                        <option value=1>True</option>
                        <option value=0>False</option>
                    </select>
                </div>

                <div class="form-group row">
                    <label class="col-sm-6">Trạng thái hoạt động</label>
                    <select class="form-control col-sm-6" id="activeStatusSelect">
                        <option value=1>True</option>
                        <option value=0>False</option>

                    </select>
                </div>

                <div class="form-group row">
                    <label class="col-sm-6">Địa chỉ IP</label>
                    <input type="text" class="form-control col-sm-6" id="input-text-ipAddressBranch" placeholder="Nhập địa chỉ IP">
                </div>
            </div>


            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" id="btn-confirmedBranch">Thêm mới</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
            </div>
        </div>
    </div>
</div>
<!--update Branch-->
<div class="modal fade" id="modal-editBranch" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel-2">Sửa chi nhánh</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-group row">
                    <label class="col-sm-6">Địa chỉ</label>
                    <input type="text" class="form-control col-sm-6" id="input-text-addressEditedBranch" placeholder="Nhập địa chỉ Chi nhánh">
                </div>

                <div class="form-group row">
                    <label class="col-sm-6">Trạng thái kết nối</label>
                    <select class="form-control col-sm-6"  id="connectiveStatusEditedBranchSelect">
                        <option value=1>True</option>
                        <option value=0>false</option>
                    </select>
                </div>
                <div class="form-group row">
                    <label class="col-sm-6">Trạng thái hoạt động</label>
                    <select class="form-control col-sm-6"  id="activeStatusEditedBranchSelect">
                        <option value=1>True</option>
                        <option value=0>false</option>
                    </select>
                </div>
                <div class="form-group row">
                    <label class="col-sm-6">Địa chỉ IP</label>
                    <input type="text" class="form-control " id="input-text-ipAddressEditedBranch col-sm-6" placeholder="Nhập địa chỉ IP">

                </div>
            </div>


            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" id="btn-confirmedEditedBranch">Cập nhật</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
            </div>
        </div>
    </div>
</div>
<!-- Content Wrapper. Contains page content -->
<div class="content">
    <!-- Content Header (Page header) -->
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-12 text-center">
                    <h4 class="m-0 text-dark" id="vnCompanyName">Tổng công ty Đông Bắc</h4>
                    <h5 class="m-0 text-dark" id="enCompanyName">Tổng công ty Đông Bắc</h5>
                </div><!-- /.col -->
            </div><!-- /.row -->
        </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content">
        <div class="container-fluid">
            <div class="card">
                <div class="card-header">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group row mb-3">
                                <label class="col-md-4 col-form-label">Mã doanh nghiệp</label>
                                <div class="col-md-8">
                                    <input type="text" class="form-control" id="input-text-taxCode" placeholder="Mã số thuế" readonly>
                                </div>
                            </div>
                            <div class="form-group row mb-3">
                                <label class="col-md-4 col-form-label">Email</label>
                                <div class="col-md-8">
                                    <input type="text" class="form-control" id="input-text-email" placeholder="Nhập Email" readonly>
                                </div>
                            </div>
                            <div class="form-group row mb-3">
                                <label class="col-md-4 col-form-label">Người đại diện</label>
                                <div class="col-md-8">
                                    <input type="text" class="form-control" id="input-text-presentingPerson" placeholder="Nhập tên người đại diện" readonly>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group row mb-3">
                                <label class="col-md-4 col-form-label">Số điện thoại</label>
                                <div class="col-md-8">
                                    <input type="text" class="form-control" id="input-text-phoneNumber" placeholder="Nhập số điện thoại" readonly>
                                </div>
                            </div>
                            <div class="form-group row mb-3">
                                <label class="col-md-4 col-form-label">Website</label>
                                <div class="col-md-8">
                                    <input type="text" class="form-control" id="input-text-website" placeholder="Tên miền website" readonly>
                                </div>
                            </div>
                            <div class="form-group row mb-3">
                                <label class="col-md-4 col-form-label">Địa chỉ: </label>
                                <div class="col-md-8">
                                    <input type="text" class="form-control" id="input-text-address" placeholder="Nhập địa chỉ" readonly>
                                </div>
                            </div>
                        </div>

                    </div>


                </div>

                <div class="card-body m-5">
                    <div class="row text-center">

                        <h2 class="m-b-4">Danh sách chi nhánh</h2>

                    </div>

                    <div class="buifmaoptb table-responsive">
                        <table class="table table-hover">

                            <tr>
                                <th>STT</th>
                                <th>Mã chi nhánh</th>
                                <th>Vị trí</th>
                                <th>Địa chỉ IP</th>
                                <th>Trạng thái</th>
                                <th>Chức năng</th>
                            </tr>

                            <tbody id="data-table">
                            <tr>
                                <td>1</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <button style="background: transparent;border: none; margin-right: 12px;" id="btnEditBranch" data-toggle="modal" data-target = "#modal-editBranch"><i class="fas fa-pen"></i></button>
                                    <button style="background: transparent;border: none; margin-right: 12px;" id="btnSyncBranch"><i class="fas fa-sync"></i></button>
                                    <button style="background: transparent;border: none;" id="btnRemoveBranch" data-toggle="modal" data-target="#modal-remove"><i class="fas fa-trash"></i></button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="row text-center">
                        <button type="button" class="btn btn-secondary m-1" id="btn-addBranch" style="margin-right: 20px;" data-toggle="modal" data-target="#modal-1">Thêm một chi nhánh mới</button>
                        <a href="http://localhost:8080/quan-ly-doanh-nghiep"><button type="button" class="btn btn-secondary m-1" id="btn-back">Quay lại</button></a>
                    </div>
                </div>
            </div>
        </div><!-- /.container-fluid -->
    </section>
    <!-- /.content -->
</div>
<!-- /.content-wrapper -->
<style>
    .form-group {
        margin-bottom: 10px !important;
        padding-bottom: 2px !important;
    }
</style>