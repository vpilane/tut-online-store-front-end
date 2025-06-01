import React from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Pie chart data: Queries Logged vs Queries Resolved
const queriesPieData = {
  labels: ["Queries Logged", "Queries Resolved"],
  datasets: [
    {
      label: "Queries",
      data: [120, 95], // Replace with real data
      backgroundColor: ["#FF6384", "#36A2EB"],
      borderWidth: 1,
    },
  ],
};

const queriesPieOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
      labels: { color: "#fff" } // White legend text
    },
    title: {
      display: true,
      text: "Queries Logged vs Resolved",
      color: "#fff" // White title
    },
  },
};

// Mock sales data per month
const salesData = {
  labels: [
    "January", "February", "March", "April", "May", "June"
  ],
  datasets: [
    {
      label: "Sales",
      data: [120, 150, 180, 160, 140, 170], // Replace with real data
      backgroundColor: "rgba(54, 162, 235, 0.6)",
    },
  ],
};

const monthlyOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
      labels: { color: "#fff" }
    },
    title: {
      display: true,
      text: "Monthly Sales Report",
      color: "#fff"
    },
  },
  scales: {
    x: {
      ticks: { color: "#fff" },
      grid: { color: "rgba(255,255,255,0.2)" }
    },
    y: {
      ticks: { color: "#fff" },
      grid: { color: "rgba(255,255,255,0.2)" }
    }
  }
};

// Mock daily sales data for one month (e.g., May)
const dailySalesData = {
  labels: Array.from({ length: 31 }, (_, i) => `May ${i + 1}`),
  datasets: [
    {
      label: "Daily Sales",
      data: [
        10, 12, 8, 15, 20, 18, 22, 19, 17, 21, 23, 25, 20, 18, 16, 14, 13, 15, 17, 19, 21, 23, 22, 20, 18, 16, 14, 12, 10, 8, 9
      ], // Replace with real data
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      borderColor: "rgba(255, 99, 132, 1)",
      fill: false,
      tension: 0.4,
    },
  ],
};

const dailyOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
      labels: { color: "#fff" }
    },
    title: {
      display: true,
      text: "Daily Sales Report (May)",
      color: "#fff"
    },
  },
  scales: {
    x: {
      ticks: { color: "#fff" },
      grid: { color: "rgba(255,255,255,0.2)" }
    },
    y: {
      ticks: { color: "#fff" },
      grid: { color: "rgba(255,255,255,0.2)" }
    }
  }
};

const Reports: React.FC = () => {
  const handleDownloadPDF = async () => {
    const input = document.getElementById("report-content");
    if (!input) return;
    const canvas = await html2canvas(input, { backgroundColor: "#222" });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [canvas.width, canvas.height]
    });
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save("reports.pdf");
  };

  return (
    <div className="container mt-5" style={{ color: "#fff" }}>
      {/* Hidden button for Navbar to trigger */}
      <button
        id="download-pdf-btn"
        style={{ display: "none" }}
        onClick={handleDownloadPDF}
        type="button"
        aria-label="Download PDF"
        title="Download PDF"
      />
      <div id="report-content">
        <h2 className="mb-4" style={{ color: "#fff" }}>Queries Logged vs Resolved</h2>
        <div style={{ maxWidth: 400, margin: "0 auto", width: "100%" }}>
          <Pie data={queriesPieData} options={queriesPieOptions} />
        </div>
        <h2 className="mb-4 mt-5" style={{ color: "#fff" }}>Sales Per Month</h2>
        <div style={{ width: "100%", minWidth: 0 }}>
          <Bar data={salesData} options={{ ...monthlyOptions, maintainAspectRatio: false }} />
        </div>
        <h2 className="mb-4 mt-5" style={{ color: "#fff" }}>Sales Per Day (May)</h2>
        <div style={{ width: "100%", minWidth: 0 }}>
          <div style={{ height: 300 }}>
            <Line data={dailySalesData} options={{ ...dailyOptions, maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;