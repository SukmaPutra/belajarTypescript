import { z } from "zod";
import { HOBBY_OPTIONS } from "../../constant/hobbies";

export const profileSchema = z.object({
  name: z.string().trim().min(1, "Name wajib diisi"),

  jobTitle: z.string().trim().min(1, "Job title wajib diisi"),

  bio: z
    .string()
    .trim()
    .min(1, "Bio wajib diisi")
    .max(500, "Bio maksimal 500 karakter"),

  hobbies: z.array(z.enum(HOBBY_OPTIONS)).min(1, "Minimal 1 hobi"),

  // Dibuat opsional dan menerima string apapun (termasuk base64 dari FileReader)
  // Validasi format URL dilakukan di layer upload, bukan di sini
  avatarUrl: z.string().optional(),
});

// ✅ Fix: rename type agar tidak confusing dengan const di atas
export type ProfileFormValues = z.infer<typeof profileSchema>;