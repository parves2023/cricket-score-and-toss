declare module 'html2pdf.js' {
  interface Html2PdfOptions {
    margin?: number;
    filename?: string;
    image?: { type: string; quality: number };
    html2canvas?: { scale: number };
    jsPDF?: { orientation: string };
  }

  function html2pdf(
    element: HTMLElement, // Specify HTMLElement instead of 'any'
    opt?: Html2PdfOptions
  ): Promise<void>;

  export default html2pdf;
}
