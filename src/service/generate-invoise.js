// invoiceService.js
import PDFDocument from"pdfkit";
import fs from "fs";


function generateInvoice(user, orderDetails) {
  const doc = new PDFDocument();
  const filePath = `C:/Users/Ahmed/Desktop/Gym-system semi final/src/invoices/${user.membershipID}_invoice.pdf`;

  // Define the path to save the PDF
  doc.pipe(fs.createWriteStream(filePath));

  // Add invoice details to the PDF 
  doc.fontSize(22).text("Payment Invoice", { align: "center" });
  doc.text(`Date: ${new Date().toLocaleDateString()}`, { align: "right" });

  doc.text("---------------------------------------------------------");

  doc.text(`User: ${user.name}`);
  doc.text(`Email: ${user.email}`);
  doc.text(`Plan: ${user.plan}`);
  doc.text(`Amount Paid: $${user.price/10}`);
  doc.text(`Order ID: ${orderDetails.id}`);
  doc.text(`Membership ID: ${user.membershipID}`);

  doc.text("---------------------------------------------------------");

  // Optional: Add more order details
//   orderDetails.items.forEach((item, index) => {
//     doc.text(`${index + 1}. ${item.name} - $${item.price}`);
//   });

  doc.end();
  return filePath; // Return path to PDF
}

export default generateInvoice;

// const user = {
//     email:"ahmedalaa151002@gmail.com",
//     membershipID:1234,
//     price:1000,
//     plan:"basic",
//     name:"ahmed"


// }
// const filePath = generateInvoice(user, "order123", 100);

// console.log(filePath);
