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
* id_tipe_soal: integer

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

## Soal
* id: integer
* konten: text
* jawaban: char
* penjawab_salah: integer
* bobot: double
* id_tipe_soal: integer

## Tipe_soal
* id: integer
* nama: string

# ENDPOINT
## Auth (/auth)
### Register (POST /register)
**Request body: JSON**

    {
        "name": "User",
        "email": "email@gmail.com",
        "password": "passwordaman"
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

### Login (POST /login)
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
### Update Nama (PUT /name)
**Request (headers): (Required) Authorization: Bearer <JWT_TOKEN>**

**Request body: JSON**

    {
        "name": "newName"
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

### Milih universitas dan jurusan (PUT /selection)
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

### Hapus akun (DELETE /delete)
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

### Tampilkan profile (GET /profile)
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

## Payment (/payment)
### Payment tryout (PUT /tryout)
**Request (headers): (Required) Authorization: Bearer <JWT_TOKEN>**

**Request body: JSON**

    {
        "nominal": "25000"
    }

**Response: JSON**

    200:
    {
        "success": true,
        "message": "Payment successful"
    }
    402:
    {
        "success": false,
        "message": "Payment is required"
    }
    500:
    {
        "success": false,
        "message": "Internal server error"
    }

### Payment upgrade (PUT /upgrade)
**Request (headers): (Required) Authorization: Bearer <JWT_TOKEN>**

**Request body: JSON**

    {
        "nominal": "200000"
    }

**Response: JSON**

    200:
    {
        "success": true,
        "message": "Payment successful"
    }
    402:
    {
        "success": false,
        "message": "Payment is required"
    }
    500:
    {
        "success": false,
        "message": "Internal server error"
    }

## Admin (/admin)
### Tambah soal (POST /question/add)
**Request (headers): (Required) Authorization: Bearer <JWT_TOKEN>**

**Request body: JSON**

    {
        "content": "Siapa nama sapi saya?",
        "answer": "a",
        "questionType": 1
    }

**Response: JSON**

    200:
    {
        "success": true,
        "message": "Question added successfuly"
    }
    403:
    {
        "success": false,
        "message": "You're not admin"
    }
    500:
    {
        "success": false,
        "message": "Internal server error"
    }

### Update soal (PUT /question/update)
**Request (headers): (Required) Authorization: Bearer <JWT_TOKEN>**

**Request body: JSON**

    {
        "id": 1,
        "content": "Siapa nama sapi saya?",
        "answer": "a",
        "questionType": 1
    }

**Response: JSON**

    200:
    {
        "success": true,
        "message": "Question updated successfuly"
    }
    403:
    {
        "success": false,
        "message": "You're not admin"
    }
    500:
    {
        "success": false,
        "message": "Internal server error"
    }

### Delete soal (DELETE /question/delete)
**Request (headers): (Required) Authorization: Bearer <JWT_TOKEN>**

**Request (params): (Required) id => id_post**

**Response: JSON**

    200:
    {
        "success": true,
        "message": "Question deleted successfuly"
    }
    403:
    {
        "success": false,
        "message": "You're not admin"
    }
    500:
    {
        "success": false,
        "message": "Internal server error"
    }

### Tampilkan semua soal (GET /question/show)
**Request (headers): (Required) Authorization: Bearer <JWT_TOKEN>**

**Response: JSON**

    200:
    {
        "success": true,
        "data": [
            {
                "id": 1,
                "konten": "Siapa nama sapi saya?",
                "jawaban": "a",
                "penjawab_salah": 5,
                "bobot": 46,
                "id_tipe_soal": 1
            },
             {
                "id": 2,
                "konten": "Siapa nama babi saya?",
                "jawaban": "a",
                "penjawab_salah": 5,
                "bobot": 46,
                "id_tipe_soal": 1
            },
        ]
    }
    403:
    {
        "success": false,
        "message": "You're not admin"
    }
    500:
    {
        "success": false,
        "message": "Internal server error"
    }

### Tampilkan soal berdasar tipe (GET /question/show/:id)
**Request (headers): (Required) Authorization: Bearer <JWT_TOKEN>**

**Request (params): (Required) id => id_post**

**Response: JSON**

    200:
    {
        "success": true,
        "data": [
            {
                "id": 1,
                "konten": "Siapa nama sapi saya?",
                "jawaban": "a",
                "penjawab_salah": 5,
                "bobot": 46,
                "id_tipe_soal": 1
            }
        ]
    }
    403:
    {
        "success": false,
        "message": "You're not admin"
    }
    500:
    {
        "success": false,
        "message": "Internal server error"
    }

### Update member payment status (PUT /user/payment)
**Request (headers): (Required) Authorization: Bearer <JWT_TOKEN>**

**Response: JSON**

    200:
    {
        "success": true,
        "message": "Payment status updated successfuly"
    }
    403:
    {
        "success": false,
        "message": "You're not admin"
    }
    500:
    {
        "success": false,
        "message": "Internal server error"
    }

### Tampilkan semua member (GET /user/show)
**Request (headers): (Required) Authorization: Bearer <JWT_TOKEN>**

**Response: JSON**

    200:
    {
        "success": true,
        "data": [
            {
                "id": 1,
                "nama": "Le Minerale",
                "email": "mineral@gmail.com",
                "password": "iueejiodahfwpjwomc",
                "status_bayar": 1,
                "id_tipe_member": 1,
                "id_universitas": 1,
                "id_jurusan": 1,
                "id_soal": 1,
                "id_skor": 324
            },
            {
                "id": 2,
                "nama": "Aqua",
                "email": "aqua@gmail.com",
                "password": "iueejioddadsahfwpjwomc",
                "status_bayar": 0,
                "id_tipe_member": 3,
                "id_universitas": 3,
                "id_jurusan": 2,
                "id_soal": 2,
                "id_skor": 424
            }
        ]
    }
    403:
    {
        "success": false,
        "message": "You're not admin"
    }
    500:
    {
        "success": false,
        "message": "Internal server error"
    }