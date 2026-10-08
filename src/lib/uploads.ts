import { unlink } from "fs/promises";
import path from "path";

/** Best-effort delete of a file previously returned by /api/admin/upload. No-op for non-upload URLs. */
export async function deleteUploadedImage(imageUrl: string): Promise<void> {
  if (!imageUrl.startsWith("/api/uploads/")) return;
  const filename = imageUrl.replace("/api/uploads/", "");
  if (!filename || filename.includes("..") || filename.includes("/")) return;

  const uploadsDir = process.env.UPLOADS_DIR ?? "./uploads";
  try {
    await unlink(path.join(/* turbopackIgnore: true */ uploadsDir, filename));
  } catch {
    // File may already be gone or shared by another record — ignore.
  }
}
