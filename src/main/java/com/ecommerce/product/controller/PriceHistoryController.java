package com.ecommerce.product.controller;

import com.ecommerce.product.model.PriceHistory;
import com.ecommerce.product.service.PriceHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/price-history")
public class PriceHistoryController {
    @Autowired
    private PriceHistoryService priceHistoryService;

    @GetMapping("/product/{productId}")
    public List<PriceHistory> getPriceHistoryByProductId(@PathVariable Long productId) {
        return priceHistoryService.getPriceHistoryByProductId(productId);
    }
}
