export async function errorHandler(err, req, res, next) {
  console.log(err);
  return res
    .status(err.status || 500)
    .json({ error: err.message || "serverda hatolik yuz berdi" });
}
