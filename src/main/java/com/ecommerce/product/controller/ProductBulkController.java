package com.ecommerce.product.controller;

import com.ecommerce.product.model.Product;
import com.ecommerce.product.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products/bulk")
public class ProductBulkController {
    @Autowired
    private ProductService productService;

    @PutMapping
    public ResponseEntity<List<Product>> bulkUpdate(@RequestBody List<Product> products) {
        List<Product> updated = productService.saveAll(products);
        return ResponseEntity.ok(updated);
    }
}
