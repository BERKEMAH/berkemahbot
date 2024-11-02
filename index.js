// Required Modules
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const path = require('path');

// Creating new client instance
const client = new Client({
    authStrategy: new LocalAuth(),
});

client.on('ready', () => {
    console.log('Bot is now online!');
    setTimeout(() => {
        sendFirstMessage(0);
    }, 2000); // Jeda 2 detik sebelum mulai mengirim pesan pertama
});

// List of numbers
const nomorTujuan1 = [
    '6282249563834@c.us', '6282126665837@c.us', '62881023806530@c.us', '6282115226476@c.us'
];

// Path to the image file
const imagePath = path.join(__dirname, 'brosurdigital.png'); // Update sesuai nama file Anda
const media = MessageMedia.fromFilePath(imagePath);

// Function to send the first message with an image
const sendFirstMessage = (index) => {
    if (index >= nomorTujuan1.length) {
        console.log('All first messages have been sent.');
        setTimeout(() => sendSecondMessage(0), 5000); // Mulai mengirim pesan kedua setelah 5 detik
        return;
    }

    const nomor = nomorTujuan1[index];
    const pesanPertama = `Selamat siang! Perkenalkan nama saya Iyas dari Berkemah. Kami mengadakan event Berkemah X Kursus Salon Bandung, event salon terbesar di Bandung dengan tema "Mahir Rambut".\n\nKlik tautan berikut untuk menghubungi kami: https://wa.me/6282338187917`;

    console.log(`Sending first message to ${nomor}`);

    client.sendMessage(nomor, media, { caption: pesanPertama })
        .then(response => {
            console.log(`First message with image successfully sent to ${nomor}:`, response);
        })
        .catch(err => {
            console.error(`Failed to send first message with image to ${nomor}:`, err.message);
        });

    setTimeout(() => sendFirstMessage(index + 1), 3000); // Delay 3 detik antar pesan pertama
};

// Function to send the second message without buttons
const sendSecondMessage = (index) => {
    if (index >= nomorTujuan1.length) {
        console.log('All second messages have been sent.');
        return;
    }

    const nomor = nomorTujuan1[index];
    const pesanKedua = `Hallo, Berkemah akan mengadakan Bootcamp Salon nih 😉\n\nJika kamu ingin bertanya lebih lanjut, berikut beberapa pertanyaan yang bisa kamu tanyakan:\n\n1. Syarat dan ketentuan peserta bootcamp\n2. Contact Person\n3. Informasi seputar bootcamp\n\nSilakan ketik salah satu dari kata kunci di atas atau angka 1, 2, atau 3 untuk mendapatkan informasi lebih lanjut.\n\nHave a nice day ❤`;

    console.log(`Sending second message to ${nomor}`);

    client.sendMessage(nomor, pesanKedua)
        .then(response => {
            console.log(`Second message successfully sent to ${nomor}:`, response);
        })
        .catch(err => {
            console.error(`Failed to send second message to ${nomor}:`, err.message);
        });

    setTimeout(() => sendSecondMessage(index + 1), 3000); // Delay 3 detik antar pesan kedua
};

// Event handler for incoming messages and automatic replies based on keywords
client.on('message', message => {
    console.log(`Received message: ${message.body}`);

    // Convert message text to lowercase to handle case-insensitive matching
    const lowerCaseMessage = message.body.toLowerCase();

    // Define possible responses based on keywords and numeric options
    if (lowerCaseMessage.includes("syarat") || lowerCaseMessage.includes("ketentuan") || lowerCaseMessage === "1") {
        message.reply("Syarat dan ketentuan peserta bootcamp adalah peserta harus berusia minimal 18 tahun dan memiliki minat di bidang kecantikan dan salon.");
    } else if (lowerCaseMessage.includes("kontak") || lowerCaseMessage.includes("contact") || lowerCaseMessage === "2") {
        message.reply("Silakan hubungi kami di nomor WA: https://wa.me/6282338187917 untuk informasi lebih lanjut.");
    } else if (lowerCaseMessage.includes("informasi") || lowerCaseMessage.includes("bootcamp") || lowerCaseMessage === "3") {
        message.reply("Bootcamp salon adalah program pelatihan intensif yang dirancang untuk meningkatkan keterampilan di bidang salon dan kecantikan.\n\nBootcamp ini juga akan dihadirkan mentor dan speaker terpilih, yang tentunya sudah berpengalaman di bidangnya.\n\nTentunya, kegiatan akan dilaksanakan pada:\n\n- Hari pertama: 07 Desember 2024 (07.00 - 15.00 WIB)\n- Hari Kedua: 08 Desember 2024 (08.00 - 15.00 WIB)\n- Hari Ketiga: 09 Desember 2024 (10.00 - 15.00 WIB)\n\nDaftar sekarang, dan sampai jumpa di bootcamp 🙌🏻🙌🏻");
    } else {
        message.reply('Maaf, saya tidak mengerti. Apa ada yang bisa saya bantu?');
    }
});

// Displaying QR code for authentication
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

// Initializing the client
client.initialize();
