# MODEL
## Akun
* username: string
* email: string
* password: string
* status_bayar: integer
* to_ke: integer
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
* id_user: string
* nilai: double
* to_ke: integer

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
* id_materi_soal

## Tipe_soal
* id: integer
* tipe_soal: string

## Batas_nilai
* id_prodi: integer
* id_universitas: integer
* id_bidang_keilmuan
* batas_nilai: double

## Rekap_to
* id_user: string
* id_soal: integer
* id_materi_soal: integer
* bobot: double
* to_ke: integer

## Bidang_keilmuan
* id: integer
* bidang_keilmuan: string

## Materi_soal
* id: integer
* materi: string

# ENDPOINT (/api)
## Auth (/auth)
### Daftar (POST /daftar)
**Request (body): JSON**

    {
        "username": "User",
        "email": "email@gmail.com",
        "password": "passwordaman",
        "konfirmasiPassword":"passwordaman",
    }

**Response: JSON**

    200:
    {
        "success": true,
        "message": "Daftar berhasil"
    }
    401:
    {
        "message": "Password konfirmasi tidak sama sengan password"
    }
    409:
    {
        "message": "Email atau Username sudah terdaftar"
    }
    422:
    {
        "message": "Format email salah"
    }
    500:
    {
        "message": "Internal server error"
    }

### Login (POST /login)
**Request (body): JSON**

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
        "message": "Password salah"
    }
    404:
    {
        "message": "Pengguna tidak ditemukan"
    }
    500:
    {
        "message": "Internal server error"
    }

## Akun (/akun)
### Tampilkan profile (GET /profil)
**Request (header): (Required) authorization: Bearer <JWT_TOKEN>**

**Response: JSON**

    200:
    {
        "success": true,
        "data": {
                    "nama": "user",
                    "email": "email@gmail.com",
                    "prodi": "Matematika",
                    "universitas": "Univeritas Brawijaya",
                    "tipe_member": "Reguler"
                }
    }
    500:
    {
        "message": "Internal server error"
    }

### Milih universitas dan jurusan (PUT /pilih)
**Request (header): (Required) authorization: Bearer <JWT_TOKEN>**

**Request body: JSON**

    {
        "universitas": "1",
        "prodi": "1"
    }

**Response: JSON**

    200:
    {
        "success": true,
        "message": "Berhasil memilih universitas dan prodi"
    }
    500:
    {
        "message": "Internal server error"
    }

### Hapus akun (DELETE /profil)
**Request (header): (Required) authorization: Bearer <JWT_TOKEN>**

**Response: JSON**

    200:
    {
        "success": true,
        "message": "Akun berhasil dihapus"
    }
    500:
    {
        "message": "Internal server error"
    }

## Pembayaran (/pembayaran)
### Payment tryout (PUT /tryout)
**Request (headers): (Required) Authorization: Bearer <JWT_TOKEN>**

**Request body: JSON**

    {
        "bayar": "25000",
        "tipeSoal": "1"
    }

**Response: JSON**

    200:
    {
        "success": true,
        "message": "Payment successful"
    }
    402:
    {
        "message": "Payment is required"
    }
    500:
    {
        "message": "Internal server error"
    }

### Payment upgrade (PUT /upgrade)
**Request (headers): (Required) Authorization: Bearer <JWT_TOKEN>**

**Request body: JSON**

    {
        "bayar": "200000"
    }

