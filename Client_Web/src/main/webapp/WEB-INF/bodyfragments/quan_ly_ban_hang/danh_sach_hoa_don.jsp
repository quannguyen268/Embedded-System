<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<link rel="stylesheet" href="resources/dist/css/qlttdn.css">
<script src="resources/model/ban_hang/ajax_danh_sach_hoa_don.js"></script>
<script src="resources/pages/quan_ly_ban_hang/ajax_danh_sach_hoa_don.js"></script>
<script src="resources/model/chi_nhanh/ajax_chi_nhanh.js"></script>

<section class="content">

<%--    modal thay doi trang thai--%>
    <div class="modal" tabindex="-1" role="dialog" id="modal-trang-thai">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Thay đổi trạng thái hóa đơn</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p style="font-size: 16px">Đổi trạng thái mới cho hóa đơn bạn đã chọn</p>
                    <p id="trang-thai-cu" style="font-size: 16px"></p>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="caifop1li">
                                <label style="font-size: 16px">Trạng thái mới</label>
                                <select class="js-example-basic-single" name="state" id="select-trang-thai">
                                    <option value="0">Lưu tạm</option>
                                    <option value="1">Đang Giao</option>
                                    <option value="2">Đã Giao</option>
                                    <option value="3">Đang Đóng Gói</option>
                                    <option value="4">Khách Hủy</option>
                                    <option value="5">Đơn Vị Giao Hủy</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" id="confirm-btn">Xác nhận</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" id="refuse-btn">Hủy</button>
                </div>
            </div>
        </div>
    </div>

    <div class="buifmaop">
        <div class="buifmaoptitle">
            <span class="page-title">Danh sách hóa đơn</span>
        </div>
        <div class="buifmaopct">
            <div class="row">
                <div class="col-md-6">
                    <div class="caifop1li form-group">
                        <label for="bimo1">Mã hóa đơn:</label>
                        <input type="text" class="form-control" id="bimo1">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="caifop1li form-group">
                        <label for="bimo1">Tên khách hàng:</label>
                        <input type="text" class="form-control" id="bimo2">
                    </div>
                </div>

            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="caifop1li form-group">
                        <label for="bimo1">Tên nhân viên:</label>
                        <input type="text" class="form-control" id="bimo3">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="caifop1li">
                        <label>Trạng Thái:</label>
                        <select class="js-example-basic-multiple" name="state" id="bimo4">
                            <option value="-1">Tất cả</option>
                            <option value="0">Lưu tạm</option>
                            <option value="1">Chưa hoàn thành</option>
                            <option value="2">Hoàn thành</option>
                        </select>
                        <span class="help-block">Help block with success</span>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="caifop1li form-group">
                        <label class="control-label">Từ ngày:</label>
                        <div class="input-group date">
                            <input type="text" class="form-control border-gray date-vn" id="bimo5">
                            <div class="input-group-addon">
                                <i class="fa fa-calendar" aria-hidden="true"></i>
                            </div>
                        </div>
                        <span class="help-block">Help block with success</span>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="caifop1li form-group">
                        <label class="control-label">Đến ngày:</label>
                        <div class="input-group date">
                            <input type="text" class="form-control border-gray date-vn" id="bimo6">
                            <div class="input-group-addon">
                                <i class="fa fa-calendar" aria-hidden="true"></i>
                            </div>
                        </div>
                        <span class="help-block">Help block with success</span>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="caifop1li">
                        <label for="bimo2">Thuộc chi nhánh</label>
                        <select class="js-example-basic-single" name="state" id="bimo0">
                            <option value=0>Tất cả</option>
                            <option value=1>Đống Đa</option>
                            <option value=2>Thanh Xuân</option>
                            <option value=3>Ba Đình</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-6 text-center">
                    <label style="opacity: 0">btn</label>
                    <button class="btn btn-primary" id="btn-search">Tìm Kiếm</button>
                </div>
            <div class="col-xs-6 text-center">
                <label style="opacity: 0">btn</label>
                <button class="btn btn-primary" id="btn-excel">In danh sách hóa đơn</button>
            </div>
            </div>
        </div>
    </div>
    <div class="buifmaoptb table-responsive">
        <table class="table table-hover" id="table-hoa-don">
            <tbody>
            <tr>
                <th>STT</th>
                <th>Mã hóa đơn</th>
                <th>Thời gian</th>
                <th>Tên nhân viên</th>
                <th>Tên khách hàng</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
            </tr>
            <tr>
                <td>1</td>
                <td></td>
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
                <td></td>
            </tr>
            <tr>
                <td>3</td>
                <td></td>
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
                <td></td>
            </tr>
            <tr>
                <td>5</td>
                <td></td>
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
                <td></td>
            </tr>
            </tbody>
        </table>
        <div class="page-link">
            <a href="chi-tiet-hoa-don?id=0" target="_blank"><i class="fas fa-plus-circle" ></i></a>
        </div>
    </div>
    <div class="receivepagi">
        <div class="pagi" id="pagination">
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
    });
</script>