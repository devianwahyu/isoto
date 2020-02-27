# MODEL
## Akun
* username: string
* email: string
* password: string
* status_bayar: integer
* status_kerja: integer
* id_tipe_member: integer
* id_universitas: integer
* id_prodi: integer
* id_tipe_soal: integer

## Prodi
* id: integer
* id_tipe_prodi: integer
* prodi: string

## Universitas
* id: integer
* universitas: string

## Tipe_member
* id: integer
* tipe_member: string

## Nilai_user
* id: integer
* id_user: string
* nilai: double

## Soal
* id: integer
* konten: text
* opsi_a: string
* opsi_b: string
* opsi_c: string
* opsi_d: string
* jawaban: char
* bobot: double
* id_tipe_soal: integer

## Tipe_soal
* id: integer
* tipe_soal: string

## Batas_nilai
* id_prodi: integer
* id_universitas: integer
* batas_nilai: double

## Rekap_to
* id_user: string
* id_soal: integer
* bobot: double

# ENDPOINT (/api)
## Auth (/auth)
### Daftar (POST /daftar)
**Request body: JSON**

    {
        "username": "User",
        "email": "email@gmail.com",
        "password": "passwordaman",
        "confirmPassword":"passwordaman",
    }

**Response: JSON**

    200:
    {
        "success": true,
        "message": "Registered successfuly"
    }
    401:
    {
        "success": false,
        "message": "Confirm password not same with password"
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

## Akun (/akun)
### Milih universitas dan jurusan (PUT /pilih)
**Request (headers): (Required) Authorization: Bearer <JWT_TOKEN>**

**Request body: JSON**

    {
        "universitas": "1",
        "prodi": "1"
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

### Hapus akun (DELETE /profil)
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

### Tampilkan profile (GET /profil)
**Request (headers): (Required) Authorization: Bearer <JWT_TOKEN>**

**Response: JSON**

    200:
    {
        "success": true,
        "data": [
            {
                "nama": "user",
                "email": "email@gmail.com",
                "prodi": "kedokteran",
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

## Pembayaran (/pembayaran)
### Payment tryout (PUT /tryout)
**Request (headers): (Required) Authorization: Bearer <JWT_TOKEN>**

**Request body: JSON**

    {
        "nominal": "25000",
        "questionType": "1"
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

## Rasionalisasi (/rasionalisasi)
### Cek pilihan utama (GET /utama)
**Request (headers): (Required) Authorization: Bearer <JWT_TOKEN>**

**Response: JSON**

    200:
    {
        "message": "Berdasarkan simulasi BrawijayaTO, nilai kamu diprediksikan SUDAH memenuhi batas nilai prediksi lulus prodi yang kamu pilih."
    }
    500:
    {
        "success": false,
        "message": "Internal server error"
    }

### Alternatif universitas (GET /alternatif/universitas)
**Request (headers): (Required) Authorization: Bearer <JWT_TOKEN>**

**Response: JSON**

    200:
    {
        "success": true,
        "data": [
            {
                "prodi": "Teknik Mesin",
                "universitas": "Universitas Brawijaya",
            },
            {
                "prodi": "Sistem Informasi",
                "universitas": "Universitas Brawijaya",
            },
            {.....}
        ]
    }
    500:
    {
        "success": false,
        "message": "Internal server error"
    }

### Alternatif prodi (GET /alternatif/prodi)
**Request (headers): (Required) Authorization: Bearer <JWT_TOKEN>**

**Response: JSON**

    200:
    {
        "success": true,
        "data": [
            {
                "prodi": "Kedokteran",
                "universitas": "Universitas Gajah Mada",
            },
            {
                "prodi": "Kedokteran",
                "universitas": "Universitas Indonesia",
            },
            {.....}
        ]
    }
    500:
    {
        "success": false,
        "message": "Internal server error"
    }

## Pembahasan (/pembahasan)
### Video (/video)
**Request (headers): (Required) Authorization: Bearer <JWT_TOKEN>**

**Response: JSON**

    200:
    {
        "success": true,
        "data": mp4
    }
    403:
    {
        "success": false,
        "message" "You're not premium member"
    }
    
### Teks (/teks)
**Request (headers): (Required) Authorization: Bearer <JWT_TOKEN>**

**Response: JSON**

    200:
    {
        "success": true,
        "data": [
            {
                "id": 1,
                "data": "a"
            },
            {
                "id": 2,
                "data": "c"
            },
            {
                "id": 3,
                "data": "a"
            },
            {...}
        ]
    }
    403:
    {
        "success": false,
        "message" "You're not premium member"
    }
    

