package com.tavi.tavi_mrs.controller.hang_hoa;

import com.tavi.tavi_mrs.entities.hang_hoa.ChiNhanhHangHoa;
import com.tavi.tavi_mrs.entities.hang_hoa.HangHoa;
import com.tavi.tavi_mrs.entities.json.JsonResult;
import com.tavi.tavi_mrs.entities.json.PageJson;
import com.tavi.tavi_mrs.service.hang_hoa.ChiNhanhHangHoaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("api/v1/admin/chi-nhanh-hang-hoa")
public class ChiNhanhHangHoaController {

    @Autowired
    ChiNhanhHangHoaService chiNhanhHangHoaService;

    @GetMapping("/find-by-id")
    public ResponseEntity<JsonResult> findById(@RequestParam("id") int idHoaDon) {
        return chiNhanhHangHoaService.findById(idHoaDon, false)
                .map(JsonResult::found)
                .orElse(JsonResult.idNotFound());
    }

    @GetMapping("/search")
    ResponseEntity<JsonResult> search(
            @RequestParam(value = "chi-nhanh-id", required = false, defaultValue = "0") int chiNhanhId,
            @RequestParam(value = "text", defaultValue = "") String text,
            @RequestParam(name = "page", defaultValue = "1", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<ChiNhanhHangHoa> chiNhanhHangHoaPage;
        if ( chiNhanhId == 0 && text=="") {
            chiNhanhHangHoaPage  = chiNhanhHangHoaService.findAllToPage(pageable);
        }
        else {
            chiNhanhHangHoaPage = chiNhanhHangHoaService.findByChiNhanhAndText(chiNhanhId,text,pageable);
        }
        return Optional.ofNullable(chiNhanhHangHoaPage)
                .map(hangHoas -> hangHoas.getTotalElements() != 0 ? JsonResult.found(PageJson.build(hangHoas)) : JsonResult.notFound("ChiNhanhHangHoa"))
                .orElse(JsonResult.serverError("Internal Server error"));
    }
}
