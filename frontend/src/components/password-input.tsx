import { useState } from "react";
import { Controller, FieldValues } from "react-hook-form";

/** @components */
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/** @hooks */
import { useCapitalizeLetter } from "@/hooks/use-capitalize-letter";

/** @types */
import { type PasswordInputProps } from "@/types";

/** @icons */
import { Eye, EyeOff } from "lucide-react";

export const PasswordInput = <T extends FieldValues>({
  control,
  name,
  placeholder,
  description,
  errors,
}: PasswordInputProps<T>) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  const label = useCapitalizeLetter(name);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="space-y-2">
          <Label htmlFor={name} className={errors[name] && "text-destructive"}>
            {label}
          </Label>
          <div className="relative">
            <Input
              id={name}
              className="pe-9"
              placeholder={placeholder}
              type={isVisible ? "text" : "password"}
              autoComplete="off"
              {...field}
            />
            <button
              className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:border focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
              type="button"
              onClick={toggleVisibility}
              aria-label={isVisible ? "Hide password" : "Show password"}
              aria-pressed={isVisible}
              aria-controls={name}
            >
              {isVisible ? (
                <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
              ) : (
                <Eye size={16} strokeWidth={2} aria-hidden="true" />
              )}
            </button>
          </div>
          {description && (
            <p className="text-slate-700 text-[0.8rem]">{description}</p>
          )}
          {errors[name] && (
            <p className="text-[0.8rem] text-destructive font-semibold">
              {errors[name].message}
            </p>
          )}
        </div>
      )}
    />
  );
};
