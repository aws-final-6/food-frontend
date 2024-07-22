import { tv } from "tailwind-variants";

export const subtitle = tv({
  base: "w-full md:w-1/2 text-lg lg:text-3xl text-default-600 block max-w-full font-jua mt-8",
  variants: {
    fullWidth: {
      true: "!w-full",
    },
  },
  defaultVariants: {
    fullWidth: true,
  },
});
