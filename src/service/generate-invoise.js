// import PDFDocument from "pdfkit";
// import cloudinaryConnection from "../utils/cloudinary.connection.js";
// import generateUniqueString from "../utils/generate-unique-str.js";

// const folderid = generateUniqueString(4);

// async function generateInvoice(user, orderDetails, membershipID) {
//   return new Promise((resolve, reject) => {
//     const doc = new PDFDocument();
//     const buffers = [];

//     // Collect PDF content in a buffer
//     doc.on("data", (chunk) => buffers.push(chunk));
//     doc.on("end", () => {
//       const pdfBuffer = Buffer.concat(buffers);

//       // Set up Cloudinary upload stream with a writable stream
//       const uploadStream = cloudinaryConnection().uploader.upload_stream(
//         {
//           resource_type: "raw", // For non-image files like PDFs
//           folder: `${process.env.MAIN_FOLDER}/invoices/${folderid}`,
//           public_id: `${membershipID}_invoice`
//         },
//         (error, result) => {
//           if (error) {
//             reject(error); // Reject the promise on error
//           } else {
//             resolve(result.secure_url); // Resolve with the Cloudinary URL
//           }
//         }
//       );

//       // Write buffer to Cloudinary's upload stream and end it
//       uploadStream.end(pdfBuffer);
//     });

//     // Generate the content of the PDF
//     doc.fontSize(22).text("Payment Invoice", { align: "center" });
//     doc.text(`Date: ${new Date().toLocaleDateString()}`, { align: "right" });

//     doc.text("---------------------------------------------------------");

//     doc.text(`User: ${user.name}`);
//     doc.text(`Email: ${user.email}`);
//     doc.text(`Plan: ${user.plan}`);
//     doc.text(`Amount Paid: $${user.price / 10}`);
//     doc.text(`Order ID: ${orderDetails.id}`);
//     doc.text(`Membership ID: ${membershipID}`);

//     doc.text("---------------------------------------------------------");
//     doc.end();
//   });
// }

// export default generateInvoice;




import PDFDocument from "pdfkit";
import cloudinaryConnection from "../utils/cloudinary.connection.js";
import generateUniqueString from "../utils/generate-unique-str.js";

async function generateInvoice(user, orderDetails, membershipID) {
  // Generate a unique folder ID for organization
  const folderId = generateUniqueString(4);
  
  // Return a promise that resolves with the uploaded URL
  return new Promise((resolve, reject) => {
    try {
      // Initialize the PDF document and buffer array
      const doc = new PDFDocument();
      const buffers = [];

      // Collect PDF chunks into buffers array
      doc.on("data", (chunk) => buffers.push(chunk));
      doc.on("end", async () => {
        // Concatenate all chunks into a single Buffer
        const pdfBuffer = Buffer.concat(buffers);

        // Use Cloudinary's upload_stream with a promise wrapper
        cloudinaryConnection().uploader.upload_stream(
          {
            resource_type: "raw", // Required for non-image files like PDFs
            folder: `${process.env.MAIN_FOLDER}/invoices/${folderId}`, 
            public_id: `${membershipID}_invoice`
          },
          (error, result) => {
            if (error) {
              reject(new Error(`Cloudinary upload error: ${error.message}`));
            } else {
              resolve(result.secure_url); // Resolve with the Cloudinary URL
            }
          }
        ).end(pdfBuffer); // Finalize the stream with the buffer
      });

      // Generate PDF content
      doc.fontSize(22).text("Payment Invoice", { align: "center" });
      doc.text(`Date: ${new Date().toLocaleDateString()}`, { align: "right" });
      doc.text("---------------------------------------------------------");
      doc.text(`User: ${user.name}`);
      doc.text(`Email: ${user.email}`);
      doc.text(`Plan: ${user.plan}`);
      doc.text(`Amount Paid: $${user.price / 10}`);
      doc.text(`Order ID: ${orderDetails.id}`);
      doc.text(`Membership ID: ${membershipID}`);
      doc.text("---------------------------------------------------------");
      doc.end(); // Finalize the PDF document
    } catch (error) {
      reject(new Error(`Invoice generation error: ${error.message}`));
    }
  });
}

export default generateInvoice;
