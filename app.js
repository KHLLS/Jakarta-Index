const rl = require('readline-sync');
const Database = require('./src/Database');
const ProductModel = require('./src/ProductModel');
const mongodb = require('mongodb');

async function main() {
    const db = new Database();
    const pm = new ProductModel();
    await db.connect();
    
    while (true) {

        console.log('MongoDB Demo Application using CLI\n');
        console.log('1. Tampilkan semua produk\n2. Tambah produk\n3. Update\n4. Hapus Data\n5. Keluar');
        const pilih = await rl.question('Pilih menu: ');
        

        if (pilih === '1') {
            console.log('\n----Daftar Produk----');
            const data = await pm.findAll();
            data.forEach((element, index) => console.log(`${index + 1}. ${element.name} - ${element.price}`));
            console.log('---------------------\n');
        }
        else if (pilih === '2') {
            const name = await rl.question('Nama produk: ');
            const price = await Number(rl.question('Harga produk: '));
            await pm.insertOne(name, price);
            console.log('Produk ditambahkan!\n');
        }
        else if (pilih === '3') {
            const data = await pm.findAll();
            console.log(data);
            const id = await rl.question('Masukan id Yg ingin di update: ');
            const name = await rl.question('Masukan nama baru: ');
            const price = await Number(rl.question('Masukan price baru: '));
            // console.log(typeof(id))
            const obj_id = new mongodb.ObjectId(id);

            await pm.update(obj_id,name,price);
            console.log(id,'Sudah di Update');
        }
        else if (pilih === '4') {
            const data = await pm.findAll();
            console.log(data);

            const id = await rl.question('Masukan ID Yang Ingin Dihapus: ');
            const obj_id = new mongodb.ObjectId(id);
            await pm.delete(obj_id);
            console.log(id,'Sudah Dihapus');
        }
        else if (pilih === '5') {
            await db.close();
            break;
        }
        rl.question('Enter Untuk Kembali');

    }
}
main().catch(console.error);