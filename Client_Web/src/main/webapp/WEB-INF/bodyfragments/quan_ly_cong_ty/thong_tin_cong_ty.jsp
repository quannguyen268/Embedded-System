<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<script src="dist/js/ajax/model/doanh_nghiep/model-doanh-nghiep.js"></script>
<script src="dist/js/ajax/pages/quan_ly_cong_ty/ajax_cong_ty.js"></script>

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
                        Bạn có chắc chắn xóa camera này không ?
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
<div class="modal fade" id="modal-1" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Thêm nhóm thiết bị</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Tên nhóm thiết bị:</label>
                    <input type="text" class="form-control" id="input-text-6" placeholder="Nhập tên nhóm thiết bị">
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
                <button type="button" class="btn btn-secondary" id="btn-7">Thêm mới</button>
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
                <div class="col-3">

                </div>
                <div class="col-6 text-center">
                    <h4 class=" text-dark" id="vnCompanyName">Tổng công ty Đông Bắc</h4>
                    <h5 id="enCompanyName">Dong Bac Corp</h5>
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
                                    <input type="text" class="form-control" id="input-text-1" placeholder="Mã số thuế" readonly>
                                </div>
                            </div>
                            <div class="form-group row mb-3">
                                <label class="col-md-4 col-form-label">Email</label>
                                <div class="col-md-8">
                                    <input type="text" class="form-control" id="input-text-2" placeholder="Nhập Email" readonly>
                                </div>
                            </div>
                            <div class="form-group row mb-3">
                                <label class="col-md-4 col-form-label">Người đại diện</label>
                                <div class="col-md-8">
                                    <input type="text" class="form-control" id="input-text-3" placeholder="Nhập tên người đại diện" readonly>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="form-group row mb-3">
                                <label class="col-md-4 col-form-label">Số điện thoại</label>
                                <div class="col-md-8">
                                    <input type="text" class="form-control" id="input-text-4" placeholder="Nhập số điện thoại" readonly>
                                </div>
                            </div>
                            <div class="form-group row mb-3">
                                <label class="col-md-4 col-form-label">Website</label>
                                <div class="col-md-8">
                                    <input type="text" class="form-control" id="input-text-5" placeholder="Tên miền website" readonly>
                                </div>
                            </div>
                            <div class="form-group row mb-3">
                                <label class="col-md-4 col-form-label">Địa chỉ: </label>
                                <div class="col-md-8">
                                    <input type="text" class="form-control" id="input-text-7" placeholder="Nhập địa chỉ" readonly>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div><!-- /.container-fluid -->
    </section>

    <!-- /.content -->

    <div id="chartContainer" style="height: 300px; width: 100%;">
    </div>
</div>

<script type="text/javascript">
    window.onload = function () {
        var chart = new CanvasJS.Chart("chartContainer", {
            title:{
                text: "Fruits sold in First & Second Quarter"
            },

            data: [  //array of dataSeries
                { //dataSeries - first quarter
                    /*** Change type "column" to "bar", "area", "line" or "pie"***/
                    type: "column",
                    name: "First Quarter",
                    dataPoints: [
                        { label: "banana", y: 58 },
                        { label: "orange", y: 69 },
                        { label: "apple", y: 80 },
                        { label: "mango", y: 74 },
                        { label: "grape", y: 64 }
                    ]
                },
                { //dataSeries - second quarter

                    type: "column",
                    name: "Second Quarter",
                    dataPoints: [
                        { label: "banana", y: 63 },
                        { label: "orange", y: 73 },
                        { label: "apple", y: 88 },
                        { label: "mango", y: 77 },
                        { label: "grape", y: 60 }
                    ]
                }
            ]
        });

        chart.render();
    }
</script>
<script type="text/javascript" src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>
<!-- /.content-wrapper -->
<style>
    .form-group {
        margin-bottom: 10px !important;
        padding-bottom: 2px !important;
    }
</style>