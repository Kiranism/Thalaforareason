import { CornerDownLeft, LoaderIcon } from "lucide-react";
import React from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

type SubmitButtonProps = {
  isLoading: boolean;
};

const SubmitButton = React.forwardRef<HTMLButtonElement, SubmitButtonProps>(
  ({ isLoading }, ref) => {
    return (
      <button
        ref={ref}
        type="submit"
        disabled={isLoading}
        aria-disabled={isLoading}
        className="text-white rounded-lg hover:bg-white/25 focus:bg-white/25 w-8 h-8 aspect-square flex items-center justify-center ring-0 outline-0"
      >
        {isLoading ? (
          <LoaderIcon />
        ) : (
          <CornerDownLeft size={16} className="-ml-px" />
        )}
      </button>
    );
  }
);
SubmitButton.displayName = "SubmitButton";

export default SubmitButton;
