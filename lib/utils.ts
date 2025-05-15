import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Use the proper type accepted by clsx
export function cn(...inputs: (string | boolean | undefined | null)[]) {
  return twMerge(clsx(inputs))
}

export const readFileAsDataUrl = (file: File | Blob): Promise<string> => {
  return new Promise((resolve) => {
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      if (typeof fileReader.result === 'string') return resolve(fileReader.result)
    }
    fileReader.readAsDataURL(file);
  })
}
