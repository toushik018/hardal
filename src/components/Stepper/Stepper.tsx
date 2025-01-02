"use client";

import React from "react";
import { Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Step {
  name: string;
  count?: number;
}

interface StepperProps {
  steps: Step[];
  activeStep: number;
  onPrevious: () => void;
  onNext: () => void;
  isLastStep?: boolean;
  getCurrentCategoryCount: () => number;
  onStepClick: (index: number) => void;
}

const Stepper: React.FC<StepperProps> = ({
  steps,
  activeStep,
  onPrevious,
  onNext,
  isLastStep,
  getCurrentCategoryCount = () => 0,
  onStepClick,
}) => {
  const canNavigateToStep = (targetStep: number) => {
    if (targetStep < activeStep) return true;
    if (targetStep > activeStep + 1) return false;
    if (steps[activeStep]?.name === "Extras") return true;

    try {
      const currentStepCount = steps[activeStep]?.count || 0;
      const currentCount = getCurrentCategoryCount();
      return currentCount >= currentStepCount;
    } catch (error) {
      console.error("Error checking category count:", error);
      return false;
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between relative">
        <div className="absolute top-[18px] left-[5%] right-[5%] h-[2px] bg-gray-200" />
        <motion.div
          className="absolute top-[18px] left-[5%] h-[2px] bg-first"
          initial={{ width: "0%" }}
          animate={{ width: `${(activeStep / (steps.length - 1)) * 90}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />

        {steps.map((step, idx) => {
          const isClickable = canNavigateToStep(idx);
          const isActive = activeStep === idx;
          const isCompleted = activeStep > idx;

          return (
            <motion.div
              key={idx}
              className={`relative flex flex-col items-center z-10 ${
                isClickable ? "cursor-pointer" : "cursor-not-allowed"
              }`}
              onClick={() => isClickable && onStepClick(idx)}
              whileHover={isClickable ? { scale: 1.05 } : {}}
              whileTap={isClickable ? { scale: 0.95 } : {}}
            >
              <motion.div
                className={`w-9 h-9 rounded-full flex items-center justify-center ${
                  isActive
                    ? "bg-first shadow-lg"
                    : isCompleted
                    ? "bg-first"
                    : "bg-white border-2 border-gray-200"
                } ${isClickable ? "" : "opacity-60"}`}
                initial={false}
                animate={{
                  scale: isActive ? 1.1 : 1,
                  transition: { duration: 0.3 },
                }}
              >
                <AnimatePresence mode="wait">
                  {isCompleted ? (
                    <motion.div
                      key="check"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Check className="w-5 h-5 text-white" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="dot"
                      className={`w-2.5 h-2.5 rounded-full ${
                        isActive ? "bg-white" : "bg-gray-200"
                      }`}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.span
                className={`mt-1.5 text-xs font-medium ${
                  isActive || isCompleted ? "text-first" : "text-gray-400"
                }`}
                initial={false}
                animate={{
                  opacity: isActive || isCompleted ? 1 : 0.7,
                  y: isActive ? -2 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                {step.name}
              </motion.span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