**Response: JSON**

    200:
    {
        "success": true,
        "message": "Payment successful"
    }
    402:
    {
        "message": "Payment is required"
    }
    500:
    {
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
### Cek pilihan utama (GET /utama/:id)
**Request (headers): (Required) Authorization: Bearer <JWT_TOKEN>**

**Request (params): id**

**Response: JSON**

    200:
    {
        "success": true,
        "data": [
            {
            "universitas": "Universitas Brawijaya",
            "prodi": "Sistem Informasi",
            "nilai": 912,
            "prediksi": 644.45
            }
        ],
        "message": "Berdasarkan simulasi BrawijayaTO, nilai kamu diprediksikan SUDAH memenuhi batas nilai prediksi lulus prodi yang kamu pilih."
    }
    500:
    {
        "message": "Internal server error"
    }

### Alternatif universitas (GET /alternatif/universitas/:id)
**Request (headers): (Required) Authorization: Bearer <JWT_TOKEN>**

**Request (params): id**

**Response: JSON**

    200:
    {
        "success": true,
        "data": [
            {
                "prodi": "Sistem Informasi",
                "universitas": "Universitas Brawijaya",
                "batas_nilai": 644.45
            },
            {
                "prodi": "Informatika",
                "universitas": "Universitas Brawijaya",
                "batas_nilai": 646.77
            },
            {
                "prodi": "Teknologi Informasi",
                "universitas": "Universitas Brawijaya",
                "batas_nilai": 623.07
            },
            {
                "prodi": "Teknik Komputer",
                "universitas": "Universitas Brawijaya",
                "batas_nilai": 624.45
            },
            {
                "prodi": "Matematika",
                "universitas": "Universitas Brawijaya",
                "batas_nilai": 636.24
            }
        ]
    }
    500:
    {
        "message": "Internal server error"
    }

### Alternatif prodi (GET /alternatif/prodi/:id)
**Request (headers): (Required) Authorization: Bearer <JWT_TOKEN>**

**Request (params): id**

**Response: JSON**

    200:
    {
        "success": true,
        "data": [
            {
                "prodi": "Sistem Informasi",
                "universitas": "Universitas Brawijaya",
                "batas_nilai": 644.45
            },
            {
                "prodi": "Sistem Informasi",
                "universitas": "Universitas Indonesia",
                "batas_nilai": 686.5
            },
            {
                "prodi": "Sistem Informasi",
                "universitas": "Institut Teknologi Sepuluh November",
                "batas_nilai": 669.85
            },
            {
                "prodi": "Sistem Informasi",
                "universitas": "Universitas Airlangga",
                "batas_nilai": 646.02
            },
            {
                "prodi": "Sistem Informasi",
                "universitas": "Universitas Jember",
                "batas_nilai": 606.66
            }
        ]
    }
    500:
    {
        "message": "Internal server error"
    }

### Alternatif bidang keilmuan (GET /alternatif/bidang/:id)
**Request (headers): (Required) Authorization: Bearer <JWT_TOKEN>**

**Request (params): id**

**Response: JSON**

    200:
    {
        "success": true,
        "data": [
            {
                "prodi": "Ilmu Komputer",
                "universitas": "Universitas Indonesia",
                "batas_nilai": 712.41
            },
            {
                "prodi": "Ilmu Komputer",
                "universitas": "Institut Pertanian Bogor",
                "batas_nilai": 663.79
            },
            {
                "prodi": "Ilmu Komputer",
                "universitas": "Universitas Gajah Mada",
                "batas_nilai": 678.96
            },
            {
                "prodi": "Ilmu Komputer",
                "universitas": "Universitas Negeri Jakarta",
                "batas_nilai": 648.91
            },
            {
                "prodi": "Ilmu Komputer",
                "universitas": "Universitas Udayana",
                "batas_nilai": 612.39
            }
        ]
    }
    500:
    {
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
                "id": 3,
                "tipe_soal": "TPS",
                "materi": "Kemampuan Penalaran Umum",
                "jawaban": "a"
            },
            {
                "id": 4,
                "tipe_soal": "TPS",
                "materi": "Kemampuan Penalaran Umum",
                "jawaban": "c"
            },
            {
                "id": 5,
                "tipe_soal": "TPS",
                "materi": "Kemampuan Penalaran Umum",
                "jawaban": "c"
            }
        ]
    }
    403:
    {
        "message" "You're not premium member"
    }
    
## Pencapaian (/pencapaian)
### Hasil semua to (GET /semua)
**Request (headers): (Required) Authorization: Bearer <JWT_TOKEN>**

**Response: JSON**

    200:
    {
        "success": true,
        "data": [
            {
                "nilai": 912,
                "to_ke": 1
            }
        ]
    }
    500:
    {
        "message": "Internal server error"
    }

### Hasil rinci to (GET /rinci/:id)
**Request (headers): (Required) Authorization: Bearer <JWT_TOKEN>**

**Request (params): id**

**Response: JSON**

    200:
    {
        "success": true,
        "tps": 1200,
        "materi 1": 600,
        "materi 2": 840,
        "materi 3": 1080,
        "materi 4": 840
    }
    500:
    {
        "message": "Internal server error"
    }

## Tryout (/tryout)
### Soal (GET /soal/:id)
**Request (headers): (Required) Authorization: Bearer <JWT_TOKEN>**

**Request (params): id**

**Response: JSON**

    200:
    {
        "status": true,
        "data": [
            {
                "id": 3,
                "tipe": 3,
                "konten": "Senja berhubungan dengan ..., sebagaimana ..., berhubungan dengan berlari.",
                "opsi_a": "malam-berjalan",
                "opsi_b": "petang-kejar",
                "opsi_c": "waktu-cepat ",
                "opsi_d": "siang-kaki"
            }
        ]
    }
    500:
    {
        "message": "Internal server error"
    }

### Rekap (POST /rekap/:id)
**Request (headers): (Required) Authorization: Bearer <JWT_TOKEN>**

**Request (params): id**

**Request (body): JSON**

    {
	"jawaban": "a"
    }

**Response: JSON**

    200:
    {
        "success": true,
        "message": "Rekap nilai berhasil"
    }
    500:
    {
        "message": "Internal server error"
    }

### Hitung (POST /hitung)
**Request (headers): (Required) Authorization: Bearer <JWT_TOKEN>**

**Response: JSON**

    200:
    {
        "success": true,
        "message": "Nilai berhasil dihitung"
    }
    500:
    {
        "message": "Internal server error"
    }