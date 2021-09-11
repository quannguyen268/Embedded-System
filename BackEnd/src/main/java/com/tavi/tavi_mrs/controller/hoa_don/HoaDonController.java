package com.tavi.tavi_mrs.controller.hoa_don;

import com.tavi.tavi_mrs.entities.hoa_don.HoaDon;
import com.tavi.tavi_mrs.entities.json.JsonResult;
import com.tavi.tavi_mrs.entities.json.PageJson;
import com.tavi.tavi_mrs.service.chi_nhanh.ChiNhanhService;
import com.tavi.tavi_mrs.service.hoa_don.HoaDonService;
import com.tavi.tavi_mrs.service.khach_hang.KhachHangService;
import com.tavi.tavi_mrs.service.nguoi_dung.NguoiDungService;
import com.tavi.tavi_mrs.utils.DateTimeUtils;
import com.tavi.tavi_mrs.utils.ExcelUtils;
import io.swagger.annotations.ApiOperation;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/admin/hoa-don")
public class HoaDonController {

    @Autowired
    private HoaDonService hoaDonService;

    @Autowired
    private NguoiDungService nguoiDungService;

    @Autowired
    private KhachHangService khachHangService;

    @Autowired
    ChiNhanhService chiNhanhService;

    @Value("${spring.upload.folder-upload}")
    private String UPLOAD_DIRECTORY;

    @Value("${spring.upload.link-prefix}")
    private String URL_UPLOAD_FILE;

    @GetMapping("/find-by-id")
    public ResponseEntity<JsonResult> findById(@RequestParam("id") int idHoaDon) {
        return hoaDonService.findById(idHoaDon, false)
                .map(JsonResult::found)
                .orElse(JsonResult.idNotFound());
    }

    @GetMapping("/find-all")
    ResponseEntity<JsonResult> findAllToPage(@RequestParam(name = "page", defaultValue = "1", required = false) int page,
                                             @RequestParam(name = "size", defaultValue = "10", required = false) int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<HoaDon> hoaDonPage = hoaDonService.findAllToPage(pageable);
        return Optional.ofNullable(hoaDonPage)
                .map(hoaDons -> hoaDons.getTotalElements() != 0 ? JsonResult.found(PageJson.build(hoaDons)) : JsonResult.notFound("HoaDon/Page"))
                .orElse(JsonResult.serverError("Internal Server error"));
    }

    @GetMapping("/find-all-excel")
    ResponseEntity<JsonResult> findAllToExcel() {
        return Optional.ofNullable(hoaDonService.findAll())
                .map(JsonResult::found)
                .orElse(JsonResult.notFound("HoaDon"));
    }

