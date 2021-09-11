package com.tavi.tavi_mrs.service.cong_ty;

import com.tavi.tavi_mrs.entities.cong_ty.TongCongTy;

import java.util.List;
import java.util.Optional;

public interface TongCongTyService {

    Optional<TongCongTy> findById(Integer id);

    Optional<TongCongTy> save(TongCongTy  tongCongTy);

    Boolean deleted(Integer tongCongTy);

    List<TongCongTy> findAll();

}
