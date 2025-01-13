const { data } = require("../users.json");
const userSearchSchema = require("../validations/users.validator");

const getUsers = (req, res) => {
  if (req.headers.authorization !== process.env.PASSWORD)
    return res.sendStatus(401);
  res.send(data);
};

const getUserById = (req, res) => {
  const { uuid } = req.params;
  const reqUser = data.find((user) => user.login.uuid === uuid);
  if (!reqUser)
    return res.status(404).send({
      message: `User with uuid: '${uuid}' could not be found!`,
    });
  res.send(reqUser);
};

const searchUsers = (req, res) => {
  const { gender, age } = req.query;
  const { error } = userSearchSchema.validate({ gender, age });
  if (error) return res.status(400).send({ message: error.details[0].message });

  // if (gender && !validGenders.includes(gender))
  //   return res
  //     .status(400)
  //     .send({ message: `Gender must be one of: ${validGenders.join(", ")}` });

  // if (
  //   (age && isNaN(age)) ||
  //   !Number.isInteger(Number(age)) ||
  //   parseInt(age) < 1 ||
  //   parseInt(age) > 100
  // )
  //   return res
  //     .status(400)
  //     .send({ message: `Age must be an integer from 1 to 100.` });

  if (gender && age)
    res.send(
      data.filter(
        (user) => user.gender === gender && String(user.dob.age) === age
      )
    );
  else if (gender) res.send(data.filter((user) => user.gender === gender));
  else if (age) res.send(data.filter((user) => String(user.dob.age) === age));
  else
    res
      .status(400)
      .send({ message: `At least one of 'gender' or 'age' is required!` });
};

module.exports = { getUsers, getUserById, searchUsers };
