import { jsPDF } from 'jspdf';

// Helper function to draw a horizontal line
const drawLine = (doc, y) => {
  const pageWidth = doc.internal.pageSize.width;
  const margin = 14;
  const contentWidth = pageWidth - 2 * margin;

  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.5);
  doc.line(margin, y, margin + contentWidth, y); // Draw line
};

export const generatePDF = (data) => {
  const doc = new jsPDF();

  // Set up styles
  const titleFontSize = 18;
  const sectionFontSize = 14;
  const contentFontSize = 12;
  const margin = 14;
  const pageWidth = doc.internal.pageSize.width;
  const contentWidth = pageWidth - 2 * margin;

  // Add Title
  doc.setFontSize(titleFontSize);
  doc.setTextColor(0, 0, 0);
  doc.text('Portfolio Data', margin, 22);

  // Draw a border around the title
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.5);
  doc.rect(margin - 2, 12, contentWidth + 4, 18); // Border around title

  // Draw a line after the title
  drawLine(doc, 30);

  // Add Qualification Details
  doc.setFontSize(sectionFontSize);
  doc.text('Qualification Details:', margin, 40);
  doc.setFontSize(contentFontSize);
  doc.text(`Degree: ${data.degree || 'N/A'}`, margin, 50);
  doc.text(`Institution: ${data.institution || 'N/A'}`, margin, 60);

  // Draw a border around Qualification Details
  doc.setDrawColor(0, 0, 0);
  doc.rect(margin - 2, 30, contentWidth + 4, 40); // Border around Qualification Details

  // Draw a line after Qualification Details
  drawLine(doc, 70);

  // Add Contact Details
  doc.setFontSize(sectionFontSize);
  doc.text('Contact Details:', margin, 80);
  doc.setFontSize(contentFontSize);
  doc.text(`Email: ${data.email || 'N/A'}`, margin, 90);
  doc.text(`Phone: ${data.phone || 'N/A'}`, margin, 98);
  doc.text(`Name: ${data.name || 'N/A'}`, margin, 105);

  // Draw a border around Contact Details
  doc.setDrawColor(0, 0, 0);
  doc.rect(margin - 2, 70, contentWidth + 4, 40); // Border around Contact Details

  // Draw a line after Contact Details
  drawLine(doc, 110);

  // Add Projects Details
  doc.setFontSize(sectionFontSize);
  doc.text('Projects Details:', margin, 120);
  doc.setFontSize(contentFontSize);

  console.log('Projects:', data.projects); // Debugging line

  if (data.projects && data.projects.length > 0) {
    let yOffset = 130;
    data.projects.forEach((project, index) => {
      doc.text(`Project ${index + 1}:`, margin, yOffset);
      doc.text(`Title: ${project.title || 'N/A'}`, margin, yOffset + 10);
      doc.text(`Description: ${project.description || 'N/A'}`, margin, yOffset + 20);
      yOffset += 30; // Adjust based on content
    });
  } else {
    doc.text('No projects available.', margin, 130);
  }

  // Draw a border around Projects Details
  doc.setDrawColor(0, 0, 0);
  doc.rect(margin - 2, 110, contentWidth + 4, 60); // Adjust height as needed

  // Draw a line after Projects Details
  drawLine(doc, 170);

  // Add Experience Details
  doc.setFontSize(sectionFontSize);
  doc.text('Experience Details:', margin, 190); // Adjust y position based on previous content
  doc.setFontSize(contentFontSize);
  doc.text(`Company: ${data.company || 'N/A'}`, margin, 200);
  doc.text(`Role: ${data.role || 'N/A'}`, margin, 210);
  doc.text(`Duration: ${data.duration || 'N/A'}`, margin, 220);

  // Draw a border around Experience Details
  doc.setDrawColor(0, 0, 0);
  doc.rect(margin - 2, 190, contentWidth + 4, 40); // Adjust height as needed

  // Draw a line after Experience Details
  drawLine(doc, 230);

  // Return the PDF as a data URL
  return doc.output('datauristring');
};
