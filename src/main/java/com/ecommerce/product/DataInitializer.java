package com.ecommerce.product;

import com.ecommerce.product.model.Category;
import com.ecommerce.product.model.Product;
import com.ecommerce.product.repository.CategoryRepository;
import com.ecommerce.product.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;

@Configuration
public class DataInitializer {
    @Bean
    CommandLineRunner initData(ProductRepository productRepository, CategoryRepository categoryRepository) {
        return args -> {
            Category electronics = new Category();
            electronics.setName("Electronics");
            categoryRepository.save(electronics);

            Product phone = Product.builder()
                    .name("Smartphone")
                    .description("Latest smartphone")
                    .price(new BigDecimal("699.99"))
                    .stock(10)
                    .category(electronics)
                    .build();
            productRepository.save(phone);
        };
    }
}
