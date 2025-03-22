import Item from "../models/Item.js";

export function getAllItems(req, res) {
  Item.find()
    .then((items) => {
      res.json(items);
    })
    .catch(() => {
      res.json({
        message: "Error",
      });
    });
}

export function saveItem(req, res) {
  console.log(req.user);
  if (req.user.role != "admin") {
    res.status(403).json({
      message: "You cannot add items",
    });
    return;
  }
  const item = new Item(req.body);
  item
    .save()
    .then(() => {
      res.json({
        message: "Item saved",
      });
    })
    .catch(() => {
      res.json({
        message: "Error",
      });
    });
}
export function getGoodItems(req, res) {
  res.json({
    message: "Good Items",
  });
}
export function searchItem(req, res) {
  //const itemName=req.body.name;
  //get name url
  const itemName = req.params.name;
  // const name = req.body.name;
  Item.find({
    name: itemName, //itemName
  })
    .then((items) => {
      res.json(items);
    })
    .catch(() => {
      res.json({
        message: "Error",
      });
    });
}
