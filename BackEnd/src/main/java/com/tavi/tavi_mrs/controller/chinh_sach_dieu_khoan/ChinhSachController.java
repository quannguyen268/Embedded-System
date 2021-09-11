package com.tavi.tavi_mrs.controller.chinh_sach_dieu_khoan;

import com.tavi.tavi_mrs.entities.chinh_sach_dieu_khoan.ChinhSach;
import com.tavi.tavi_mrs.entities.chinh_sach_dieu_khoan.DieuKhoan;
import com.tavi.tavi_mrs.entities.json.JsonResult;
import com.tavi.tavi_mrs.service.chinh_sach_dieu_khoan.ChinhSachService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("api/v1/public/chinh-sach")
public class ChinhSachController {

    @Autowired
    private ChinhSachService chinhSachService;

    @PutMapping("/delete")
    @ApiOperation(value = "xoa chinh sach")
    public ResponseEntity<JsonResult> delete(@RequestParam("id") int id) {
        if (chinhSachService.delete(id))
            return JsonResult.deleted();
        else return JsonResult.serverError("xoa chinh sach that bai");
    }

    @GetMapping("/find-all")
    @ApiOperation(value = "find all", response = ChinhSach.class, responseContainer = "List")
    public ResponseEntity<JsonResult> findAll() {
        return Optional.ofNullable(chinhSachService.findAll())
                .map(rsList -> !rsList.isEmpty() ? JsonResult.found(rsList) : JsonResult.notFound("List of Chinh Sach"))
                .orElse(JsonResult.serverError("Internal Server Error"));
    }

    @GetMapping("/find-by-id")
    @ApiOperation(value = "find by id", response = ChinhSach.class)
    ResponseEntity<JsonResult> findById(@RequestParam("id") int id) {
        return chinhSachService.findById(id)
                .map(JsonResult::found)
                .orElse(JsonResult.idNotFound());
    }

    @PutMapping("/update")
    @ApiOperation(value = "update chinh sach", response = DieuKhoan.class)
    public ResponseEntity<JsonResult> update(@RequestBody ChinhSach chinhSach) {
        return chinhSachService.save(chinhSach)
                .map(JsonResult::updated)
                .orElse(JsonResult.saveError("Chinh Sach"));
    }
}
