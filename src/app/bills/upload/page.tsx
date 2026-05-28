import { PageHeader } from '../../../components/PageHeader';
import { WorkflowStepper } from '../../../components/WorkflowStepper';
import { BillUpload } from '../../../components/BillUpload';

export default function Page() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <PageHeader 
        title="Intake: Upload Utility Bill" 
        description="Provide a scanned PDF or image of the utility bill."
      />
      
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-6">
        <WorkflowStepper currentStep="upload" />
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-sm text-blue-800">
          <p className="font-semibold mb-1">Extraction Policy</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Please ensure page 1 is clearly visible.</li>
            <li>The system will attempt direct text extraction first.</li>
            <li>Optical Character Recognition (OCR) will be used as a fallback if necessary.</li>
          </ul>
        </div>
        
        <BillUpload />
      </div>
    </div>
  );
}
