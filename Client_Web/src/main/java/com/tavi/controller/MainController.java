package com.tavi.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class MainController {

    @RequestMapping(value = {"/","/dang-nhap"}, method = RequestMethod.GET)
    public String dangNhap() {
        return "dang-nhap";
    }

    @RequestMapping(value = {"/dang-ky"}, method = RequestMethod.GET)
    public String dangKy() {
        return "dang-ky";
    }

    @RequestMapping(value = {"/tim-tai-khoan"}, method = RequestMethod.GET)
    public String timTaiKhoan() { return "tim-tai-khoan";
    }

    @RequestMapping(value = {"/dat-lai-mat-khau"}, method = RequestMethod.GET)
    public String datLaiMatKhau() {
        return "dat-lai-mat-khau";
    }

    @RequestMapping(value = {"/nhap-ma-bao-mat"}, method = RequestMethod.GET)
    public String nhapMaBaoMat() {
        return "nhap-ma-bao-mat";
    }

    @RequestMapping(value = {"/trang-dau"}, method = RequestMethod.GET)
    public String trangChu() {
        return "trang-dau";
    }

    @RequestMapping(value = {"/hang-hoa"}, method = RequestMethod.GET)
    public String hangHoa() {
        return "hang-hoa";
    }

    @RequestMapping(value = {"/danh-sach-hang-hoa"}, method = RequestMethod.GET)
    public String danhSachHangHoa() {
        return "danh-sach-hang-hoa";
    }

    @RequestMapping(value = {"/danh-muc-hang-hoa"}, method = RequestMethod.GET)
    public String danhMucHangHoa() {
        return "danh-muc-hang-hoa";
    }

    @RequestMapping(value = {"/thong-tin-nhan-vien"}, method = RequestMethod.GET)
    public String quanLyThongTinNhanVien() {
        return "thong-tin-nhan-vien";
    }

    @RequestMapping(value = {"/danh-sach-nha-cung-cap"}, method = RequestMethod.GET)
    public String danhSachNhaCungCap() {
        return "danh-sach-nha-cung-cap";
    }

    @RequestMapping(value = {"/danh-sach-khach-hang"}, method = RequestMethod.GET)
    public String danhSachKhachHang() {
        return "danh-sach-khach-hang";
    }

    @RequestMapping(value = {"/thong-tin-cong-ty"}, method = RequestMethod.GET)
    public String quanLyThongTinCongTy() {
        return "thong-tin-cong-ty";
    }

    @RequestMapping(value = {"/quan-ly-chi-nhanh"}, method = RequestMethod.GET)
    public String quanLyThongTinChiNhanh() {
        return "quan-ly-chi-nhanh";
    }

    @RequestMapping(value = {"/sua-dieu-khoan"}, method = RequestMethod.GET)
    public String suaDieuKhoan() {
        return "sua-dieu-khoan";
    }

    @RequestMapping(value = {"/dieu-khoan"}, method = RequestMethod.GET)
    public String xemDieuKhoan() {
        return "dieu-khoan";
    }

    @RequestMapping(value = {"/sua-chinh-sach"}, method = RequestMethod.GET)
    public String suaChinhSach() {
        return "sua-chinh-sach";
    }

    @RequestMapping(value = {"/chinh-sach"}, method = RequestMethod.GET)
    public String xemChinhSach() { return "chinh-sach"; }

    @RequestMapping(value = {"/danh-sach-nhap-hang"}, method = RequestMethod.GET)
    public String quanLyNhapHang() { return "danh-sach-nhap-hang"; }

    @RequestMapping(value = {"/chi-tiet-nhap-hang"}, method = RequestMethod.GET)
    public String chiTietNhapHang() { return "chi-tiet-nhap-hang"; }

    @RequestMapping(value = {"/chi-tiet-nhap-hang-2"}, method = RequestMethod.GET)
    public String chiTietNhapHang2() { return "chi-tiet-nhap-hang-2"; }

    @RequestMapping(value = {"/nhap-hang-chi-tiet"}, method = RequestMethod.GET)
    public String nhapHangChiTiet() { return "nhap-hang-chi-tiet"; }

    @RequestMapping(value = {"/chat"}, method = RequestMethod.GET)
    public String chat() { return "chat"; }

    @RequestMapping(value = {"/danh-sach-tra-khach"}, method = RequestMethod.GET)
    public String danhSachTraKhach() { return "danh-sach-tra-khach"; }

    @RequestMapping(value = {"/danh-sach-hoa-don-de-tra"}, method = RequestMethod.GET)
    public String danhSachHoaDon() { return "danh-sach-hoa-don-de-tra"; }

    @RequestMapping(value = {"/chi-tiet-hoa-don-de-tra"}, method = RequestMethod.GET)
    public String danhSachChiTietHoaDon() { return "chi-tiet-hoa-don-de-tra"; }

    @RequestMapping(value = {"/danh-sach-phieu-nhap-de-tra"}, method = RequestMethod.GET)
    public String danhSachPhieuNhapDeTra() { return "danh-sach-phieu-nhap-de-tra"; }

    @RequestMapping(value = {"/danh-sach-phieu-tra-hang-nhap"}, method = RequestMethod.GET)
    public String danhSachPhieuTraHang() { return "danh-sach-phieu-tra-hang-nhap"; }

    @RequestMapping(value = {"/phieu-nhap-chi-tiet-de-tra"}, method = RequestMethod.GET)
    public String danhSachPhieuNhapChiTietDeTra() { return "phieu-nhap-chi-tiet-de-tra"; }

    @RequestMapping(value = {"/chi-tiet-hoa-don"}, method = RequestMethod.GET)
    public String chiTietHoaDon() { return "chi-tiet-hoa-don"; }

    @RequestMapping(value = {"/hoa-don-chi-tiet"}, method = RequestMethod.GET)
    public String hoaDonChiTiet() { return "hoa-don-chi-tiet"; }

    @RequestMapping(value = {"/danh-sach-hoa-don"}, method = RequestMethod.GET)
    public String danhSachHoaDon1() { return "danh-sach-hoa-don"; }

    @RequestMapping(value = {"/thiet-lap-gia"}, method = RequestMethod.GET)
    public String thietLapGia() { return "thiet-lap-gia"; }

    @RequestMapping(value = {"/tong-quan"}, method = RequestMethod.GET)
    public String tongQuan() { return "tong-quan"; }

}
