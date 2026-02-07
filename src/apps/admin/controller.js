// // import admin from "../models/admin_models.js";

// export async function createAdmin(req, res) {
//   try {
//     const { username, email, password } = req.body;
//     const admin_inspect = await admin.findOne({ email });
//     if (admin_inspect) {
//       return res.send("bu emaildan royhattdan utilgan");
//     }
//     const newAdmin = new admin({
//       username,
//       email,
//       password,
//     });
//     await newAdmin.save();
//     res.send({
//       message: "ADMIN muvofaqiyatli qoshildi",
//       newAdmin,
//     });
//   } catch (error) {
//     console.log("admin createda hatolik ", error);
//     res.send("create adminda hatolik ");
//   }
// }

// export async function loginAdmin(req, res) {
//   try {
//     const { email, password } = req.body;
//     const admin_inspect = await admin.findOne({ email });
//     if (!admin_inspect) {
//       console.log("hatolik adminni emailni  topaolmadi ", admin_inspect);
//       res.send("hatolik admini emailni topa olmadi ");
//     } else if (admin_inspect.password === password) {
//       res.send({
//         message: "login muvofaqiyatli ",
//         admin_inspect,
//       });
//     }
//   } catch (error) {
//     console.log("hatolik : admin loginda", error);
//     res.send("hatolik : admin loginda");
//   }
// }

// export async function logoutAdmin(req, res) {
//   try {
//     const id = req.params.id;
//     const admin_inspect = await admin.findById(id);
//     if (!admin_inspect) {
//       console.log("hatolik adminni emailni topib bolmadi", admin_inspect);
//       res.send("hatolik adminni emailni topib bolmadi");
//     }
//     await admin.findByIdAndDelete(id);
//     res.send("admin delete");
//   } catch (error) {
//     console.log("hatolik admin logautda ", error);
//     res.send("hatolik admin logutda ");
//   }
// }

// export async function meAdmin(req, res) {
//   try {
//     const { username, email, password } = req.body;
//     const id = req.params.id;
//     const admin_inspect = await admin.findById(id);
//     if (!admin_inspect) {
//       console.log("hatolik : adminni id si topilmadi", error);
//       res.send("hatolik adminni id si topilmadi");
//     } else {
//       const newAdmin = await admin.findByIdAndUpdate(
//         { _id: id },
//         { username, email, password },
//         { new: true }
//       );
//       res.send(newAdmin);
//     }
//   } catch (error) {
//     console.log("hatolik : admin updateda", error);
//     res.send("hatolik : admin updateda");
//   }
// }
