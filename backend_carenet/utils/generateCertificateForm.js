const generateCertificateHTML = async (studentData, eventData, organizationData, certifcateLink, fullAdress) => {
   // Tạo mã QR nếu có link
   const qrCodeBase64 = certifcateLink ? await generateQRCode(certifcateLink) : '';
   const qrCodeSection = certifcateLink ? `
       <div class="qr-section">
           <img src="data:image/png;base64,${qrCodeBase64}" class="qr-code" alt="QR Code" />
           <div class="qr-text">Quét mã QR để xem chứng chỉ</div>
       </div>
   ` : '';

   return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CareNet Volunteer Certificate</title>
    <!-- Import professional fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --color-secondary: #1a4731;
            --color-white: #ffffff;
            --color-gray-light: #f5f5f5;
            --color-gray: #666666;
            --color-gray-dark: #333333;
        }
        
        body {
            font-family: 'Montserrat', sans-serif;
            margin: 0;
            padding: 0;
            background-color: var(--color-gray-light);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        
        .certificate {
            width: 900px;
            height: 650px;
            margin: 20px auto;
            background-color: var(--color-white);
            position: relative;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        
        /* Enhanced Sidebar Styling */
        .sidebar {
            position: absolute;
            left: 0;
            top: 0;
            width: 180px;
            height: 100%;
            background-color: var(--color-secondary);
            color: var(--color-white);
        }
        
        .logo-container {
            width: 100%;
            display: flex;
            justify-content: center;
            margin-top: 30px;
            margin-bottom: 20px;
        }
        
        .carenet-seal {
            width: 100px;
            height: 100px;
            background-color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: var(--color-secondary);
            font-size: 16px;
            position: relative;
            font-family: 'Playfair Display', serif;
        }
        
        .carenet-seal::before,
        .carenet-seal::after {
            content: "";
            position: absolute;
            border-radius: 50%;
        }
        
        .carenet-seal::before {
            width: 90%;
            height: 90%;
            border: 1px dashed rgba(26, 71, 49, 0.5);
        }
        
        .carenet-seal::after {
            width: 70%;
            height: 70%;
            border: 1px solid rgba(26, 71, 49, 0.7);
        }
        
        .hours-count {
            background-color: rgba(0, 0, 0, 0.2);
            width: 100%;
            text-align: center;
            padding: 12px 0;
            font-size: 16px;
            font-weight: 600;
            letter-spacing: 0.5px;
        }
        
        .activity-list {
            font-size: 13px;
            padding: 20px 15px;
        }
        
        .activity-item {
            margin-bottom: 12px;
            line-height: 1.5;
        }
        
        .sidebar-angle {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 60px;
            height: 120px;
            background-color: var(--color-white);
            clip-path: polygon(0 0, 100% 100%, 0 100%);
            transform: rotate(180deg);
        }
        
        /* Main Content Styling */
        .main-content {
            margin-left: 180px;
            padding: 30px 40px;
            height: 100%;
            box-sizing: border-box;
            position: relative;
        }
        
        .logos {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 40px;
        }
        
        .carenet-logo {
            width: 80px;
            height: 80px;
            background-color: var(--color-secondary);
            color: var(--color-white);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 18px;
            font-family: 'Playfair Display', serif;
        }
        
        .date {
            font-size: 14px;
            color: var(--color-gray);
            margin-bottom: 15px;
            font-weight: 500;
        }
        
        .recipient {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 15px;
            color: var(--color-gray-dark);
            font-family: 'Playfair Display', serif;
        }
        
        .completion-text {
            font-size: 12px;
            color: var(--color-gray);
            margin-bottom: 25px;
            line-height: 1.6;
            max-height: 80px;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        
        .certificate-title {
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 15px;
            color: var(--color-secondary);
            font-family: 'Playfair Display', serif;
            line-height: 1.2;
        }
        
        .certificate-description {
            font-size: 12px;
            color: var(--color-gray);
            margin-bottom: 40px;
            max-width: 600px;
            line-height: 1.6;
            max-height: 120px;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        
        .signature {
            text-align: right;
            margin-top: 30px;
            position: absolute;
            right: 40px;
            bottom: 100px;
        }
        
        .signature-name {
            font-weight: 700;
            font-size: 16px;
            color: var(--color-gray-dark);
            font-family: 'Playfair Display', serif;
        }
        
        .signature-title {
            font-size: 13px;
            color: var(--color-gray);
            margin-top: 3px;
        }
        
        .verification {
            position: absolute;
            bottom: 30px;
            left: 40px;
            font-size: 11px;
            color: var(--color-gray);
        }
        
        .verification a {
            color: var(--color-secondary);
            text-decoration: none;
            font-weight: 500;
        }
        
        .qr-section {
            position: absolute;
            bottom: 150px;
            right: 35px;
            text-align: center;
            background: transparent;
            padding: 10px;
            border-radius: 8px;
        }
        
        .qr-code {
            width: 100px;
            height: 100px;
            margin-bottom: 5px;
            background-color: #f0f0f0;
        }
        
        .qr-text {
            font-size: 10px;
            color: var(--color-gray);
            max-width: 120px;
            word-wrap: break-word;
        }

        @media print {
            body {
                background-color: white;
                margin: 0;
                padding: 0;
            }
            .certificate {
                box-shadow: none;
                margin: 0;
                width: 100%;
                height: 100vh;
            }
        }
    </style>
</head>
<body>
    <div class="certificate">
        <div class="sidebar">
            <div class="logo-container">
                <div class="carenet-seal">CareNet</div>
            </div>
            <div class="hours-count">
                ${eventData.totalHours || 0} Hours
            </div>
            <div class="activity-list">
                ${eventData.skillNeeds ? eventData.skillNeeds.map(skill => 
                    `<div class="activity-item">${skill}</div>`
                ).join('') : ''}
            </div>
            ${qrCodeSection}
            <div class="sidebar-angle"></div>
        </div>
        <div class="main-content">
            <div class="logos">
                <div class="carenet-logo">CareNet</div>
            </div>
            <div class="date">
                ${new Date().toLocaleDateString('vi-VN')}
            </div>
            <div class="recipient">
                ${studentData.fullname}
            </div>
            <div class="completion-text">
                Chúng tôi xin gửi lời cảm ơn chân thành đến ${studentData.fullname} vì sự tham gia và cống hiến không ngừng nghỉ trong vai trò tình nguyện viên tại sự kiện. Sự nhiệt tình, tinh thần trách nhiệm và những đóng góp quý báu của bạn đã góp phần quan trọng vào sự thành công của chương trình, mang lại những giá trị tích cực cho cộng đồng.
            </div>
            <div class="certificate-title">
                ${eventData.title}
            </div>
            <div class="certificate-description">
                Sự kiện này là một hành trình ý nghĩa, nơi các tình nguyện viên đã cùng nhau lan tỏa tinh thần trách nhiệm xã hội và sự đoàn kết vì cộng đồng. ${eventData.description || 'Đã thể hiện sự tận tâm và đóng góp tích cực cho cộng đồng thông qua các hoạt động tình nguyện.'}. Đã thể hiện sự tận tâm và đóng góp tích cực cho cộng đồng thông qua các hoạt động tình nguyện. Với sự nhiệt huyết và tận tâm, các bạn đã góp phần tạo nên những giá trị tích cực, truyền cảm hứng và mang lại sự thay đổi bền vững cho xã hội. 
            </div>
            
            <div class="signature">
                <div class="signature-name">${organizationData.name}</div>
                <div class="signature-title">${organizationData.name}</div>
                <div class="signature-title">${fullAdress || ''}</div>
            </div>
            
            ${certifcateLink ? `
            <div class="verification">
                Link chứng chỉ tại:<br>
                <a href="${certifcateLink}">${certifcateLink}</a>
            </div>
            ` : ''}
        </div>
    </div>
</body>
</html>`;
};

// Hàm tạo mã QR (cần cài đặt thư viện qrcode)
const generateQRCode = async (text) => {
   if (!text) return '';
   
   const QRCode = require('qrcode');
   
   try {
       return await QRCode.toDataURL(text, {
           errorCorrectionLevel: 'H',
           margin: 1,
           width: 100,
           color: {
               dark: '#1a4731',
               light: '#ffffff'
           }
       }).then(url => url.split(',')[1]);
   } catch (err) {
       console.error('Error generating QR code:', err);
       return '';
   }
};

module.exports = { generateCertificateHTML };