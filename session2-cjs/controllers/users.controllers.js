const { data } = require("../users.json");

const getUsers = (req, res) => {
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
  if (gender && age)
    res.send(
      data.filter((user) => user.gender === gender && user.dob.age === age)
    );
  else if (gender) res.send(data.filter((user) => user.gender === gender));
  else if (age) res.send(data.filter((user) => user.dob.age === age));
  else
    res
      .status(400)
      .send({ message: `At least one of 'gender' or 'age' is required!` });
};

module.exports = { getUsers, getUserById, searchUsers };
