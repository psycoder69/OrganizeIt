import { useEffect, useRef, Dispatch, SetStateAction } from "react";

const AutoResizeInput = ({
    inputName = "textarea",
    inputValue = "",
    setInputValue,
    placeholder = "Add text here ...",
    className = "",
    autofocus = false,
    maxInputHeight = 108,
}: {
    inputName: string;
    inputValue?: string;
    setInputValue?: Dispatch<SetStateAction<string>>;
    placeholder?: string;
    className?: string;
    autofocus?: boolean;
    maxInputHeight?: number;
}) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (setInputValue) {
            setInputValue(event.target.value)
        }
    };

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto"; // Reset height
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, maxInputHeight)}px`; // Set height to scrollHeight but not exceed 216px
        }
    }, [inputValue]); // Trigger when the value changes

    return (
            <textarea
                id={inputName}
                name={inputName}
                aria-label={inputName}
                ref={textareaRef}
                value={inputValue}
                onChange={handleInputChange}
                rows={1}
                className={`w-full resize-none overflow-hidden p-2 border rounded-md focus:outline-2 outline-[#66b3ff] overflow-y-auto max-h-[216px] ${className}`}
                placeholder={placeholder}
                autoFocus={autofocus}
            />
    );
};

export default AutoResizeInput;
