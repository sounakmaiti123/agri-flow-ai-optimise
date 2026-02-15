import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { FileText, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ExportDialogProps {
  open: boolean;
  onClose: () => void;
  data: any[];
  title: string;
}

const ExportDialog = ({ open, onClose, data, title }: ExportDialogProps) => {
  const [exportFormat, setExportFormat] = useState("csv");
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      if (exportFormat === "csv") {
        if (!data.length) return;
        const headers = Object.keys(data[0]).join(",");
        const rows = data.map(item => Object.values(item).map(value => typeof value === "string" && value.includes(",") ? `"${value}"` : value).join(",")).join("\n");
        const blob = new Blob([`${headers}\n${rows}`], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url; link.download = `${title.toLowerCase().replace(/\s+/g, "_")}.csv`;
        document.body.appendChild(link); link.click(); document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } else {
        const blob = new Blob([`${title}\n\n${JSON.stringify(data, null, 2)}`], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url; link.download = `${title.toLowerCase().replace(/\s+/g, "_")}.pdf`;
        document.body.appendChild(link); link.click(); document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
      setIsExporting(false);
      onClose();
      toast({ title: "Export Successful", description: `${title} has been exported as ${exportFormat.toUpperCase()}` });
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-primary" /><span>Export {title}</span>
          </DialogTitle>
          <DialogDescription>Choose the format to export your data</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Export Format</Label>
            <Select value={exportFormat} onValueChange={setExportFormat}>
              <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="csv">CSV (Comma Separated Values)</SelectItem>
                <SelectItem value="pdf">PDF (Portable Document Format)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="text-sm text-muted-foreground">
            <p>Records to export: <strong className="text-foreground">{data.length}</strong></p>
            <p>Format: <strong className="text-foreground">{exportFormat.toUpperCase()}</strong></p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose} className="flex-1 rounded-xl">Cancel</Button>
            <Button onClick={handleExport} disabled={isExporting} className="flex-1 rounded-xl bg-primary hover:bg-primary/90">
              {isExporting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  <span>Exporting...</span>
                </div>
              ) : (
                <><Download className="w-4 h-4 mr-2" />Export</>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExportDialog;
