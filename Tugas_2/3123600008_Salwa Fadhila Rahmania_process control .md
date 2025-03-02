# Ringkasan Chapter 4: Process Control  

## Kontrol Proses
Komponen dari Proses
Sebuah proses terdiri dari ruang alamat dan sekumpulan struktur data dalam kernel. Ruang alamat adalah sekumpulan halaman memori yang telah ditandai oleh kernel untuk digunakan oleh proses. (Halaman adalah unit di mana memori dikelola, biasanya berukuran 4KiB atau 8KiB.) Halaman-halaman ini digunakan untuk menyimpan kode, data, dan tumpukan proses. Struktur data dalam kernel melacak status proses, prioritas, parameter penjadwalan, dan informasi lainnya.

Pemikiran tentang Proses
Pikirkan proses sebagai wadah untuk sekumpulan sumber daya yang dikelola oleh kernel atas nama program yang sedang berjalan. Sumber daya ini termasuk halaman memori yang menyimpan kode dan data program, deskriptor file yang merujuk ke file yang terbuka, dan berbagai atribut yang menggambarkan status proses.

Struktur Data Internal Kernel
Struktur data internal kernel mencatat berbagai informasi tentang setiap proses:

Peta ruang alamat proses
Status saat ini dari proses (berjalan, tidur, dan sebagainya)
Prioritas proses
Informasi tentang sumber daya yang telah digunakan oleh proses (CPU, memori, dan sebagainya)
Informasi tentang file dan port jaringan yang telah dibuka oleh proses
Mask sinyal proses (set sinyal yang saat ini diblokir)
Pemilik proses (ID pengguna dari pengguna yang memulai proses)
Thread dalam Proses
Sebuah "thread" adalah konteks eksekusi dalam sebuah proses. Sebuah proses dapat memiliki beberapa thread, yang semuanya berbagi ruang alamat dan sumber daya yang sama. Thread digunakan untuk mencapai paralelisme dalam sebuah proses dan dikenal sebagai proses ringan karena lebih murah untuk dibuat dan dihancurkan dibandingkan proses.

Contoh: Server Web
Sebagai contoh untuk memahami konsep proses dan thread, pertimbangkan sebuah server web. Server web mendengarkan koneksi yang masuk dan kemudian membuat thread baru untuk menangani setiap permintaan yang masuk. Setiap thread menangani satu permintaan pada satu waktu, tetapi server web secara keseluruhan dapat menangani banyak permintaan secara bersamaan karena memiliki banyak thread.

### 1.  PID: Nomor ID Proses
Setiap proses diidentifikasi dengan nomor ID proses yang unik, atau PID. PID adalah bilangan bulat yang ditetapkan oleh kernel untuk setiap proses saat proses tersebut dibuat. PID digunakan untuk merujuk ke proses dalam berbagai panggilan sistem, misalnya, untuk mengirim sinyal ke proses.

### 2. PPID: Nomor ID Proses Induk
Setiap proses juga terkait dengan proses induk, yaitu proses yang membuatnya. Nomor ID proses induk, atau PPID, adalah PID dari proses induk. PPID digunakan untuk merujuk ke proses induk dalam berbagai panggilan sistem.

### 3. UID dan EUID: ID Pengguna dan ID Pengguna Efektif
ID pengguna, atau UID, adalah ID pengguna dari pengguna yang memulai proses. ID pengguna efektif, atau EUID, adalah ID pengguna yang digunakan proses untuk menentukan sumber daya apa yang dapat diakses oleh proses.

## Siklus Hidup Proses
Untuk membuat proses baru, sebuah proses menyalin dirinya sendiri dengan panggilan sistem fork. Fork membuat salinan dari proses asli, dan salinan itu sebagian besar identik dengan induknya. Proses baru memiliki PID yang berbeda dan memiliki informasi akuntansi sendiri.

### 1. Sinyal
Sinyal adalah cara untuk mengirim notifikasi ke sebuah proses. Mereka digunakan untuk memberi tahu proses bahwa suatu peristiwa tertentu telah terjadi. Ada sekitar tiga puluh jenis sinyal yang berbeda yang didefinisikan dan digunakan dengan berbagai cara.

### 2. Perintah kill: Mengirim Sinyal
Perintah kill paling sering digunakan untuk menghentikan sebuah proses. Kill dapat mengirim sinyal apa pun, tetapi secara default mengirim TERM. Kill dapat digunakan oleh pengguna biasa pada proses mereka sendiri atau oleh root pada proses mana pun.

## Monitoring Proses
Perintah ps adalah alat utama administrator sistem untuk memantau proses. Ps dapat menunjukkan PID, UID, prioritas, dan terminal kontrol dari proses. Anda dapat memperoleh gambaran berguna tentang sistem dengan menjalankan ps aux.

### Proses Berkala
Daemon cron adalah alat tradisional untuk menjalankan perintah pada jadwal yang telah ditentukan. Ini mulai berjalan saat sistem boot dan berjalan selama sistem aktif.