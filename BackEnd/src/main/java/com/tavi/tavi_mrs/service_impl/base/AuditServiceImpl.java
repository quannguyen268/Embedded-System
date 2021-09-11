package com.tavi.tavi_mrs.service_impl.base;

import com.tavi.tavi_mrs.entities.base.BaseEntity;
import com.tavi.tavi_mrs.service.base.AuditService;


public class AuditServiceImpl implements AuditService {
    @Override
    public <T extends BaseEntity> T auditUpdating(T obj) {
        return null;
    }
}
