# E-Commerce Product Management System

A full-stack E-Commerce Product Management System with a Spring Boot backend and a Material UI-styled frontend.

## Features
- Product CRUD (Create, Read, Update, Delete)
- Category management
- Inventory and price history tracking
- Search and filter products
- Responsive Material UI admin dashboard
- RESTful API (Spring Boot, JPA, H2, Lombok)
- In-memory H2 database for easy setup
- CORS enabled for frontend-backend integration

## Project Structure
```
pom.xml
frontend/
  app.js
  index.html
  style.css
src/
  main/
    java/
      com/ecommerce/product/
        ... (controllers, models, services, configs)
    resources/
      application.properties
  test/
    java/
      com/ecommerce/product/ProductServiceTest.java
```

## Setup Instructions

### Backend (Spring Boot)
1. Make sure you have Java 17+ and Maven installed.
2. In the project root, run:
   ```sh
   mvn spring-boot:run
   ```
3. The backend will start on [http://localhost:8081](http://localhost:8081)

### Frontend (Static HTML/JS)
1. Open `frontend/index.html` in a local web server (do not use `file://`).
   - Example (Python 3):
     ```sh
     cd frontend
     python3 -m http.server 3000
     ```
   - Then visit [http://localhost:3000](http://localhost:3000)
2. The frontend will connect to the backend API at `http://localhost:8081/api/products`.

## Development Notes
- `.gitignore` excludes build artifacts, IDE files, and OS files.
- Redis is present but disabled by default in `application.properties`.
- No images/files are uploaded; product management is JSON-based.
- For production, connect to a real database and secure endpoints.

## License
MIT

---

**Author:** Ali Akbar

For questions or contributions, open an issue or pull request on [GitHub](https://github.com/AliAkbarBaloch/E-Commerce_Product_Management_System).
