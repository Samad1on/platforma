import statsModel from "../models/oy.js";
import users from "../models/user_models.js";

export async function getLyState(req, res, next) {
  try {
    const user_inspect = await users.findById(req.user.id);
    if (!user_inspect) {
      const err = new Error("Foydalanuvchi mavjud emas");
      err.status = 404;
      throw err;
    }
    const natija = await statsModel.find();
    res.send({
      message: "oyma oy hissobot",
      natija,
    });
  } catch (err) {
    next(err);
  }
}

export async function getMonthLyState(req, res, next) {
  try {
    const { year, month, tuman } = req.query;

    const yearNum = parseInt(year);
    const monthNum = parseInt(month);

    if (!tuman || isNaN(yearNum) || isNaN(monthNum)) {
      const err = new Error("Parametrlar yetarli emas yoki notogri");
      err.status = 400;
      throw err;
    }

    const natija = await statsModel.findOne({
      year: yearNum,
      month: monthNum,
      tuman,
    });

    const user_inspect = await users.findById(req.user.id);
    if (!user_inspect) {
      const err = new Error("Foydalanuvchi topilmadi ");
      err.status = 404;
      throw err;
    }
    res.send({
      message: "berilgan oylik hissobit",
      natija,
    });
  } catch (err) {
    next(err);
  }
}
