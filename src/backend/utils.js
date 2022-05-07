export async function writeText(path) {
  return await window.fileAPI.writeText(path);
}
