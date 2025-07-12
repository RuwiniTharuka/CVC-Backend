
import Order from "../models/order.js";
import Product from "../models/Product.js";
export async function createOrder(req, res) {
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
    .then(async (lastBills) => {
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
      for (let i = 0; i < body.billItems.length; i++) {
        const product = await Product.findOne({
          productId: body.billItems[i].productId,
        });
        if (product == null) {
          res.status(404).json({
            message:
              "Product with product id" + body.billItems[i].productId +"not found",
          });
          return;
        }
        orderData.billItems[i] = {
          productId: product.productId,
          productName: product.name,
          image: product.images[0],
          quantity: body.billItems[i].quantity,
          price: product.price,
        };
        orderData.total =
          orderData.total + product.price * body.billItems[i].quantity;
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

export async function getOrders(req, res) {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    let orders;

    if (req.user.role === "admin") {
      orders = await Order.find();
    } else {
      orders = await Order.find({ availability: true });
    }

    res.status(200).json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ message: "Orders not found" });
  }
}

export async function updateOrder(req, res) {
  try {
    if (req.user == null) {
      res.status(401).json({
        message: "You are not authorized to update a product",
      });
      return;
    }

    const orderId = req.params.orderId;
    const order = await Order.findOneAndUpdate({ orderId: orderId }, req.body);

    res.json({
      message: "Order updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Order not updated",
    });
  }
}
/*import Order from "../models/order.js";
import Product from "../models/Product.js";
export async function createOrder(req, res) {
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
    .then(async (lastBills) => {
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
      for (let i = 0; i < body.billItems.length; i++) {
        const product = await Product.findOne({
          productId: body.billItems[i].productId,
        });
        if (product == null) {
          res.status(404).json({
            message:
              "Product with product id" +
              body.billItems[i].productId +
              "not found"
          })
          return;
        }
        orderData.billItems[i] = {
          productId: product.productId,
          productName: product.name,
          image: product.images[0],
          quantity: body.billItems[i].quantity,
          price: product.price,
        };
        orderData.total =
          orderData.total + product.price * body.billItems[i].quantity
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
  if (req.user.role == "admin") {
    Order.find()
      .then((orders) => {
        res.json(orders);
      })
      .catch((err) => {
        res.status(500).json({ 
          message: "Orders not found",
        });
      });
  } else {
    Order.find({
      email: req.user.email,
    }).then((orders) => {
      res.status(500).json({
       
        message: "Orders not found",
      });
    });
  }
}*/
