<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<link rel="stylesheet" href="resources/dist/css/qlttdn.css">
<script src="resources/model/chi_nhanh/ajax_chi_nhanh.js"></script>
<script src="resources/model/ban_hang/ajax_chi_tiet_hoa_don.js"></script>
<script src="resources/model/hoa_don/ajax_hoa_don.js"></script>
<script src="resources/pages/quan_ly_ban_hang/ajax_chi_tiet_hoa_don.js"></script>
<script src="resources/model/nhan_vien/ajax_nhan_vien.js"></script>
<script src="resources/model/phieu_thu_chi/ajax_phieu_no.js"></script>

<%--modal them khach hang--%>
<div class="modal fade" id="modal-khach-hang" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Thêm mới khách hàng</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="caifop1li form-group">
                    <label>Tên khách hàng:</label>
                    <input type="text" class="form-control" id="ten-khach-hang">
                    <span class="help-block">Help block with error</span>
                </div>
                <div class="caifop1li form-group">
                    <label>Số điện thoại :</label>
                    <input type="number" class="form-control none-arrow" id="sdt-khach-hang">
                    <span class="help-block">Help block with error</span>
                </div>
                <div class="caifop1li form-group">
                    <label>Email:</label>
                    <input type="email" class="form-control" id="email-khach-hang">
                    <span class="help-block">Help block with error</span>
                </div>
                <div class="caifop1li form-group">
                    <label>Địa chỉ :</label>
                    <input type="text" class="form-control" id="dia-chi-khach-hang">
                    <span class="help-block">Help block with error</span>
                </div><div class="caifop1li form-group">
                <label>Ngày sinh :</label>
                <input type="date" id="birthday" name="birthday">
                <span class="help-block">Help block with error</span>
            </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
                <button type="button" class="btn btn-primary" id="btn-save-khach-hang">Lưu</button>
            </div>
        </div>
    </div>
</div>

<%--modal confirm khách hàng nợ --%>
<div class="modal" tabindex="-1" role="dialog" id="modal-cho-no">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Xác nhận</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p>Số tiền khách trả ít hơn tổng tiền hóa đơn. Bạn có chắc chắn không?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal" id="confirm-btn">Có</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal" id="refuse-btn">Hủy</button>
            </div>
        </div>
    </div>
</div>

<%--modal hien thi tong so no--%>
<div class="modal" tabindex="-1" role="dialog" id="modal-display-no">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Thông báo lập hóa đơn mới thành công</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p>Thêm phiếu nợ mới</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal">Xác nhận</button>
            </div>
        </div>
    </div>
</div>
<!-- Main content -->
<style>
    .tttk{
        margin-left: 20px ;
        margin-right: 20px;
    }
</style>
<div class="tttk buifmaop">
    <div class="buifmaoptitle">
        <span class="page-title">Thêm hóa đơn</span>
    </div>
        <div class=" buifmaop">
            <div class="buifmaoptitle">
                <span class="page-title">Thông tin hóa đơn</span>
            </div>
            <div class="buifmaopct">
                <div class="row">
                    <div class="col-md-6">
                        <div class="caifop1li">
                            <label>Khách Hàng:</label>
                            <select class="form-control select2 select-khach-hang" id="select-khach-hang" placeholder="Tìm khách hàng">
                                <option></option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="caifop1li form-group">
                            <label for="select-khach-hang">Email:</label>
                            <input type="text" class="form-control" id="bimo2">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="caifop1li form-group">
                            <label for="select-khach-hang">Địa chỉ:</label>
                            <input type="text" class="form-control" id="bimo5">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="caifop1li form-group">
                            <label for="select-khach-hang">Số điện thoại:</label>
                            <input type="text" class="form-control" id="bimo6">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="caifop1li form-group">
                            <label for="select-khach-hang">Giảm giá:</label>
                            <input type="text" class="form-control" id="bimo3">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="caifop1li form-group">
                            <label for="select-khach-hang">Ghi chú:</label>
                            <input type="text" class="form-control" id="bimo4">
                        </div>
                    </div>
                </div>
            </div>
        </div>

    <div class="buifmaoptb">
        <hr/>
        <div class="row thong-tin-phieu" style="margin-bottom: 5px">
            <div class="col-lg-6 text-left">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="caifop1li">
                            <label>Hàng hóa:</label>
                            <select class="form-control select2 select-hang-hoa" id="search-hang-hoa" placeholder="Chọn hàng hóa">
                                <option></option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 text-right">
                <div class="caifop1li">
                    <label style="visibility: hidden">text:</label>
                    <div>
                        <strong class="m-r-1">Tổng tiền:</strong> <input id="tong-tien" disabled="true" value="0">
                        <strong class="m-r-1">Tiền khách trả:</strong> <input type="number" class="none-arrow" id="tien-khach-tra">
                        <strong class="m-r-1">Tiền trả lại khách:</strong> <input type="number" id="tien-tra-lai" disabled="true">
                    </div>
                </div>
            </div>
        </div>
        <table class="table table-hover" id="table-hang-hoa">
            <tbody>
            <tr>
                <th>STT</th>
                <th>Hàng Hóa</th>
                <th>Đơn vị</th>
                <th>Số lượng</th>
                <th>Giá bán</th>
                <th>Thành tiền</th>
                <th>Xoá</th>
            </tr>
            </tbody>
        </table>
    </div>

    <div class="row">
        <div class="col-xs-12 text-center">
            <button class="btn btn-success" style="width: 100px" id="btn-thanh-toan">Thanh Toán</button>
            <button class="btn btn-primary" style="width: 100px" id="btn-print">In</button>
            <button class="btn btn-danger" style="width: 100px" id="btn-xoa-hoa-don">Xóa</button>
        </div>
    </div>
</div>

<script>
    $(document).ready(function () {
        $('.js-example-basic-single').select2({ width: 'resolve' });
        $('.js-example-basic-multiple').select2({ width: 'resolve' });
    });
</script>

<style>
    input.none-arrow::-webkit-outer-spin-button,
    input.none-arrow::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
</style>