    @GetMapping("/search")
    public ResponseEntity<JsonResult> findByMo(@RequestParam(value = "ma-hoa-don", required = false, defaultValue = "") String maHoaDon,
                                               @RequestParam(value = "ten-khach-hang", required = false, defaultValue = "") String tenKhachHang,
                                               @RequestParam(value = "ten-nhan-vien", required = false, defaultValue = "") String tenNhanVien,
                                               @RequestParam(name = "ngay-dau", defaultValue = "1970-01-01T00:00:00+00:00", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDate ngayDau,
                                               @RequestParam(name = "ngay-cuoi", defaultValue = "9999-12-31T00:00:00+00:00", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDate ngayCuoi,
                                               @RequestParam(name = "trang-thai", defaultValue = "0", required = false) int trangThai,
                                               @RequestParam(name = "page", defaultValue = "1", required = false) int page,
                                               @RequestParam(name = "size", defaultValue = "10", required = false) int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<HoaDon> hoaDonPage;
        if (maHoaDon == "" && tenKhachHang == "" && tenNhanVien == "" && ngayDau == null && ngayCuoi == null && trangThai == -1) {
            hoaDonPage = hoaDonService.findAllToPage(pageable);
        }else {
            hoaDonPage = hoaDonService.findByMaHoaDonAndThoiGianAndTrangThai(maHoaDon,tenKhachHang,tenNhanVien, DateTimeUtils.asDate(ngayDau), DateTimeUtils.asDate(ngayCuoi), trangThai, pageable);
        }
        return Optional.ofNullable(hoaDonPage)
                .map(hoaDons -> hoaDons.getTotalElements() != 0 ? JsonResult.found(PageJson.build(hoaDons)) : JsonResult.notFound("HoaDon/MaHoaDon/ThoiGian/TrangThai"))
                .orElse(JsonResult.serverError("Internal Server error"));
    }

    @GetMapping("/search-by-chi-nhanh-and-text")
    ResponseEntity<JsonResult> search(
            @RequestParam(value = "chi-nhanh-id", required = false, defaultValue = "0") int chiNhanhId,
            @RequestParam(value = "text", defaultValue = "") String text,
            @RequestParam(name = "page", defaultValue = "1", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<HoaDon> hoaDonPage;
        if ( chiNhanhId == 0 && text=="") {
            hoaDonPage  = hoaDonService.findAllToPage(pageable);
        }
        else {
            hoaDonPage = hoaDonService.findByChiNhanhAndText(chiNhanhId,text,pageable);
        }
        return Optional.ofNullable(hoaDonPage)
                .map(hoaDons -> hoaDons.getTotalElements() != 0 ? JsonResult.found(PageJson.build(hoaDons)) : JsonResult.notFound("HoaDon"))
                .orElse(JsonResult.serverError("Internal Server error"));
    }

    @GetMapping("/count-bill")
    public ResponseEntity<JsonResult> countBill(@RequestParam(name = "start-date", defaultValue = "1970-01-01T00:00:00+00:00", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDate start,
                                                @RequestParam(name = "end-date", defaultValue = "9999-12-31T00:00:00+00:00", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDate end){
        return Optional.ofNullable(hoaDonService.countBillByTime(DateTimeUtils.asDate(start),DateTimeUtils.asDate(end)))
                .map(c -> c >= 0 ? JsonResult.success(c) : JsonResult.badRequest("Count Bill"))
                .orElse(JsonResult.serverError("Internal Server error"));
    }

    @GetMapping("/sum-bill")
    public ResponseEntity<JsonResult> sumBill(@RequestParam(name = "start-date", defaultValue = "1970-01-01T00:00:00+00:00", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDate start,
                                                @RequestParam(name = "end-date", defaultValue = "9999-12-31T00:00:00+00:00", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDate end){
        return Optional.ofNullable(hoaDonService.sumBillByTime(DateTimeUtils.asDate(start),DateTimeUtils.asDate(end)))
                .map(c -> c >= 0 ? JsonResult.success(c) : JsonResult.badRequest("Sum Bill"))
                .orElse(JsonResult.serverError("Internal Server error"));
    }

    @PostMapping("/upload")
    @ApiOperation(value = "post hoa don", response = HoaDon.class)
    public ResponseEntity<JsonResult> post(@RequestBody HoaDon hoaDon,
                                           @RequestParam("nguoi-dung-id") int nguoiDungId,
                                           @RequestParam("khach-hang-id") int khachHangId,
                                           @RequestParam("chi-nhanh-id") int chiNhanhId) {
        return chiNhanhService.findByIdAndXoa(chiNhanhId,false)
                .map(chiNhanhHangHoa -> {
                    hoaDon.setChiNhanh(chiNhanhHangHoa);
                    return nguoiDungService.findById( nguoiDungId,false)
                            .map(nguoiDung -> {
                                hoaDon.setNguoiDung(nguoiDung);
                                return khachHangService.findByIdAndXoa( khachHangId, false)
                                        .map(khachHang -> {
                                            hoaDon.setKhachHang(khachHang);
                                            hoaDon.setXoa(false);
                                            LocalDateTime now = LocalDateTime.now();
                                            Date out = Date.from(now.atZone(ZoneId.systemDefault()).toInstant());
                                            hoaDon.setThoiGian(out);
                                            return hoaDonService.save(hoaDon)
                                                    .map(JsonResult::uploaded)
                                                    .orElse(JsonResult.saveError("HoaDon"));
                                        }).orElse(JsonResult.parentNotFound("KhachHang"));
                            }).orElse(JsonResult.parentNotFound("NguoiDung"));
                }).orElse(JsonResult.parentNotFound("Chi nhanh hang hoa"));
    }

    @PutMapping("/update")
    @ApiOperation(value = "put phieu nhap hang chi tiet", response = HoaDon.class)
    public ResponseEntity<JsonResult> put(@RequestBody HoaDon hoaDon,
                                          @RequestParam("nguoi-dung-id") int nguoiDungId,
                                          @RequestParam("khach-hang-id") int khachHangId

    ) {
        return nguoiDungService.findById( nguoiDungId,false)
                .map(nguoiDung -> {
                    hoaDon.setNguoiDung(nguoiDung);
                    return khachHangService.findByIdAndXoa( khachHangId, false)
                            .map(khachHang -> {
                                hoaDon.setKhachHang(khachHang);
                                LocalDateTime now = LocalDateTime.now();
                                Date out = Date.from(now.atZone(ZoneId.systemDefault()).toInstant());
                                hoaDon.setThoiGian(out);
                                return hoaDonService.save(hoaDon)
                                        .map(JsonResult::updated)
                                        .orElse(JsonResult.saveError("HoaDon "));
                            }).orElse(JsonResult.parentNotFound("KhachHang"));
                }).orElse(JsonResult.parentNotFound("NguoiDung"));
    }

    @PutMapping("/trang-thai")
    @ApiOperation(value = "thay doi trang thai hoa don")
    public ResponseEntity<JsonResult> setTrangThai(@RequestParam("id") int id,
                                                   @RequestParam("trang-thai") int trangThai) {
        if (hoaDonService.setTrangThai(id, trangThai))
            return JsonResult.success("Thay doi trang thai thanh cong");
        else return JsonResult.serverError("Thay doi trang thai that bai");
    }

    @GetMapping("/excel")
    public ResponseEntity<JsonResult> getExcel(@RequestParam("list-hoa-don") List<HoaDon> list) {
        XSSFWorkbook workbook = ExcelUtils.createListBillExcel(list);
        try {
            String fileName = "Listbill_" + LocalDateTime.now().getNano() + ".xlsx";
            File file = new File(UPLOAD_DIRECTORY + fileName);
            file.getParentFile().mkdirs();
            FileOutputStream outFile;
            outFile = new FileOutputStream(file);
            workbook.write(outFile);
            outFile.close();
            return JsonResult.uploaded(URL_UPLOAD_FILE + fileName);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return JsonResult.badRequest("Create Excel fail");
    }

    @GetMapping("/doanh-thu")
    public ResponseEntity<JsonResult> doanhThuTong( @RequestParam(name = "ngay-dau", defaultValue = "1970-01-01T00:00:00", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDate ngayDau,
                                                    @RequestParam(name = "ngay-cuoi", defaultValue = "9999-12-31T00:00:00", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDate ngayCuoi){
        System.out.println(DateTimeUtils.asDate(ngayDau));
        return Optional.ofNullable(hoaDonService.bieuDoDoanhThuTong(DateTimeUtils.asDate(ngayDau),DateTimeUtils.asDate(ngayCuoi),false))
                .map(resultList -> !resultList.isEmpty() ? JsonResult.found(resultList) : JsonResult.notFound("DoanhThu"))
                .orElse(JsonResult.serverError("Internal Server Error"));

    }

    @GetMapping("/doanh-thu-thang/{year}/{month}")
    public ResponseEntity<JsonResult> doanhThuTrongThang( @PathVariable("year") int year,
                                                          @PathVariable("month") int month){
        return Optional.ofNullable(hoaDonService.bieuDoDoanhThuTrongThang(month,year,false))
                .map(resultList -> !resultList.isEmpty() ? JsonResult.found(resultList) : JsonResult.notFound("DoanhThu"))
                .orElse(JsonResult.serverError("Internal Server Error"));
    }

    @GetMapping("/doanh-thu-gio-trong-thang/{year}/{month}")
    public ResponseEntity<JsonResult> doanhThuGioTrongThang( @PathVariable("year") int year,
                                                             @PathVariable("month") int month){
        return Optional.ofNullable(hoaDonService.bieuDoDoanhThuGioTrongThang(month,year,false))
                .map(resultList -> !resultList.isEmpty() ? JsonResult.found(resultList) : JsonResult.notFound("DoanhThu"))
                .orElse(JsonResult.serverError("Internal Server Error"));
    }

    @GetMapping("/doanh-thu-tuan/{year}/{week}")
    public ResponseEntity<JsonResult> doanhThuTrongTuan( @PathVariable("year") int year,
                                                          @PathVariable("week") int week){
        return Optional.ofNullable(hoaDonService.bieuDoDoanhThuTrongTuan(week,year,false))
                .map(resultList -> !resultList.isEmpty() ? JsonResult.found(resultList) : JsonResult.notFound("DoanhThu"))
                .orElse(JsonResult.serverError("Internal Server Error"));
    }

    @GetMapping("/doanh-thu-nam/{year}")
    public ResponseEntity<JsonResult> doanhThuTrongNam( @PathVariable("year") int year){
        return Optional.ofNullable(hoaDonService.bieuDoDoanhThuTrongNam(year,false))
                .map(resultList -> !resultList.isEmpty() ? JsonResult.found(resultList) : JsonResult.notFound("DoanhThu"))
                .orElse(JsonResult.serverError("Internal Server Error"));
    }

    @GetMapping("/doanh-thu-nhan-vien/{id}")
    public ResponseEntity<JsonResult> doanhThuByNv( @RequestParam(name = "ngay-dau", defaultValue = "1970-01-01T00:00:00", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDate ngayDau,
                                                    @RequestParam(name = "ngay-cuoi", defaultValue = "9999-12-31T00:00:00", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDate ngayCuoi,
                                                    @PathVariable("id") int nhanVienId){
        System.out.println(DateTimeUtils.asDate(ngayDau));
        return Optional.ofNullable(hoaDonService.bieuDoDoanhThuByNV(DateTimeUtils.asDate(ngayDau),DateTimeUtils.asDate(ngayCuoi),nhanVienId,false))
                .map(resultList -> !resultList.isEmpty() ? JsonResult.found(resultList) : JsonResult.notFound("DoanhThu"))
                .orElse(JsonResult.serverError("Internal Server Error"));

    }

}
