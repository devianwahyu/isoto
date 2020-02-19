# MODEL
## Akun
* id: integer
* nama: string
* email: string
* password: string
* status_bayar: integer
* id_tipe_member: integer
* id_universitas: integer
* id_jurusan: integer
* id_skor: ineteger

## Jurusan
* id: integer
* id_universitas: integer
* nama: string

## Universitas
* id: integer
* nama: string

## Tipe_member
* id: integer
* nama: string

## Skor
* id: integer
* id_akun: integer
* skor: double

# ENDPOINT
## Auth (/auth)
### Register (POST /auth/register)
**Request body: JSON**

    {
        "name" : "User",
        "email" : "email@gmail.com",
        "password" : "passwordaman"
    }

**Response: JSON**

    200:
    {
        "success": true,
        "message": "Registered successfuly"
    }
    409:
    {
        "success": false,
        "message": "Email already registered"
    }
    422:
    {
        "success": false,
        "message": "Wrong email format"
    }
    500:
    {
        "success": false,
        "message": "Internal server error"
    }

### Login (POST /auth/login)
**Request body: JSON**

    {
        "email": "email@gmail.com",
        "password": "passwordaman"
    }

**Response: JSON**

    200:
    {
        "success": true,
        "token": token
    }
    401:
    {
        "success": false,
        "message": "Wrong password"
    }
    404:
    {
        "success": false,
        "message": "User not found"
    }
    500:
    {
        "success": false,
        "message": "Internal server error"
    }

## Akun (/account)
### Update Nama (PUT /account/name)
**Request (headers): (Required) Authorization: Bearer <JWT_TOKEN>**

**Request body: JSON**

    {
        "nama": "newName"
    }

**Response: JSON**

    200:
    {
        "success": true,
        "message": "Name updated successfuly"
    }
    500:
    {
        "success": false,
        "message": "Internal server error"
    }

### Milih universitas dan jurusan (PUT /account/selection)
**Request (headers): (Required) Authorization: Bearer <JWT_TOKEN>**

**Request body: JSON**

    {
        "universitas": "universitas brawijaya",
        "jurusan": "Kedokteran"
    }

**Response: JSON**

    200:
    {
        "success": true,
        "message": "Updated successfuly"
    }
    500:
    {
        "success": false,
        "message": "Internal server error"
    }

### Hapus akun (DELETE /account/delete)
**Request (headers): (Required) Authorization: Bearer <JWT_TOKEN>**

**Response: JSON**

    200:
    {
        "success": true,
        "message": "Account deleted successfuly"
    }
    500:
    {
        "success": false,
        "message": "Internal server error"
    }

### Tampilkan profile (GET /account/profile)
**Request (headers): (Required) Authorization: Bearer <JWT_TOKEN>**

**Response: JSON**

    200:
    {
        "success": true,
        "data": [
            {
                "nama": "user",
                "email": "email@gmail.com",
                "jurusan": "kedokteran",
                "universitas": "univeritas brawijaya",
                "tipe_member": "reguler"
            }
        ]
    }
    500:
    {
        "success": false,
        "message": "Internal server error"
    }