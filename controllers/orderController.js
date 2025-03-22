import Order from "../models/order.js";
export function createOrder(req, res) {
  if (req.user == null) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }

  const orderData = {
    orderId: "",
    email: req.user.email,
    name: req.body.name,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
    billItems: [],
    total: 0,
  };
  Order.find()
    .sort({
      date: -1,
    })
    .limit(1)
    .then((lastBills) => {
      if (lastBills.length == 0) {
        orderData.orderId = "ORD0001";
      } else {
        const lastBill = lastBills[0];
        const lastOrderId = lastBill.orderId; //"ORD0061"
        const lastOrderNumber = lastOrderId.replace("ORD", ""); //"0061"
        const lastOrderNumberInt = parseInt(lastOrderNumber); //61
        const newOrderNumberInt = lastOrderNumberInt + 1; //62
        const newOrderNumberStr = newOrderNumberInt.toString().padStart(4, "0"); // "0062"
        orderData.orderId = "ORD" + newOrderNumberStr; //data.orderId
      }
      for(let i = 0; i < body.billItems.length; i++) {
        const billItem=body.billItems[i];
        //check if product exists
      }
      const order = new Order(orderData);
      order
        .save()
        .then(() => {
          res.json({
            message: "Order saved successfully",
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            message: "Order not saved",
          });
        });
    });
}
export function getOrders(req, res) {
  if (req.user == null) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }
  if(req.user.role == "admin") {
    Order.find().then(
      (orders) => {
        res.json(orders)
        }
    ).catch(
      (err) => {
        res.status(500).json({
          message: "Orders not found"
        })
      }
    )
  }else{
    Order.find({
      email: req.user.email
    }).then(
      (orders)=>{
        res.status(500).json({
          message: "Orders not found"
        })
      }
    )
  }

}