package com.ecommerce.product.service;

import com.ecommerce.product.model.PriceHistory;
import com.ecommerce.product.repository.PriceHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PriceHistoryService {
    @Autowired
    private PriceHistoryRepository priceHistoryRepository;

    public List<PriceHistory> getPriceHistoryByProductId(Long productId) {
        return priceHistoryRepository.findByProductId(productId);
    }
}
