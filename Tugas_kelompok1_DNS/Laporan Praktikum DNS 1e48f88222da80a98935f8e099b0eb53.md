# Laporan Praktikum DNS

![Logo_PENS.png](Logo_PENS.png)

Mata Kuliah : Workshop Administrasi Jaringan

Dosen Pengampu :  Dr Ferry Astika Saputra ST, [M.Sc](http://m.sc/)

Kelompok 1 

Anggota :

1. Zalfail Mumtaza Attamami  (3123600003)
2. Salwa Fadhila Rahmania (3123600008)
3. Nayla Herfiana Putri (3123600015)

---

## Setting DNS kelompok 1

### Langkah-langkah :

1. Instalasi BIND menggunakan perintah `sudo apt -y install bind9 bind9utils`.
    
    ![WhatsApp Image 2025-04-29 at 13.00.21.jpeg](WhatsApp_Image_2025-04-29_at_13.00.21.jpeg)
    

1. Konfigurasi BIND untuk network internal dalam named.conf menggunakan perintah `sudo nano /etc/bind/named.conf` untuk menambahkan `include "/etc/bind/named.conf.internal-zones";`.
    
    ![WhatsApp Image 2025-04-29 at 13.00.20.jpeg](WhatsApp_Image_2025-04-29_at_13.00.20.jpeg)
    

1. Konfigurasi BIND untuk network internal dalam named.conf.options menggunakan perintah `sudo nano /etc/bind/named.conf.options` untuk menambahkan internal network dan forwarders :
    
    ![WhatsApp Image 2025-04-29 at 13.00.21 (1).jpeg](WhatsApp_Image_2025-04-29_at_13.00.21_(1).jpeg)
    

1. Konfigurasi BIND untuk network internal dalam named.conf.internal-zones menggunakan perintah `sudo nano /etc/bind//etc/bind/named.conf.internal-zones` untuk menambahkan :
    
    ![WhatsApp Image 2025-04-29 at 13.00.19.jpeg](WhatsApp_Image_2025-04-29_at_13.00.19.jpeg)
    

1. Konfigurasi BIND untuk network internal dalam /default/named menggunakan perintah `sudo nano /etc/default/named` untuk menambahkan “-4” : 
    
    ![WhatsApp Image 2025-04-29 at 13.00.20 (1).jpeg](WhatsApp_Image_2025-04-29_at_13.00.20_(1).jpeg)
    

1. Melakukan check dari konfigurasi yang sudah dilakukan dengan cara `named-checkconf` , apabila konfigurasi sudah benar maka check tidak menunjukkan hasil yang salah :
    
    ![WhatsApp Image 2025-04-29 at 13.00.19 (2).jpeg](WhatsApp_Image_2025-04-29_at_13.00.19_(2).jpeg)
    

1. Membuat file zona yang digunakan server untuk menyelesaikan alamat IP dari nama domain, menggunakan perintah `sudo nano /var/cache/bind/kelompok1.home` 
    
    ![WhatsApp Image 2025-04-29 at 13.00.19 (1).jpeg](WhatsApp_Image_2025-04-29_at_13.00.19_(1).jpeg)
    

1. Restart BIND untuk menyimpan perubahan menggunakan `sudo systemctl restart named.` :
    
    ![WhatsApp Image 2025-04-29 at 13.00.20 (2).jpeg](WhatsApp_Image_2025-04-29_at_13.00.20_(2).jpeg)
    

1. Merubah pengaturan DNS untuk merujuk ke DNS sendiri pada `sudo nano /etc/resolv.conf` 

1. Melakukan `dig kelompok1.home`  maka hasilny ANSWER 1 yang artinya Sukses dijalankan :
    
    ![WhatsApp Image 2025-04-29 at 13.00.20 (3).jpeg](WhatsApp_Image_2025-04-29_at_13.00.20_(3).jpeg)
    

---

## Melakukan Testing antar kelompok

### Langkah - langkah :

1. Install Apache 2 untuk membuat dashboard
    
    ![WhatsApp Image 2025-04-29 at 13.28.38.jpeg](WhatsApp_Image_2025-04-29_at_13.28.38.jpeg)
    

1. Membuat dashboard html untuk tampilan 192.168.1.10
    
    ![WhatsApp Image 2025-04-29 at 13.29.48.jpeg](WhatsApp_Image_2025-04-29_at_13.29.48.jpeg)
    

1. hasil dari konfigurasi html 
    
    ![image.png](image.png)
    

1. Ganti `/etc/resolv.conf` untuk bisa mengakses domain dengan nama `kelompok1.home.`
    
    ![image.png](image%201.png)
    

1. Melakukan restart network dengan `systemctl restart networking` lalu restart web dengan `systemctl restart apache2`
    
    ![image.png](image%202.png)
    

1. Melakukan Testing network dengan kelompok lain menggunakan `dig kelompokX.home`
    
    ![image.png](image%203.png)
    

1. Hasil domain name berubah menjadi kelompok1.home
    
    ![image.png](image%204.png)
    

1. Hasil memanggil domain kelompok lain, contoh kelompok3.home
    
    ![image.png](image%205.png)