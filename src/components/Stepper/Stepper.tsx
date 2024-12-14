"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface Step {
  name: string;
}

interface StepperProps {
  steps: Step[];
  activeStep: number;
  onPrevious: () => void;
  onNext: () => void;
  isLastStep?: boolean;
}

const Stepper = ({
  steps,
  activeStep,
  onPrevious,
  onNext,
  isLastStep,
}: StepperProps) => {
  return (
    <div className="w-full">
      {/* Stepper */}
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-[18px] left-[5%] right-[5%] h-[2px] bg-gray-200" />
        <div
          className="absolute top-[18px] left-[5%] h-[2px] bg-first transition-all duration-300"
          style={{
            width: `${(activeStep / (steps.length - 1)) * 90}%`,
          }}
        />

        {steps.map((step, idx) => (
          <div key={idx} className="relative flex flex-col items-center z-10">
            {/* Step Circle */}
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                activeStep === idx
                  ? "bg-first"
                  : activeStep > idx
                  ? "bg-first"
                  : "bg-white border-2 border-gray-200"
              }`}
            >
              {activeStep > idx ? (
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <div
                  className={`w-2.5 h-2.5 rounded-full ${
                    activeStep === idx ? "bg-white" : "bg-gray-200"
                  }`}
                />
              )}
            </div>

            {/* Step Label */}
            <span
              className={`mt-1.5 text-xs font-medium ${
                activeStep >= idx ? "text-first" : "text-gray-400"
              }`}
            >
              {step.name}
            </span>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      {/* <div className="flex justify-end mt-6 gap-2">
        <button
          onClick={onPrevious}
          disabled={activeStep === 0}
          className={`p-2 rounded-full transition-colors ${
            activeStep === 0
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={onNext}
          className="p-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div> */}
    </div>
  );
};

export default Stepper;
