import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import phonePeQR from "@/assets/phonepe-qr.jpeg";

const PaymentGateway = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  const orderDetails = {
    orderId: "ORD-2024-001",
    customer: "Rajesh Kumar",
    product: "Wheat",
    quantity: "500 kg",
    amount: "₹15,000",
    date: new Date().toLocaleDateString("en-IN"),
  };

  const handleCopyUPI = () => {
    navigator.clipboard.writeText("sounak.maiti@paytm");
    toast({
      title: "UPI ID Copied",
      description: "The UPI ID has been copied to your clipboard",
    });
  };

  const handleConfirmPayment = () => {
    setPaymentConfirmed(true);
    toast({
      title: "Payment Confirmed",
      description: "Your payment has been recorded successfully",
    });
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Payment Gateway</span>
              {paymentConfirmed && (
                <Badge className="bg-green-500">
                  <CheckCircle2 className="mr-1 h-3 w-3" />
                  Confirmed
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Order Details</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Order ID:</span>
                  <p className="font-medium">{orderDetails.orderId}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Customer:</span>
                  <p className="font-medium">{orderDetails.customer}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Product:</span>
                  <p className="font-medium">{orderDetails.product}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Quantity:</span>
                  <p className="font-medium">{orderDetails.quantity}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Date:</span>
                  <p className="font-medium">{orderDetails.date}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Amount:</span>
                  <p className="font-semibold text-lg text-primary">
                    {orderDetails.amount}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="text-center space-y-4">
                <h3 className="font-semibold text-lg">Scan & Pay with PhonePe</h3>
                <div className="flex justify-center">
                  <img
                    src={phonePeQR}
                    alt="PhonePe QR Code"
                    className="max-w-full h-auto rounded-lg"
                  />
                </div>
                
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">
                    Or pay using UPI ID:
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <code className="bg-background px-3 py-1 rounded">
                      sounak.maiti@paytm
                    </code>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleCopyUPI}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button
                className="w-full"
                size="lg"
                onClick={handleConfirmPayment}
                disabled={paymentConfirmed}
              >
                {paymentConfirmed ? (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Payment Confirmed
                  </>
                ) : (
                  "Confirm Payment"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentGateway;
