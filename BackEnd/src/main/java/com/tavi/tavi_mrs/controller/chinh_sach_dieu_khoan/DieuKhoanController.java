package com.tavi.tavi_mrs.controller.chinh_sach_dieu_khoan;


import com.tavi.tavi_mrs.entities.chinh_sach_dieu_khoan.DieuKhoan;
import com.tavi.tavi_mrs.entities.json.JsonResult;
import com.tavi.tavi_mrs.service.chinh_sach_dieu_khoan.DieuKhoanService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/public/dieu-khoan")
public class DieuKhoanController {
    @Autowired
    DieuKhoanService dieuKhoanService;

    @GetMapping("/find-by-id")
    @ApiOperation(value = "find by id", response = DieuKhoan.class)
    ResponseEntity<JsonResult> findById(@RequestParam("id") int id) {
        return dieuKhoanService.findById(id)
                .map(JsonResult::found)
                .orElse(JsonResult.idNotFound());
    }

    @GetMapping("/find-all")
    @ApiOperation(value = "find all", response = DieuKhoan.class, responseContainer = "List")
    public ResponseEntity<JsonResult> findAll() {
        return Optional.ofNullable(dieuKhoanService.findAll())
                .map(rsList -> !rsList.isEmpty() ? JsonResult.found(rsList) : JsonResult.notFound("List of Dieu Khoan"))
                .orElse(JsonResult.serverError("Internal Server Error"));
    }

    @PutMapping("/update")
    @ApiOperation(value = "update dieu khoan", response = DieuKhoan.class)
    public ResponseEntity<JsonResult> update(@RequestBody DieuKhoan dieuKhoan) {
        return dieuKhoanService.save(dieuKhoan)
                .map(JsonResult::updated)
                .orElse(JsonResult.saveError("Dieu Khoan"));

    }

    @PutMapping("/delete")
    @ApiOperation(value = "xoa dieu khoan")
    public ResponseEntity<JsonResult> delete(@RequestParam("id") int id) {
        if (dieuKhoanService.delete(id))
            return JsonResult.deleted();
        else return JsonResult.serverError("xoa dieu khoan that bai");
    }
}