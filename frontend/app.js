$(document).ready(function() {
    const API_URL = 'http://localhost:8081/api';

    // Product Management
    function fetchProducts(query = '') {
        let url = `${API_URL}/products`;
        if (query) url += `/search?name=${encodeURIComponent(query)}`;
        $.get(url, function(products) {
            renderProducts(products);
        });
    }

    function renderProducts(products) {
        const tbody = $('#product-table tbody');
        tbody.empty();
        products.forEach(prod => {
            tbody.append(`
                <tr data-id="${prod.id}">
                    <td>${prod.id}</td>
                    <td>${prod.name}</td>
                    <td>${prod.description || ''}</td>
                    <td>${prod.price}</td>
                    <td>${prod.stock}</td>
                    <td>${prod.category ? prod.category.name : ''}</td>
                    <td>${prod.imageUrl ? `<img src="${prod.imageUrl}" class="product-img">` : ''}</td>
                    <td>
                        <button class="action-btn edit">Edit</button>
                        <button class="action-btn delete">Delete</button>
                    </td>
                </tr>
            `);
        });
    }

    $('#product-form').submit(function(e) {
        e.preventDefault();
        const id = $('#product-id').val();
        // Collect form data as JSON
        const product = {
            id: id || null,
            name: $('#product-name').val(),
            description: $('#product-description').val(),
            price: parseFloat($('#product-price').val()),
            stock: parseInt($('#product-stock').val()),
            category: { id: $('#product-category').val() }
        };
        const method = id ? 'PUT' : 'POST';
        let url = `${API_URL}/products`;
        if (id) url += `/${id}`;
        $.ajax({
            url: url,
            method: method,
            contentType: 'application/json',
            data: JSON.stringify(product),
            success: function() {
                $('#product-form')[0].reset();
                $('#product-id').val('');
                fetchProducts();
            }
        });
    });

    $('#product-table').on('click', '.edit', function() {
        const tr = $(this).closest('tr');
        const id = tr.data('id');
        // Switch to the products section if not already visible
        $('.section').removeClass('active');
        $('#products-section').addClass('active');
        $.get(`${API_URL}/products/${id}`, function(prod) {
            $('#product-id').val(prod.id);
            $('#product-name').val(prod.name);
            $('#product-description').val(prod.description);
            $('#product-price').val(prod.price);
            $('#product-stock').val(prod.stock);
            $('#product-category').val(prod.category ? prod.category.id : '');
        });
    });

    $('#product-table').on('click', '.delete', function() {
        const tr = $(this).closest('tr');
        const id = tr.data('id');
        if (confirm('Delete this product?')) {
            $.ajax({
                url: `${API_URL}/products/${id}`,
                method: 'DELETE',
                success: fetchProducts
            });
        }
    });

    $('#search').on('input', function() {
        fetchProducts($(this).val());
    });

    // Category Management UI
    function fetchCategories() {
        $.get(`${API_URL}/categories`, function(categories) {
            $('#product-category').empty();
            $('#category-list').empty();
            categories.forEach(cat => {
                $('#product-category').append(`<option value="${cat.id}">${cat.name}</option>`);
                $('#category-list').append(`<li>${cat.name} <button class="delete-category" data-id="${cat.id}">Delete</button></li>`);
            });
        });
    }

    $('#add-category-form').submit(function(e) {
        e.preventDefault();
        const name = $('#new-category').val().trim();
        if (!name) return;
        $.ajax({
            url: `${API_URL}/categories`,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ name }),
            success: function() {
                $('#new-category').val('');
                fetchCategories();
            }
        });
    });

    $('#category-list').on('click', '.delete-category', function() {
        const id = $(this).data('id');
        if (confirm('Delete this category?')) {
            $.ajax({
                url: `${API_URL}/categories/${id}`,
                method: 'DELETE',
                success: fetchCategories
            });
        }
    });

    // Inventory update
    $('#update-inventory').on('click', function() {
        const id = $('#inventory-product-id').val();
        const stock = $('#inventory-stock').val();
        if (!id || stock === '') return;
        $.ajax({
            url: `${API_URL}/products/${id}/inventory?stock=${stock}`,
            method: 'PUT',
            success: function(product) {
                $('#stock-alert').text(product.stock < 5 ? 'Stock alert: Low stock!' : 'Stock updated.');
                fetchProducts();
            },
            error: function() {
                $('#stock-alert').text('Product not found.');
            }
        });
    });

    // Price history fetch
    $('#fetch-price-history').on('click', function() {
        const id = $('#price-history-product-id').val();
        if (!id) return;
        $.get(`${API_URL}/price-history/product/${id}`,(history) => {
            const table = $('#price-history-table');
            const tbody = table.find('tbody');
            tbody.empty();
            if (history.length === 0) {
                tbody.append('<tr><td colspan="3">No price history found.</td></tr>');
            } else {
                history.forEach(h => {
                    tbody.append(`<tr><td>${h.oldPrice}</td><td>${h.newPrice}</td><td>${h.changedAt}</td></tr>`);
                });
            }
            table.show();
        });
    });

    fetchCategories();
    fetchProducts();
});
