package com.tavi.tavi_mrs.controller.nha_cung_cap;

import com.tavi.tavi_mrs.entities.json.JsonResult;
import com.tavi.tavi_mrs.entities.json.PageJson;
import com.tavi.tavi_mrs.entities.nha_cung_cap.NhaCungCap;
import com.tavi.tavi_mrs.service.nha_cung_cap.NhaCungCapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("api/v1/admin/nha-cung-cap")
public class NhaCungCapController {

    @Autowired
    private NhaCungCapService nhaCungCapService;

    @GetMapping("/find-all")
    public ResponseEntity<JsonResult> findAll(@RequestParam(name = "page", defaultValue = "1", required = false) int page,
                                              @RequestParam(name = "size", defaultValue = "10", required = false) int size){
        Pageable pageable = PageRequest.of(page-1,size);
        Page<NhaCungCap> nhaCungCapPage = nhaCungCapService.findAllToPage(pageable);
        return Optional.ofNullable(nhaCungCapPage)
                .map(nhaCungCaps -> nhaCungCaps.getTotalElements() != 0 ? JsonResult.found(PageJson.build(nhaCungCaps)) : JsonResult.notFound("NhaCungCap/Page"))
                .orElse(JsonResult.serverError("Internal Server error"));
    }

    @GetMapping("/find-by-id")
    public ResponseEntity<JsonResult> findById(@RequestParam("id")int id){
        return nhaCungCapService.findByIdAndXoa(id,false)
                .map(JsonResult::found)
                .orElse(JsonResult.idNotFound());
    }

    @GetMapping("/search")
    public ResponseEntity<JsonResult> search(@RequestParam(value = "ten", required = false, defaultValue = "") String ten,
                                             @RequestParam(value = "dia-chi", required = false, defaultValue = "") String diaChi,
                                             @RequestParam(value = "email", required = false, defaultValue = "") String email,
                                             @RequestParam(value = "dien-thoai", required = false, defaultValue = "") String dienThoai,
                                             @RequestParam(value = "facebook", required = false, defaultValue = "") String facebook,
                                             @RequestParam(name = "page", defaultValue = "1", required = false) int page,
                                             @RequestParam(name = "size", defaultValue = "10", required = false) int size){
        Pageable pageable = PageRequest.of(page-1,size);
        Page<NhaCungCap> nhaCungCapPage;
        if("".equals(ten) && "".equals(diaChi) && "".equals(dienThoai) && "".equals(facebook)){
            nhaCungCapPage = nhaCungCapService.findAllToPage(pageable);
        }else {
            nhaCungCapPage = nhaCungCapService.findByTenAndDiaChiAndEmailAndDienThoaiAndFacebook(ten,diaChi,email,dienThoai,facebook,pageable);
        }
        return Optional.ofNullable(nhaCungCapPage)
                .map(nhaCungCaps -> nhaCungCaps.getTotalElements() != 0 ? JsonResult.found(PageJson.build(nhaCungCaps)) : JsonResult.notFound("NhaCungCap/Ten/DiaChi/DienThoai/Facebook"))
                .orElse(JsonResult.serverError("Internal Server error"));
    }

    @GetMapping("/search-text")
    public ResponseEntity<JsonResult> searchText(@RequestParam(value = "text",required = false, defaultValue = "") String text,
                                                 @RequestParam(name = "page", defaultValue = "1", required = false) int page,
                                                 @RequestParam(name = "size", defaultValue = "10", required = false) int size){
        Pageable pageable = PageRequest.of(page-1,size);
        Page<NhaCungCap> nhaCungCapPage;
        if("".equals(text)){
            nhaCungCapPage = nhaCungCapService.findAllToPage(pageable);
        }else {
            nhaCungCapPage = nhaCungCapService.search(text,pageable);
        }
        return Optional.ofNullable(nhaCungCapPage)
                .map(nhaCungCaps -> nhaCungCaps.getTotalElements() != 0 ? JsonResult.found(PageJson.build(nhaCungCaps)) : JsonResult.notFound("NhaCungCap/Ten/DiaChi/DienThoai/Facebook"))
                .orElse(JsonResult.serverError("Internal Server error"));
    }

    @PostMapping("/upload")
    public ResponseEntity<JsonResult> upload(@RequestBody NhaCungCap nhaCungCap){
        nhaCungCap.setXoa(false);
        return nhaCungCapService.save(nhaCungCap)
                .map(JsonResult::uploaded)
                .orElse(JsonResult.saveError("upload-nha-cung-cap-error"));
    }

    @PutMapping("/update")
    public ResponseEntity<JsonResult> update(@RequestBody NhaCungCap nhaCungCap){
        return nhaCungCapService.save(nhaCungCap)
                .map(JsonResult::updated)
                .orElse(JsonResult.saveError("update-nha-cung-cap-error"));
    }

    @DeleteMapping("/delete")
    public  ResponseEntity<JsonResult> delete(@RequestParam("id") int id){
        Boolean bool = nhaCungCapService.deleted(id);
        if(bool){
            return JsonResult.deleted();
        }
        return JsonResult.saveError("ThuongHieu");
    }
}
