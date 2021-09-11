<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<link rel="stylesheet" href="resources/dist/css/qlttdn.css">
<script src="resources/model/giao_dich/nhap_hang/ajax_phieu_nhap_hang.js" type="text/javascript"></script>
<script src="resources/model/doi_tac/ajax_nha_cung_cap.js" type="text/javascript"></script>
<script src="resources/pages/quan_ly_giao_dich/nhap_hang/ajax_danh_sach_nhap_hang.js" type="text/javascript"></script>
<script src="resources/model/chi_nhanh/ajax_chi_nhanh.js"></script>

<%--    modal thay doi trang thai--%>
<div class="modal" tabindex="-1" role="dialog" id="modal-trang-thai">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Thay đổi trạng thái phiếu nhập hàng</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p style="font-size: 16px">Đổi trạng thái mới cho phiếu nhập hàng bạn đã chọn</p>
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
                                <option value="4">Nhà Cung Cấp Hủy</option>
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

<!-- Main content -->
<section class="content">
    <div class="buifmaop">
        <div class="buifmaoptitle">
            <span class="page-title">Danh sách phiếu nhập hàng</span>
        </div>
        <div class="buifmaopct">
            <div class="row">
                <div class="col-md-6">
                    <div class="caifop1li form-group">
                        <label for="bimo1">Mã phiếu nhập:</label>
                        <input type="text" class="form-control" id="bimo1">
                        <span class="help-block">Help block with success</span>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="caifop1li">
                        <label>Nhà cung cấp:</label>
                        <%--                        <select class="js-example-basic-multiple" name="state" id="bimo2" multiple="multiple">--%>
                        <select class="js-example-basic-multiple" name="state" id="bimo2">
                            <option value="0">Tất cả</option>
                            <option value="NN">Bánh kẹo</option>
                            <option value="II">Đồ uống</option>
                            <option value="VV">Hàng tạp hóa</option>
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
                            <input type="text" class="form-control border-gray date-vn" id="bimo3">
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
                            <input type="text" class="form-control border-gray date-vn" id="bimo4">
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
                        <label>Thuộc chi nhánh</label>
                        <select class="js-example-basic-multiple" name="state" id="bimo0">
                            <option value=0>Tất cả</option>
                            <option value=1>Đống Đa</option>
                            <option value=2>Thanh Xuân</option>
                            <option value=3>Ba Đình</option>
                        </select>
                        <span class="help-block">Help block with success</span>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="caifop1li">
                        <label>Trạng Thái:</label>
                        <select class="js-example-basic-multiple" name="state" id="bimo5">
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
                <div class="col-xs-6 text-center">
                    <label style="opacity: 0">btn</label>
                    <button class="btn btn-primary" id="btn-search">Tìm Kiếm</button>
                </div>
                <div class="col-xs-6 text-center">
                    <label style="opacity: 0">btn</label>
                    <button class="btn btn-primary" id="btn-excel">In danh sách nhập hàng</button>
                </div>
            </div>
        </div>
    </div>
    <div class="buifmaoptb table-responsive">
        <table class="table table-hover">
            <tbody>
            <tr>
                <th>STT</th>
                <th>Mã nhập hàng</th>
                <th>Thời gian</th>
                <th>Nhà cung cấp</th>
                <th>Cần trả NCC</th>
                <th>Trạng thái</th>
            </tr>
            <tr>
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
            <a href="chi-tiet-nhap-hang?id=0" target="_blank"><i class="fas fa-plus-circle"></i></a>
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