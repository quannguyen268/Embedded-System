package com.tavi.tavi_mrs.service_impl.hang_hoa;

import com.tavi.tavi_mrs.entities.hang_hoa.ChiNhanhHangHoa;
import com.tavi.tavi_mrs.repository.hang_hoa.ChiNhanhHangHoaRepo;
import com.tavi.tavi_mrs.service.hang_hoa.ChiNhanhHangHoaService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ChiNhanhHangHoaServiceImpl implements ChiNhanhHangHoaService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ChiNhanhHangHoaServiceImpl.class);

    @Autowired
    private ChiNhanhHangHoaRepo chiNhanhHangHoaRepo;


    @Override
    public Optional<ChiNhanhHangHoa> findById(int id, boolean xoa) {
        try {
            return chiNhanhHangHoaRepo.findById(id, xoa);
        } catch (Exception ex) {
            LOGGER.error("findById error", ex);
            ex.printStackTrace();
            return Optional.empty();
        }
    }

    @Override
    public Optional<ChiNhanhHangHoa> save(ChiNhanhHangHoa hangHoa) {
        try{
            return Optional.ofNullable(chiNhanhHangHoaRepo.save(hangHoa));
        }catch (Exception ex){
            LOGGER.error("save chi nhanh hang hoa error", ex);
            return Optional.empty();
        }
    }


    @Override
    public Page<ChiNhanhHangHoa> findAllToPage(Pageable pageable) {
        try {
            return chiNhanhHangHoaRepo.findAllToPage(pageable);
        } catch (Exception ex) {
            LOGGER.error("findAllToPage error", ex);
            ex.printStackTrace();
            return null;
        }
    }

    @Override
    public boolean setTonKho(int soLuong, int id) {
        try {
            return chiNhanhHangHoaRepo.setTonKho(soLuong, id) > 0;
        } catch (Exception ex) {
            ex.printStackTrace();
            LOGGER.error("setTonKho error", ex);
            return false;
        }
    }

    @Override
    public Page<ChiNhanhHangHoa> findByChiNhanh(int chiNhanhId, Pageable pageable) {
        try {
            return chiNhanhHangHoaRepo.findByChiNhanh(chiNhanhId,pageable);
        } catch (Exception ex) {
            LOGGER.error("findByChiNhanh error", ex);
            ex.printStackTrace();
            return null;
        }
    }

    @Override
    public Page<ChiNhanhHangHoa> findByChiNhanhAndText(int chiNhanhId, String text, Pageable pageable) {
        try {
            return chiNhanhHangHoaRepo.findByChiNhanhAndText(chiNhanhId,text,pageable);
        } catch (Exception ex) {
            LOGGER.error("findAllToPage error", ex);
            ex.printStackTrace();
            return null;
        }
    }
    @Override
    public Optional<ChiNhanhHangHoa> findByChiNhanhIdAndHangHoaId(int chiNhanhId, int hangHoaId) {
        try{
            return chiNhanhHangHoaRepo.findByChiNhanhIdAndHangHoaId(chiNhanhId,hangHoaId);
        }catch (Exception ex) {
            LOGGER.error("find-chi-nhanh-hang-hoa-error : " + ex);
            return Optional.empty();
        }
    }


}
