import nodemailer from "nodemailer";
import dotenv from "dotenv";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url"; 


dotenv.config();

// Define __dirname manually for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const sendOrderReceipt = async (req, res) => {
  const {
    customerEmail,
    customerName,
    orderId,
    orderDate,
    items,
    totalAmount,
  } = req.body.orderDetails;

  const pdfPath = `receipt_${orderId}.pdf`;

  try {
    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const writeStream = fs.createWriteStream(pdfPath);
    doc.pipe(writeStream);

    // Add Logo (Optional)
    const logoPath = path.join(__dirname, "logo.png"); // ✅ Now __dirname works!
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, 50, 30, { width: 100 });
    }

    // Header
    doc
      .font("Helvetica-Bold")
      .fontSize(24)
      .fillColor("#0056b3")
      .text("Thank You for Your Purchase!", 50, 80);

    doc.moveDown(1);

    // Order Info
    doc
      .font("Helvetica")
      .fontSize(14)
      .fillColor("black")
      .text(`Order ID: ${orderId}`)
      .text(`Date: ${new Date(orderDate).toLocaleDateString()}`)
      .text(`Customer: ${customerName}`)
      .moveDown();

    // Line separator
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();

    // Order Summary Table
    doc
      .moveDown()
      .font("Helvetica-Bold")
      .text("Order Summary:", { underline: true });

    items.forEach((item) => {
  doc.moveDown(0.5);

  // Product name & quantity
  doc
    .font("Helvetica-Bold")
    .fontSize(14)
    .text(`${item.name} (x${item.quantity})`);

  // Product price
  doc
    .font("Helvetica")
    .fontSize(12)
    .text(`Price: Rs${item.price}`)
    .text(`Subtotal: Rs${(item.price * item.quantity).toFixed(2)}`);


  doc.moveDown();
});
    doc
      .font("Helvetica-Bold")
      .text(`Total: Rs ${totalAmount}`, { align: "right" });

    doc.moveDown();
    doc
      .font("Helvetica")
      .text("We hope to see you again soon!", { align: "center" });

    // Finalize PDF
    doc.end();

    writeStream.on("finish", async () => {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: `"UNIK 👟" <${process.env.EMAIL_USER}>`,
        to: customerEmail,
        subject: `🧾 Receipt for Order #${orderId}`,
        html: `
      <h2>Thank you for your purchase, ${customerName}!</h2>
      <p>Order ID: <strong>${orderId}</strong></p>
      <p>Date: ${new Date(orderDate).toLocaleString()}</p>
      <h3>Total: ₹${totalAmount}</h3>
      <p>We hope to see you again soon!</p>
  `,
        text: `Hello ${customerName},\n\nThank you for your purchase! Your order receipt is attached.\n\nBest Regards,\nSneakerVerse Team`,
        attachments: [{ filename: `receipt_${orderId}.pdf`, path: pdfPath }],
      };
      try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully!");
        fs.unlinkSync(pdfPath); // Delete PDF after sending
        res.status(200).json({ message: "Receipt sent successfully!" });
      } catch (emailErr) {
        console.error("Error sending email:", emailErr);
        res.status(500).json({ message: "Failed to send receipt email." });
      }
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ message: "Failed to generate receipt PDF." });
  }
};
