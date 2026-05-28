interface WorkflowStepperProps {
  currentStep: 'upload' | 'review' | 'memo' | 'elaas';
}

export function WorkflowStepper({ currentStep }: WorkflowStepperProps) {
  const steps = [
    { id: 'upload', label: 'Intake' },
    { id: 'review', label: 'Verification' },
    { id: 'memo', label: 'Memo Draft' },
    { id: 'elaas', label: 'e-LAAS' },
  ];

  const currentIndex = steps.findIndex(s => s.id === currentStep);

  return (
    <div className="w-full py-4 mb-6">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-0.5 bg-slate-200 -z-10"></div>
        <div 
          className="absolute left-0 top-1/2 transform -translate-y-1/2 h-0.5 bg-blue-600 -z-10 transition-all duration-500"
          style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
        ></div>
        
        {steps.map((step, idx) => {
          const isCompleted = idx < currentIndex;
          const isCurrent = idx === currentIndex;

          let ringColor = 'ring-slate-200';
          let bgColor = 'bg-white';
          let textColor = 'text-slate-400';
          let dotColor = 'bg-slate-300';

          if (isCompleted) {
            ringColor = 'ring-blue-600';
            bgColor = 'bg-blue-600';
            textColor = 'text-blue-700';
            dotColor = 'bg-white';
          } else if (isCurrent) {
            ringColor = 'ring-blue-600 ring-offset-2';
            bgColor = 'bg-blue-600';
            textColor = 'text-blue-700 font-bold';
            dotColor = 'bg-white';
          }

          return (
            <div key={step.id} className="flex flex-col items-center gap-2 bg-slate-50 px-2 relative z-0">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center ring-2 ${ringColor} ${bgColor}`}>
                {isCompleted ? (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <div className={`w-2 h-2 rounded-full ${dotColor}`}></div>
                )}
              </div>
              <span className={`text-xs whitespace-nowrap ${textColor}`}>{step.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
