"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Clock, XCircle, Download } from "lucide-react";
import { getOrderByOrderNumber, OrderDetails } from "@/services/order";
import jsPDF from "jspdf";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Get order number from query params
        const orderNumber = searchParams.get("orderNumber");
        
        if (!orderNumber) {
          // Redirect to home if no order number
          router.push("/");
          return;
        }

        // Fetch order details from API
        const response = await getOrderByOrderNumber(orderNumber);
        
        if (response.status && response.data?.data) {
          setOrderDetails(response.data.data);
        } else {
          setError(response.message || "Failed to fetch order details");
        }
      } catch (err: any) {
        console.error("Error fetching order details:", err);
        setError(err?.message || "Failed to load order details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [searchParams, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-700 font-medium">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-red-500 to-pink-600 p-8 text-white text-center">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Error</h1>
            <p className="text-xl opacity-90">{error}</p>
          </div>
          <div className="p-8">
            <Link
              href="/"
              className="block w-full bg-gradient-to-r from-red-500 to-pink-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-red-600 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl text-center"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-lg text-gray-700 font-medium">No order details found.</p>
          <Link
            href="/"
            className="mt-4 inline-block bg-blue-500 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-600 transition-all"
          >
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  const paymentStatus = orderDetails.status === "completed" ? "Completed" : orderDetails.status;
  const paymentMethod = orderDetails.paymentMethod === "payu" ? "PayU" : orderDetails.paymentMethod?.toUpperCase() || "N/A";
  const customerName = `${orderDetails.firstName} ${orderDetails.lastName}`.trim();
  const payuResponse = orderDetails.paymentDetails?.payuResponse;
  
  // Determine currency based on payment method or country
  const currency = orderDetails.paymentMethod === "payu" || orderDetails.country?.toLowerCase() === "india" ? "INR" : "USD";

  const generatePDF = () => {
    if (!orderDetails) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let yPosition = 20;

    // Helper function to add text with word wrap
    const addText = (text: string, x: number, y: number, maxWidth: number, fontSize: number = 10, isBold: boolean = false, align: "left" | "center" | "right" = "left") => {
      doc.setFontSize(fontSize);
      doc.setFont("helvetica", isBold ? "bold" : "normal");
      const lines = doc.splitTextToSize(text, maxWidth);
      doc.text(lines, x, y, { align });
      return lines.length * (fontSize * 0.4);
    };

    // Company Header
    doc.setFillColor(34, 139, 251); // #2b8ffb
    doc.rect(0, 0, pageWidth, 50, "F");
    doc.setTextColor(255, 255, 255);
    
    // Company Name
    addText("ACHROMIC POINT CONSULTING PRIVATE LIMITED", pageWidth / 2, 15, pageWidth - 2 * margin, 14, true, "center");
    
    // Company Address
    addText("F-11, First Floor, Kalkaji, New Delhi-110019, India", pageWidth / 2, 23, pageWidth - 2 * margin, 10, false, "center");
    
    // Contact Info
    addText("Phone: +91 11 4601 1835 | Email: contactus@achromicpoint.com", pageWidth / 2, 30, pageWidth - 2 * margin, 9, false, "center");
    
    // Payment Successful Title
    addText("PAYMENT SUCCESSFUL", pageWidth / 2, 40, pageWidth - 2 * margin, 16, true, "center");
    
    doc.setTextColor(0, 0, 0);
    yPosition = 60;

    // Order Information Section
    doc.setFillColor(240, 240, 240);
    doc.rect(margin, yPosition - 5, pageWidth - 2 * margin, 8, "F");
    addText("ORDER INFORMATION", margin, yPosition, pageWidth - 2 * margin, 14, true);
    yPosition += 10;

    addText(`Order Number: ${orderDetails.orderNumber}`, margin, yPosition, pageWidth - 2 * margin);
    yPosition += 7;
    addText(`Order ID: ${orderDetails._id}`, margin, yPosition, pageWidth - 2 * margin, 9);
    yPosition += 7;
    addText(`Order Date: ${new Date(orderDetails.createdAt).toLocaleString()}`, margin, yPosition, pageWidth - 2 * margin);
    yPosition += 7;
    addText(`Last Updated: ${new Date(orderDetails.updatedAt).toLocaleString()}`, margin, yPosition, pageWidth - 2 * margin);
    yPosition += 7;
    addText(`Payment Method: ${paymentMethod}`, margin, yPosition, pageWidth - 2 * margin);
    yPosition += 7;
    addText(`Order Status: ${paymentStatus}`, margin, yPosition, pageWidth - 2 * margin);
    yPosition += 15;

    // Payment Details Section
    doc.setFillColor(240, 240, 240);
    doc.rect(margin, yPosition - 5, pageWidth - 2 * margin, 8, "F");
    addText("PAYMENT DETAILS", margin, yPosition, pageWidth - 2 * margin, 14, true);
    yPosition += 10;

    addText(`Total Amount: ${orderDetails.currency} ${orderDetails.totalAmount?.toFixed(2)}`, margin, yPosition, pageWidth - 2 * margin, 12, true);
    yPosition += 8;
    if (payuResponse?.net_amount_debit) {
      addText(`Net Amount: ${orderDetails.currency} ${payuResponse.net_amount_debit}`, margin, yPosition, pageWidth - 2 * margin);
      yPosition += 7;
    }
    if (orderDetails.paymentTransactionId) {
      addText(`Transaction ID: ${orderDetails.paymentTransactionId}`, margin, yPosition, pageWidth - 2 * margin, 9);
      yPosition += 7;
    }
    if (payuResponse?.mihpayid) {
      addText(`PayU Payment ID: ${payuResponse.mihpayid}`, margin, yPosition, pageWidth - 2 * margin, 9);
      yPosition += 7;
    }
    if (payuResponse?.bank_ref_num) {
      addText(`Bank Reference: ${payuResponse.bank_ref_num}`, margin, yPosition, pageWidth - 2 * margin, 9);
      yPosition += 7;
    }
    if (orderDetails.paymentDetails?.verified !== undefined) {
      addText(`Payment Verified: ${orderDetails.paymentDetails.verified ? "Yes" : "No"}`, margin, yPosition, pageWidth - 2 * margin);
      yPosition += 7;
    }
    if (orderDetails.paymentDetails?.verifiedAt) {
      addText(`Verified At: ${new Date(orderDetails.paymentDetails.verifiedAt).toLocaleString()}`, margin, yPosition, pageWidth - 2 * margin, 9);
      yPosition += 7;
    }
    yPosition += 8;

    // Check if we need a new page
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }

    // Customer Information Section
    doc.setFillColor(240, 240, 240);
    doc.rect(margin, yPosition - 5, pageWidth - 2 * margin, 8, "F");
    addText("CUSTOMER INFORMATION", margin, yPosition, pageWidth - 2 * margin, 14, true);
    yPosition += 10;

    addText(`Full Name: ${customerName}`, margin, yPosition, pageWidth - 2 * margin);
    yPosition += 7;
    addText(`Email: ${orderDetails.email}`, margin, yPosition, pageWidth - 2 * margin);
    yPosition += 7;
    if (orderDetails.phoneNumber) {
      addText(`Phone: ${orderDetails.phoneNumber}`, margin, yPosition, pageWidth - 2 * margin);
      yPosition += 7;
    }
    if (orderDetails.company) {
      addText(`Company: ${orderDetails.company}`, margin, yPosition, pageWidth - 2 * margin);
      yPosition += 7;
    }
    if (orderDetails.designation) {
      addText(`Designation: ${orderDetails.designation}`, margin, yPosition, pageWidth - 2 * margin);
      yPosition += 7;
    }
    yPosition += 8;

    // Check if we need a new page
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }

    // Billing Address Section
    if (orderDetails.streetAddress || orderDetails.city || orderDetails.state) {
      doc.setFillColor(240, 240, 240);
      doc.rect(margin, yPosition - 5, pageWidth - 2 * margin, 8, "F");
      addText("BILLING ADDRESS", margin, yPosition, pageWidth - 2 * margin, 14, true);
      yPosition += 10;

      addText(customerName, margin, yPosition, pageWidth - 2 * margin);
      yPosition += 7;
      if (orderDetails.company) {
        addText(orderDetails.company, margin, yPosition, pageWidth - 2 * margin);
        yPosition += 7;
      }
      if (orderDetails.designation) {
        addText(orderDetails.designation, margin, yPosition, pageWidth - 2 * margin);
        yPosition += 7;
      }
      if (orderDetails.streetAddress) {
        addText(orderDetails.streetAddress, margin, yPosition, pageWidth - 2 * margin);
        yPosition += 7;
      }
      const addressLine = [
        orderDetails.city,
        orderDetails.state,
        orderDetails.zipCode,
      ]
        .filter(Boolean)
        .join(", ");
      if (addressLine) {
        addText(addressLine, margin, yPosition, pageWidth - 2 * margin);
        yPosition += 7;
      }
      if (orderDetails.country) {
        addText(orderDetails.country, margin, yPosition, pageWidth - 2 * margin);
        yPosition += 7;
      }
      yPosition += 8;
    }

    // Check if we need a new page
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }

    // Payment Gateway Response Section
    if (payuResponse) {
      doc.setFillColor(240, 240, 240);
      doc.rect(margin, yPosition - 5, pageWidth - 2 * margin, 8, "F");
      addText("PAYMENT GATEWAY RESPONSE", margin, yPosition, pageWidth - 2 * margin, 14, true);
      yPosition += 10;

      if (payuResponse.status) {
        addText(`Status: ${payuResponse.status.toUpperCase()}`, margin, yPosition, pageWidth - 2 * margin);
        yPosition += 7;
      }
      if (payuResponse.unmappedstatus) {
        addText(`Payment Status: ${payuResponse.unmappedstatus}`, margin, yPosition, pageWidth - 2 * margin);
        yPosition += 7;
      }
      if (payuResponse.error && payuResponse.error !== "E000") {
        addText(`Error Code: ${payuResponse.error}`, margin, yPosition, pageWidth - 2 * margin);
        yPosition += 7;
      }
      if (payuResponse.error_Message) {
        addText(`Message: ${payuResponse.error_Message}`, margin, yPosition, pageWidth - 2 * margin);
        yPosition += 7;
      }
      if (payuResponse.addedon) {
        addText(`Payment Date: ${payuResponse.addedon}`, margin, yPosition, pageWidth - 2 * margin);
        yPosition += 7;
      }
      if (payuResponse.mode) {
        addText(`Payment Mode: ${payuResponse.mode}`, margin, yPosition, pageWidth - 2 * margin);
        yPosition += 7;
      }
      if (payuResponse.bankcode) {
        addText(`Bank Code: ${payuResponse.bankcode}`, margin, yPosition, pageWidth - 2 * margin);
        yPosition += 7;
      }
      if (payuResponse.PG_TYPE) {
        addText(`PG Type: ${payuResponse.PG_TYPE}`, margin, yPosition, pageWidth - 2 * margin);
        yPosition += 7;
      }
      if (payuResponse.field9) {
        addText(`Payment Message: ${payuResponse.field9}`, margin, yPosition, pageWidth - 2 * margin);
        yPosition += 7;
      }
      if (payuResponse.field6) {
        addText(`Transaction Status: ${payuResponse.field6}`, margin, yPosition, pageWidth - 2 * margin);
        yPosition += 7;
      }
      if (payuResponse.field7) {
        addText(`Verification: ${payuResponse.field7}`, margin, yPosition, pageWidth - 2 * margin);
        yPosition += 7;
      }
    }

    // Footer
    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(128, 128, 128);
      doc.text(
        `Page ${i} of ${totalPages}`,
        pageWidth / 2,
        doc.internal.pageSize.getHeight() - 10,
        { align: "center" }
      );
      doc.text(
        `Generated on ${new Date().toLocaleString()}`,
        pageWidth - margin,
        doc.internal.pageSize.getHeight() - 10,
        { align: "right" }
      );
    }

    // Save the PDF
    doc.save(`Order-${orderDetails.orderNumber}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4 py-8 text-black">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-white text-center">
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
          <p className="text-xl opacity-90">Your transaction has been completed successfully</p>
        </div>

        <div className="p-8">
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <h2 className="text-lg font-semibold text-green-800">Transaction Confirmed</h2>
            </div>
            <p className="text-green-700">
              Thank you for your payment. Your order has been confirmed and is being processed.
            </p>
          </div>

          {/* Order Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-black">
            <div className="bg-gray-50 rounded-xl p-5">
              <h3 className="font-semibold text-gray-700 mb-4 text-lg">Order Information</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-start">
                  <span className="text-gray-500">Order Number:</span>
                  <span className="font-medium text-right break-all">#{orderDetails.orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Order ID:</span>
                  <span className="font-medium text-xs break-all">{orderDetails._id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Order Date:</span>
                  <span className="font-medium">
                    {new Date(orderDetails.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Last Updated:</span>
                  <span className="font-medium">
                    {new Date(orderDetails.updatedAt).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Payment Method:</span>
                  <span className="font-medium">{paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Order Status:</span>
                  <span className="font-medium text-green-600 capitalize">{paymentStatus}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-5">
              <h3 className="font-semibold text-gray-700 mb-4 text-lg">Payment Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Amount:</span>
                  <span className="font-bold text-lg text-green-600">
                    {(orderDetails.currency)} {orderDetails.totalAmount?.toFixed(2)}
                  </span>
                </div>
                {payuResponse?.net_amount_debit && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Net Amount:</span>
                    <span className="font-medium">{payuResponse.currency} {payuResponse.net_amount_debit}</span>
                  </div>
                )}
                {orderDetails.paymentTransactionId && (
                  <div className="flex justify-between items-start">
                    <span className="text-gray-500">Transaction ID:</span>
                    <span className="font-medium text-xs break-all text-right">{orderDetails.paymentTransactionId}</span>
                  </div>
                )}
                {payuResponse?.mihpayid && (
                  <div className="flex justify-between items-start">
                    <span className="text-gray-500">PayU Payment ID:</span>
                    <span className="font-medium text-xs break-all text-right">{payuResponse.mihpayid}</span>
                  </div>
                )}
                {payuResponse?.bank_ref_num && (
                  <div className="flex justify-between items-start">
                    <span className="text-gray-500">Bank Reference:</span>
                    <span className="font-medium text-xs break-all text-right">{payuResponse.bank_ref_num}</span>
                  </div>
                )}
                {orderDetails.paymentDetails?.verified !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Payment Verified:</span>
                    <span className={`font-medium ${orderDetails.paymentDetails.verified ? 'text-green-600' : 'text-red-600'}`}>
                      {orderDetails.paymentDetails.verified ? 'Yes' : 'No'}
                    </span>
                  </div>
                )}
                {orderDetails.paymentDetails?.verifiedAt && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Verified At:</span>
                    <span className="font-medium text-xs">
                      {new Date(orderDetails.paymentDetails.verifiedAt).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="bg-gray-50 rounded-xl p-5 mb-8">
            <h3 className="font-semibold text-gray-700 mb-4 text-lg">Customer Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Full Name:</span>
                <span className="font-medium">{customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Email:</span>
                <span className="font-medium break-all text-right">{orderDetails.email}</span>
              </div>
              {orderDetails.phoneNumber && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Phone:</span>
                  <span className="font-medium">{orderDetails.phoneNumber}</span>
                </div>
              )}
              {orderDetails.company && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Company:</span>
                  <span className="font-medium">{orderDetails.company}</span>
                </div>
              )}
              {orderDetails.designation && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Designation:</span>
                  <span className="font-medium">{orderDetails.designation}</span>
                </div>
              )}
            </div>
          </div>

          {/* Billing Address */}
          {(orderDetails.streetAddress || orderDetails.city || orderDetails.state) && (
            <div className="bg-gray-50 rounded-xl p-5 mb-8">
              <h3 className="font-semibold text-gray-700 mb-4 text-lg">Billing Address</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p className="font-medium text-gray-800">{customerName}</p>
                {orderDetails.company && <p>{orderDetails.company}</p>}
                {orderDetails.designation && <p>{orderDetails.designation}</p>}
                {orderDetails.streetAddress && <p>{orderDetails.streetAddress}</p>}
                <p>
                  {orderDetails.city && `${orderDetails.city}, `}
                  {orderDetails.state && `${orderDetails.state} `}
                  {orderDetails.zipCode && orderDetails.zipCode}
                </p>
                {orderDetails.country && <p>{orderDetails.country}</p>}
              </div>
            </div>
          )}

          {/* Payment Gateway Response Details */}
          {payuResponse && (
            <div className="bg-gray-50 rounded-xl p-5 mb-8">
              <h3 className="font-semibold text-gray-700 mb-4 text-lg">Payment Gateway Response</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                {payuResponse.status && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status:</span>
                    <span className={`font-medium capitalize ${payuResponse.status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                      {payuResponse.status}
                    </span>
                  </div>
                )}
                {payuResponse.unmappedstatus && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Payment Status:</span>
                    <span className="font-medium capitalize">{payuResponse.unmappedstatus}</span>
                  </div>
                )}
                {payuResponse.error && payuResponse.error !== "E000" && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Error Code:</span>
                    <span className="font-medium text-red-600">{payuResponse.error}</span>
                  </div>
                )}
                {payuResponse.error_Message && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Message:</span>
                    <span className="font-medium">{payuResponse.error_Message}</span>
                  </div>
                )}
                {payuResponse.addedon && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Payment Date:</span>
                    <span className="font-medium">{payuResponse.addedon}</span>
                  </div>
                )}
                {payuResponse.mode && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Payment Mode:</span>
                    <span className="font-medium">{payuResponse.mode}</span>
                  </div>
                )}
                {payuResponse.bankcode && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Bank Code:</span>
                    <span className="font-medium">{payuResponse.bankcode}</span>
                  </div>
                )}
                {payuResponse.PG_TYPE && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">PG Type:</span>
                    <span className="font-medium">{payuResponse.PG_TYPE}</span>
                  </div>
                )}
                {payuResponse.field9 && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Payment Message:</span>
                    <span className="font-medium">{payuResponse.field9}</span>
                  </div>
                )}
                {payuResponse.field6 && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Transaction Status:</span>
                    <span className="font-medium">{payuResponse.field6}</span>
                  </div>
                )}
                {payuResponse.field7 && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Verification:</span>
                    <span className="font-medium">{payuResponse.field7}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/"
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl text-center"
            >
              Continue Shopping
            </Link>
            <button
              onClick={generatePDF}
              className="flex-1 bg-white border-2 border-gray-300 text-gray-700 py-4 px-6 rounded-xl font-semibold hover:bg-gray-50 transition-all text-center flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}