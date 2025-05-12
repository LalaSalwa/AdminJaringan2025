# Tugas Mail

| Nama | Salwa fadhila Rahmania |
| --- | --- |
| NRP | 3123600008 |
| Kelas | 2 D4 IT A |

## **1. Protokol Mail (SMTP, POP3, IMAP, POP3S)**

### A. **SMTP (Simple Mail Transfer Protocol)**

- **Fungsi utama**: Protokol yang digunakan untuk **mengirim email** dari klien (email client seperti Outlook, Gmail) ke mail server, dan antar mail server.
- **Karakteristik utama**:
    - Hanya digunakan untuk pengiriman, **tidak untuk menerima** email.
    - Biasanya bekerja di **port 25** (tanpa enkripsi), **port 587** (dengan STARTTLS), dan **port 465** (dengan SSL/TLS).
    - SMTP mendorong email ke **Mail Transfer Agent (MTA)** di server penerima.
- **Proses singkat**:
    - Pengguna menulis email → SMTP mengirimkan email ke server penerima → Server menyimpannya ke mailbox pengguna tujuan.

### B. **POP3 (Post Office Protocol Version 3)**

- **Fungsi utama**: Protokol yang digunakan untuk **mengambil (download) email dari server ke klien lokal**.
- **Karakteristik utama**:
    - Setelah email diunduh ke perangkat, biasanya **dihapus dari server**, sehingga tidak bisa diakses dari perangkat lain.
    - Umumnya digunakan oleh aplikasi email lama atau oleh pengguna yang hanya ingin mengakses email dari satu perangkat.
    - Bekerja di **port 110 (tanpa enkripsi)**.
- **Kelebihan**:
    - Lebih ringan, cocok untuk koneksi lambat.
- **Kekurangan**:
    - Tidak sinkron antar perangkat (email tidak tersimpan di server setelah diunduh).

### C. **IMAP (Internet Message Access Protocol)**

- **Fungsi utama**: Memungkinkan pengguna untuk **mengakses dan mengelola email langsung di server**, tanpa perlu mengunduh sepenuhnya ke perangkat.
- **Karakteristik utama**:
    - Email tetap **tersimpan di server**, memungkinkan akses dari banyak perangkat.
    - Mendukung fitur seperti folder, penandaan, pencarian, dan sinkronisasi waktu nyata.
    - Umumnya bekerja di **port 143 (tanpa enkripsi)** dan **port 993 (dengan SSL/TLS)**.
- **Kelebihan**:
    - Cocok untuk pengguna modern yang mengakses email dari berbagai perangkat.
- **Kekurangan**:
    - Membutuhkan koneksi internet stabil, dan ruang penyimpanan server harus memadai.

### D. **POP3S (POP3 Secure)**

- Merupakan versi **aman dari POP3**, yang menggunakan enkripsi SSL/TLS.
- Bekerja di **port 995**.
- Memberikan perlindungan terhadap pencurian data dan intersepsi dalam perjalanan data.

---

## **2. Informasi Mail Server dalam Sebuah Domain**

### A. **Peran DNS dalam Email**

- Saat seseorang mengirim email ke alamat seperti `user@example.com`, sistem email harus tahu **ke mana mengirimkan email tersebut**.
- Jawabannya ada di **DNS (Domain Name System)**, khususnya di **MX Record (Mail Exchange Record)** dari domain tersebut.

### B. **MX Record (Mail Exchange Record)**

- Menyimpan informasi tentang **mail server yang bertanggung jawab menerima email** untuk domain tertentu.
- Contoh:
    - Jika `example.com` memiliki MX Record:
        
        ```
        yaml
        SalinEdit
        Priority: 10
        Mail Server: mail.example.com
        
        ```
        
        Maka semua email ke `@example.com` akan diarahkan ke `mail.example.com`.
        

### C. **Cara Melihat MX Record**

- Menggunakan command line:
    - **Windows**:
        
        ```
        bash
        SalinEdit
        nslookup -type=mx example.com
        
        ```
        
    - **Linux/macOS**:
        
        ```
        nginx
        SalinEdit
        dig example.com mx
        
        ```
        
- Tool online seperti MXToolbox juga bisa digunakan.

### D. **Rekaman Tambahan untuk Keamanan Email**

- **SPF (Sender Policy Framework)**
    - Menentukan server mana yang diizinkan mengirim email untuk domain tersebut.
- **DKIM (DomainKeys Identified Mail)**
    - Menggunakan tanda tangan digital untuk memastikan integritas dan keaslian email.
- **DMARC (Domain-based Message Authentication, Reporting & Conformance)**
    - Kebijakan untuk menangani email yang gagal verifikasi SPF dan DKIM.
- Ketiganya digunakan untuk **mengurangi pemalsuan email dan spam**, serta melindungi reputasi domain.

---

## **3. Ringkasan Artikel: Introduction to Electronic Mail (GeeksforGeeks)**

### A. **Pengertian Email**

- **Email (electronic mail)** adalah sistem pengiriman pesan elektronik yang memungkinkan pengguna berkomunikasi secara digital melalui jaringan komputer atau internet.
- Email merupakan bentuk komunikasi modern yang cepat, efisien, dan murah dibandingkan surat fisik.

### B. **Komponen Utama Sistem Email**

1. **User Agent (UA)**
    - Aplikasi yang digunakan pengguna untuk menulis, mengirim, dan membaca email.
    - Contoh: Gmail, Outlook, Thunderbird.
2. **Message Transfer Agent (MTA)**
    - Komponen di server yang mengirim email dari satu server ke server lain.
    - Biasanya menggunakan SMTP.
3. **Mailbox**
    - Tempat penyimpanan email pengguna di server.
4. **Message Access Agent (MAA)**
    - Agen yang memungkinkan pengguna mengakses email di mailbox.
    - POP3 dan IMAP adalah contoh MAA.

### C. **Cara Kerja Email**

1. Pengguna membuat dan mengirim email melalui user agent.
2. Email dikirim ke MTA (misalnya: mail server pengirim).
3. MTA mentransfer email ke server penerima menggunakan SMTP.
4. Email disimpan di mailbox pengguna penerima.
5. Penerima menggunakan POP3 atau IMAP untuk mengambil/melihat email.

### D. **Struktur Umum Sebuah Email**

- **Header**: berisi informasi pengirim, penerima, subjek, waktu.
- **Body**: isi pesan yang diketik oleh pengirim.
- **Attachments**: file yang dilampirkan bersama email (opsional).

### E. **Kelebihan Email**

- Kecepatan tinggi dalam pengiriman.
- Biaya rendah (hampir gratis).
- Dapat mengirim ke banyak penerima sekaligus.
- Mendukung multimedia (gambar, file, suara).
- Dapat diakses dari mana saja dengan koneksi internet.

### F. **Kekurangan Email**

- Dapat digunakan untuk mengirim spam dan malware.
- Privasi bisa terancam jika tidak dienkripsi.
- Bergantung pada koneksi internet.