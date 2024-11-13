// // invoiceService.js
 import PDFDocument from"pdfkit";
 import cloudinaryConnection from "../utils/cloudinary.connection.js";
 import generateUniqueString from "../utils/generate-unique-str.js";


// function generateInvoice(user, orderDetails) {
//   const doc = new PDFDocument();
//   const filePath = resolve(__dirname, `../invoices/${user.membershipID}.pdf`);

//   // Define the path to save the PDF
//   doc.pipe(fs.createWriteStream(filePath));

//   // Add invoice details to the PDF 

//   // Optional: Add more order details
// //   orderDetails.items.forEach((item, index) => {
// //     doc.text(`${index + 1}. ${item.name} - $${item.price}`);
// //   });

//   doc.end();
//   return filePath; // Return path to PDF
// }

// export default generateInvoice;

// // const user = {
// //     email:"ahmedalaa151002@gmail.com",
// //     membershipID:1234,
// //     price:1000,
// //     plan:"basic",
// //     name:"ahmed"


// // }
// // const filePath = generateInvoice(user, "order123", 100);

// // console.log(filePath);
//   doc.fontSize(22).text("Payment Invoice", { align: "center" });
//   doc.text(`Date: ${new Date().toLocaleDateString()}`, { align: "right" });

//   doc.text("---------------------------------------------------------");

//   doc.text(`User: ${user.name}`);
//   doc.text(`Email: ${user.email}`);
//   doc.text(`Plan: ${user.plan}`);
//   doc.text(`Amount Paid: $${user.price/10}`);
//   doc.text(`Order ID: ${orderDetails.id}`);
//   doc.text(`Membership ID: ${user.membershipID}`);

//   doc.text("---------------------------------------------------------");





const folderid=generateUniqueString(4)

async function generateInvoice(user, orderDetails ,membershipID) {
  const doc = new PDFDocument();
  const buffers = [];

  // Collect the PDF content in a buffer
  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', async () => {
    const pdfBuffer = Buffer.concat(buffers);
    // Upload to Cloudinary
    const result = await cloudinaryConnection().uploader.upload_stream({
      resource_type: "raw", // Use "raw" for non-image files like PDFs
      folder: `${process.env.MAIN_FOLDER}/invoices/${folderid}`, 
    }, (error, result) => {
      if (error) throw error;
      return result;
    });

    return result.secure_url; // Returns the URL for the uploaded PDF
  });

  // Generate the content of the PDF
  doc.fontSize(22).text("Payment Invoice", { align: "center" });
  doc.text(`Date: ${new Date().toLocaleDateString()}`, { align: "right" });

  doc.text("---------------------------------------------------------");

  doc.text(`User: ${user.name}`);
  doc.text(`Email: ${user.email}`);
  doc.text(`Plan: ${user.plan}`);
  doc.text(`Amount Paid: $${user.price/10}`);
  doc.text(`Order ID: ${orderDetails.id}`);
  doc.text(`Membership ID: ${membershipID}`);

  doc.text("---------------------------------------------------------");
  doc.end();
}
export default generateInvoice


