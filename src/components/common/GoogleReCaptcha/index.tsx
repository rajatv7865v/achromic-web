"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

interface GoogleReCaptchaProps {
  onChange?: (token: string | null) => void;
  onExpired?: () => void;
  onError?: () => void;
  className?: string;
}

export interface GoogleReCaptchaHandle {
  reset: () => void;
  getValue: () => string | null;
}

const GoogleReCaptcha = forwardRef<GoogleReCaptchaHandle, GoogleReCaptchaProps>(
  ({ onChange, onExpired, onError, className = "" }, ref) => {
    const recaptchaRef = useRef<ReCAPTCHA>(null);

    // Get site key from environment variable
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

    useImperativeHandle(ref, () => ({
      reset: () => {
        recaptchaRef.current?.reset();
      },
      getValue: () => {
        return recaptchaRef.current?.getValue() || null;
      },
    }));

    if (!siteKey) {
      console.warn("NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not set");
      return null;
    }

    const handleChange = (token: string | null) => {
      onChange?.(token);
    };

    const handleExpired = () => {
      onExpired?.();
    };

    const handleError = () => {
      onError?.();
    };

    return (
      <div className={className}>
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={siteKey}
          onChange={handleChange}
          onExpired={handleExpired}
          onError={handleError}
          theme="light"
        />
      </div>
    );
  }
);

GoogleReCaptcha.displayName = "GoogleReCaptcha";

export default GoogleReCaptcha;
