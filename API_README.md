## RESTful API Endpoints

### Base URL:

`http://localhost:8000/`

### Endpoints:

#### 1. **User Registration**

- **URL:** `auth/register`
- **Method:** `POST`
- **Request Body:**

```json
{
  "username": "testuser123",
  "email": "testuser@example.com",
  "password": "securePassword123",
  "firstName": "John",
  "lastName": "Doe",
  "contactNumber": "+1234567890",
  "country": "USA",
  "role": "user",
  "status": true
}
```

#### 2. **User Login**

- **URL:** `auth/login`
- **Method:**: `POST`
- **Request Body:**

```json
{
  "username": "testuser123",
  "password": "securePassword123"
}
```

#### 3. **User Logout**

- **URL:** `auth/logout`
- **Method:** `POST`

#### 4. **Retrieve Users**

- **URL:** `users/`
- **Method:** `GET`

#### 5. **Retrieve a User**

- **URL:** `users/:id`
- **Method:** `GET`

#### 6. **Update a User**

- **URL:** `users/:id`
- **Method:** `PUT`
- **Request Body:**

```json
{
  "email": "updatedEmail@example.com"
}
```

#### 7. **Delete a User**

- **URL:** `users/:id`
- **Method:** `DELETE`

#### 8. **Create a Hotel**

- **URL:** `hotels/`
- **Method:** `POST`
- **Request Body:**

```json
{
  "name": "Luxury Grand Hotel",
  "type": "Resort",
  "city": "Colombo",
  "address": "123 Paradise Lane",
  "distance": 5,
  "photos": ["photo1.jpg", "photo2.jpg"],
  "title": "Amazing Stay in the City Center",
  "description": "A luxury resort with modern amenities and beautiful views.",
  "rating": 4.5,
  "cheapestPrice": 150,
  "featured": true
}
```

#### 9. **Update a Hotel**

- **URL:** `hotels/:id`
- **Method:** `PUT`
- **Request Body:**

```json
{
  "name": "Updated Grand Hotel",
  "city": "Kandy",
  "rating": 4.7,
  "cheapestPrice": 180
}
```

#### 10. **Retrieve all Hotels**

- **URL:** `hotels/`
- **Method:** `GET`

#### 11. **Retrieve a Hotel by ID**

- **URL:** `hotels/:id`
- **Method:** `GET`

#### 12. **Delete a Hotel**

- **URL:** `hotels/:id`
- **Method:** `DELETE`

#### 13. **Create a Room**

- **URL:** `rooms/`
- **Method:** `POST`
- **Request Body:**

```json
{
  "title": "Deluxe Room",
  "price": 150,
  "maxPeople": 3,
  "description": "A spacious deluxe room with a sea view",
  "roomNumber": "101A",
  "bookedDates": ["2024-10-25", "2024-10-26"]
}
```

#### 14. **Update a Room**

- **URL:** `rooms/:id`
- **Method:** `PUT`
- **Request Body:**

```json
{
  "title": "Deluxe Room - Updated",
  "price": 180,
  "maxPeople": 4,
  "description": "An updated description for the deluxe room",
  "roomNumber": "101B",
  "bookedDates": ["2024-11-01", "2024-11-02"]
}
```

#### 15. **Retrieve all Rooms**

- **URL:** `rooms/`
- **Method:** `GET`

#### 16. **Retrieve a Room by ID**

- **URL:** `rooms/:id`
- **Method:** `GET`

#### 17. **Delete a Room**

- **URL:** `rooms/:id`
- **Method:** `DELETE`

#### 18. **Book a Room**

- **URL:** `rooms/:id/book`
- **Method:** `POST`
- **Request Body:**

```json
{
  "bookedDates": ["2024-11-03", "2024-11-04"]
}
```
