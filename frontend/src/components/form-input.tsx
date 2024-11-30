import { forwardRef } from "react";
import { FieldValues } from "react-hook-form";

/** @types */
import { type FormInputProps } from "@/types/props-type";

/** @hooks */
import { useCapitalizeLetter } from "@/hooks/use-capitalize-letter";

/** @components */
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export const FormInput = forwardRef<HTMLInputElement, FormInputProps<any>>(
  <T extends FieldValues>(
    {
      control,
      type,
      name,
      placeholder,
      description,
      Icon,
      ...props
    }: FormInputProps<T>,
    ref: React.Ref<HTMLInputElement>
  ) => {
    const label = useCapitalizeLetter(name as string);

    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  {...field}
                  ref={ref}
                  id={name}
                  type={type}
                  placeholder={placeholder}
                  autoComplete="off"
                  className={Icon ? "pe-9" : ""}
                  {...props}
                />
                {Icon && (
                  <button
                    className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 transition-shadow focus-visible:border focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                    type="button"
                  >
                    <Icon className="size-4" />
                  </button>
                )}
              </div>
            </FormControl>
            <FormDescription>{description}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
);

FormInput.displayName = "FormInput";
