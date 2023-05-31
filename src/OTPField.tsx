import React, { useState, useRef } from "react";
import styled from "styled-components";

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InputField = styled.input`
  width: 30px;
  height: 30px;
  margin: 0 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  background-color: transparent;
  z-index: 10;
  &:focus {
    outline: none;
    border: 1px solid blue;
  }
`;

interface OtpInputProps {
  onComplete: (otp: string) => void;
}

const OtpInput: React.FC<OtpInputProps> = ({ onComplete }) => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", ""]);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const focusNextInput = (index: number) => {
    if (inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = event.target;
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);
    if (index < 4 && value) {
      focusNextInput(index);
    }
    if (index === 4 && value) {
      onComplete(updatedOtp.join(""));
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    const keyCode = event.keyCode || event.which;
    if (keyCode === 8 && !otp[index] && index > 0) {
      const previousInput = inputRefs.current[index - 1];
      previousInput.focus();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pastedData = event.clipboardData.getData("text");
    if (pastedData.length === 5 && /^\d+$/.test(pastedData)) {
      setOtp(pastedData.split(""));
      onComplete(pastedData);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    const keyCode = event.keyCode || event.which;
    if (keyCode === 37 && index > 0) {
      const previousInput = inputRefs.current[index - 1];
      previousInput.focus();
    } else if (keyCode === 39 && index < 4) {
      const nextInput = inputRefs.current[index + 1];
      nextInput.focus();
    }
  };

  const renderInputs = () => {
    const inputs = [];
    for (let i = 0; i < 5; i++) {
      inputs.push(
        <InputField
          key={i}
          type="text"
          maxLength={1}
          value={otp[i]}
          onChange={(e) => handleChange(e, i)}
          onKeyUp={(e) => handleKeyUp(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onPaste={handlePaste}
          ref={(el) => el && (inputRefs.current[i] = el)}
        />
      );
    }
    return inputs;
  };

  return <InputContainer>{renderInputs()}</InputContainer>;
};

export default OtpInput;
