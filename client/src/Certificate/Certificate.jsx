import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./Certificate.css";

const Certificate = () => {
  const certificateRef = useRef();

  // Example dynamic data (replace with real user data)
  const userName = "John Doe";
  const courseName = "React Basics";
  const date = new Date().toLocaleDateString();

  const downloadPDF = async () => {
    const element = certificateRef.current;

    const canvas = await html2canvas(element, {
      scale: 2,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("landscape", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = pdf.internal.pageSize.getHeight();

    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save("certificate.pdf");
  };

  return (
    <div className="certificate-page">
      
      <div className="certificate" ref={certificateRef}>
        <h1>🎓 Certificate of Completion</h1>

        <p>This is to certify that</p>

        <h2 className="name">{userName}</h2>

        <p>has successfully completed the course</p>

        <h3 className="course">{courseName}</h3>

        <p>on {date}</p>

        <div className="signature-section">
          <div>
            <p>____________________</p>
            <p>Instructor</p>
          </div>

          <div>
            <p>____________________</p>
            <p>Director</p>
          </div>
        </div>
      </div>

      <button className="download-btn" onClick={downloadPDF}>
        📥 Download Certificate
      </button>

    </div>
  );
};

export default Certificate;