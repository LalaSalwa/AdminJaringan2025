# Ringkasan Chapter 5: the filesystem 

Sistem berkas adalah komponen utama dalam sistem operasi yang berfungsi untuk mengorganisir dan mengelola penyimpanan data. Sistem ini terdiri dari namespace, API, model keamanan, dan implementasi perangkat lunak yang menghubungkan struktur logis ke perangkat keras.

## 1. Pathname
Pathname adalah cara untuk menentukan lokasi suatu berkas dalam hierarki sistem berkas. Pathname dapat berupa:

* Pathname Absolut: Dimulai dari root (/) dan menunjukkan jalur lengkap, misalnya:
    ``` 
    bash
    Salin
    Edit
    /home/user/file.txt
    Pathname Relatif: Mengacu pada lokasi saat ini, misalnya:
    bash
    Salin
    Edit
    ./file.txt  
    ``` 

## 2. Mounting dan Unmounting Sistem Berkas
Sistem berkas dalam UNIX/Linux tersusun dalam pohon berkas (file tree), yang terdiri dari beberapa sistem berkas yang dipasang (mounted) pada direktori tertentu.

* Mounting Untuk memasang sistem berkas, gunakan perintah mount:

    ``` 
    bash
    Salin
    Edit
    mount /dev/sda4 /users
    Ini akan memasang sistem berkas dari /dev/sda4 ke direktori /users.
    ```   

* Unmounting Untuk melepaskan sistem berkas, gunakan perintah umount:
    ``` 
    bash
    Salin
    Edit
    umount /users
    ``` 

* Jika sistem berkas sedang digunakan, gunakan:
    ``` 
    umount -l (lazy unmount): Melepas sistem berkas dari hierarki nama tetapi tetap menjaga akses hingga semua proses berhenti menggunakannya.
    umount -f (force unmount): Memaksa pelepasan meskipun sedang digunakan.
    ``` 

* Untuk mengecek proses yang masih menggunakan sistem berkas, gunakan:
    ``` 
    bash
    Salin
    Edit
    lsof /home/abdou
    ``` 

    atau
    ``` 
    bash
    Salin
    Edit
    fuser -m /home/abdou    
    ```  

## 3. Struktur Pohon Berkas
UNIX/Linux menggunakan struktur hierarkis dengan beberapa direktori utama:

* Direktori	Fungsi
    
    * / (root)	Direktori utama yang menjadi akar semua direktori lain.
    * /boot	Berisi kernel dan berkas yang diperlukan untuk booting.
    * /etc	Berisi berkas konfigurasi sistem.
    * /bin dan /sbin	Berisi perintah dasar dan utilitas administratif.
    * /dev	Berisi berkas perangkat (device files).
    * /usr	Menyimpan aplikasi pengguna dan pustaka (library).
    * /var	Menyimpan log sistem, spool, dan data yang sering berubah.
    * /tmp	Direktori sementara untuk penyimpanan data sementara.
    
## 4. Jenis Berkas dalam UNIX/Linux
Sistem berkas UNIX/Linux mengenali 7 jenis berkas utama:

1. Regular Files – Berkas teks, data, dan biner.
2. Directories – Menyimpan daftar nama berkas dan subdirektori.
3. Character Device Files – Berkas perangkat yang menangani I/O berbasis karakter.
4. Block Device Files – Berkas perangkat untuk penyimpanan berbasis blok.
5. Local Domain Sockets – Komunikasi antarproses dalam satu sistem.
6. Named Pipes (FIFO) – Saluran komunikasi antarproses dalam sistem yang sama.
7. Symbolic Links – Referensi ke berkas lain yang bisa berada di sistem berkas berbeda.    

Untuk mengecek jenis berkas, gunakan perintah:
``` 
bash
Salin
Edit
file /bin/bash
``` 
atau
``` 
bash
Salin
Edit
ls -ld /home/user
``` 

## 5. Izin dan Atribut Berkas
UNIX/Linux menggunakan 9 bit izin yang terbagi menjadi tiga bagian untuk pemilik (u), grup (g), dan lainnya (o).

    | Bit | Pemilik (u)   | Grup (g) | Lainnya (o)   |
    |----------|----------|----------|----------|
    | r  | Baca | Baca | Baca | 
    | w   | Tulis   | Tulis   | Tulis   | 
    | x  | Eksekusi  | Eksekusi  | Eksekusi  | 


* Bit Khusus
1. etuid (4000) → Program berjalan dengan hak akses pemiliknya.
2. Setgid (2000) → Berkas/direktori mewarisi grup dari direktori tempatnya dibuat.
3. Sticky Bit (1000) → Mencegah pengguna lain menghapus berkas yang bukan miliknya (berguna di /tmp).

* Mengubah Izin Berkas
    ```
    bash
    Salin
    Edit
    chmod u+w file.txt       # Menambah izin tulis untuk pemilik
    chmod 755 file.txt       # Mengatur izin dalam format oktal
    Mengubah Kepemilikan Berkas
    bash
    Salin
    Edit
    chown user:group file.txt  # Mengubah pemilik dan grup berkas
    chgrp users file.txt       # Mengubah grup berkas
    Mengatur Izin Default (umask)
    bash
    Salin
    Edit
    umask 022  # Mengatur izin default untuk berkas baru
    ```

## 6. Access Control Lists (ACLs)
ACL memungkinkan pengaturan izin lebih fleksibel dibandingkan model izin UNIX klasik.

* Melihat ACL Berkas
    ````
    bash
    Salin
    Edit
    getfacl /etc/passwd
    Menambahkan Izin ACL
    bash
    Salin
    Edit
    setfacl -m u:abdou:rw /etc/passwd
    ```
* Format ACL POSIX:

Format	Contoh	Keterangan
1. user::perms	user:rw-	Izin pemilik berkas
2. user:username:perms	user:abdou:rw-	Izin untuk pengguna tertentu
3. group::perms	group:r-x	Izin grup pemilik
4. mask::perms	mask::rwx	Izin maksimal yang diberikan
5. other::perms	other::r--	Izin untuk pengguna lain  
ACL dapat diterapkan pada sistem berkas modern seperti ext4 dan XFS, memungkinkan pengaturan izin lebih fleksibel.