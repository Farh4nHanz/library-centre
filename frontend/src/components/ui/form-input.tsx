import { forwardRef, LegacyRef } from "react";
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
import { Textarea } from "@/components/ui/textarea";

export const FormInput = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  FormInputProps<any>
>(
  <T extends FieldValues>(
    {
      control,
      type,
      name,
      placeholder,
      description,
      Icon,
      component = "input",
      display = "column",
      ...props
    }: FormInputProps<T>,
    ref: React.Ref<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let label = useCapitalizeLetter(name as string);

    if (label.includes("Isbn")) {
      label = label.toUpperCase();
    }

    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <div
              className={`flex ${
                display === "row"
                  ? "flex-row justify-start items-center gap-4 w-full"
                  : "flex-col gap-2"
              }`}
            >
              <FormLabel htmlFor={name}>{label}</FormLabel>
              <FormControl>
                {component === "input" ? (
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
                ) : (
                  <Textarea
                    {...field}
                    id={name}
                    ref={ref}
                    placeholder={placeholder}
                    {...props}
                  />
                )}
              </FormControl>
            </div>
            <FormDescription>{description}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
);

FormInput.displayName = "FormInput";
